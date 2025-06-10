import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  listarTopActivos,
  buscarActivos,
  listarActivos,
  agregarActivo,
  obtenerPrecio,
} from "../controllers/activosController";

const router = Router();

router.get("/top", listarTopActivos);
router.get("/search", buscarActivos);
router.get("/", listarActivos);
router.post("/nuevo", verifyToken, agregarActivo);
router.get("/precio/:simbolo", obtenerPrecio);

export default router;
