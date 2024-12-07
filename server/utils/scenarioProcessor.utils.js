import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import Scenario from "../models/scenario.model.js";
import CostPerformance from "../models/costPerformance.model.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Klasör desenlerini kontrol eden regex'ler
const SCENARIO_REGEX = /^\d{2}_Scenario$/;
const COST_PERFORMANCE_REGEX = /^\d{2}_[A-Z]_Scenario$/;


const TERRAFORM_DIR = path.join('terraformFile');

export const processTerraformFiles = async () => {
  try {
    // Klasörleri listele
    const folders = await fs.readdir(TERRAFORM_DIR, { withFileTypes: true });

    for (const folder of folders) {
      if (folder.isDirectory()) {
        const folderName = folder.name;

        if (SCENARIO_REGEX.test(folderName)) {
          // Scenario modeli için POST işlemi
          await saveToDatabase(Scenario, folderName, "Scenario");
        } else if (COST_PERFORMANCE_REGEX.test(folderName)) {
          // CostPerformance modeli için POST işlemi
          await saveToDatabase(CostPerformance, folderName, "CostPerformance");
        }
      }
    }
  } catch (error) {
    console.error("Error processing terraform files:", error.message);
  }
};
  

export const saveToDatabase = async (model, folderName, modelName) => {
  try {
    const existingDocument = await model.findOne({
      $or: [
        { terraformCode: folderName },
        { name: folderName }
      ]
    });
    if (existingDocument) {
      console.log(`${modelName} ${folderName} already exists.`);
      return;
    }

    let folderPath = path.join(TERRAFORM_DIR, folderName);
    const files = await fs.readdir(folderPath);

    const tfFiles = files.filter(file => file.endsWith('.tf'));

    let fileContents = [];
    if (tfFiles.length > 0) {
      fileContents = await Promise.all(
        tfFiles.map(file => fs.readFile(path.join(folderPath, file), 'utf-8'))
      );
    }

    const newDocument = new model({
      name: folderName,
      description: `Auto-created for ${folderName}`,
      terraformCode: folderPath,
      status: "Active",
      files: tfFiles,
      fileContents: fileContents,
    });

    await newDocument.save();
    console.log(`${modelName} saved:`, newDocument);
  } catch (error) {
    console.error(`Error saving ${modelName}:`, error.message);
  }
};

export default processTerraformFiles;