import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Proveedor de autenticación que maneja el estado del usuario */}
      <AuthProvider>
        {/* Componente principal de la aplicación que contiene las rutas y lógica */}
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          pauseOnHover={false}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);