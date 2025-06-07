import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { obtenerTramosFiscales } from "../controllers/fiscalidadController";

const router = Router();
router.get("/", verifyToken, obtenerTramosFiscales);

export default router;
