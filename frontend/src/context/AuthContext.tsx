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
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token]);

  //TEMPORAL
  useEffect(() => {
    console.log("Usuario actual:", user);
  }, [user]);

  const fetchProfile = async (jwt: string) => {
    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!res.ok) throw new Error("No autorizado");

    const userData = await res.json();
    setUser(userData);
  };

  const login = async (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    await fetchProfile(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
