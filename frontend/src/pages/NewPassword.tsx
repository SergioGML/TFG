import { useState } from "react";
import { Link } from "react-router-dom";
import {
  KeyIcon,
  ChevronDoubleLeftIcon,
  CheckBadgeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";

export default function NewPassword() {
  const [form, setForm] = useState({ password: "", repeatPassword: "" });
  const [passwordError, setPasswordError] = useState("");
  const [repeatError, setRepeatError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordError(
      e.target.value.length >= 6
        ? ""
        : "La contraseña debe tener al menos 6 caracteres"
    );
  };
  const handleBlurRepeat = (e: React.FocusEvent<HTMLInputElement>) => {
    setRepeatError(
      e.target.value === form.password ? "" : "Las contraseñas no coinciden"
    );
  };

  return (
    <Modal>
      <form className="flex flex-col gap-4">
        <h2 className="mb-4 text-violet-800 dark:text-white text-2xl font-semibold text-center">
          Restablece tu contraseña
        </h2>

        <Input
          type="password"
          placeholder="Nueva Contraseña"
          icon={<KeyIcon className="w-5 h-5" />}
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={handleBlurPassword}
          error={passwordError}
          required
        />

        <Input
          type="password"
          placeholder="Repite la contraseña"
          icon={<LockClosedIcon className="w-5 h-5" />}
          value={form.repeatPassword}
          onChange={(e) => handleChange("repeatPassword", e.target.value)}
          onBlur={handleBlurRepeat}
          error={repeatError}
          required
        />

        <div className="flex flex-col items-center gap-2">
          <Button
            text="Cambiar Contraseña"
            icon={<CheckBadgeIcon className="w-5 h-5" />}
            type="submit"
          />
        </div>

        <p className="mt-2 text-center text-sm">
          <Link
            to={"/"}
            className="text-rose-500 hover:underline dark:text-yellow-300 dark:hover:text-yellow-200 text-[1.1rem]"
          >
            <ChevronDoubleLeftIcon className="w-4 h-4 inline-block" />
            <span>Volver</span>
          </Link>
        </p>
      </form>
    </Modal>
  );
}
