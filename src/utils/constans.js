// Estados de pedidos
export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered'
};

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING]: 'Pendiente',
  [ORDER_STATUS.PREPARING]: 'En Preparación',
  [ORDER_STATUS.READY]: 'Listo para Entregar',
  [ORDER_STATUS.DELIVERED]: 'Entregado'
};

// Estados de inventario
export const INVENTORY_STATUS = {
  CRITICAL: 'critical',
  LOW: 'low',
  NORMAL: 'normal'
};

export const INVENTORY_STATUS_TEXT = {
  [INVENTORY_STATUS.CRITICAL]: 'Stock Crítico',
  [INVENTORY_STATUS.LOW]: 'Stock Bajo',
  [INVENTORY_STATUS.NORMAL]: 'Stock Normal'
};

// Estados de promociones
export const PROMOTION_STATUS = {
  ACTIVE: 'active',
  SCHEDULED: 'scheduled',
  EXPIRED: 'expired'
};

// Tipos de pedido
export const ORDER_TYPES = {
  SALON: 'Salón',
  DELIVERY: 'Delivery'
};

// Colores de estado para pedidos
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  [ORDER_STATUS.PREPARING]: 'bg-blue-100 text-blue-700 border-blue-300',
  [ORDER_STATUS.READY]: 'bg-green-100 text-green-700 border-green-300',
  [ORDER_STATUS.DELIVERED]: 'bg-gray-100 text-gray-700 border-gray-300'
};

// Colores de estado para inventario
export const INVENTORY_STATUS_COLORS = {
  [INVENTORY_STATUS.CRITICAL]: 'bg-red-100 text-red-700 border-red-300',
  [INVENTORY_STATUS.LOW]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  [INVENTORY_STATUS.NORMAL]: 'bg-green-100 text-green-700 border-green-300'
};

// Información de la aplicación
export const APP_INFO = {
  NAME: 'Juancho Burger',
  VERSION: 'v1.0.0',
  CERTIFICATION: 'ISO 9001:2015 Certified',
  METHODOLOGY: 'SCRUM Methodology',
  YEAR: '2025'
};

export default {
  ORDER_STATUS,
  ORDER_STATUS_TEXT,
  INVENTORY_STATUS,
  INVENTORY_STATUS_TEXT,
  PROMOTION_STATUS,
  ORDER_TYPES,
  ORDER_STATUS_COLORS,
  INVENTORY_STATUS_COLORS,
  APP_INFO
};