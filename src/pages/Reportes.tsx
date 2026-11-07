import { useState, useRef, type ChangeEvent } from "react";
import axios from "axios";
import {
  listarArticulosPorFiltro,
  listarReporteArticuloCategoria,
  listarReporteClienteFactura,
  listarReporteDetalleFactura
} from "../services/reporteService";
import type { Articulo, ArticuloCategoriaDTO } from "../types/articulo";
import type { ClienteFacturaDTO } from "../types/cliente";
import type { DetalleFacturaDTO } from "../types/factura";

export default function Reportes() {
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [articulosFiltro, setArticulosFiltro] = useState<Articulo[]>([]);
  
  const [reporteCat, setReporteCat] = useState<ArticuloCategoriaDTO[]>([]);
  const [reporteCli, setReporteCli] = useState<ClienteFacturaDTO[]>([]);
  const [reporteDet, setReporteDet] = useState<DetalleFacturaDTO[]>([]);

  const [mensaje, setMensaje] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Manejo de errores basado en tu guía (Paso 22)
  const obtenerMensajeError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.mensaje ?? error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "Ocurrió un error inesperado";
  };

  // Abrir y cerrar Dialog para Reporte 1
  const abrirDialog = () => dialogRef.current?.showModal();
  const cerrarDialog = () => dialogRef.current?.close();

  // Cargar Endpoint 1
  const buscarArticulosFiltro = async () => {
    try {
      const respuesta = await listarArticulosPorFiltro(nombreFiltro);
      setArticulosFiltro(respuesta.data);
      setMensaje("Artículos filtrados correctamente");
    } catch (error) {
      setMensaje(obtenerMensajeError(error));
    }
  };

  // Cargar Endpoint 2
  const cargarReporteCategoria = async () => {
    try {
      const respuesta = await listarReporteArticuloCategoria();
      setReporteCat(respuesta.data);
    } catch (error) {
      setMensaje(obtenerMensajeError(error));
    }
  };

  // Cargar Endpoint 3
  const cargarReporteCliente = async () => {
    try {
      const respuesta = await listarReporteClienteFactura();
      setReporteCli(respuesta.data);
    } catch (error) {
      setMensaje(obtenerMensajeError(error));
    }
  };

  // Cargar Endpoint 4
  const cargarReporteDetalle = async () => {
    try {
      const respuesta = await listarReporteDetalleFactura();
      setReporteDet(respuesta.data);
    } catch (error) {
      setMensaje(obtenerMensajeError(error));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Módulo de Reportes - Ferretería</h2>
      {mensaje && <p style={{ color: "blue" }}>{mensaje}</p>}

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button onClick={abrirDialog}>1. Filtrar Artículos (&lt;dialog&gt;)</button>
        <button onClick={cargarReporteCategoria}>2. Artículos con Categoría</button>
        <button onClick={cargarReporteCliente}>3. Facturas por Cliente</button>
        <button onClick={cargarReporteDetalle}>4. Detalle de Facturas (JOINs)</button>
      </div>

      {/* Modal Requerido para Reporte 1 */}
      <dialog ref={dialogRef} style={{ padding: "20px", borderRadius: "8px", width: "600px" }}>
        <h3>Buscar Artículos Activos por Nombre</h3>
        <input 
          type="text" 
          placeholder="Ingrese nombre..." 
          value={nombreFiltro}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombreFiltro(e.target.value)}
          style={{ padding: "6px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={buscarArticulosFiltro}>Buscar</button>

        <table border={1} style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {articulosFiltro.map((art) => (
              <tr key={art.idArticulo}>
                <td>{art.nombre}</td>
                <td>{art.marca}</td>
                <td>Q {art.precio}</td>
                <td>{art.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button onClick={cerrarDialog}>Cerrar</button>
      </dialog>

      {/* Tablas de visualización en pantalla */}
      {reporteCat.length > 0 && (
        <div>
          <h3>Reporte 2: Artículos con Categoría</h3>
          <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th>Artículo</th><th>Marca</th><th>Categoría</th><th>Precio</th><th>Stock</th></tr>
            </thead>
            <tbody>
              {reporteCat.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nombreArticulo}</td>
                  <td>{item.marca}</td>
                  <td>{item.nombreCategoria}</td>
                  <td>Q {item.precio}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reporteCli.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Reporte 3: Facturas por Cliente</h3>
          <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th>Cliente</th><th>NIT</th><th>Fecha Factura</th><th>Total</th></tr>
            </thead>
            <tbody>
              {reporteCli.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nombreCliente} {item.apellidoCliente}</td>
                  <td>{item.nit}</td>
                  <td>{new Date(item.fechaFactura).toLocaleString()}</td>
                  <td>Q {item.totalFactura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reporteDet.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Reporte 4: Detalle de Facturas</h3>
          <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th>ID Factura</th><th>Cliente</th><th>Artículo</th><th>Cantidad</th><th>Precio U.</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              {reporteDet.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.idFactura}</td>
                  <td>{item.clienteNombreCompleto}</td>
                  <td>{item.articuloNombre}</td>
                  <td>{item.cantidad}</td>
                  <td>Q {item.precioUnitario}</td>
                  <td>Q {item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}