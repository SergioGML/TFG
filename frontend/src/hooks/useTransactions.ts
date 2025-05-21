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

export function useTransactions(): UseTransactionsResult {
  const { token } = useAuth();
  const [transacciones, setTransacciones] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransacciones = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/transacciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar transacciones");
      const data: Transaction[] = await res.json();
      setTransacciones(data);
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
