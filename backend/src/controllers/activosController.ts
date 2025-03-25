import { Request, Response } from "express";
import { Activo } from "../models/Activo";
import { obtenerPrecioCripto } from "../services/coinMarketCapServices";

// Obtener todos los activos
export const listarActivos = async (req: Request, res: Response) => {
  try {
    const activos = await Activo.findAll();
    res.json(activos);
  } catch (error) {
    console.error("Error al obtener activos:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Agregar un nuevo activo
export const agregarActivo = async (req: Request, res: Response) => {
  try {
    const { simbolo, nombre, coinmarketcap_id } = req.body;
    
    if (!simbolo || !nombre || !coinmarketcap_id) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const nuevoActivo = await Activo.create({ simbolo, nombre, coinmarketcap_id });
    res.status(201).json(nuevoActivo);
  } catch (error) {
    console.error("Error al agregar activo:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener precio de una criptomoneda
export const obtenerPrecio = async (req: Request, res: Response) => {
  try {
    const { simbolo } = req.params;
    if (!simbolo) {
      return res.status(400).json({ msg: "Debes proporcionar un símbolo de criptomoneda" });
    }

    const precio = await obtenerPrecioCripto(simbolo.toUpperCase());
    res.json({ simbolo, precio });
  } catch (error) {
    console.error("Error al obtener precio:", error);
    res.status(500).json({ msg: "Error al obtener el precio de la criptomoneda" });
  }
};

