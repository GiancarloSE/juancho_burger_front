import React from 'react';
import { Download, Store, Truck } from 'lucide-react';
import { useData } from '../hooks/useData';

const Reports = () => {
  const { orders, products, users } = useData();

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const salesData = weekDays.map((day, index) => {
    const dayOrders = orders.filter(o => o.status === 'delivered');
    const baseSales = 1850 + (index * 250);
    const baseOrders = 42 + (index * 6);
    return {
      period: day,
      sales: baseSales,
      orders: baseOrders
    };
  });

  const maxSales = Math.max(...salesData.map(d => d.sales));
  const totalWeeklySales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalWeeklyOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const newCustomers = users.filter(u => u.role === 'user').length;

  const topProduct = products.reduce((max, p) => p.sales > max.sales ? p : max, products[0]);
  const bestDay = salesData.reduce((max, d) => d.sales > max.sales ? d : max, salesData[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Reportes y Analíticas</h2>
          <p className="text-gray-600 mt-1">RF03: Reportes de ventas diarios y mensuales</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg">
          <Download size={20} />
          <span>Exportar PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Ventas Semanales</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">S/ {totalWeeklySales.toLocaleString()}</p>
          <p className="text-sm text-green-600 font-semibold mt-1">+15% vs semana anterior</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Pedidos Totales</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalWeeklyOrders}</p>
          <p className="text-sm text-green-600 font-semibold mt-1">+8% vs semana anterior</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Ticket Promedio</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">S/ {(totalWeeklySales / totalWeeklyOrders).toFixed(2)}</p>
          <p className="text-sm text-blue-600 font-semibold mt-1">+6% vs semana anterior</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Clientes Nuevos</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{newCustomers}</p>
          <p className="text-sm text-purple-600 font-semibold mt-1">+12% vs semana anterior</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Ventas por Día de la Semana</h3>
        <div className="space-y-4">
          {salesData.map((data, i) => {
            const percentage = (data.sales / maxSales) * 100;
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700 w-24">{data.period}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs text-white font-bold">{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right w-32">
                    <span className="font-bold text-gray-800">S/ {data.sales}</span>
                    <span className="text-sm text-gray-600 ml-2">({data.orders})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Métodos de Pago</h3>
          <div className="space-y-3">
            {[
              { method: 'Efectivo', amount: 8500, percentage: 45, color: 'from-green-400 to-green-600' },
              { method: 'Tarjeta', amount: 7200, percentage: 39, color: 'from-blue-400 to-blue-600' },
              { method: 'Yape/Plin', amount: 2900, percentage: 16, color: 'from-purple-400 to-purple-600' },
            ].map((payment, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">{payment.method}</span>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">S/ {payment.amount}</p>
                    <p className="text-sm text-gray-600">{payment.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${payment.color}`}
                    style={{ width: `${payment.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Distribución de Pedidos</h3>
          <div className="space-y-4">
            {[
              { type: 'Salón', count: orders.filter(o => o.type === 'Salón').length, percentage: 69, color: 'from-purple-400 to-purple-600', icon: Store },
              { type: 'Delivery', count: orders.filter(o => o.type === 'Delivery').length, percentage: 31, color: 'from-orange-400 to-orange-600', icon: Truck },
            ].map((dist, i) => {
              const Icon = dist.icon;
              return (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon size={20} className="text-gray-600" />
                      <span className="font-semibold text-gray-700">{dist.type}</span>
                    </div>
                    <span className="font-bold text-gray-800">{dist.count} pedidos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${dist.color}`}
                      style={{ width: `${dist.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center font-medium">{dist.percentage}% del total</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Resumen Ejecutivo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-100 font-medium">Día más rentable</p>
            <p className="text-3xl font-bold">{bestDay.period}</p>
            <p className="text-sm text-blue-100 mt-1">S/ {bestDay.sales} en ventas</p>
          </div>
          <div>
            <p className="text-blue-100 font-medium">Producto estrella</p>
            <p className="text-3xl font-bold">{topProduct.name}</p>
            <p className="text-sm text-blue-100 mt-1">{topProduct.sales} unidades diarias</p>
          </div>
          <div>
            <p className="text-blue-100 font-medium">Hora pico</p>
            <p className="text-3xl font-bold">7:00 PM - 9:00 PM</p>
            <p className="text-sm text-blue-100 mt-1">Mayor afluencia de clientes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;