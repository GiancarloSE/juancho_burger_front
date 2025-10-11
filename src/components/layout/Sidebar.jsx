import React from 'react';
import { X, Home, ShoppingCart, Package, TrendingUp, Tag, FileText, User, UtensilsCrossed, ShoppingBag } from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange, isOpen, onClose, userRole }) => {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-400' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, color: 'text-green-400' },
    { id: 'inventory', label: 'Inventario', icon: Package, color: 'text-purple-400' },
    { id: 'predictions', label: 'Predicciones', icon: TrendingUp, color: 'text-pink-400' },
    { id: 'promotions', label: 'Promociones', icon: Tag, color: 'text-yellow-400' },
    { id: 'reports', label: 'Reportes', icon: FileText, color: 'text-orange-400' },
  ];

  const userMenuItems = [
    { id: 'user-menu', label: 'Menú', icon: UtensilsCrossed, color: 'text-red-400' },
    { id: 'user-cart', label: 'Mi Carrito', icon: ShoppingBag, color: 'text-orange-400' },
    { id: 'user-orders', label: 'Mis Pedidos', icon: ShoppingCart, color: 'text-green-400' },
    { id: 'user-promotions', label: 'Promociones', icon: Tag, color: 'text-yellow-400' },
    { id: 'user-profile', label: 'Mi Perfil', icon: User, color: 'text-blue-400' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transform transition-transform duration-300 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between lg:justify-center border-b border-gray-700">
          <h2 className="text-xl font-bold">
            {userRole === 'admin' ? 'Panel Admin' : 'Menú Principal'}
          </h2>
          <button onClick={onClose} className="lg:hidden text-white hover:text-red-400 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6 px-3 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all transform
                  ${currentPage === item.id 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-102'
                  }
                `}
              >
                <Icon size={22} className={currentPage === item.id ? 'text-white' : item.color} />
                <span className="font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <p className="text-xs text-gray-400 text-center font-medium">
            ✓ ISO 9001:2015 Certified
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            v1.0.0 - SCRUM Methodology
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;