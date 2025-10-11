import React from 'react';
import { Clock, ShoppingCart, TrendingUp, CheckCircle, Truck } from 'lucide-react';
import { useData } from '../hooks/useData';
import StatusBadge from '../components/ui/StatusBadge';

const Dashboard = () => {
  const { orders, products, users } = useData();
  
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(o => o.date.startsWith(today));
  const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;
  const newCustomers = users.filter(u => u.registeredDate === today && u.role === 'user').length;

  const topProducts = products
    .filter(p => p.sales > 0)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4)
    .map(p => ({
      name: p.name,
      sales: p.sales,
      revenue: `S/ ${(p.sales * (p.price || 15)).toFixed(0)}`,
      trend: '+15%'
    }));

  const recentOrders = orders.slice(0, 4).map(order => ({
    ...order,
    icon: order.status === 'ready' ? CheckCircle : order.status === 'preparing' ? Clock : Truck
  }));

  const stats = [
    { label: 'Ventas Hoy', value: `S/ ${todaySales.toFixed(2)}`, change: '+12%', trend: 'up', color: 'from-green-400 to-green-600', icon: '💰' },
    { label: 'Pedidos Activos', value: activeOrders.toString(), change: `+${todayOrders.length} nuevos`, trend: 'up', color: 'from-blue-400 to-blue-600', icon: '📋' },
    { label: 'Productos Bajo Stock', value: lowStockProducts.toString(), change: '-3 desde ayer', trend: 'down', color: 'from-yellow-400 to-yellow-600', icon: '⚠️' },
    { label: 'Clientes Nuevos', value: newCustomers.toString(), change: '+18%', trend: 'up', color: 'from-purple-400 to-purple-600', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600 mt-1">Panel de control en tiempo real</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow">
          <Clock size={16} />
          <span className="font-medium">Actualizado: {new Date().toLocaleTimeString('es-PE')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Productos Más Vendidos</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-md">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} unidades vendidas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{product.revenue}</p>
                  <p className="text-sm text-green-600 font-medium">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Pedidos Recientes</h3>
            <ShoppingCart className="text-blue-500" size={24} />
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const StatusIcon = order.icon;
              return (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <StatusIcon size={20} className={
                      order.status === 'ready' ? 'text-green-500' :
                      order.status === 'preparing' ? 'text-blue-500' : 'text-yellow-500'
                    } />
                    <div>
                      <p className="font-bold text-gray-800">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.table}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">S/ {order.total}</p>
                    <StatusBadge 
                      status={order.status} 
                      text={
                        order.status === 'pending' ? 'Pendiente' : 
                        order.status === 'preparing' ? 'Preparando' : 
                        order.status === 'ready' ? 'Listo' : 'Entregado'
                      } 
                      type="order"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;