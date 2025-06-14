import { PlusIcon } from "@heroicons/react/24/solid";

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

// Componente para mostrar un resumen de una criptomoneda
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
            {/* Muestra Precio Actual con 2 decimales */}
            <td className="px-6 py-4 text-center">{precioActual.toFixed(2)} €</td>
            <td
                className={`px-6 py-4 text-center ${change1h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {/* Muestra el cambio en 1 hora con 2 decimales */}
                {change1h.toFixed(2)}%
            </td>
            <td
                className={`px-6 py-4 text-center ${change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {/* Muestra el cambio en 24 horas con 2 decimales */}
                {change24h.toFixed(2)}%
            </td>
            <td
                className={`px-6 py-4 text-center ${change7d >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {/* Muestra el cambio en 7 días con 2 decimales */}
                {change7d.toFixed(2)}%
            </td>
            {/* Muestra la inversión total con 2 decimales */}
            <td className="px-6 py-4 text-center">{inversionTotal.toFixed(2)} €</td>
            <td className="px-6 py-4 text-center">
                {/* Muestra la cantidad de criptomonedas con 2 decimales */}
                {cantidad.toFixed(2)} {simbolo}
            </td>
            {                /* Muestra el precio medio de compra con 2 decimales */}
            <td className="px-6 py-4 text-center">{precioMedioCompra.toFixed(2)} €</td>
            <td
                className={`px-6 py-4 text-center ${beneficio >= 0 ? "text-green-500" : "text-red-500"
                    }`}
            >
                {/* Muestra el beneficio con 2 decimales */}
                {beneficio.toFixed(2)} €
            </td>
            <td className="px-6 py-4 text-center">
                {/* Botón para añadir transacción */}
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
