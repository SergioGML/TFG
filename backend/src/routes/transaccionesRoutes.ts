import { Router } from "express";
import { check } from "express-validator";
import { registrarTransaccion, obtenerTransacciones } from "../controllers/transaccionesController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// Registrar una nueva transacción
router.post(
  "/nueva",
  verifyToken, // Protege la ruta con autenticación
  [
    check("activo_id").isInt().withMessage("El activo_id debe ser un número entero"),
    check("tipo_operacion")
      .isIn(["compra", "venta"])
      .withMessage("El tipo de operación debe ser 'compra' o 'venta'"),
    check("cantidad_invertida")
      .isNumeric()
      .optional()
      .withMessage("La cantidad invertida debe ser un número"),
    check("cantidad_comprada")
      .isNumeric()
      .optional()
      .withMessage("La cantidad comprada debe ser un número"),
    check("precio_compra")
      .isNumeric()
      .optional()
      .withMessage("El precio de compra debe ser un número"),
    check("cantidad_obtenida")
      .isNumeric()
      .optional()
      .withMessage("La cantidad obtenida debe ser un número"),
    check("cantidad_vendida")
      .isNumeric()
      .optional()
      .withMessage("La cantidad vendida debe ser un número"),
    check("precio_venta")
      .isNumeric()
      .optional()
      .withMessage("El precio de venta debe ser un número"),
  ],
  registrarTransaccion
);

// Obtener todas las transacciones de un usuario autenticado
router.get("/", verifyToken, obtenerTransacciones);

export default router;
