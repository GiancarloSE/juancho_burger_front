import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import Modal from '../components/ui/Modal';

const UserCart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart, addOrder, promotions } = useData();
  const { user } = useAuth();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderType, setOrderType] = useState('Delivery');
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.find(a => a.default) || null);
  
  // Campos separados para dirección
  const [addressForm, setAddressForm] = useState({
    street: '',
    number: '',
    district: '',
    reference: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [notes, setNotes] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [addressErrors, setAddressErrors] = useState({});

  // Asegurarse de que los valores sean números
  const subtotal = parseFloat(getCartTotal()) || 0;
  const deliveryFee = orderType === 'Delivery' ? 5 : 0;
  const discount = appliedPromo ? (subtotal * parseFloat(appliedPromo.discount) / 100) : 0;
  const total = subtotal + deliveryFee - discount;

  const distritos = [
    'Huancayo', 'El Tambo', 'Chilca', 'Pilcomayo', 'Huancan',
    'Sapallanga', 'Hualhuas', 'San Agustín de Cajas', 'San Jerónimo de Tunán',
    'Huayucachi', 'Tres de Diciembre', 'Viques', 'Sicaya', 'Pucará',
    'Quichuay', 'Chongos Alto', 'Cullhuas', 'Chupuro', 'Colca',
    'Santo Domingo de Acobamba'
  ];

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const validateAddress = () => {
    const errors = {};
    
    if (orderType === 'Delivery' && !selectedAddress) {
      if (!addressForm.street.trim()) {
        errors.street = 'La calle es obligatoria';
      }
      if (!addressForm.number.trim()) {
        errors.number = 'El número es obligatorio';
      }
      if (!addressForm.district) {
        errors.district = 'Selecciona un distrito';
      }
      if (!addressForm.reference.trim()) {
        errors.reference = 'La referencia es obligatoria';
      }
    }
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    if (!validateAddress()) {
      return;
    }

    const orderItems = cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price)
    }));

    let deliveryAddr = 'Para recoger en local';
    
    if (orderType === 'Delivery') {
      if (selectedAddress) {
        deliveryAddr = selectedAddress.address;
      } else {
        deliveryAddr = `${addressForm.street} ${addressForm.number}, ${addressForm.district} (Ref: ${addressForm.reference})`;
      }
    }

    const order = {
      userId: user.id,
      table: orderType === 'Delivery' ? `Delivery - ${deliveryAddr}` : 'Para Recoger',
      type: orderType,
      items: orderItems,
      total: total,
      deliveryAddress: deliveryAddr,
      paymentMethod: paymentMethod,
      notes: notes,
      appliedPromo: appliedPromo ? appliedPromo.name : null
    };

    addOrder(order);
    clearCart();
    setShowCheckoutModal(false);
    setAddressForm({ street: '', number: '', district: '', reference: '' });
    setAddressErrors({});
    alert('¡Pedido realizado con éxito! Puedes ver el estado en "Mis Pedidos"');
  };

  const applyPromotion = (promo) => {
    setAppliedPromo(promo);
  };

  const handleUseNewAddress = () => {
    setSelectedAddress(null);
    setAddressForm({ street: '', number: '', district: '', reference: '' });
    setAddressErrors({});
  };

  const activePromotions = promotions.filter(p => p.status === 'active');

  // 🔍 DEBUG
  console.log('🛒 Cart:', cart);
  console.log('🛒 Cart length:', cart?.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold text-gray-800">Mi Carrito</h2>
        <p className="text-gray-600 mt-1">Revisa tu pedido antes de continuar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {!cart || cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-600">¡Agrega algunos productos deliciosos!</p>
            </div>
          ) : (
            <>
              {cart.map(item => {
                // Asegurarse de que price sea número
                const itemPrice = parseFloat(item.price) || 0;
                const itemQuantity = parseInt(item.quantity) || 0;
                const itemTotal = itemPrice * itemQuantity;

                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-orange-100 to-red-100 w-24 h-24 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                        {item.image || '🍔'}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <p className="text-xl font-bold text-red-600 mt-2">S/ {itemPrice.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>

                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, itemQuantity - 1)}
                            className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-bold">{itemQuantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, itemQuantity + 1)}
                            className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-gray-800">
                          S/ {itemTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => clearCart()}
                className="w-full bg-red-100 text-red-700 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors"
              >
                Vaciar Carrito
              </button>
            </>
          )}
        </div>

        {/* Resumen del pedido */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen del Pedido</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">S/ {subtotal.toFixed(2)}</span>
              </div>
              
              {deliveryFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Delivery:</span>
                  <span className="font-semibold">S/ {deliveryFee.toFixed(2)}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento ({appliedPromo.name}):</span>
                  <span className="font-semibold">- S/ {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-3 flex justify-between text-gray-800">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckoutModal(true)}
              disabled={!cart || cart.length === 0}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                !cart || cart.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg'
              }`}
            >
              <ShoppingBag size={20} />
              <span>Proceder al Pago</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Promociones disponibles */}
          {activePromotions && activePromotions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Promociones Disponibles</h3>
              <div className="space-y-2">
                {activePromotions.map(promo => (
                  <button
                    key={promo.id}
                    onClick={() => applyPromotion(promo)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      appliedPromo?.id === promo.id
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold text-sm text-gray-800">{promo.name}</p>
                    <p className="text-xs text-gray-600">{promo.discount}% descuento</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Checkout - SIN CAMBIOS */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => {
          setShowCheckoutModal(false);
          setAddressForm({ street: '', number: '', district: '', reference: '' });
          setAddressErrors({});
        }}
        title="Finalizar Pedido"
        onSave={handleCheckout}
        saveButtonText="Confirmar Pedido"
      >
        {/* ... resto del modal sin cambios ... */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Pedido *</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option>Delivery</option>
            <option>Recoger en Local</option>
          </select>
        </div>

        {orderType === 'Delivery' && (
          <>
            {user?.addresses && user.addresses.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Direcciones Guardadas</label>
                <div className="space-y-2">
                  {user.addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setAddressErrors({});
                      }}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedAddress?.id === addr.id
                          ? 'bg-blue-500 text-white border-2 border-blue-600'
                          : 'bg-white border border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <p className="font-semibold text-sm">{addr.label}</p>
                      <p className="text-xs opacity-90 mt-1">{addr.address}</p>
                      {addr.reference && (
                        <p className="text-xs opacity-75 mt-1">Ref: {addr.reference}</p>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleUseNewAddress}
                  className="w-full mt-3 px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  + Usar nueva dirección
                </button>
              </div>
            )}

            {(!selectedAddress || !user?.addresses || user.addresses.length === 0) && (
              <div className="space-y-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h4 className="font-bold text-gray-800 mb-2">📍 Dirección de Entrega</h4>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Calle / Avenida *
                  </label>
                  <input
                    type="text"
                    value={addressForm.street}
                    onChange={(e) => {
                      setAddressForm({...addressForm, street: e.target.value});
                      setAddressErrors({...addressErrors, street: ''});
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                      addressErrors.street ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Ej: Av. Javier Prado"
                  />
                  {addressErrors.street && (
                    <p className="text-red-600 text-xs mt-1 font-semibold">⚠️ {addressErrors.street}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número / Lote *
                  </label>
                  <input
                    type="text"
                    value={addressForm.number}
                    onChange={(e) => {
                      setAddressForm({...addressForm, number: e.target.value});
                      setAddressErrors({...addressErrors, number: ''});
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                      addressErrors.number ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Ej: 456"
                  />
                  {addressErrors.number && (
                    <p className="text-red-600 text-xs mt-1 font-semibold">⚠️ {addressErrors.number}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Distrito *
                  </label>
                  <select
                    value={addressForm.district}
                    onChange={(e) => {
                      setAddressForm({...addressForm, district: e.target.value});
                      setAddressErrors({...addressErrors, district: ''});
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                      addressErrors.district ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Selecciona un distrito</option>
                    {distritos.map(distrito => (
                      <option key={distrito} value={distrito}>{distrito}</option>
                    ))}
                  </select>
                  {addressErrors.district && (
                    <p className="text-red-600 text-xs mt-1 font-semibold">⚠️ {addressErrors.district}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Referencia *
                  </label>
                  <textarea
                    value={addressForm.reference}
                    onChange={(e) => {
                      setAddressForm({...addressForm, reference: e.target.value});
                      setAddressErrors({...addressErrors, reference: ''});
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all ${
                      addressErrors.reference ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Ej: Casa blanca con portón negro, frente al parque"
                    rows="2"
                  />
                  {addressErrors.reference && (
                    <p className="text-red-600 text-xs mt-1 font-semibold">⚠️ {addressErrors.reference}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Ayúdanos a encontrar tu ubicación más fácilmente</p>
                </div>
              </div>
            )}
          </>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Método de Pago *</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option>Efectivo</option>
            <option>Tarjeta (en delivery)</option>
            <option>Yape</option>
            <option>Plin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Notas Adicionales (Opcional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Ej: Sin cebolla, extra salsa, tocar timbre..."
            rows="2"
          />
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Total a pagar: <span className="text-2xl font-bold text-blue-700">S/ {total.toFixed(2)}</span>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            ⏱️ Tiempo estimado: {orderType === 'Delivery' ? '30-45 min' : '15-20 min'}
          </p>
          {orderType === 'Delivery' && (
            <p className="text-xs text-gray-600 mt-1">
              🚚 Costo de delivery: S/ {deliveryFee.toFixed(2)}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserCart;