import { Router } from "express";
import {
  register,
  login,
  getProfile,
  deleteProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

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

// Olvidé contraseña: comprueba email
router.post("/forgot-password", forgotPassword);

// Resetear contraseña: actualiza contraseña
router.post("/reset-password", resetPassword);

export default router;
