import React, { useState } from 'react';
import { AlertTriangle, Edit } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import { useData } from '../hooks/useData';

const Inventory = () => {
  const { products, updateProduct } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusText = (product) => {
    if (product.stock <= product.minStock * 0.5) return 'Stock Crítico';
    if (product.stock <= product.minStock) return 'Stock Bajo';
    return 'Stock Normal';
  };

  const getStatus = (product) => {
    if (product.stock <= product.minStock * 0.5) return 'critical';
    if (product.stock <= product.minStock) return 'low';
    return 'normal';
  };

  const handleSaveProduct = () => {
    if (editProduct) {
      updateProduct(editProduct.id, editProduct);
    }
    setEditProduct(null);
    setShowModal(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const criticalStockCount = products.filter(p => p.stock <= p.minStock * 0.5).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Control de Inventario</h2>
          <p className="text-gray-600 mt-1">RF02: Control de inventarios en tiempo real</p>
        </div>
        {criticalStockCount > 0 && (
          <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold border-2 border-red-300">
            <AlertTriangle size={20} />
            <span>{criticalStockCount} productos en estado crítico</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-blue-100 font-medium">Total Productos</p>
          <p className="text-4xl font-bold mt-2">{products.length}</p>
          <p className="text-sm text-blue-100 mt-1">En inventario</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-green-100 font-medium">Stock Normal</p>
          <p className="text-4xl font-bold mt-2">{products.filter(p => p.stock > p.minStock).length}</p>
          <p className="text-sm text-green-100 mt-1">Abastecidos correctamente</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-red-100 font-medium">Requieren Compra</p>
          <p className="text-4xl font-bold mt-2">{lowStockCount}</p>
          <p className="text-sm text-red-100 mt-1">Stock bajo o crítico</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar producto o categoría..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Producto</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Categoría</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stock Actual</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stock Mínimo</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">{product.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-700">{product.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">{product.stock} {product.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{product.minStock} {product.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={getStatus(product)} text={getStatusText(product)} type="inventory" />
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        setEditProduct(product);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline flex items-center space-x-1"
                    >
                      <Edit size={16} />
                      <span>Editar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && editProduct && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditProduct(null);
          }}
          title="Actualizar Stock"
          onSave={handleSaveProduct}
          saveButtonText="Guardar Cambios"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Producto</label>
            <input
              type="text"
              value={editProduct.name}
              disabled
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Actual ({editProduct.unit})</label>
            <input
              type="number"
              value={editProduct.stock}
              onChange={(e) => setEditProduct({...editProduct, stock: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Mínimo ({editProduct.unit})</label>
            <input
              type="number"
              value={editProduct.minStock}
              onChange={(e) => setEditProduct({...editProduct, minStock: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">
              Estado: <span className="font-bold">{getStatusText(editProduct)}</span>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Inventory;