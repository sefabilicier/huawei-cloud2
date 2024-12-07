import express from "express";
import { getOptions, submitSelection } from "../controllers/selection.controller.js";

const router = express.Router();

router.get("/", getOptions);
router.post("/submit", submitSelection);

export default router;
