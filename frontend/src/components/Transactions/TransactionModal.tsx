// frontend/src/components/Transactions/TransactionModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Resume from "../Dashboard/Resume/Resume";
import type { Active } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/api";

interface TransactionModalProps {
    activo: Active;           // activo.id === coinmarketcap_id
    onSuccess: () => void;
    onClose: () => void;
}

export default function TransactionModal({
    activo,
    onSuccess,
    onClose,
}: TransactionModalProps) {
    const { token } = useAuth();
    const [tipo, setTipo] = useState<"compra" | "venta">("compra");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [error, setError] = useState<string | null>(null);

    const total = parseFloat(cantidad) * parseFloat(precio) || 0;

    const handleSubmit = async () => {
        setError(null);
        const cantidadNum = parseFloat(cantidad);
        const precioNum = parseFloat(precio);
        if (isNaN(cantidadNum) || isNaN(precioNum)) {
            setError("Introduce valores numéricos válidos");
            return;
        }

        // Payload incluyendo simbolo y nombre
        const payload: any = {
            activo_id: activo.id,         // coinmarketcap_id
            simbolo: activo.simbolo,      // para poder crear el activo si no existe
            nombre: activo.nombre,        // idem
            tipo_operacion: tipo,
            ...(tipo === "compra" && {
                cantidad_comprada: cantidadNum,
                precio_compra: precioNum,
                cantidad_invertida: cantidadNum * precioNum,
            }),
            ...(tipo === "venta" && {
                cantidad_vendida: cantidadNum,
                precio_venta: precioNum,
                cantidad_obtenida: cantidadNum * precioNum,
            }),
        };

        try {
            const res = await fetch(`${API_URL}/transacciones/nueva`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                const msg =
                    body?.errores?.map((e: any) => e.msg).join(", ") ||
                    body?.msg ||
                    "Error al registrar transacción";
                throw new Error(msg);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Modal>
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-2">
                    Agregar transacción{" "}
                    <span className="text-gray-500 text-base">
                        — {activo.nombre} ({activo.simbolo})
                    </span>
                </h2>
                <div className="flex border-b mb-4">
                    {(["compra", "venta"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTipo(t)}
                            className={`flex-1 py-2 text-center ${tipo === t
                                    ? "border-b-2 border-rose-400 font-semibold"
                                    : "text-gray-500"
                                }`}
                        >
                            {t === "compra" ? "Comprar" : "Vender"}
                        </button>
                    ))}
                </div>
                <div className="mt-4 space-y-3">
                    <Input
                        type="text"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Precio por unidad"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4">
                    <Resume amount={total} />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-6 flex justify-end">
                    <Button text="Agregar transacción" onClick={handleSubmit} />
                </div>
            </div>
        </Modal>
    );
}
