import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
}

const NameEditForm: React.FC<Props> = ({ onClose }) => {
  const { token, login } = useAuth();
  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");

  const handleSave = async () => {

    if (!name.trim()) {
      setErrName("Obligatorio");
      return;
    }
    setErrName("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      // Refrescar perfil
      await login(token!);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar nombre");
    }
  };

  return (
    <div className="flex flex-col gap-8">    
      <h2 className="text-2xl font-bold text-center">Cambia tu nombre</h2>
      <p className="text-center text-gray-500">
        Introduce tu nuevo nombre.
      </p>
      <Input
        type="text"
        placeholder="Nuevo nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() =>
          !name.trim() ? setErrName("Obligatorio") : setErrName("")
        }
        error={errName}
        required
      />
      <div className="flex justify-center gap-2">
        <Button text="Cancelar" variant="default" onClick={onClose} />
        <Button text="Guardar nombre" onClick={handleSave} />
      </div>
    </div>
  );
};

export default NameEditForm;
