import { create } from "zustand";

export const useExecutionScenarioStore = create((set) => ({
    scenarios: [], // state
    setScenarios: (scenarios) => set({ scenarios }),

    executeScenario: async (scenarioId, accessKey, secretKey) => {
        if (!scenarioId || !accessKey || !secretKey) {
            return { success: false, message: "Scenario ID, Access Key, and Secret Key are required." };
        }

        //const url = `http://localhost:8081/api/terraform/${scenarioId}/execute?accessKey=${accessKey}&secretKey=${secretKey}`;
        const url = `http://localhost:8081/api/terraform/${scenarioId}/execute?accessKey=${accessKey}&secretKey=${secretKey}`;

        console.log(`Executing scenario with URL: ${url}`);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let data;
            try {
                data = await res.json();
            } catch (jsonError) {
                console.error("Failed to parse JSON response:", jsonError);
                return { success: false, message: "Invalid JSON response from server" };
            }

            if (!res.ok) {
                console.error("Server returned an error:", res.status, data);
                return { success: false, message: data.message || "Failed to execute scenario" };
            }

            // Update scenarios state
            set((state) => ({
                scenarios: state.scenarios.map((scenario) =>
                    scenario._id === scenarioId
                        ? { ...scenario, lastExecution: new Date().toISOString(), output: data.terraformOutput }
                        : scenario
                ),
            }));

            console.log(`Scenario executed successfully: ${data.message}`);
            return { success: true, message: data.message, terraformOutput: data.terraformOutput };

        } catch (error) {
            console.error("Error executing scenario:", error.message);
            return { success: false, message: "An error occurred while executing the scenario." };
        }
    },
}));

