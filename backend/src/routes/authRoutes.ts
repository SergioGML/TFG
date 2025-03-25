import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// Registro de usuario
router.post("/register", register);

// Login de usuario
router.post("/login", login);

// Obtener perfil del usuario autenticado
router.get("/profile", verifyToken, getProfile);

export default router;
