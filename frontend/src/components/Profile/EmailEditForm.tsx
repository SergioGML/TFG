import React, { useState } from "react";
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
    
    if (!currentPwd) return setErrPwd("Obligatorio");
    setErrPwd("");
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(newEmail)) return setErrEmail("Email no válido");
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
    <div className="space-y-4">
      <Input
        type="password"
        placeholder="Contraseña actual"
        value={currentPwd}
        onChange={(e) => setCurrentPwd(e.target.value)}
        onBlur={() => !currentPwd && setErrPwd("Obligatorio")}
        error={errPwd}
        required
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
      <div className="flex justify-end">
        <Button text="Guardar email" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EmailEditForm;
