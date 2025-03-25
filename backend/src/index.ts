import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import transaccionesRoutes from "./routes/transaccionesRoutes";
import activosRoutes from "./routes/activosRoutes";
import { sequelize } from "./config/db";
import alertaRoutes from "./routes/alertaRoutes";
import fiscalidadRoutes from "./routes/fiscalidadRoutes";




dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/activos", activosRoutes);
app.use("/api/transacciones", transaccionesRoutes);
app.use("/api/alertas", alertaRoutes);
app.use("/api/fiscalidad", fiscalidadRoutes);

// Sincronizar base de datos
sequelize.sync()
  .then(() => console.log("✅ Base de datos sincronizada correctamente"))
  .catch((error) => console.error("❌ Error al sincronizar la base de datos:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
