// backend/src/index.ts  (o server.ts, según se llame tu entrypoint)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import activosRoutes from "./routes/activosRoutes";
import transaccionesRoutes from "./routes/transaccionesRoutes";
import alertaRoutes from "./routes/alertaRoutes";
import fiscalidadRoutes from "./routes/fiscalidadRoutes";
import marketDataRoutes from "./routes/marketDataRoutes";
import { sequelize } from "./config/db";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/activos", activosRoutes);
app.use("/api/transacciones", transaccionesRoutes);
app.use("/api/alertas", alertaRoutes);
app.use("/api/fiscalidad", fiscalidadRoutes);

// Nuevo endpoint para market data
app.use("/api/market-data", marketDataRoutes);

// Sincronizar BD y arrancar servidor
sequelize
  .sync()
  .then(() => console.log("✅ Base de datos sincronizada correctamente"))
  .catch((error) =>
    console.error("❌ Error al sincronizar la base de datos:", error)
  );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
