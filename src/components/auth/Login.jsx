import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const { users } = useData();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      const success = login(credentials, users);
      if (success) {
        setError('');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } else {
      setError('Por favor complete todos los campos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-5xl">🍔</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Juancho Burger
          </h1>
          <p className="text-gray-600 mt-2 font-medium">Sistema de Gestión Empresarial</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Ingrese su usuario"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Ingrese su contraseña"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:shadow-lg"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToRegister}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Juancho Burger
        </p>
      </div>
    </div>
  );
};

export default Login;