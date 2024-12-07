import mongoose from "mongoose";

const aiPromptSchema = new mongoose.Schema(
    {
        request: {
            type: String,
            required: true,
        },

        response: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

const AiPrompt = mongoose.model("aiPrompt", aiPromptSchema);

export default AiPrompt;