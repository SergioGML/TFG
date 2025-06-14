import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactElement;
}

//Ruta privada que solo permite el acceso a usuarios autenticados
export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }
  // Si el usuario no está autenticado, redirige a la página de login
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
