import express from "express";
import { getTerraformFiles, getScenarioOutputs, executeScenario} from "../controllers/terraform.controller.js";

const router = express.Router();

router.post('/:scenarioId/execute', executeScenario);
router.get("/:scenarioId", getScenarioOutputs);
router.get("/:type/:id", getTerraformFiles);

export default router;