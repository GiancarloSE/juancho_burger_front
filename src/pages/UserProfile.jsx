import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';

const UserProfile = () => {
  const { user } = useAuth();
  const { orders } = useData();
  const userOrders = orders;
  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold text-gray-800">Mi Perfil</h2>
        <p className="text-gray-600 mt-1">Información de tu cuenta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center space-x-6 mb-8">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Cliente
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium">Usuario</p>
              <p className="text-lg font-bold text-gray-800">{user.username}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium">Email</p>
              <p className="text-lg font-bold text-gray-800">{user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium">Miembro desde</p>
              <p className="text-lg font-bold text-gray-800">{user.registeredDate}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
            <p className="text-purple-100 font-medium">Total Pedidos</p>
            <p className="text-4xl font-bold mt-2">{userOrders.length}</p>
            <p className="text-sm text-purple-100 mt-1">Pedidos realizados</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
            <p className="text-green-100 font-medium">Total Gastado</p>
            <p className="text-4xl font-bold mt-2">S/ {totalSpent.toFixed(2)}</p>
            <p className="text-sm text-green-100 mt-1">En compras</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6">
            <p className="text-orange-100 font-medium">Pedido Promedio</p>
            <p className="text-4xl font-bold mt-2">S/ {userOrders.length > 0 ? (totalSpent / userOrders.length).toFixed(2) : '0.00'}</p>
            <p className="text-sm text-orange-100 mt-1">Por pedido</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;