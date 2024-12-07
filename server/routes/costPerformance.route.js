import express from "express";
import { getCostPerformances, createCostPerformance, updateCostPerformance, deleteCostPerformance } from "../controllers/costPerformance.controller.js";

const router = express.Router();

router.get("/", getCostPerformances);
router.post("/", createCostPerformance);
router.put("/:id", updateCostPerformance);
router.delete("/:id", deleteCostPerformance);

export default router;