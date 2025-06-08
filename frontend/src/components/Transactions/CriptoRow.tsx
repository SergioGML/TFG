import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { Active } from "../../types";
import { useMarketData } from "../../hooks/useMarketData";

export interface CriptoRowProps {
    activo: Active;
    marketPrice: number;
    change1h: number;
    change24h: number;
    change7d: number;
    inversionTotal: number;
    cantidad: number;
    precioPromedioCompra?: number;
    precioPromedioVenta?: number;
    avgRatio?: number;
    beneficio: number;
    onAddTransaction: () => void;
}

function CriptoRow({
    activo,
    marketPrice,
    change1h,
    change24h,
    change7d,
    inversionTotal,
    cantidad,
    precioPromedioCompra,
    precioPromedioVenta,
    avgRatio,
    beneficio,
    onAddTransaction,
}: CriptoRowProps) {
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

    return (
        <tr className="border-b dark:border-gray-700 text-2xl">
            <td className="px-6 py-4 text-left font-medium">
                <div className="flex items-center gap-2">
                    <span>{activo.nombre}</span>
                    <span className="text-gray-500 uppercase">{activo.simbolo}</span>
                </div>
            </td>

            <td className="px-6 py-4 text-right">{fmtCurrency(marketPrice)}</td>

            <td
                className={`px-6 py-4 text-right ${change1h >= 0 ? "text-green-500" : "text-red-500"}`}
            >
                {fmtPercent(change1h)}
            </td>
            <td
                className={`px-6 py-4 text-right ${change24h >= 0 ? "text-green-500" : "text-red-500"}`}
            >
                {fmtPercent(change24h)}
            </td>
            <td
                className={`px-6 py-4 text-right ${change7d >= 0 ? "text-green-500" : "text-red-500"}`}
            >
                {fmtPercent(change7d)}
            </td>

            <td className="px-6 py-4 text-right">{fmtCurrency(inversionTotal)}</td>
            <td className="px-6 py-4 text-right">
                {fmtNumber(cantidad)} {activo.simbolo}
            </td>
            <td className="px-6 py-4 text-right">
                {precioPromedioCompra !== undefined
                    ? fmtCurrency(precioPromedioCompra)
                    : "—"}
            </td>
            <td className="px-6 py-4 text-right">
                {precioPromedioVenta !== undefined
                    ? fmtCurrency(precioPromedioVenta)
                    : "—"}
            </td>
            <td
                className={`px-6 py-4 text-right font-semibold ${beneficio >= 0 ? "text-green-500" : "text-red-500"}`}
            >
                {fmtCurrency(beneficio)}
            </td>
            <td className="px-6 py-4 text-right">
                {avgRatio !== undefined ? fmtPercent(avgRatio * 100) : "—"}
            </td>
            <td className="px-6 py-4 text-center">
                <button
                    onClick={onAddTransaction}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded cursor-pointer"
                >
                    <PlusIcon className="w-6 h-6 text-amber-500 dark:text-amber-300" />
                </button>
            </td>
            <td className="px-6 py-4 text-center">
                <div className="flex gap-2 justify-center">

                    <a
                        href={`/transactions/${activo.simbolo}`}
                        className="text-blue-600 dark:text-amber-300 hover:underline self-center text-xl"
                    >
                        Ver transacciones
                    </a>
                </div>
            </td>

        </tr>
    );
}

export default React.memo(CriptoRow);
