import mongoose from "mongoose";

const costPerformanceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        uiName: {
            type: String,
            required: [true, "Name is required"],
        },

        description: {
            type: String,
            required: false,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive", "Completed"],
            default: "Active",
        },

        terraformCode: { 
            type: String,
            required: true 
        },

        files: [{ 
            type: String 
        }], 

        fileContents: [{ 
            type: String 
        }],
        
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

    },
    {
        timestamps: true,
    }
)

const CostPerformance = mongoose.model("CostPerformance", costPerformanceSchema);

export default CostPerformance;