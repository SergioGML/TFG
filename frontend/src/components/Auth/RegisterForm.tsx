import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import Input from "../Input";
import PwdEye from "../PwdEye";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const pwdRegex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? "" : "Email no válido";
  };

  const validatePassword = (value: string) =>
    pwdRegex.test(value)
      ? ""
      : "La contraseña debe tener 6 caracteres, letra y número";

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
      // Registro
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
      // Login automático tras registro
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
    <form onSubmit={handleRegister} className="flex flex-col gap-6">
      <Input
        type="text"
        placeholder="Tu nombre"
        icon={< UserIcon className="w-5 h-5 text-gray-400" />}
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        onBlur={handleBlurName}
        error={nameError}
        required
      />

      <Input
        type="email"
        placeholder="Tu email"
        icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={handleBlurEmail}
        error={emailError}
        required
      />

      <PwdEye
        placeholder="Escoge tu contraseña"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        onBlur={handleBlurPassword}
        error={passwordError}
      />

      {
        submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )
      }

      <div className="flex flex-col items-center gap-2">
        <Button
          text="Crear cuenta"
          icon={<SparklesIcon className="w-5 h-5" />}
          type="submit"
        />
      </div>

      <p className="text-center mt-2text-sm">
        <Link
          to="/login"
          className="text-rose-500 hover:underline dark:text-yellow-300 dark:hover:text-yellow-200 text-[1.1rem]"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </p>
    </form >
  );
}
