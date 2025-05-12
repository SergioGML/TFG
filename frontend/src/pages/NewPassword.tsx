// src/pages/NewPassword.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDoubleLeftIcon,
  PaperAirplaneIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import PwdEye from "../components/PwdEye";
import { toast } from "react-toastify";

const EMAIL = "email";
const RESET = "reset";

export default function NewPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<typeof EMAIL | typeof RESET>(EMAIL);

  // Paso EMAIL
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Paso RESET
  const [newPwd, setNewPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [repeatError, setRepeatError] = useState("");

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Email no válido";

  // --- Paso 1: comprobar email ---
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.message || "Error al comprobar el email");
        return;
      }
      toast.success(data.message);
      setStep(RESET);
    } catch {
      setEmailError("Error de red");
    }
  };

  // --- Paso 2: resetear contraseña ---
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPwd.length < 6) {
      setPwdError("Debe tener al menos 6 caracteres");
      return;
    }
    setPwdError("");

    if (repeatPwd !== newPwd) {
      setRepeatError("No coinciden");
      return;
    }
    setRepeatError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword: newPwd }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPwdError(data.message || "Error al restablecer contraseña");
        return;
      }
      toast.success(data.message);
      navigate("/");
    } catch {
      setPwdError("Error de red");
    }
  };

  const isEmailStep = step === EMAIL;

  return (
    <Modal>
      <form
        onSubmit={isEmailStep ? handleSendEmail : handleReset}
        className="flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isEmailStep
            ? "¿Has olvidado tu contraseña?"
            : "Restablece tu contraseña"}
        </h2>

        <p className="text-center mb-4">
          {isEmailStep
            ? "Introduce tu email y si existe podrás cambiar la contraseña."
            : "Introduce tu nueva contraseña."}
        </p>

        {isEmailStep ? (
          <Input
            type="email"
            placeholder="Introduce tu email"
            icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            error={emailError}
            required
          />
        ) : (
          <>
            <PwdEye
              placeholder="Nueva contraseña"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              onBlur={() =>
                setPwdError(
                  newPwd.length >= 6
                    ? ""
                    : "Debe tener al menos 6 caracteres"
                )
              }
              error={pwdError}
            />
            <PwdEye
              placeholder="Repite contraseña"
              value={repeatPwd}
              onChange={(e) => setRepeatPwd(e.target.value)}
              onBlur={() =>
                setRepeatError(
                  repeatPwd === newPwd ? "" : "No coinciden"
                )
              }
              error={repeatError}
            />
          </>
        )}

        <div className="flex flex-col items-center gap-2">
          <Button
            text={isEmailStep ? "Comprobar email" : "Cambiar contraseña"}
            icon={
              isEmailStep ? (
                <PaperAirplaneIcon className="w-5 h-5" />
              ) : (
                <CheckBadgeIcon className="w-5 h-5" />
              )
            }
            type="submit"
          />
        </div>

        <p className="text-center text-base mt-2">
          <Link
            to="/"
            className="text-rose-500 hover:underline dark:text-yellow-300"
          >
            <ChevronDoubleLeftIcon className="w-4 h-4 inline-block mr-1" />
            Volver al Login
          </Link>
        </p>
      </form>
    </Modal>
  );
}
