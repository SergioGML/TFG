import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getMarketData } from "../controllers/marketDataController";

const router = Router();

router.get("/", verifyToken, getMarketData);

export default router;
