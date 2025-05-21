// backend/src/controllers/transaccionesController.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Transaccion } from "../models/Transacciones";
import { Activo } from "../models/Activo";

export const registrarTransaccion = async (req: Request, res: Response) => {
  // 1) Validación de payload
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const {
      activo_id, // aquí viene coinmarketcap_id
      simbolo, // para crear si hace falta
      nombre, // idem
      tipo_operacion,
      cantidad_invertida,
      cantidad_comprada,
      precio_compra,
      cantidad_obtenida,
      cantidad_vendida,
      precio_venta,
    } = req.body;

    // 2) Buscar por coinmarketcap_id
    let activo = await Activo.findOne({
      where: { coinmarketcap_id: activo_id },
    });

    // 3) Si no existe, crearlo (necesita símbolo y nombre)
    if (!activo) {
      if (!simbolo || !nombre) {
        return res.status(400).json({
          msg: "El activo no existe. Debes enviar 'simbolo' y 'nombre' para crearlo.",
        });
      }
      activo = await Activo.create({
        coinmarketcap_id: activo_id,
        simbolo,
        nombre,
      });
    }

    // 4) Crear la transacción con el PK interno
    const nuevaTransaccion = await Transaccion.create({
      user_id: (req as any).user.id,
      activo_id: activo.id,
      tipo_operacion,
      cantidad_invertida,
      cantidad_comprada,
      precio_compra,
      cantidad_obtenida,
      cantidad_vendida,
      precio_venta,
    });

    return res
      .status(201)
      .json({ msg: "Transacción registrada", transaccion: nuevaTransaccion });
  } catch (error) {
    console.error("Error al registrar transacción:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const obtenerTransacciones = async (req: Request, res: Response) => {
  try {
    const transacciones = await Transaccion.findAll({
      where: { user_id: (req as any).user.id },
      include: [
        {
          model: Activo,
          attributes: ["id", "simbolo", "nombre", "coinmarketcap_id"],
        },
      ],
    });
    return res.status(200).json(transacciones);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
