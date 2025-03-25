import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User"; 
import { GestionFiscal } from "../models/GestionFiscal";
import { Activo } from "../models/Activo";
import { Transaccion } from "../models/Transacciones";
import { Alerta } from "../models/Alerta";
import { Pais } from "../models/Pais";  
import { TramoFiscal } from "../models/TramoFiscal";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  logging: false,
  models: [User, GestionFiscal, Activo, Transaccion, Alerta, Pais, TramoFiscal], 
});
