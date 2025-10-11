import React, { useState } from 'react';
import { Plus, Tag, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { useData } from '../hooks/useData';

const Promotions = () => {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPromo, setCurrentPromo] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    validUntil: ''
  });

  const handleSavePromotion = () => {
    if (!currentPromo.name || !currentPromo.description || !currentPromo.discount || !currentPromo.validUntil) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const promoData = {
      ...currentPromo,
      discount: parseInt(currentPromo.discount),
      price: currentPromo.price ? parseFloat(currentPromo.price) : null
    };

    if (editMode) {
      updatePromotion(currentPromo.id, promoData);
    } else {
      addPromotion(promoData);
    }

    setShowModal(false);
    setEditMode(false);
    setCurrentPromo({ name: '', description: '', discount: '', price: '', validUntil: '' });
  };

  const handleDeletePromotion = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta promoción?')) {
      deletePromotion(id);
    }
  };

  const toggleStatus = (id) => {
    const promo = promotions.find(p => p.id === id);
    if (promo) {
      updatePromotion(id, { status: promo.status === 'active' ? 'scheduled' : 'active' });
    }
  };

  const openEditModal = (promo) => {
    setCurrentPromo(promo);
    setEditMode(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentPromo({ name: '', description: '', discount: '', price: '', validUntil: '' });
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Gestión de Promociones</h2>
          <p className="text-gray-600 mt-1">RF04: Módulo de promociones y ofertas especiales</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg"
        >
          <Plus size={20} />
          <span>Nueva Promoción</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-green-100 font-medium">Promociones Activas</p>
          <p className="text-4xl font-bold mt-2">{promotions.filter(p => p.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-blue-100 font-medium">Programadas</p>
          <p className="text-4xl font-bold mt-2">{promotions.filter(p => p.status === 'scheduled').length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-purple-100 font-medium">Total Promociones</p>
          <p className="text-4xl font-bold mt-2">{promotions.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all">
            <div className={`p-6 ${promo.status === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}>
              <div className="flex items-center justify-between text-white mb-2">
                <Tag size={24} />
                <button
                  onClick={() => toggleStatus(promo.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    promo.status === 'active' ? 'bg-white text-green-700' : 'bg-white text-gray-700'
                  }`}
                >
                  {promo.status === 'active' ? '✓ Activa' : '⏸ Pausada'}
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white">{promo.name}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4 h-12">{promo.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Descuento:</span>
                  <span className="text-xl font-bold text-red-600">{promo.discount}%</span>
                </div>
                {promo.price && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium">Precio:</span>
                    <span className="text-xl font-bold text-gray-800">S/ {promo.price}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Válido hasta:</span>
                  <span className="text-sm font-semibold text-gray-800">{promo.validUntil}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button 
                  onClick={() => openEditModal(promo)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Editar</span>
                </button>
                <button 
                  onClick={() => handleDeletePromotion(promo.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditMode(false);
          setCurrentPromo({ name: '', description: '', discount: '', price: '', validUntil: '' });
        }}
        title={editMode ? "Editar Promoción" : "Nueva Promoción"}
        onSave={handleSavePromotion}
        saveButtonText={editMode ? "Actualizar" : "Crear Promoción"}
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Promoción *</label>
          <input
            type="text"
            value={currentPromo.name}
            onChange={(e) => setCurrentPromo({...currentPromo, name: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Ej: Combo Familiar"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción *</label>
          <textarea
            value={currentPromo.description}
            onChange={(e) => setCurrentPromo({...currentPromo, description: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Describe la promoción"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Descuento (%) *</label>
          <input
            type="number"
            value={currentPromo.discount}
            onChange={(e) => setCurrentPromo({...currentPromo, discount: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="20"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Precio Especial (S/) - Opcional</label>
          <input
            type="number"
            value={currentPromo.price}
            onChange={(e) => setCurrentPromo({...currentPromo, price: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="65.00"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Válido Hasta *</label>
          <input
            type="date"
            value={currentPromo.validUntil}
            onChange={(e) => setCurrentPromo({...currentPromo, validUntil: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Promotions;