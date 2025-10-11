import React, { useEffect } from 'react';
import { Clock, Package, CheckCircle, Truck } from 'lucide-react';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import StatusBadge from '../components/ui/StatusBadge';

const UserOrders = () => {
  const { orders, loadUserOrders } = useData();
  const { user } = useAuth();

  console.log('🔄 UserOrders - Render');
  console.log('👤 Usuario:', user);
  console.log('📋 Orders del contexto:', orders);

  // Cargar pedidos del usuario cuando el componente se monta
  useEffect(() => {
    console.log('🎯 UserOrders - useEffect disparado');
    console.log('👤 User:', user);
    console.log('🆔 User ID:', user?.id);
    
    if (user && user.id) {
      console.log('✅ Llamando a loadUserOrders con ID:', user.id);
      loadUserOrders(user.id);
    } else {
      console.log('❌ No hay usuario o no tiene ID');
    }
  }, [user]);

  // Filtrar solo los pedidos del usuario actual
  const userOrders = orders ? orders.filter(order => {
    console.log('🔍 Filtrando pedido:', order.id, 'userId:', order.userId, 'vs', user.id);
    return order.userId === user.id;
  }) : [];
  
  const activeOrders = userOrders.filter(o => o.status !== 'delivered');
  const totalSpent = userOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

  console.log('📊 UserOrders - Resumen:');
  console.log('   Total orders:', orders?.length || 0);
  console.log('   User orders:', userOrders.length);
  console.log('   Active orders:', activeOrders.length);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return Clock;
      case 'preparing': return Package;
      case 'ready': return CheckCircle;
      case 'delivered': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pendiente';
      case 'preparing': return 'En Preparación';
      case 'ready': return 'Listo para Entrega';
      case 'delivered': return 'Entregado';
      default: return 'Desconocido';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'preparing': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'delivered': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold text-gray-800">Mis Pedidos</h2>
        <p className="text-gray-600 mt-1">Seguimiento de tus órdenes en tiempo real</p>
        
        {/* DEBUG INFO */}
        <div className="mt-2 p-3 bg-blue-50 rounded-lg text-xs">
          <p><strong>DEBUG:</strong></p>
          <p>Usuario ID: {user?.id}</p>
          <p>Total pedidos en contexto: {orders?.length || 0}</p>
          <p>Pedidos filtrados: {userOrders.length}</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-blue-100 font-medium">Total Pedidos</p>
          <p className="text-4xl font-bold mt-2">{userOrders.length}</p>
          <p className="text-sm text-blue-100 mt-1">Pedidos realizados</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-green-100 font-medium">Pedidos Activos</p>
          <p className="text-4xl font-bold mt-2">{activeOrders.length}</p>
          <p className="text-sm text-green-100 mt-1">En proceso</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-purple-100 font-medium">Total Gastado</p>
          <p className="text-4xl font-bold mt-2">S/ {totalSpent.toFixed(2)}</p>
          <p className="text-sm text-purple-100 mt-1">En compras</p>
        </div>
      </div>

      {/* Pedidos Activos */}
      {activeOrders.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Package className="mr-2 text-orange-500" size={24} />
            Pedidos en Proceso
          </h3>
          <div className="space-y-4">
            {activeOrders.map(order => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <div key={order.id} className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${getStatusColor(order.status)}`}>
                        <StatusIcon size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.type} • {order.time}</p>
                      </div>
                    </div>
                    <StatusBadge 
                      status={order.status} 
                      text={getStatusText(order.status)} 
                      type="order"
                    />
                  </div>

                  {/* Items del pedido */}
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Items del pedido:</p>
                    {Array.isArray(order.items) ? (
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex justify-between">
                            <span>• {item.name} x{item.quantity}</span>
                            <span className="font-semibold">S/ {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">{order.items}</p>
                    )}
                  </div>

                  {order.deliveryAddress && (
                    <p className="text-sm text-gray-600 mb-2">
                      📍 <span className="font-medium">Entrega:</span> {order.deliveryAddress}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-800">S/ {parseFloat(order.total).toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Estado del pedido</p>
                      <div className="flex items-center space-x-1">
                        {['pending', 'preparing', 'ready', 'delivered'].map((status, idx) => (
                          <div
                            key={status}
                            className={`w-8 h-2 rounded-full ${
                              ['pending', 'preparing', 'ready', 'delivered'].indexOf(order.status) >= idx
                                ? 'bg-gradient-to-r from-green-500 to-green-600'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Historial de Pedidos */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <CheckCircle className="mr-2 text-green-500" size={24} />
          Historial Completo
        </h3>

        {userOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Aún no tienes pedidos</h3>
            <p className="text-gray-600">¡Haz tu primer pedido y disfruta de nuestras hamburguesas!</p>
            <button 
              onClick={() => {
                console.log('🔄 Botón recargar clickeado');
                loadUserOrders(user.id);
              }}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Recargar Pedidos
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <div key={order.id} className="p-4 border-2 border-gray-100 rounded-xl hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <StatusIcon size={20} className={
                        order.status === 'delivered' ? 'text-green-500' :
                        order.status === 'ready' ? 'text-green-500' :
                        order.status === 'preparing' ? 'text-blue-500' : 'text-yellow-500'
                      } />
                      <div>
                        <p className="font-bold text-gray-800">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.table} • {order.time}</p>
                      </div>
                    </div>
                    <StatusBadge 
                      status={order.status} 
                      text={getStatusText(order.status)} 
                      type="order"
                    />
                  </div>

                  {/* Items */}
                  {Array.isArray(order.items) ? (
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex justify-between">
                            <span>• {item.name} x{item.quantity}</span>
                            <span className="font-semibold">S/ {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mb-2 bg-gray-50 p-3 rounded-lg">{order.items}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{order.date ? new Date(order.date).toLocaleDateString('es-PE') : 'Fecha no disponible'}</p>
                    <p className="font-bold text-gray-800">Total: S/ {parseFloat(order.total).toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;