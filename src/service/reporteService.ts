// src/services/reporteService.ts
import api from "../api/axios";
import type { Articulo, ArticuloCategoriaDTO } from "../types/articulo";
import type { ClienteFacturaDTO } from "../types/cliente";
import type { DetalleFacturaDTO } from "../types/factura";

// Endpoint 1: Artículos activos filtrados por nombre
export const listarArticulosPorFiltro = (nombre: string) =>
  api.get<Articulo[]>(`/api/articulos/mostrarActivosFiltro?nombre=${nombre}`);

// Endpoint 2: Reporte artículos con categoría (DTO)
export const listarReporteArticuloCategoria = () =>
  api.get<ArticuloCategoriaDTO[]>("/api/articulos/reporteArticuloCategoria");

// Endpoint 3: Reporte facturas por cliente (DTO)
export const listarReporteClienteFactura = () =>
  api.get<ClienteFacturaDTO[]>("/api/clientes/reporteClienteFactura");

// Endpoint 4: Reporte detalle completo con tres JOIN
export const listarReporteDetalleFactura = () =>
  api.get<DetalleFacturaDTO[]>("/api/facturas/reporteDetalleFactura");