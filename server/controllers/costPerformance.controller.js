import mongoose from "mongoose";
import CostPerformance from "../models/costPerformance.model.js";

import fs from 'fs';
import path from 'path';

export const getCostPerformances = async (req, res) => {
    try {
        console.log("Requested to list all costPerformances");
        
        const costs = await CostPerformance.find({});
        res.status(200).json({ success: true, data: costs })
    } catch (error) {
        console.log("Error in fetching costs and performances: ", error.message);
        res.status(500).json({ success: false, message: "Server error!" })
    }

}


export const createCostPerformance = async (req, res) => {

    const costPerformance = req.body;


    if (!costPerformance.name || !costPerformance.uiName || !costPerformance.description || !costPerformance.status || !costPerformance.files || !costPerformance.fileContents) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const costPerformanceDirectory = path.join(__dirname, "..", "..", "terraformFile");


    let costPerformanceName;

    try {
        console.log("Requested to create a costPerformance");
        const directories = fs.readdirSync(costPerformanceDirectory, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        if (directories.length === 0) {
            return res.status(400).json({ success: false, message: "No scenario directories found in the path" });
        }

        costPerformanceName = directories[0];

        if (!costPerformanceName) {
            return res.status(400).json({ success: false, message: "CostPerformance name is missing" });
        }

    } catch (error) {
        console.error("Error reading directory: ", error);
        return res.status(400).json({ success: false, message: "Directory not found or unreadable" });
    }


    const existingCostPerformance = await CostPerformance.findOne({ name: costPerformanceName });
    if (existingCostPerformance) {
        return res.status(409).json({
            success: false,
            message: "A cost and performance scenario with this name already exists!",
            data: existingCostPerformance,
        });
    }

    const { fileNames, fileContents } = getCostPerformanceFiles(costPerformanceDirectory);


    const newCost = new CostPerformance({
        name: costPerformanceName || costPerformance.name,
        description: costPerformance.description,
        status: costPerformance.status,
        files: fileNames,
        fileContents: fileContents,
    });

    try {
        await newCost.save();
        res.status(201).json({ success: true, data: newCost });
    } catch (error) {
        console.error("Error in create costs and performances:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const updateCostPerformance = async (req, res) => {

    const { id } = req.params;
    const cost = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid cost and performance id" })
    }

    const costPerformanceDirectory = path.join(__dirname, "..", "..", "terraformFile", scenario.file);
    const { fileNames, fileContents } = getCostPerformanceFiles(costPerformanceDirectory);


    try {
        console.log("Requested to update a costPerformance");
        const updatedCostPerformance = await CostPerformance.findByIdAndUpdate(
            id,
            {
                name: cost.name,
                description: cost.description,
                status: cost.status,
                files: fileNames,
                fileContents: fileContents,
            }
        )

        const updateCost = await CostPerformance.findByIdAndUpdate(id, cost, { new: true })
        res.status(200).json({ success: true, data: updateCost })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteCostPerformance = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Cost Id" })
    }

    try {
        console.log("Requested to delete the costPerformance");
        await CostPerformance.findByIdAndUpdate(id);
        res.status(200).json({ success: true, message: "Cost deleted" })
    } catch (error) {
        console.log("Error in deleting cost: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }

}