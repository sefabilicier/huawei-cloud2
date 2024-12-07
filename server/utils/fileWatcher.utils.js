import chokidar from "chokidar";
import Scenario from "../models/scenario.model.js";
import CostPerformance from "../models/costPerformance.model.js";

export const watchDirectory = async (dirPath, model) => {
  const watcher = chokidar.watch(dirPath, {
    persistent: true,
  });

  
  watcher.on("add", async (filePath) => {
    console.log(`File added: ${filePath}`);
    const fileName = filePath.split("/").pop();
    const description = `File auto-added for ${fileName}`;
    
    const newDocument = new model({
      description,
      terraformCode: filePath,
      status: "Active",
    });

    try {
      await newDocument.save();
      console.log(`Document added to ${model.modelName}:`, newDocument);
    } catch (err) {
      console.error(`Error adding document: ${err.message}`);
    }
  });

  
  watcher.on("change", async (filePath) => {
    console.log(`File changed: ${filePath}`);
    try {
      const document = await model.findOneAndUpdate(
        { terraformCode: filePath },
        { updatedAt: new Date() },
        { new: true }
      );
      if (document) {
        console.log(`Document updated in ${model.modelName}:`, document);
      } else {
        console.log(`Document not found for ${filePath}`);
      }
    } catch (err) {
      console.error(`Error updating document: ${err.message}`);
    }
  });

  // once file is dele
  watcher.on("unlink", async (filePath) => {
    console.log(`File removed: ${filePath}`);
    try {
      const result = await model.findOneAndDelete({ terraformCode: filePath });
      if (result) {
        console.log(`Document deleted from ${model.modelName}:`, result);
      } else {
        console.log(`Document not found for deletion: ${filePath}`);
      }
    } catch (err) {
      console.error(`Error deleting document: ${err.message}`);
    }
  });
};

export const startWatching = () => {
  watchDirectory("../../terraformFile/scenarios", Scenario);
  watchDirectory("../../terraformFile/costPerformance", CostPerformance);
};