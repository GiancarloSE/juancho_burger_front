import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Hamburguesas',
    image: '',
    available: true,
    preparation_time: '15'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Si hay un producto, es modo edición
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'Hamburguesas',
        image: product.image || '',
        available: product.available ?? true,
        preparation_time: product.preparation_time || '15'
      });
    }
  }, [product]);

  const categories = [
    'Hamburguesas',
    'Bebidas',
    'Complementos',
    'Postres',
    'Ensaladas',
    'Combos'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!formData.category) {
      newErrors.category = 'Debe seleccionar una categoría';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const url = product 
        ? `http://127.0.0.1:8000/api/products/${product.id}`
        : 'http://127.0.0.1:8000/api/products';
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          preparation_time: parseInt(formData.preparation_time) || 15
        })
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.data);
        onClose();
      } else {
        setErrors({ general: data.message || 'Error al guardar el producto' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Error de conexión con el servidor' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span className="text-3xl">{product ? '✏️' : '➕'}</span>
              <span>{product ? 'Editar Producto' : 'Nuevo Producto'}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
              disabled={loading}
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error general */}
          {errors.general && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {errors.general}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Ej: Hamburguesa Clásica"
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="Describe los ingredientes o características del producto..."
              disabled={loading}
            />
          </div>

          {/* Precio y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Precio (S/.) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                  errors.price ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="15.00"
                disabled={loading}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                  errors.category ? 'border-red-500' : 'border-gray-200'
                }`}
                disabled={loading}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Tiempo de preparación */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tiempo de Preparación (minutos)
            </label>
            <input
              type="number"
              name="preparation_time"
              value={formData.preparation_time}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 transition-all"
              disabled={loading}
            />
          </div>

          {/* URL de imagen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="https://ejemplo.com/imagen.jpg"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Opcional. Si no se proporciona, se usará una imagen por defecto.
            </p>
          </div>

          {/* Vista previa de imagen */}
          {formData.image && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700 mb-2">Vista previa:</p>
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                }}
              />
            </div>
          )}

          {/* Disponible */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-5 h-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              disabled={loading}
            />
            <label className="text-sm font-semibold text-gray-700">
              Producto disponible para la venta
            </label>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Guardando...</span>
                </>
              ) : (
                <span>{product ? 'Actualizar' : 'Crear'} Producto</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;