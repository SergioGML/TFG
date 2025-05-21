// src/controllers/marketDataController.ts
import { Request, Response } from "express";
import { getMarketData as cmcMarketData } from "../services/coinMarketCapServices";

export const getMarketData = async (req: Request, res: Response) => {
  const qs = String(req.query.symbols || "");
  const symbols = qs
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
  if (!symbols.length) {
    return res.status(400).json({ msg: "Debes pasar al menos un símbolo" });
  }
  try {
    const data = await cmcMarketData(symbols);
    return res.json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error al obtener market data" });
  }
};
