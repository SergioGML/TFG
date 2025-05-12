import React, { useState } from "react";
import PwdEye from "../PwdEye";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface Props { onClose: () => void; }

const PwdEditForm: React.FC<Props> = ({ onClose }) => {
  const { token, login } = useAuth();
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [errCurrent, setErrCurrent] = useState("");
  const [errNew, setErrNew] = useState("");
  const [errRepeat, setErrRepeat] = useState("");

  const handleSave = async () => {
    // validaciones
    if (!currentPwd) {
      setErrCurrent("Obligatorio");
      return;
    }
    setErrCurrent("");

    if (newPwd.length < 6) {
      setErrNew("Debe tener al menos 6 caracteres");
      return;
    }
    if (!/[A-Za-z]/.test(newPwd) || !/[0-9\W]/.test(newPwd)) {
      setErrNew("Debe incluir al menos una letra y un número/símbolo");
      return;
    }
    setErrNew("");

    if (repeatPwd !== newPwd) {
      setErrRepeat("No coinciden");
      return;
    }
    setErrRepeat("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword: currentPwd, newPassword: newPwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      await login(token!);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar contraseña");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center">Cambia tu contraseña</h2>
      <PwdEye
        value={currentPwd}
        onChange={(e) => setCurrentPwd(e.target.value)}
        onBlur={() => !currentPwd && setErrCurrent("Obligatorio")}
        error={errCurrent}
        placeholder="Contraseña actual"
      />
      <PwdEye
        value={newPwd}
        onChange={(e) => setNewPwd(e.target.value)}
        onBlur={() => {
          if (newPwd.length < 6) setErrNew("Debe tener al menos 6 caracteres");
          else if (!/[A-Za-z]/.test(newPwd) || !/[0-9\W]/.test(newPwd))
            setErrNew("Debe incluir al menos una letra y un número/símbolo");
          else setErrNew("");
        }}
        error={errNew}
        placeholder="Nueva contraseña"
      />
      <PwdEye

        value={repeatPwd}
        onChange={(e) => setRepeatPwd(e.target.value)}
        onBlur={() =>
          repeatPwd !== newPwd
            ? setErrRepeat("No coinciden")
            : setErrRepeat("")
        }
        error={errRepeat}
        placeholder="Repite contraseña"
      />
      <div className="flex justify-center gap-4">
        <Button text="Cancelar" variant="default" onClick={onClose} />
        <Button text="Guardar contraseña" onClick={handleSave} />
      </div>
    </div>
  );
};

export default PwdEditForm;
