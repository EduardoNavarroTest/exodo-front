import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Billing from './pages/Billing/Billing.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Config from './pages/Config/Config.jsx';
import Signin from './pages/Signin/Signin.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública de inicio de sesión */}
          
          <Route path="/login" element={<Signin />} />
          <Route path="/" element={<Signin />} />
          
          {/* Rutas protegidas */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/config" element={<ProtectedRoute><Config /></ProtectedRoute>} />
          
          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<ProtectedRoute><NotFoundPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

/**
 * 
 * 1. Arreglar la parte de autenticación (login, token, jwt y eso), pedir desde cero a la inteligencia artificial
 * 2. Arreglar el problema con el css que lo toma del login y así se queda, no debería
 * 3. Agregar opción para logout con su respectiva ruta
 * 4. Al formulario de SIZES que es el que tenemos como modelo, cambiar el tipo de input por contained
 * 5. Diferenciar cuando es permiso y cuando es porque el token venció para redirigir al login
 * 
 * 
 */


