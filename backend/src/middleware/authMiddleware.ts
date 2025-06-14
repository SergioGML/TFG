import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware para verificar el token JWT y agregar el usuario al request
// Si el token es válido, se agrega el usuario al request para que esté disponible en las rutas protegidas
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado. No hay token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
