// src/App.jsx

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
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route path="/billing" element={<ProtectedRoute component={Billing} />} />
          <Route path="/inventory" element={<ProtectedRoute component={Inventory} />} />
          <Route path="/config" element={<ProtectedRoute component={Config} />} />
          <Route path="*" element={<ProtectedRoute component={NotFoundPage} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

/**
 * 
 * 1. Arreglar la parte de autenticación (login, token, jwt y eso), pedir desde cero a la inteligencia artificial
 * 2. Arreglar el problema con el css que lo toma del login y así se queda, no debería
 * 3. Agregar opción para logout con su respectiva ruta
 * 4. Al formulario de SIZES que es el que tenemos como modelo, cambiar el tipo de input por contained
 * 
 * 
 */

export default App;
