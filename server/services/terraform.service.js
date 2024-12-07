import { exec } from 'child_process';

import { fileURLToPath } from "url";
import util from "util";

import fs from 'fs';
import path from 'path';


const execPromise = util.promisify(exec);

export const executeTerraform = async (scenarioPath, { accessKey, secretKey }) => {
    try {
        console.log(`Starting Terraform execution in path: ${scenarioPath}`);

        // Terraform init
        const initCommand = `terraform -chdir="${scenarioPath}" init`;
        console.log(`Running: ${initCommand}`);
        const initResult = await execPromise(initCommand);
        console.log("Terraform Init Output:", initResult.stdout);

        // Terraform plan
        const planCommand = `terraform -chdir="${scenarioPath}" plan -var="access_key=${accessKey}" -var="secret_key=${secretKey}"`;
        console.log(`Running: ${planCommand}`);

        let planResult;
        try {
            planResult = await execPromise(planCommand);
            console.log("Terraform Plan Output:", planResult.stdout);
        } catch (planError) {
            console.error("Terraform Plan Error:", planError.stderr || planError.message);

            if (planError.stderr?.includes("Authentication failed")) {
                throw new Error("Authentication failed: Invalid Access Key or Secret Key.");
            }

            return {
                initOutput: initResult.stdout,
                planOutput: planError.stdout || "No valid plan output",
                planError: planError.stderr || planError.message,
            };
        }

        // Terraform apply
        const applyCommand = `terraform -chdir="${scenarioPath}" apply -auto-approve -var="access_key=${accessKey}" -var="secret_key=${secretKey}"`;
        console.log(`Running: ${applyCommand}`);
        const applyResult = await execPromise(applyCommand);
        console.log("Terraform Apply Output:", applyResult.stdout);

        console.log("Terraform execution completed successfully.");
        return {
            initOutput: initResult.stdout,
            planOutput: planResult.stdout,
            applyOutput: applyResult.stdout,
        };
    } catch (error) {
        console.error("Error executing Terraform:", error.stderr || error.message);
        throw new Error(error.stderr || error.message);
    }
};