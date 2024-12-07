import fs from "fs";
import path from "path";


export const getTerraformOutputsForScenario = (scenarioId) => {
  try {
    
    const filePath = `../../terraformFile/${scenarioId}/terraform_outputs.json`;

    const terraformJsonPath = path.join(process.cwd(), filePath);
    
    /*reading document*/
    const data = fs.readFileSync(terraformJsonPath, "utf-8");
    console.log("Raw data from the file:", data);

    /*parsify JSON*/
    try {
      return JSON.parse(data);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError.message);
      throw new Error("Invalid JSON format in the terraform outputs file.");
    }
  } catch (error) {
    console.error("Could not read JSON file:", error.message);
    throw new Error("Could not receive terraform outputs");
  }
};