import api from './api';

export const inventoryService = {
  // Obtener inventario
  getAllInventory: async () => {
    try {
      const response = await api.get('/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar stock
  updateStock: async (productId, stockData) => {
    try {
      const response = await api.patch(`/inventory/${productId}`, stockData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};