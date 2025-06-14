import { Request } from "express";
// Extender la interfaz Request de Express para incluir un campo user que puede ser utilizado para almacenar información del usuario autenticado
export interface AuthRequest extends Request {
  user?: any;
}
