// src/controllers/activosController.ts
import { Request, Response } from "express";
import { Activo } from "../models/Activo";
import {
  getTopAssets,
  searchAssets,
  obtenerPrecioCripto,
} from "../services/coinMarketCapServices";

export const listarTopActivos = async (_req: Request, res: Response) => {
  try {
    const list = await getTopAssets(8);
    return res.json(list);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const buscarActivos = async (req: Request, res: Response) => {
  const q = String(req.query.q || "").trim();
  if (!q)
    return res.status(400).json({ msg: "Falta criptomoneda de búsqueda" });
  try {
    const list = await searchAssets(q, 300);
    return res.json(list);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const listarActivos = async (_req: Request, res: Response) => {
  try {
    const activos = await Activo.findAll();
    return res.json(activos);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const agregarActivo = async (req: Request, res: Response) => {
  const { simbolo, nombre, coinmarketcap_id } = req.body;
  if (!simbolo || !nombre || !coinmarketcap_id) {
    return res.status(400).json({ msg: "Faltan datos" });
  }
  try {
    const nuevo = await Activo.create({ simbolo, nombre, coinmarketcap_id });
    return res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const obtenerPrecio = async (req: Request, res: Response) => {
  const sym = String(req.params.simbolo || "").toUpperCase();
  if (!sym)
    return res.status(400).json({ msg: "Debes proporcionar un símbolo" });
  try {
    const precio = await obtenerPrecioCripto(sym);
    return res.json({ simbolo: sym, precio });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error al obtener el precio" });
  }
};
