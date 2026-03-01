import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export const api = {
    getGoods: async () => {
        try {
            const response = await apiClient.get("/goods");
            return response.data;
        } catch (error) {
            console.error("Ошибка загрузки товаров:", error);
            throw error;
        }
    },

    getGoodById: async (id) => {
        try {
            const response = await apiClient.get(`/goods/${id}`);
            return response.data;
        } catch (error) {
            console.error("Ошибка загрузки товара:", error);
            throw error;
        }
    },
    
    createGood: async (good) => {
        try {
            const response = await apiClient.post("/goods", good);
            return response.data;
        } catch (error) {
            console.error("Ошибка создания товара:", error);
            throw error;
        }
    },

    updateGood: async (id, good) => {
        try {
            const response = await apiClient.patch(`/goods/${id}`, good);
            return response.data;
        } catch (error) {
            console.error("Ошибка обновления товара:", error);
            throw error;
        }
    },

    deleteGood: async (id) => {
        try {
            const response = await apiClient.delete(`/goods/${id}`);
            return response.data;
        } catch (error) {
            console.error("Ошибка удаления товара:", error);
            throw error;
        }
    }
};