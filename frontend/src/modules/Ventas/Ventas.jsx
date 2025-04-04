import React, { useState, useEffect } from "react";
import { FaEye, FaFilePdf } from "react-icons/fa"; // Importar íconos
import NavbarAdmin from "../../components/NavbarAdmin";
import ProcesoVentas from "./ProcesoVentas"; // Componente de agregar ventas
import "./Ventas.css";
import "./ProcesoVentas.css";

const Ventas = () => {
  const initialVentas = [
    {
      id: 1,
      fecha: "2025-03-28",
      cliente: "Juan Pérez",
      total: 50000,
      estado: "Activa", // Estado inicial
    },
    {
      id: 2,
      fecha: "2025-03-29",
      cliente: "María Gómez",
      total: 120000,
      estado: "En proceso",
    },
  ];

  const [ventas, setVentas] = useState(initialVentas);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Ventas por página
  const [showModal, setShowModal] = useState(false);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarProcesoVentas, setMostrarProcesoVentas] = useState(false); // Maneja si se muestra el proceso de ventas

  useEffect(() => {
    localStorage.setItem("ventas", JSON.stringify(ventas));
  }, [ventas]);

  const guardarVenta = (nuevaVenta) => {
    setVentas([...ventas, nuevaVenta]); // Agregar la nueva venta al estado
    setMostrarProcesoVentas(false); // Regresar a la tabla principal
  };

  const openModal = (venta) => {
    setCurrentVenta(venta);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentVenta(null);
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    const updatedVentas = ventas.map((venta) =>
      venta.id === id ? { ...venta, estado: nuevoEstado } : venta
    );
    setVentas(updatedVentas);
  };

  const handlePDF = (venta) => {
    alert(`Generar PDF para la venta de ${venta.cliente}.`);
  };

  const filteredVentas = ventas.filter((venta) =>
    venta.cliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);
  const displayedVentas = filteredVentas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="ventas-container">
      <NavbarAdmin />
      <div className="main-content">
        <h1>Gestión de Ventas</h1>
        {mostrarProcesoVentas ? (
          <ProcesoVentas guardarVenta={guardarVenta} />
        ) : (
          <>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Buscar venta por cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search-input"
              />
              <button
                className="action-button"
                onClick={() => setMostrarProcesoVentas(true)}
              >
                Agregar Venta
              </button>
            </div>
            <table className="ventas-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {displayedVentas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.fecha}</td>
                    <td>{venta.cliente}</td>
                    <td>${venta.total.toFixed(2)}</td>
                    <td>
                      <select
                        value={venta.estado}
                        onChange={(e) => handleEstadoChange(venta.id, e.target.value)}
                        className={`estado-select estado-${venta.estado
                          .toLowerCase()
                          .replace(" ", "-")}`} // Clase dinámica según estado
                      >
                        <option value="En proceso">En proceso</option>
                        <option value="Activa">Activa</option>
                        <option value="Inactiva">Inactiva</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="table-button"
                        onClick={() => openModal(venta)}
                      >
                        <FaEye /> {/* Ícono "Ver" */}
                      </button>
                      <button
                        className="table-button pdf-button"
                        onClick={() => handlePDF(venta)}
                      >
                        <FaFilePdf /> {/* Ícono "PDF" */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => changePage(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {showModal && currentVenta && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalles de la Venta</h2>
            <p>
              <strong>Fecha:</strong> {currentVenta.fecha}
            </p>
            <p>
              <strong>Cliente:</strong> {currentVenta.cliente}
            </p>
            <p>
              <strong>Total:</strong> ${currentVenta.total.toFixed(2)}
            </p>
            <p>
              <strong>Estado:</strong> {currentVenta.estado}
            </p>
            <button className="close-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
