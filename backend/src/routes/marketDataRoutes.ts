import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getMarketData } from "../controllers/marketDataController";

const router = Router();
// Rutas para manejar datos del mercado financiero
// Obtener datos del mercado financiero
router.get("/", verifyToken, getMarketData);

export default router;
