import mongoose from "mongoose";

const scenarioSchema = new mongoose.Schema(
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
        timestamps: true, //createdAt, updatedAt
    }
)

const Scenario = mongoose.model("Scenario", scenarioSchema); // scenario will be scenarios

export default Scenario;