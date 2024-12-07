import { create } from "zustand";

export const useTerraformFileStore = create((set) => ({
    terraformFiles: null, // Terraform dosya verileri
    error: null, // Hata mesajları için

    setTerraformFiles: (files) => set({ terraformFiles: files }),
    setError: (error) => set({ error }),

    fetchTerraformFiles: async (type, id) => {
        try {
            console.log(`Fetching Terraform files for ${type} with ID: ${id}...`);

            // Fetch API çağrısı
            const response = await fetch(`http://localhost:8081/api/terraform/costPerformance/${id}`);
            // Yanıt durumunu kontrol et
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // JSON formatına dönüştür
            const data = await response.json();

            if (data.success) {
                // Zustand store'da terraformFiles güncelle
                set({ terraformFiles: data.data, error: null });
                console.log("Terraform files fetched successfully:", data.data);
            } else {
                console.error("Error fetching Terraform files:", data.message);
                set({ terraformFiles: null, error: data.message });
            }
        } catch (error) {
            console.error("Error in fetchTerraformFiles:", error.message);
            set({ terraformFiles: null, error: error.message });
        }
    },
}));