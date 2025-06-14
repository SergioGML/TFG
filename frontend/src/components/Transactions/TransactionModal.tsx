// frontend/src/components/Transactions/TransactionModal.tsx
import React, { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Resume from "../Dashboard/Resume";
import type { Active } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/api";

interface TransactionModalProps {
    activo: Active;
    onSuccess: () => void;
    onClose: () => void;
}

// Componente para agregar una transacción de compra o venta de un activo
export default function TransactionModal({ activo, onSuccess, onClose }: TransactionModalProps) {
    const { token } = useAuth();
    const [tipo, setTipo] = useState<"compra" | "venta">("compra");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [error, setError] = useState<string | null>(null);
    //Parsea la cantidad y el precio ingresados por el usuario
    const total = parseFloat(cantidad) * parseFloat(precio) || 0;
    // Calcula el total de la transacción (cantidad * precio)
    const handleSubmit = async () => {
        setError(null);
        const cantidadNum = parseFloat(cantidad);
        const precioNum = parseFloat(precio);
        //Si la cantidad o el precio no son números válidos, muestra un error
        if (isNaN(cantidadNum) || isNaN(precioNum)) {
            setError("Introduce valores numéricos válidos");
            return;
        }

        const payload: any = {
            activo_id: activo.id,
            simbolo: activo.simbolo,
            nombre: activo.nombre,
            tipo_operacion: tipo,
            ...(tipo === "compra" && {
                cantidad_comprada: cantidadNum,
                precio_compra: precioNum,
                cantidad_invertida: cantidadNum * precioNum,
            }),
            ...(tipo === "venta" && {
                cantidad_vendida: cantidadNum,
                precio_venta: precioNum,
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
                    Agregar transacción <span className="text-gray-600 dark:text-white text-base">
                        — {activo.nombre} ({activo.simbolo})
                    </span>
                </h2>
                <div className="flex border-b my-8">
                    {(["compra", "venta"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTipo(t)}
                            className="cursor-pointer flex-1 py-2 text-center text-xl dark:text-amber-50 hover:bg-gray-100  hover:dark:bg-blue-200"
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
                <div className="mt-4 text-right">
                    <Resume title="Cantidad total" amount={total} />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-6 flex justify-end">
                    <Button text="Agregar transacción" onClick={handleSubmit} />
                </div>
            </div>
        </Modal>
    );
}
