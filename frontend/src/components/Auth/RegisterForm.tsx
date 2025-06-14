import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import Input from "../Input";
import PwdEye from "../PwdEye";
import { useAuth } from "../../context/AuthContext";

// Componente de formulario de registro
export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  // Expresión regular para validar la contraseña: al menos 6 caracteres, 1 letra y 1 número/símbolo
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/;
  // Maneja el cambio de valor en los campos del formulario
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  // Valida el email ingresado
  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? "" : "Email no válido";
  };
  // Valida la contraseña ingresada
  const validatePassword = (value: string) =>
    pwdRegex.test(value)
      ? ""
      : "La contraseña debe tener 6 caracteres, letra y número";
  // Maneja el blur del campo de nombre
  const handleBlurName = (e: React.FocusEvent<HTMLInputElement>) => {
    setNameError(e.target.value ? "" : "El nombre es obligatorio");
  };
  // Maneja el blur del campo de email
  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailError(validateEmail(e.target.value));
  };
  // Maneja el blur del campo de contraseña
  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordError(validatePassword(e.target.value));
  };
  // Maneja el envío del formulario de registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const nErr = form.name ? "" : "El nombre es obligatorio";
    const mailErr = validateEmail(form.email);
    const passErr = validatePassword(form.password);
    setNameError(nErr);
    setEmailError(mailErr);
    setPasswordError(passErr);
    if (nErr || mailErr || passErr) return;

    setSubmitError("");
    try {
      // 1) Registrar usuario
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

      // 2) Login automático con /api/auth/login
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

      // 3) Guardar token y redirigir
      await login(loginData.token);
      navigate("/country");
    } catch {
      setSubmitError("Error en el servidor");
    }
  };


  return (
    < form onSubmit={handleRegister} className="flex flex-col gap-6" >
      {/* Formulario de registro */}
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
    </form >
  );
}
