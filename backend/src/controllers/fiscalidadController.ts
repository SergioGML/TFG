import { Request, Response } from "express";
import { TramoFiscal } from "../models/TramoFiscal";
import { User } from "../models/User";
import { Pais } from "../models/Pais";

export const obtenerTramosFiscales = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Obtener el usuario y su país
    const usuario = await User.findByPk(userId, { include: [{ model: Pais }] });

    if (!usuario || !usuario.pais_id) {
      return res.status(404).json({ message: "Usuario no encontrado o sin país asignado" });
    }

    // Obtener los tramos fiscales del país del usuario
    const tramos = await TramoFiscal.findAll({
        where: { pais_id: usuario.pais_id },
        attributes: ["id", "pais_id", "tramo_min", "tramo_max", "tasa_impositiva"], // ✅ Nombres corregidos
        order: [["tramo_min", "ASC"]], // ✅ Ahora usa "tramo_min", que sí existe
      });
      
    return res.json(tramos);
  } catch (error) {
    console.error("Error al obtener tramos fiscales:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
