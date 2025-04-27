import { useState } from "react";
import { Link } from "react-router-dom";
import {
  KeyIcon,
  UserIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import Input from "../Input";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Credenciales inválidas");
        return;
      }

      await login(data.token);
      navigate("/dashboard");
    } catch {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Usuario"
          icon={<UserIcon className="w-5 h-5" />}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          icon={<KeyIcon className="w-5 h-5" />}
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex flex-col items-center gap-2">
          <Button
            text="Login"
            icon={<ArrowRightCircleIcon className="w-5 h-5" />}
          />
        </div>
      </form>

      <p className="text-center mt-5 text-sm">
        <Link
          to="/NewPassword"
          className="text-rose-500 hover:underline dark:text-yellow-300 dark:hover:text-yellow-200 text-[1.1rem]"
        >
          ¿Has olvidado tu contraseña?
        </Link>
      </p>
    </>
  );
}
