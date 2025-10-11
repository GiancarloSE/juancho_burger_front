import React from 'react';

const Modal = ({ isOpen, onClose, title, children, onSave, saveButtonText = "Guardar" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-scale-in">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">{title}</h3>
        
        <div className="space-y-5">
          {children}
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {saveButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;