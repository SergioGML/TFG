import { Request } from "express";

export interface AuthRequest extends Request {
  user?: any; // Cambiar "any" por el tipo de datos correcto si lo conoces (ejemplo: { id: number })
}
