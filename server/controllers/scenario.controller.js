import mongoose from "mongoose";
import Scenario from "../models/scenario.model.js"

import fs from 'fs/promises'; 
import path from 'path';

export const getScenarios = async (req, res) => {
    try {

        console.log("Requested to list all scenarios");

        const scenarios = await Scenario.find({});
        res.status(200).json({ success: true, data: scenarios });
    } catch (error) {
        console.log("error in fetching scenarios: ", error.message);
        res.status(500).json({ success: false, message: "Server error" })
    }
};


export const createScenario = async (req, res) => {

    const scenario = req.body;

    if (!scenario.name || !scenario.uiName || !scenario.description || !scenario.status || !scenario.files || !scenario.fileContents) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const scenarioDirectory = path.join(__dirname, "..", "..", "terraformFile", scenario.file);

    let scenarioName;

    try {
        console.log("Requested to create a scenario");

        const files = fs.readdirSync(scenarioDirectory);
        scenarioName = path.basename(scenarioDirectory);
    } catch (error) {
        console.error("Error reading directory: ", error);
        return res.status(400).json(
            {
                success: false,
                message: "Directory not found"
            }
        )
    };


    const existingScenario = await Scenario.findOne({ name: scenario.name });
    if (existingScenario) {
        return res.status(409).json(
            {
                success: false,
                message: "A scenario with this name already exists!",
                data: existingScenario
            }
        )
    }

    const { fileNames, fileContents } = getScenarioFiles(scenarioDirectory);


    const newScenario = new Scenario({
        name: scenario.name,
        description: scenario.description,
        status: scenario.status,
        files: fileNames,
        fileContents: fileContents,
    });

    try {
        await newScenario.save();
        res.status(201).json({ success: true, data: newScenario });
    } catch (error) {
        console.error("Error in create scenario:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateScenario = async (req, res) => {

    const { id } = req.params;
    const scenario = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Scenario Id" });
    }

    const scenarioDirectory = path.join(__dirname, "..", "..", "terraformFile", scenario.file);

    const { fileNames, fileContents } = getScenarioFiles(scenarioDirectory);

    try {
        console.log("Requested to update a scenario");
        const updatedScenario = await Scenario.findByIdAndUpdate(
            id,
            {
                name: scenario.name,
                description: scenario.description,
                status: scenario.status,
                files: fileNames,
                fileContents: fileContents,
            },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedScenario });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteScenario = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Scenario Id" });
    }

    try {
        console.log("Requested to delete scenario");

        await Scenario.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Scenario deleted" })
    } catch (error) {
        console.log("error in deleting scenario: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}