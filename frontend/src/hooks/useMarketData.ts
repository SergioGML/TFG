import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

export interface MarketDataEntry {
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
}

interface UseMarketDataResult {
  data: Record<string, MarketDataEntry>;
  loading: boolean;
  error: string | null;
}

/* Hook para obtener datos de mercado (precio + variaciones) de varios símbolos.
Refresca cada 10s. Devuelve siempre un objeto (vacío por defecto), nunca null. */

export function useMarketData(symbols: string[]): UseMarketDataResult {
  const { token } = useAuth();
  const [data, setData] = useState<Record<string, MarketDataEntry>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || symbols.length === 0) {
      setData({});
      return;
    }
    let active = true;
    // Función para obtener los datos de mercado
    // Esta función se ejecuta inmediatamente y luego cada 10 segundos
    const fetchData = async () => {
      setLoading(true);
      try {
        const qs = encodeURIComponent(symbols.join(","));
        const res = await fetch(`${API_URL}/market-data?symbols=${qs}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar market data");
        const json: Record<string, MarketDataEntry> = await res.json();
        if (active) {
          setData(json);
          setError(null);
        }
      } catch (e: any) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    // Refrescar cada 10 segundos
    // Si el componente se desmonta, se cancela el intervalo para evitar que se intente actualizar el estado de un componente desmontado
    const iv = window.setInterval(fetchData, 10_000);
    return () => {
      active = false;
      clearInterval(iv);
    };
  }, [token, symbols.join(",")]);

  return { data, loading, error };
}
