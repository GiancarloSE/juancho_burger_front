import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { useAuth } from './hooks/useAuth';

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Componentes de Autenticación
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Páginas de Admin
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Predictions from './pages/Predictions';
import Promotions from './pages/Promotions';
import Reports from './pages/Reports';

// Páginas de Usuario
import UserMenu from './pages/UserMenu';
import UserCart from './pages/UserCart';
import UserOrders from './pages/UserOrders';
import UserPromotions from './pages/UserPromotions';
import UserProfile from './pages/UserProfile';

// Componente MainApp
const MainApp = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState(user?.role === 'admin' ? 'dashboard' : 'user-menu');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('¿Está seguro de cerrar sesión?')) {
      logout();
      setCurrentPage(user?.role === 'admin' ? 'dashboard' : 'user-menu');
    }
  };

  const handleCartClick = () => {
    setCurrentPage('user-cart');
    setSidebarOpen(false);
  };

  const renderPage = () => {
    if (user.role === 'admin') {
      switch(currentPage) {
        case 'dashboard': return <Dashboard />;
        case 'orders': return <Orders />;
        case 'inventory': return <Inventory />;
        case 'predictions': return <Predictions />;
        case 'promotions': return <Promotions />;
        case 'reports': return <Reports />;
        default: return <Dashboard />;
      }
    } else {
      switch(currentPage) {
        case 'user-menu': return <UserMenu />;
        case 'user-cart': return <UserCart />;
        case 'user-orders': return <UserOrders />;
        case 'user-promotions': return <UserPromotions />;
        case 'user-profile': return <UserProfile />;
        default: return <UserMenu />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={user.role}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          user={user} 
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(true)}
          onCartClick={user.role === 'user' ? handleCartClick : null}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>

        <Footer />
      </div>
    </div>
  );
};

// Componente AuthConsumer
const AuthConsumer = ({ showLogin, setShowLogin }) => {
  const { user } = useAuth();

  if (!user) {
    return showLogin ? 
      <Login onSwitchToRegister={() => setShowLogin(false)} /> : 
      <Register onSwitchToLogin={() => setShowLogin(true)} />;
  }

  return <MainApp />;
};

// Componente App Principal
const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <DataProvider>
      <AuthProvider>
        <AuthConsumer 
          showLogin={showLogin} 
          setShowLogin={setShowLogin}
        />
      </AuthProvider>
    </DataProvider>
  );
};

export default App;