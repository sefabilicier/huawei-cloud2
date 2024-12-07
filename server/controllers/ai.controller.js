import AiPrompt from "../models/aiPrompt.model.js";
import { callOpenAIService } from '../services/ai.service.js';


export const generatePrompt = async (req, res) => {
    
    console.log("Request Body:", req.body);

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    try {
        const aiResponse = await callOpenAIService(req, res);
        console.log("OpenAI API Full Response:", JSON.stringify(aiResponse, null, 2));

        // AI Response message
        const responseMessage = aiResponse?.choices?.[0]?.message;
        if (!responseMessage || !responseMessage.content) {
            console.error("AI response message or content is missing:", responseMessage);
            return res.status(500).json({ message: "AI response content is missing" });
        }

        const responseContent = responseMessage.content;

        // AI'nın cevabını döner
        res.status(200).json({
            message: "AI response generated successfully",
            data: responseContent,
        });
    } catch (error) {
        console.error("Error generating AI response:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: "Error generating AI response", error: error.message });
        }
    }
};


export const generateAndSavePrompt = async (req, res) => {
    
    console.log("Request Body:", req.body);

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    try {
        const aiResponse = await callOpenAIService(req, res);
        console.log("OpenAI API Full Response:", JSON.stringify(aiResponse, null, 2));

        // AI Response message
        const responseMessage = aiResponse?.choices?.[0]?.message;
        if (!responseMessage || !responseMessage.content) {
            console.error("AI response message or content is missing:", responseMessage);
            return res.status(500).json({ message: "AI response content is missing" });
        }

        const responseContent = responseMessage.content;

        const newPrompt = new AiPrompt({
            request: prompt,
            response: responseContent,
        });

        console.log("Saving to MongoDB:", newPrompt);
        await newPrompt.save();

        res.status(201).json({
            message: "AI response generated and saved successfully",
            data: newPrompt,
        });
    } catch (error) {
        console.error("Error generating AI response:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: "Error generating AI response", error: error.message });
        }
    }
};

export const getAiPrompts = async (req, res) => {
    try {
        
        const prompts = await AiPrompt.find();
        
        if (!prompts.length) {
            return res.status(404).json({
                message: "No prompts found.",
                data: [],
            });
        }
        
        res.status(200).json({
            message: "Prompts retrieved successfully!",
            data: prompts,
        });
    } catch (error) {
        console.error("Error fetching prompts:", error);
        res.status(500).json({
            message: "An error occurred while retrieving the prompts.",
            error: error.message,
        });
    }
};