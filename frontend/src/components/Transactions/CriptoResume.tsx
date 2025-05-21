// src/components/Dashboard/CriptoResume.tsx
import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { Active } from "../../types";

export interface CriptoResumeProps {
    nombre: string;
    simbolo: string;
    precioActual: number;
    change1h: number;
    change24h: number;
    change7d: number;
    inversionTotal: number;
    cantidad: number;
    precioMedioCompra: number;
    beneficio: number;
    onAddTransaction: () => void;
}

export default function CriptoResume({
    nombre,
    simbolo,
    precioActual,
    change1h,
    change24h,
    change7d,
    inversionTotal,
    cantidad,
    precioMedioCompra,
    beneficio,
    onAddTransaction,
}: CriptoResumeProps) {
    return (
        <tr className="border-b dark:border-gray-700">
            <td className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{nombre}</span>
                    <span className="text-gray-500 uppercase">{simbolo}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-center">{precioActual.toFixed(2)} €</td>
            <td
                className={`px-6 py-4 text-center ${change1h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {change1h.toFixed(2)}%
            </td>
            <td
                className={`px-6 py-4 text-center ${change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {change24h.toFixed(2)}%
            </td>
            <td
                className={`px-6 py-4 text-center ${change7d >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {change7d.toFixed(2)}%
            </td>
            <td className="px-6 py-4 text-center">{inversionTotal.toFixed(2)} €</td>
            <td className="px-6 py-4 text-center">
                {cantidad.toFixed(2)} {simbolo}
            </td>
            <td className="px-6 py-4 text-center">{precioMedioCompra.toFixed(2)} €</td>
            <td
                className={`px-6 py-4 text-center ${beneficio >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {beneficio.toFixed(2)} €
            </td>
            <td className="px-6 py-4 text-center">
                <button
                    onClick={onAddTransaction}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                    <PlusIcon className="w-5 h-5 text-amber-500" />
                </button>
            </td>
        </tr>
    );
}
