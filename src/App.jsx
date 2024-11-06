import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Billing from './pages/Billing/Billing.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Config from './pages/Config/Config.jsx';
import Signin from './pages/Signin/Signin.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import './App.css'
// import Test from './test/Test.jsx';
// import Test2 from './test/Test2.jsx';
// import Pokeapi from './test/Pokeapi.jsx';

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
/*
Faltantes

- Lógica para el manejo del update para controlar el codigo old con el codigo new (Implementar un nuevo campo?)
- Mandarle todos los registros al showmodal para filtrar

1. Creación de un tercero (cliente, empleado, proveedor, etc) 
2. Creación de un usuario
3. Creación de un producto

*/


export default App;
