import { useState, useEffect, useCallback } from "react";
import { Transaction } from "../types";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

interface UseTransactionsResult {
  transacciones: Transaction[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}
// Hook para manejar la lógica de obtención de transacciones
export function useTransactions(): UseTransactionsResult {
  const { token } = useAuth();
  const [transacciones, setTransacciones] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Función para obtener las transacciones desde la API
  // Se llama al cargar el hook y cada vez que se refresca
  // Si no hay token, no hace nada
  const fetchTransacciones = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/transacciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar transacciones");
      const json = await res.json();
      setTransacciones(json.transacciones || []);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTransacciones();
  }, [fetchTransacciones]);

  return { transacciones, loading, error, refresh: fetchTransacciones };
}
