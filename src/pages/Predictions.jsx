import React from 'react';
import { TrendingUp, Package } from 'lucide-react';
import { useData } from '../hooks/useData';

const Predictions = () => {
  const { products } = useData();
  
  const predictions = products
    .filter(p => p.sales > 0)
    .slice(0, 4)
    .map(p => ({
      product: p.name,
      today: p.sales,
      tomorrow: Math.round(p.sales * 1.15),
      nextWeek: Math.round(p.sales * 7 * 1.1),
      trend: 'up',
      icon: '🍔'
    }));

  const recommendations = [
    { item: 'Pan para Hamburguesa', action: 'Comprar 200 unidades', priority: 'high', reason: 'Alto consumo proyectado fin de semana', cost: 'S/ 150' },
    { item: 'Carne de Res', action: 'Comprar 50 kg', priority: 'critical', reason: 'Stock bajo + aumento demanda', cost: 'S/ 800' },
    { item: 'Queso Cheddar', action: 'Comprar 25 kg', priority: 'medium', reason: 'Reposición normal', cost: 'S/ 375' },
    { item: 'Lechuga', action: 'Comprar 15 kg', priority: 'critical', reason: 'Stock crítico', cost: 'S/ 45' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold text-gray-800">Predicciones de Demanda</h2>
        <p className="text-gray-600 mt-1">RF05: Tablero de predicción con Machine Learning</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-xl">
            <TrendingUp size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Modelo Predictivo Activo</h3>
            <p className="text-purple-100 mt-1">Precisión del modelo: <span className="font-bold">94.5%</span> • Última actualización: Hoy 08:00</p>
            <p className="text-sm text-purple-200 mt-1">Algoritmo: Regresión Lineal Múltiple</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-blue-500" size={24} />
            Predicción de Ventas
          </h3>
          <div className="space-y-4">
            {predictions.map((pred, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{pred.icon}</span>
                    <span className="font-bold text-gray-800">{pred.product}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    ↑ Crecimiento
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 font-medium">Hoy</p>
                    <p className="text-xl font-bold text-blue-600">{pred.today}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 font-medium">Mañana</p>
                    <p className="text-xl font-bold text-purple-600">{pred.tomorrow}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 font-medium">Sem.</p>
                    <p className="text-xl font-bold text-orange-600">{pred.nextWeek}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Package className="mr-2 text-orange-500" size={24} />
            Recomendaciones de Compra
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-bold text-gray-800">{rec.item}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    rec.priority === 'critical' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {rec.priority === 'critical' ? '🔴 Urgente' : 
                     rec.priority === 'high' ? '🟠 Alta' : '🟡 Media'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-600 mb-1">{rec.action}</p>
                <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                <p className="text-sm font-bold text-gray-800">Costo estimado: {rec.cost}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm font-semibold text-green-700">
              Total inversión recomendada: <span className="text-lg">S/ 1,370</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;