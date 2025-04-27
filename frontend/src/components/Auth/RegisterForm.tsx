import { useState } from "react";
import {
  EnvelopeIcon,
  KeyIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import Input from "../Input";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    console.log("prueba");

    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error en el registro");
        return;
      }

      // Login automático
      const loginRes = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setError(
          loginData.message || "Error al iniciar sesión automáticamente"
        );
        return;
      }

      await login(loginData.token);
      navigate("/country");
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Tu nombre"
        icon={<UserIcon className="w-5 h-5" />}
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        type="email"
        placeholder="Tu email"
        icon={<EnvelopeIcon className="w-5 h-5" />}
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <Input
        type="password"
        placeholder="Escoge tu contraseña"
        icon={<KeyIcon className="w-5 h-5" />}
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="flex flex-col items-center gap-2">
        <Button
          text="Crear cuenta"
          icon={<SparklesIcon className="w-5 h-5" />}
          type="submit"
        />
      </div>
    </form>
  );
}
