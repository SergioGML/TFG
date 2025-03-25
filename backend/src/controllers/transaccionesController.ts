import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Transaccion } from "../models/Transacciones";
import { Activo } from "../models/Activo";

export const registrarTransaccion = async (req: Request, res: Response) => {
  // Validar errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const { activo_id, tipo_operacion, cantidad_invertida, cantidad_comprada, precio_compra, cantidad_obtenida, cantidad_vendida, precio_venta } = req.body;

    // Verificar que el activo existe
    const activo = await Activo.findByPk(activo_id);
    if (!activo) {
      return res.status(404).json({ msg: "El activo no existe" });
    }

    // Crear la transacción
    const nuevaTransaccion = await Transaccion.create({
      user_id: (req as any).user.id, // Tomar el ID del usuario autenticado
      activo_id,
      tipo_operacion,
      cantidad_invertida,
      cantidad_comprada,
      precio_compra,
      cantidad_obtenida,
      cantidad_vendida,
      precio_venta,
    });

    res.status(201).json({ msg: "Transacción registrada", transaccion: nuevaTransaccion });
  } catch (error) {
    console.error("Error al registrar transacción:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const obtenerTransacciones = async (req: Request, res: Response) => {
  try {
    const transacciones = await Transaccion.findAll({
      where: { user_id: (req as any).user.id },
    });

    res.status(200).json(transacciones);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

