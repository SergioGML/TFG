// src/components/Transactions/CriptoRow.tsx
import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { Active } from "../../types";
import { useMarketData } from "../../hooks/useMarketData";

interface CriptoRowProps {
    activo: Active;
    inversionTotal: number;
    cantidad: number;
    precioMedioCompra: number;
    onAddTransaction: () => void;
}

function CriptoRow({
    activo,
    inversionTotal,
    cantidad,
    precioMedioCompra,
    onAddTransaction,
}: CriptoRowProps) {
    // Hook local que refresca SOLO esta fila
    const { data, loading } = useMarketData([activo.simbolo]);
    // Nota: no usamos el fallback `{ price:0 }` aquí, vamos a distinguir entre "tengo dato" o "no lo tengo"
    const entry = data[activo.simbolo];

    const beneficio =
        (entry?.price ?? 0) * cantidad - inversionTotal;

    // Formateadores en estilo español
    const fmtCurrency = (v: number) =>
        v.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    const fmtNumber = (v: number) =>
        v.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    const fmtPercent = (v: number) =>
        `${v >= 0 ? "+" : ""}${v.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}%`;

    // ¿Tenemos ya un precio cargado alguna vez?
    const hasEntry = entry !== undefined;

    return (
        <tr className="border-b dark:border-gray-700">
            {/* Nombre + símbolo */}
            <td className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{activo.nombre}</span>
                    <span className="text-gray-500 uppercase">
                        {activo.simbolo}
                    </span>
                </div>
            </td>

            {/* Precio y cambios: sólo placeholder si no tenemos nunca dato */}
            <td className="px-6 py-4 text-center">
                {hasEntry ? fmtCurrency(entry!.price) : "…"}
            </td>
            <td
                className={`px-6 py-4 text-center ${(entry?.change1h ?? 0) >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {hasEntry ? fmtPercent(entry!.change1h) : "…"}
            </td>
            <td
                className={`px-6 py-4 text-center ${(entry?.change24h ?? 0) >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {hasEntry ? fmtPercent(entry!.change24h) : "…"}
            </td>
            <td
                className={`px-6 py-4 text-center ${(entry?.change7d ?? 0) >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {hasEntry ? fmtPercent(entry!.change7d) : "…"}
            </td>

            {/* Inversiones, Cantidad, Precio medio, Ganancia */}
            <td className="px-6 py-4 text-center">
                {fmtCurrency(inversionTotal)}
            </td>
            <td className="px-6 py-4 text-center">
                {fmtNumber(cantidad)} {activo.simbolo}
            </td>
            <td className="px-6 py-4 text-center">
                {fmtCurrency(precioMedioCompra)}
            </td>
            <td
                className={`px-6 py-4 text-center ${beneficio >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {fmtCurrency(beneficio)}
            </td>

            {/* Acción */}
            <td className="px-6 py-4 text-center">
                <button
                    onClick={onAddTransaction}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                >
                    <PlusIcon className="w-5 h-5 text-amber-500" />
                </button>
            </td>
        </tr>
    );
}

export default React.memo(CriptoRow);
