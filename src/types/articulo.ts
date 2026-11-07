TypeScript
export interface Articulo {
  idArticulo: number;
  estado: boolean;
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
}

export interface ArticuloCategoriaDTO {
  nombreArticulo: string;
  marca: string;
  nombreCategoria: string;
  precio: number;
  stock: number;
}