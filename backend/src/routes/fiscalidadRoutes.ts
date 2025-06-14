import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { obtenerTramosFiscales } from "../controllers/fiscalidadController";

const router = Router();
// Rutas para manejar tramos fiscales
// Obtener los tramos fiscales del usuario autenticado
router.get("/", verifyToken, obtenerTramosFiscales);

export default router;
