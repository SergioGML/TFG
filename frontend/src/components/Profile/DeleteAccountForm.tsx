// DeleteAccountForm.tsx
import React from "react";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props { onClose: () => void; }

const DeleteAccountForm: React.FC<Props> = ({ onClose }) => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/auth/profile",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success(data.message);
            logout();
            navigate("/");
        } catch (err: any) {
            toast.error(err.message || "Error al eliminar la cuenta");
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-red-600">
                ¡Atención!
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300">
                ¿Estás seguro de que quieres <strong>eliminar tu cuenta</strong>?<br />
                Esta acción es irreversible.
            </p>

            <div className="flex justify-center gap-4">
                <Button text="Cancelar" variant="default" onClick={onClose} />
                <Button text="Eliminar cuenta" variant="danger" onClick={handleDelete} />
            </div>
        </div>
    );
};

export default DeleteAccountForm;
