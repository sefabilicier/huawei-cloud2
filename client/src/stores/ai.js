 import { create } from "zustand";

 export const useGenerateStore = create((set) => ({
    prompt: "",
    response: null,
    error: null,
    loading: false,

    setPrompt: (prompt) => set({ prompt }),

    fetchGenerateResponse: async (prompt) => {
        try {
            set({ loading: true, error: null });

            const response = await fetch("http://localhost:8081/api/ai/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Sadece content kısmını alıyoruz ve state'e kaydediyoruz
            const content = data?.choices?.[0]?.message?.content;
            if (!content) {
                throw new Error("AI response content is missing");
            }

            set({ response: content }); // Sadece content kısmını state'e kaydet
        } catch (error) {
            set({ error: error.message }); // Hata mesajını state'e kaydet
        } finally {
            set({ loading: false }); // Yükleme durumu sona erer
        }
    },
}));
