import { create } from "zustand";

export const useCostPerformanceStore = create((set) => ({
    costPerformances: [],

    setCostPerformances: (costPerformances) => set({ costPerformances }),

    fetchCostPerformances: async () => {
        try {
            console.log("Fetching costPerformances...");

            // Fetch API çağrısı
            const response = await fetch("http://localhost:8081/api/costPerformance");

            // Yanıt durumunu kontrol et
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // JSON formatına dönüştür
            const data = await response.json();

            if (data.success) {
                // Zustand store'da costPerformances güncelle
                set({ costPerformances: data.data });
                console.log("CostPerformances fetched successfully:", data.data);
            } else {
                console.error("Error fetching costPerformances:", data.message);
            }
        } catch (error) {
            console.error("Error in fetchCostPerformances:", error.message);
        }
    },
}));
