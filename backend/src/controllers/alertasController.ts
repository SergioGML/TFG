import { Request, Response } from "express";
import { Alerta } from "../models/Alerta";

// Obtener todas las alertas de un usuario
export const obtenerAlertas = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const alertas = await Alerta.findAll({ where: { user_id: userId } });
    res.json(alertas);
  } catch (error) {
    console.error("Error al obtener alertas:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Crear una nueva alerta
export const crearAlerta = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { activo_id, tipo_alerta, umbral, tipo_variacion } = req.body;

    if (!activo_id || !tipo_alerta || !umbral || !tipo_variacion) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const nuevaAlerta = await Alerta.create({
      user_id: userId,
      activo_id,
      tipo_alerta,
      umbral,
      tipo_variacion,
      activo_alerta: true,
    });

    res.status(201).json(nuevaAlerta);
  } catch (error) {
    console.error("Error al crear alerta:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar una alerta
export const eliminarAlerta = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const alerta = await Alerta.findOne({ where: { id, user_id: userId } });
    if (!alerta) return res.status(404).json({ msg: "Alerta no encontrada" });

    await alerta.destroy();
    res.json({ msg: "Alerta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar alerta:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
