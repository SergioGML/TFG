import { Router } from "express";
import { obtenerAlertas, crearAlerta, eliminarAlerta } from "../controllers/alertasController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, obtenerAlertas);
router.post("/nueva", verifyToken, crearAlerta);
router.delete("/:id", verifyToken, eliminarAlerta);

export default router;
