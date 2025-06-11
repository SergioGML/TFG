import { useState, useEffect, useCallback } from "react";
import type { Active } from "../types";
import { API_URL } from "../config/api";

export interface UseActivesResult {
  activos: Active[];
  loading: boolean;
  error: string | null;
  /**
   * Si pasas query (string), hace búsqueda hasta 300;
   * si no, carga top 8.
   */
  refresh: (query?: string) => void;
}

export function useActives(): UseActivesResult {
  const [activos, setActivos] = useState<Active[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivos = useCallback(async (query?: string) => {
    setLoading(true);
    setError(null);
    const path = query
      ? `/activos/search?q=${encodeURIComponent(query)}`
      : `/activos/top`;
    try {
      const res = await fetch(`${API_URL}${path}`);
      if (!res.ok) throw new Error("Error al cargar activos");
      const data: Active[] = await res.json();
      setActivos(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivos();
  }, [fetchActivos]);

  return { activos, loading, error, refresh: fetchActivos };
}
