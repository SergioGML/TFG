import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import Input from "../Input";
import PwdEye from "../PwdEye";
import { useAuth } from "../../context/AuthContext";

// Componente de formulario de inicio de sesión
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Al menos 6 caracteres, 1 letra y 1 número/símbolo
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/;

  const handleChange = (field: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  // Validación de email
  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? "" : "Email no válido";
  };
  // Manejo del blur para validar email
  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailError(validateEmail(e.target.value));
  };
  // Manejo del blur para validar contraseña
  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPasswordError(
      pwdRegex.test(v)
        ? ""
        : "Contraseña Incorrecta"
    );
  };
  // Manejo del envío del formulario
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones antes de enviar
    const mailErr = validateEmail(form.email);
    const passErr = pwdRegex.test(form.password)
      ? ""
      : "Contraseña Incorrecta";

    setEmailError(mailErr);
    setPasswordError(passErr);
    if (mailErr || passErr) return;

    setSubmitError("");
    //Manejo de errores de envío
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || "Credenciales inválidas");
        return;
      }
      await login(data.token);
      navigate("/dashboard");
    } catch {
      setSubmitError("Error al iniciar sesión");
    }
  };

  return (
    <>
      {/* Título del formulario de inicio de sesión */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          icon={<UserIcon className="w-5 h-5" />}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={handleBlurEmail}
          error={emailError}
          required
        />

        <PwdEye
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={handleBlurPassword}
          error={passwordError}
          placeholder="Contraseña"
        />

        {submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )}

        <div className="flex flex-col items-center gap-2">
          <Button
            text="Login"
            icon={<ArrowRightCircleIcon className="w-5 h-5" />}
            type="submit"
          />
        </div>
      </form>

      <p className="text-center mt-5 text-sm">
        <Link
          to="/NewPassword"
          className="text-red-500 hover:underline dark:text-yellow-300 dark:hover:text-yellow-200 text-[1.1rem]"
        >
          ¿Has olvidado tu contraseña?
        </Link>
      </p>
    </>
  );
}
