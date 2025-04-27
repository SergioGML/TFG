import { ReactElement } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
