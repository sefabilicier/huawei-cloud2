import express from "express";
import { getScenarios, createScenario, updateScenario, deleteScenario } from "../controllers/scenario.controller.js";

const router = express.Router();

router.get("/", getScenarios);
router.post("/", createScenario);
router.put("/:id", updateScenario);
router.delete("/:id", deleteScenario);

export default router;