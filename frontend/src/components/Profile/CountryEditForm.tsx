// src/components/Profile/CountryEditForm.tsx
import React, { useState } from "react";
import ChooseMenu from "../ChooseMenu";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface Props {
    onClose: () => void;
}

const CountryEditForm: React.FC<Props> = ({ onClose }) => {
    const { user, token, login } = useAuth();
    const [country, setCountry] = useState<string>(
        user?.pais_id?.toString() || ""
    );
    const [error, setError] = useState<string>("");

    const items = [
        { label: "España", value: "1" },
        { label: "Andorra", value: "2" },
    ];

    const handleSave = async () => {
        if (!country) {
            setError("Selecciona un país");
            return;
        }
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ pais_id: parseInt(country, 10) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success(data.message);
            // refrescar perfil
            await login(token!);
            onClose();
        } catch (err: any) {
            toast.error(err.message || "Error al actualizar país");
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Cambiar país</h2>
            <p className="text-center text-gray-500">
                Selecciona tu país de residencia.
            </p>

            <ChooseMenu
                items={items}
                selectedItem={country}
                onSelect={(val) => {
                    setCountry(val);
                    setError("");
                }}
                placeholder="Selecciona un país"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-center gap-4">
                <Button text="Cancelar" variant="default" onClick={onClose} />
                <Button text="Guardar país" onClick={handleSave} />
            </div>
        </div>
    );
};

export default CountryEditForm;
