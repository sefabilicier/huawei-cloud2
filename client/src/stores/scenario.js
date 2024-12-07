import { create } from "zustand";

export const useScenarioStore = create((set) => ({
    scenarios: [],

    setScenarios: (scenarios) => set({ scenarios }),

    fetchScenarios: async () => {
        try {
            console.log("Fetching scenarios...");

            // Fetch API çağrısı
            const response = await fetch("http://localhost:8081/api/scenarios");

            // Yanıt durumunu kontrol et
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // JSON formatına dönüştür
            const data = await response.json();

            if (data.success) {
                // Zustand store'da senaryoları güncelle
                set({ scenarios: data.data });
                console.log("Scenarios fetched successfully:", data.data);
            } else {
                console.error("Error fetching scenarios:", data.message);
            }
        } catch (error) {
            console.error("Error in fetchScenarios:", error.message);
        }
    },
}));
