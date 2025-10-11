/**
 * Formatea una fecha a formato peruano
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Formatea una hora en formato peruano
 * @param {Date} date - Fecha/hora a formatear
 * @returns {string} Hora formateada
 */
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formatea un número como moneda peruana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
export const formatCurrency = (amount) => {
  return `S/ ${parseFloat(amount).toFixed(2)}`;
};

/**
 * Calcula el porcentaje de un valor respecto a un total
 * @param {number} value - Valor
 * @param {number} total - Total
 * @returns {number} Porcentaje
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

/**
 * Determina el estado del inventario basado en stock
 * @param {number} stock - Stock actual
 * @param {number} minStock - Stock mínimo
 * @returns {string} Estado del inventario
 */
export const getInventoryStatus = (stock, minStock) => {
  if (stock <= minStock * 0.5) return 'critical';
  if (stock <= minStock) return 'low';
  return 'normal';
};

/**
 * Genera un ID único simple
 * @returns {string} ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Filtra items basándose en un término de búsqueda
 * @param {Array} items - Array de items
 * @param {string} searchTerm - Término de búsqueda
 * @param {Array} fields - Campos donde buscar
 * @returns {Array} Items filtrados
 */
export const filterItems = (items, searchTerm, fields) => {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    fields.some(field => 
      String(item[field]).toLowerCase().includes(term)
    )
  );
};

/**
 * Valida si un campo de formulario está vacío
 * @param {any} value - Valor a validar
 * @returns {boolean} true si está vacío
 */
export const isEmpty = (value) => {
  return value === null || value === undefined || value === '' || 
         (Array.isArray(value) && value.length === 0);
};

/**
 * Obtiene el saludo según la hora del día
 * @returns {string} Saludo
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

export default {
  formatDate,
  formatTime,
  formatCurrency,
  calculatePercentage,
  getInventoryStatus,
  generateId,
  filterItems,
  isEmpty,
  getGreeting
};