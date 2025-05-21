export interface Active {
  id: number;
  coinmarketcap_id: number;
  simbolo: string;
  nombre: string;
}

export interface Transaction {
  id: number;
  activo_id: number;
  tipo_operacion: "compra" | "venta";
  cantidad_invertida?: number;
  cantidad_comprada?: number;
  precio_compra?: number;
  cantidad_obtenida?: number;
  cantidad_vendida?: number;
  precio_venta?: number;
  fecha_transaccion: string;
  activo: Active;
}
