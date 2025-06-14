import { Request, Response } from "express";
import { getMarketData as cmcMarketData } from "../services/coinMarketCapServices";

// Controlador para obtener datos de mercado de criptomonedas
export const getMarketData = async (req: Request, res: Response) => {
  const qs = String(req.query.symbols || "");
  const symbols = qs
    // Convertir la cadena de símbolos en un array
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
  if (!symbols.length) {
    // Si no se pasan símbolos, devolver un error
    return res.status(400).json({ msg: "Debes pasar al menos un símbolo" });
  }
  try {
    const data = await cmcMarketData(symbols);
    return res.json(data);
  } catch (e) {
    console.error(e);
    // Si ocurre un error al obtener los datos, devolver un error genérico
    return res.status(500).json({ msg: "Error al obtener market data" });
  }
};
