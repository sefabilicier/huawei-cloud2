import { getAllOptions, combineSelection } from "../services/selection.service.js";

export const getOptions = async (req, res) => {
    try {
        const options = await getAllOptions();
        res.status(200).json({ success: true, data: options });
    } catch (error) {
        console.error("Error fetching options:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const submitSelection = async (req, res) => {
    const { scenarioId, performanceId, costId } = req.body;

    try {
        const result = await combineSelection(scenarioId, performanceId, costId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Error in selection:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};
