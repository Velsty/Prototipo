import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../modules/Home/Home";
import Login from "../modules/Auth/Login";
import Productos from "../modules/Home/Productos";
import Servicios from "../modules/Home/Servicios";
import Novedades from "../modules/Home/Novedades";
import Register from "../modules/Auth/Register";


import Dashboard from "../modules/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";


import Abastecimiento from "../modules/Abastecimiento/Abastecimiento"; // Módulo de abastecimiento
import Clientes from "../modules/Clientes/Clientes"; // Módulo de clientes
import Compras from "../modules/Compras/Compras"; // Módulo de compras
import Empleados from "../modules/Empleados/Empleados"; // Módulo de empleados
import Insumos from "../modules/Insumos/Insumos"; // Módulo de insumos
import Proveedores from "../modules/Proveedores/Proveedores"; // Módulo de proveedores
import Ventas from "../modules/Ventas/Ventas"; // Módulo de ventas
import ServiciosAdministrador from "../modules/Servicios/ServiciosAdministrador";
import ProductoAdministrador from "../modules/Productos/ProductoAdministrador";



function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Servicios" element={<Servicios />} />
        <Route path="/Novedades" element={<Novedades />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/abastecimiento" element={<PrivateRoute><Abastecimiento /></PrivateRoute>} />
        <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
        <Route path="/compras" element={<PrivateRoute><Compras /></PrivateRoute>} />
        <Route path="/empleados" element={<PrivateRoute><Empleados /></PrivateRoute>} />
        <Route path="/insumos" element={<PrivateRoute><Insumos /></PrivateRoute>} />
        <Route path="/proveedores" element={<PrivateRoute><Proveedores /></PrivateRoute>} />
        <Route path="/ventas" element={<PrivateRoute><Ventas /></PrivateRoute>} />
        <Route path="/productoadministrador" element={<PrivateRoute><ProductoAdministrador /></PrivateRoute>} />
        <Route path="/serviciosadministrador" element={<PrivateRoute><ServiciosAdministrador /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
