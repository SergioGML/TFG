import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  pais_id: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto de autenticación. Sirve para manejar el estado de autenticación del usuario
export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        // Verificar el token y obtener el perfil del usuario
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("No autorizado");
        }
        const userData = await res.json();
        setUser(userData);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);
  // Si hay token, intenta cargar el perfil del usuario
  // Si no hay token, limpia el estado de usuario
  const login = async (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error("Error al recuperar perfil");
      const userData = await res.json();
      setUser(userData);
    } catch {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      throw new Error("No se pudo recuperar el perfil tras login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// Proporciona el contexto de autenticación a los componentes hijos
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
