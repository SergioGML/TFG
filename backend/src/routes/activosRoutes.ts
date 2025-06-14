import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  listarTopActivos,
  buscarActivos,
  listarActivos,
  agregarActivo,
  obtenerPrecio,
} from "../controllers/activosController";

// Rutas para manejar activos financieros
const router = Router();
// Obtener los activos más populares
router.get("/top", listarTopActivos);
// Buscar activos por nombre o símbolo
router.get("/search", buscarActivos);
// Listar todos los activos
router.get("/", listarActivos);
// Agregar un nuevo activo
router.post("/nuevo", verifyToken, agregarActivo);
// Obtener el precio actual de un activo por su símbolo
router.get("/precio/:simbolo", obtenerPrecio);

export default router;
