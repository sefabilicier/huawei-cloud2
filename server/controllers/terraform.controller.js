import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

import { getTerraformOutputsForScenario } from "../helper/terraform.helper.js";
import { executeTerraform } from '../services/terraform.service.js';
import Scenario from "../models/scenario.model.js";
import CostPerformance from '../models/costPerformance.model.js';

import logTerraformOutput from '../utils/log.utils.js';


export const getScenarioOutputs = async (req, res) => {
    try {
        const { scenarioId } = req.params;

        const scenario = await Scenario.findById(scenarioId);
        if (!scenario) {
            return res.status(404).json({ success: false, message: 'Scenario not found' });
        }

        const jsonFilePath = path.join(process.cwd(), scenario.terraformCodePath, 'terraform_outputs.json');
        let jsonData = {};
        try {
            const jsonFileContent = fs.readFileSync(jsonFilePath, 'utf-8');
            jsonData = JSON.parse(jsonFileContent);
        } catch (error) {
            console.error('Error reading JSON file:', error.message);
            return res.status(500).json({ success: false, message: 'Could not read JSON file' });
        }

        const terraformOutputs = await getTerraformOutputsForScenario(scenarioId);

        res.status(200).json({
            success: true,
            data: {
                id: scenario._id,
                name: scenario.name,
                uiName: uiName,
                description: scenario.description,
                terraformCodePath: scenario.terraformCodePath,
                jsonData,
                terraformOutputs,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const executeScenario = async (req, res) => {
    const { scenarioId } = req.params;
    const { secretKey, accessKey } = req.query;

    console.log("Request received for executing scenario:");
    console.log("Scenario ID:", scenarioId);
    console.log("Access Key:", accessKey);
    console.log("Secret Key:", secretKey);

    try {
        // Validate keys
        if (!accessKey || !secretKey) {
            console.error("Missing accessKey or secretKey in the request");
            return res.status(400).json({
                success: false,
                message: "AccessKey and SecretKey are required.",
            });
        }

        // Find the scenario in the database
        let scenario = await Scenario.findById(scenarioId) || await CostPerformance.findById(scenarioId);
        if (!scenario) {
            console.error("Scenario or CostPerformance not found for ID:", scenarioId);
            return res.status(404).json({
                success: false,
                message: "Scenario or CostPerformance not found",
            });
        }

        console.log("Executing Terraform with scenario:", scenario.name);

        // Execute Terraform commands
        const terraformPath = path.resolve(__dirname, "..", "..", scenario.terraformCode);
        const output = await executeTerraform(terraformPath, { accessKey, secretKey });

        return res.status(200).json({
            success: true,
            message: `Scenario ${scenario.name} executed successfully`,
            terraformOutput: output,
        });
    } catch (error) {
        console.error("Error executing scenario:", error.message);

        // Check for authentication errors
        if (error.message.includes("Authentication failed")) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. Please check your Access Key and Secret Key.",
            });
        }

        // Default error handling
        return res.status(500).json({
            success: false,
            message: "Error executing scenario",
        });
    }
};

export const getTerraformFiles = async (req, res) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const { type, id } = req.params;

    let model;
    if (type === 'scenario') {
        model = Scenario;
        console.log("Requested to a scenario");
    } else if (type === 'costPerformance') {
        model = CostPerformance;
        console.log("Requested to a costPerformance");
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid type parameter, use 'scenario' or 'costPerformance'"
        });
    }

    try {

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: `${type} not found`,
            });
        }

        const directory = path.resolve(__dirname, "..", "..", "terraformFile", data.name);
        console.log("Directory Path:", directory);

        if (!fs.existsSync(directory)) {
            console.error("Directory does not exist:", directory);
            return res.status(404).json({
                success: false,
                message: "Terraform directory not found",
            });
        }

        const files = await fs.promises.readdir(directory);
        const tfFiles = files.filter(file => file.trim().endsWith(".tf"));

        const fileNames = [];
        const fileContents = [];

        for (const file of tfFiles) {
            const filePath = path.join(directory, file);
            if (fs.existsSync(filePath)) {
                const content = await fs.promises.readFile(filePath, "utf-8");
                fileNames.push(file);
                fileContents.push(content);
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                _id: data._id,
                name: data.name,
                description: data.description,
                status: data.status,
                terraformCode: data.terraformCode,
                files: fileNames,
                fileContents: fileContents,
            },
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the request",
            error: error.message,
        });
    }
};