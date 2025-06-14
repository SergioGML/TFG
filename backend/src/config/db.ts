import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/Usuario";
import { Activo } from "../models/Activo";
import { Transaccion } from "../models/Transacciones";
import { Pais } from "../models/Pais";
import { TramoFiscal } from "../models/TramoFiscal";

dotenv.config();
// Me aseguro de que las variables de entorno están definidas
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  logging: false,
  models: [User, Activo, Transaccion, Pais, TramoFiscal],
});
