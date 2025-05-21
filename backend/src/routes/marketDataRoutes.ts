// src/routes/marketDataRoutes.ts
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getMarketData } from "../controllers/marketDataController";

const router = Router();

/**
 * GET /api/market-data?symbols=BTC,ETH...
 * Devuelve { BTC: {...}, ETH: {...}, ... }
 */
router.get("/", verifyToken, getMarketData);

export default router;
