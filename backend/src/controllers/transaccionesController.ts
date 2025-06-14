import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Transaccion } from "../models/Transacciones";
import { Activo } from "../models/Activo";
import { Op } from "sequelize";

// Obtener todas las transacciones del usuario autenticado
export const obtenerTransacciones = async (req: Request, res: Response) => {
  try {
    //Transacciones del usuario autenticado
    const transacciones = await Transaccion.findAll({
      where: { user_id: (req as any).user.id },
      include: [{ model: Activo }],
      order: [["fecha_transaccion", "DESC"]],
    });

    return res.status(200).json({ transacciones });
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    return res.status(500).json({ msg: "Error al obtener transacciones" });
  }
};

// Registrar una nueva transacción (compra o venta)
export const registrarTransaccion = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  //Si hay errores de validación, devolverlos
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const {
      activo_id,
      simbolo,
      nombre,
      tipo_operacion,
      cantidad_invertida,
      cantidad_comprada,
      precio_compra,
      cantidad_vendida,
      precio_venta,
    } = req.body;
    // Validar campos obligatorios
    if (!["compra", "venta"].includes(tipo_operacion)) {
      return res
        .status(400)
        .json({ msg: "tipo_operacion debe ser 'compra' o 'venta'" });
    }
    // Validar que al menos uno de los campos activo_id, simbolo o nombre esté presente
    if (tipo_operacion === "compra") {
      if (
        cantidad_invertida == null ||
        cantidad_comprada == null ||
        precio_compra == null
      ) {
        // Si es una compra, validar que se envíen los campos obligatorios
        return res.status(400).json({
          msg: "Faltan campos obligatorios para una operación de compra: cantidad_invertida, cantidad_comprada, precio_compra",
        });
      }
    }
    // Validar que si es una venta, se envíen los campos obligatorios
    if (tipo_operacion === "venta") {
      if (cantidad_vendida == null || precio_venta == null) {
        return res.status(400).json({
          msg: "Faltan campos obligatorios para una operación de venta: cantidad_vendida, precio_venta",
        });
      }
    }

    // Buscar el activo por CoinMarketCap ID o símbolo
    let activo = await Activo.findOne({
      // Buscar activo por ID o símbolo
      where: {
        [Op.or]: [{ coinmarketcap_id: activo_id }, { simbolo }],
      },
    });

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
    // Validar que el activo pertenece al usuario autenticado
    let precio_promedio_compra: number | undefined = undefined;
    let ratio_beneficio: number | undefined = undefined;
    // Si es una compra, calcular el precio promedio de compra y el ratio de beneficio
    if (tipo_operacion === "venta") {
      const compras = await Transaccion.findAll({
        where: {
          user_id: (req as any).user.id,
          activo_id: activo.id,
          tipo_operacion: "compra",
          cantidad_comprada: { [Op.not]: null },
          precio_compra: { [Op.not]: null },
        },
      });
      // Si no hay compras previas, no se puede calcular el precio promedio ni el ratio
      const totalComprado = compras.reduce(
        (acc, t) => acc + Number(t.cantidad_comprada),
        0
      );
      const totalInvertido = compras.reduce(
        (acc, t) => acc + Number(t.cantidad_comprada) * Number(t.precio_compra),
        0
      );

      if (totalComprado > 0) {
        precio_promedio_compra = totalInvertido / totalComprado;
        ratio_beneficio =
          (Number(precio_venta) - precio_promedio_compra) /
          precio_promedio_compra;
      }
    }
    // Crear la nueva transacción
    const nuevaTransaccion = await Transaccion.create({
      user_id: (req as any).user.id,
      activo_id: activo.id,
      tipo_operacion,
      cantidad_invertida,
      cantidad_comprada,
      precio_compra,
      cantidad_vendida,
      precio_venta,
      precio_promedio_compra,
      ratio_beneficio,
    });
    //Mensaje de éxito
    return res
      .status(201)
      .json({ msg: "Transacción registrada", transaccion: nuevaTransaccion });
  } catch (error) {
    console.error("Error al registrar transacción:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};
