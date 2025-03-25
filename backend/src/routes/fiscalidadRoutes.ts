import { Router } from "express";
import { obtenerTramosFiscales } from "../controllers/fiscalidadController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// Ruta para obtener los tramos fiscales del usuario autenticado
router.get("/tramos", verifyToken, obtenerTramosFiscales);

export default router;
