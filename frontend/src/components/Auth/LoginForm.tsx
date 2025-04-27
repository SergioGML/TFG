import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  KeyIcon,
  UserIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import Input from "../Input";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
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

  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailError(validateEmail(e.target.value));
  };

  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordError(e.target.value ? "" : "La contraseña es obligatoria");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // validaciones previas
    const mailErr = validateEmail(form.email);
    const passErr = form.password ? "" : "La contraseña es obligatoria";
    setEmailError(mailErr);
    setPasswordError(passErr);
    if (mailErr || passErr) return;

    setSubmitError("");
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
        <Input
          type="password"
          placeholder="Contraseña"
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
            text="Login"
            icon={<ArrowRightCircleIcon className="w-5 h-5" />}
            type="submit"
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
