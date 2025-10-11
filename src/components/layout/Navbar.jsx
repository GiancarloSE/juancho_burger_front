import React from 'react';
import { Menu, LogOut, User, ShoppingCart } from 'lucide-react';
import { useData } from '../../hooks/useData';

const Navbar = ({ user, onLogout, onMenuClick, onCartClick }) => {
  const { getCartItemsCount } = useData();
  const cartCount = getCartItemsCount();

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex items-center justify-between border-b-2 border-red-500 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-red-500 transition-colors">
          <Menu size={28} />
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-4xl">🍔</span>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Juancho Burger
            </h1>
            <p className="text-xs text-gray-500 font-medium">Sistema de Gestión</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Botón de carrito solo para usuarios (no admin) */}
        {user.role === 'user' && onCartClick && (
          <button
            onClick={onCartClick}
            className="relative flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-md"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:inline font-medium">Carrito</span>
          </button>
        )}

        <div className="hidden md:flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-full">
          <User size={20} className="text-red-500" />
          <div>
            <p className="text-sm font-bold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline font-medium">Salir</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;