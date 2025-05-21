// backend/src/routes/transaccionesRoutes.ts
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
    check("cantidad_invertida").isNumeric().optional(),
    check("cantidad_comprada").isNumeric().optional(),
    check("precio_compra").isNumeric().optional(),
    check("cantidad_obtenida").isNumeric().optional(),
    check("cantidad_vendida").isNumeric().optional(),
    check("precio_venta").isNumeric().optional(),
    // Para creación automática
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
