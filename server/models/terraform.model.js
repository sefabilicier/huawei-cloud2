import mongoose from "mongoose";

const terraformFileSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const Terraform = mongoose.model("Terraform", terraformFileSchema);

export default Terraform;