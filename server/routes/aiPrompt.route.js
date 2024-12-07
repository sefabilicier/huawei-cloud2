import express from "express";
import { getAiPrompts, generatePrompt } from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/", getAiPrompts);

router.post("/generate", generatePrompt);

export default router;