import React, { useState } from "react";
import PwdEye from "../PwdEye";
import Input from "../Input";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
}

const EmailEditForm: React.FC<Props> = ({ onClose }) => {
  const { token, login } = useAuth();
  const [currentPwd, setCurrentPwd] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errPwd, setErrPwd] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const handleSave = async () => {
    if (!currentPwd) {
      setErrPwd("Obligatorio");
      return;
    }
    setErrPwd("");

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(newEmail)) {
      setErrEmail("Email no válido");
      return;
    }
    setErrEmail("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail, password: currentPwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      await login(token!);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar email");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-center">Cambiar email</h2>
      <p className="text-center text-gray-500">
        Introduce tu contraseña actual y el nuevo email.
      </p>

      <PwdEye
        value={currentPwd}
        onChange={(e) => setCurrentPwd(e.target.value)}
        onBlur={() => !currentPwd && setErrPwd("Obligatorio")}
        error={errPwd}
        placeholder="Contraseña actual"
      />

      <Input
        type="email"
        placeholder="Nuevo email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        onBlur={() => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          !re.test(newEmail) ? setErrEmail("Email no válido") : setErrEmail("");
        }}
        error={errEmail}
        required
      />

      <div className="flex justify-center gap-2">
        <Button text="Cancelar" variant="default" onClick={onClose} />
        <Button text="Guardar email" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EmailEditForm;
