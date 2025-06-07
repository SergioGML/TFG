import { Request, Response } from "express";
import { TramoFiscal } from "../models/TramoFiscal";
import { User } from "../models/User";
import { Pais } from "../models/Pais";

export const obtenerTramosFiscales = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // 1) Obtener usuario para extraer su pais_id
    const usuario = await User.findByPk(userId);
    if (!usuario || !usuario.pais_id) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o sin país asignado" });
    }

    // 2) Obtener nombre del país
    const pais = await Pais.findByPk(usuario.pais_id);
    if (!pais) {
      return res
        .status(404)
        .json({ message: "País de residencia no encontrado" });
    }

    // 3) Obtener tramos de ese país
    const tramos = await TramoFiscal.findAll({
      where: { pais_id: usuario.pais_id },
      attributes: ["tramo_min", "tramo_max", "tasa_impositiva"],
      order: [["tramo_min", "ASC"]],
    });

    // 4) Devolver ambos datos
    return res.json({
      pais: pais.nombre,
      tramos,
    });
  } catch (error) {
    console.error("Error al obtener tramos fiscales:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
