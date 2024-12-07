import Scenario from "../models/scenario.model.js";
import CostPerformance from "../models/costPerformance.model.js";
import Cost from "../models/costPerformance.model.js";
import costPerformanceSchema from "../models/costPerformance.model.js";

export const getAllOptions = async () => {
    const scenarios = await Scenario.find({});
    const costPerformance = await CostPerformance.find({});
    
    
    return { scenarios, costPerformance };
};

export const combineSelection = async (scenarioId, costPerformanceId) => {
    const scenario = await Scenario.findById(scenarioId);
    const costPerformance = await CostPerformance.findById(costPerformanceId);

    if (!scenario || !costPerformance) {
        throw new Error("Invalid selection IDs provided");
    }

    return { 
        scenario, 
        costPerformance,
        summary: `Selected: ${scenario.description}, ${performance.name}, ${cost.value}` 
    };
};