import { Router } from "express";
import { listarActivos, agregarActivo, obtenerPrecio } from "../controllers/activosController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", listarActivos);
router.post("/nuevo", verifyToken, agregarActivo);
router.get("/precio/:simbolo", obtenerPrecio); // Ruta para obtener precio

export default router;