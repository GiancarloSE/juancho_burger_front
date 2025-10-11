import React from 'react';
import { Tag } from 'lucide-react';
import { useData } from '../hooks/useData';

const UserPromotions = () => {
  const { promotions } = useData();
  const activePromotions = promotions.filter(p => p.status === 'active');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold text-gray-800">Promociones Disponibles</h2>
        <p className="text-gray-600 mt-1">Aprovecha nuestras ofertas especiales</p>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-2">¡Ofertas Especiales!</h3>
        <p className="text-lg">{activePromotions.length} promociones activas disponibles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePromotions.map((promo) => (
          <div key={promo.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <div className="flex items-center justify-between text-white mb-2">
                <Tag size={24} />
                <span className="bg-white text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  ✓ Activa
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{promo.name}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{promo.description}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Descuento:</span>
                  <span className="text-2xl font-bold text-red-600">{promo.discount}%</span>
                </div>
                {promo.price && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium">Precio Especial:</span>
                    <span className="text-2xl font-bold text-gray-800">S/ {promo.price}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Válido hasta:</span>
                  <span className="text-sm font-semibold text-gray-800">{promo.validUntil}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg">
                Solicitar Promoción
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPromotions;