import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
