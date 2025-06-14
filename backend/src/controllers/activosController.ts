import { Request, Response } from "express";
import { Activo } from "../models/Activo";
import {
  getTopAssets,
  searchAssets,
  obtenerPrecioCripto,
} from "../services/coinMarketCapServices";
//// Controlador para manejar las operaciones relacionadas con los activos
export const listarTopActivos = async (_req: Request, res: Response) => {
  try {
    const list = await getTopAssets(8);
    return res.json(list);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
// Controlador para buscar activos por nombre o símbolo
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
// Controlador para listar todos los activos almacenados en la base de datos
export const listarActivos = async (_req: Request, res: Response) => {
  try {
    const activos = await Activo.findAll();
    return res.json(activos);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
// Controlador para agregar un nuevo activo a la base de datos
export const agregarActivo = async (req: Request, res: Response) => {
  const { simbolo, nombre, coinmarketcap_id } = req.body;

  if (!simbolo || !nombre || !coinmarketcap_id) {
    return res.status(400).json({ msg: "Faltan datos" });
  }

  try {
    // Verifico primero si existe por coinmarketcap_id o simbolo
    const existente = await Activo.findOne({
      where: {
        coinmarketcap_id,
      },
    });

    if (existente) {
      return res.status(200).json(existente);
    }

    // Insertado solo si no existe
    const nuevo = await Activo.create({ simbolo, nombre, coinmarketcap_id });
    return res.status(201).json(nuevo);
  } catch (e) {
    console.error("Error al agregar activo:", e);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
// Controlador para obtener el precio de una criptomoneda por su símbolo
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
