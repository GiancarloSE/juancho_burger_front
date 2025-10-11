import api from './api';

export const promotionService = {
  // Obtener todas las promociones
  getAllPromotions: async () => {
    try {
      const response = await api.get('/promotions');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener promociones activas
  getActivePromotions: async () => {
    try {
      const response = await api.get('/promotions/active');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Crear promoción
  createPromotion: async (promotionData) => {
    try {
      const response = await api.post('/promotions', promotionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar promoción
  updatePromotion: async (promotionId, promotionData) => {
    try {
      const response = await api.put(`/promotions/${promotionId}`, promotionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar promoción
  deletePromotion: async (promotionId) => {
    try {
      const response = await api.delete(`/promotions/${promotionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};