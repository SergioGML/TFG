import { useState } from "react";
import {
  EnvelopeIcon,
  KeyIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? "" : "Email no válido";
  };
  const validatePassword = (value: string) =>
    value.length >= 8 ? "" : "La contraseña debe tener al menos 8 caracteres";

  const handleBlurName = (e: React.FocusEvent<HTMLInputElement>) => {
    setNameError(e.target.value ? "" : "El nombre es obligatorio");
  };
  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailError(validateEmail(e.target.value));
  };
  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordError(validatePassword(e.target.value));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // validaciones previas
    const nErr = form.name ? "" : "El nombre es obligatorio";
    const mailErr = validateEmail(form.email);
    const passErr = validatePassword(form.password);
    setNameError(nErr);
    setEmailError(mailErr);
    setPasswordError(passErr);
    if (nErr || mailErr || passErr) return;

    setSubmitError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || "Error en el registro");
        return;
      }
      // login automático
      const loginRes = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setSubmitError(
          loginData.message || "Error al iniciar sesión automáticamente"
        );
        return;
      }
      await login(loginData.token);
      navigate("/country");
    } catch {
      setSubmitError("Error en el servidor");
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
        onBlur={handleBlurName}
        error={nameError}
        required
      />
      <Input
        type="email"
        placeholder="Tu email"
        icon={<EnvelopeIcon className="w-5 h-5" />}
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={handleBlurEmail}
        error={emailError}
        required
      />
      <Input
        type="password"
        placeholder="Escoge tu contraseña"
        icon={<KeyIcon className="w-5 h-5" />}
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        onBlur={handleBlurPassword}
        error={passwordError}
        required
      />
      {submitError && (
        <p className="text-red-500 text-sm text-center">{submitError}</p>
      )}
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
