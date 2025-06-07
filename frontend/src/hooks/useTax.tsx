import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

export interface TramoFiscalEntry {
    tramo_min: number;
    tramo_max: number;
    tasa_impositiva: number;
}

export interface FiscalidadData {
    pais: string;
    tramos: TramoFiscalEntry[];
}

interface UseFiscalidadResult {
    data: FiscalidadData | null;
    loading: boolean;
    error: string | null;
}

export function useFiscalidad(): UseFiscalidadResult {
    const { token } = useAuth();
    const [data, setData] = useState<FiscalidadData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        let active = true;

        const fetchFiscalidad = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/fiscalidad`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Error al cargar fiscalidad");
                const json: FiscalidadData = await res.json();
                if (active) {
                    setData(json);
                    setError(null);
                }
            } catch (err: any) {
                if (active) setError(err.message || "Error desconocido");
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchFiscalidad();

        return () => {
            active = false;
        };
    }, [token]);

    return { data, loading, error };
}
