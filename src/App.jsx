import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Billing from './pages/Billing/Billing.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Config from './pages/Config/Config.jsx';
import Signin from './pages/Signin/Signin.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/config" element={<Config />} />
        <Route path="/" element={<Signin />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
