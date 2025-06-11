import { Router } from "express";
import { check } from "express-validator";
import {
  registrarTransaccion,
  obtenerTransacciones,
} from "../controllers/transaccionesController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/nueva",
  verifyToken,
  [
    check("activo_id")
      .isInt()
      .withMessage("El activo_id debe ser un número entero"),
    check("tipo_operacion")
      .isIn(["compra", "venta"])
      .withMessage("El tipo de operación debe ser 'compra' o 'venta'"),
    check("cantidad_invertida").optional().isNumeric(),
    check("cantidad_comprada").optional().isNumeric(),
    check("precio_compra").optional().isNumeric(),
    check("cantidad_vendida").optional().isNumeric(),
    check("precio_venta").optional().isNumeric(),
    // Para creación automática del activo
    check("simbolo")
      .optional()
      .isString()
      .withMessage("El símbolo debe ser texto"),
    check("nombre")
      .optional()
      .isString()
      .withMessage("El nombre debe ser texto"),
  ],
  registrarTransaccion
);

router.get("/", verifyToken, obtenerTransacciones);

export default router;
