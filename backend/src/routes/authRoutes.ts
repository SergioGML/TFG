import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { updateProfile } from "../controllers/authController";
import { deleteProfile } from "../controllers/authController";

const router = Router();

// Registro de usuario
router.post("/register", register);

// Login de usuario
router.post("/login", login);

// Actualizar país del usuario autenticado
router.put("/profile", verifyToken, updateProfile);

// Obtener perfil del usuario autenticado
router.get("/profile", verifyToken, getProfile);

// Borra perfil del usuario autenticado
router.delete("/profile", verifyToken, deleteProfile);

export default router;
