import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { useFiscalidad } from "../hooks/useTax";
import { useActives } from "../hooks/useActives";
import { useState, useMemo } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TransactionModal from "../components/Transactions/TransactionModal";
import type { TramoFiscalEntry } from "../hooks/useTax";

// Función para calcular el impuesto base según los tramos fiscales
function calcularImpuestoBase(base: number, tramos: TramoFiscalEntry[]): number {
    let impuesto = 0;
    for (const tramo of tramos) {
        if (base > tramo.tramo_min) {
            const tope = tramo.tramo_max ?? base;
            const parcela = Math.min(base, tope) - tramo.tramo_min;
            impuesto += (parcela * tramo.tasa_impositiva) / 100;
        }
    }
    return impuesto;
}

// Página de historial de transacciones de un activo específico.
export default function TransactionHistory() {
    const { simbolo } = useParams<{ simbolo: string }>();
    const navigate = useNavigate();
    const { transacciones, refresh } = useTransactions();
    const { data: fiscalidad } = useFiscalidad();
    const { activos } = useActives();

    // Buscar el activo correspondiente al símbolo proporcionado
    const activo = useMemo(
        () => activos.find((a) => a.simbolo.toLowerCase() === simbolo?.toLowerCase()),
        [activos, simbolo]
    );

    const [modalOpen, setModalOpen] = useState(false);
    const transaccionesFiltradas = useMemo(() => {
        // Si no hay activo o fiscalidad, retornar un array vacío
        if (!activo || !fiscalidad?.tramos) return [];

        let gananciaAcumulada = 0;

        return transacciones
            .filter((tx) => tx.activo.simbolo.toLowerCase() === simbolo?.toLowerCase())
            .sort((a, b) => new Date(b.fecha_transaccion).getTime() - new Date(a.fecha_transaccion).getTime())
            .map((tx) => {
                const esVenta = tx.tipo_operacion === "venta";
                let impuesto = null;
                // Si es una venta, calcular el impuesto
                if (esVenta) {
                    const cantidad = Number(tx.cantidad_vendida ?? 0);
                    const precioVenta = Number(tx.precio_venta ?? 0);
                    const precioCompra = Number(tx.precio_promedio_compra ?? tx.precio_compra ?? 0);
                    const ganancia = (precioVenta - precioCompra) * cantidad;

                    gananciaAcumulada += ganancia;
                    const impuestoAntes = calcularImpuestoBase(gananciaAcumulada - ganancia, fiscalidad.tramos);
                    const impuestoDespues = calcularImpuestoBase(gananciaAcumulada, fiscalidad.tramos);
                    impuesto = impuestoDespues - impuestoAntes;
                }

                return { ...tx, impuesto };
            });
    }, [transacciones, simbolo, fiscalidad, activo]);

    // Si no se encuentra el activo, mostrar un mensaje de error
    if (!activo) {
        return (
            <main className="w-full px-12 pt-32 text-gray-900 dark:text-white min-h-screen">
                <p className="text-red-500 text-2xl">Buscando... {simbolo}</p>
                <button onClick={() => navigate(-1)} className="mt-4 underline text-blue-600">Volver</button>
            </main>
        );
    }

    return (
        // Renderizar el historial de transacciones del activo
        <main className="w-full pt-32 px-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <section className="mb-8 flex justify-between items-center">
                <h1 className="text-4xl font-semibold">
                    Transacciones de {activo.nombre} ({activo.simbolo})
                </h1>

                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 text-amber-500 hover:text-amber-600"
                >
                    {/* Icono de añadir transacción */}
                    <PlusCircleIcon className="w-7 h-7" />
                    <span className="text-xl font-medium">Añadir transacción</span>
                </button>
            </section>

            <table className="w-full text-left table-auto border-collapse text-xl">
                <thead>
                    {/* Encabezado de la tabla */}
                    <tr className="border-b dark:border-gray-700">
                        <th className="px-4 py-2">Operación</th>
                        <th className="px-4 py-2">Cantidad</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Impuesto</th>
                        <th className="px-4 py-2">Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Filtrar y mapear las transacciones para mostrarlas en la tabla */}
                    {transaccionesFiltradas.map((tx) => {
                        const isBuy = tx.tipo_operacion === "compra";
                        const cantidad = isBuy ? tx.cantidad_comprada : tx.cantidad_vendida;
                        const precio = isBuy ? tx.precio_compra : tx.precio_venta;
                        const total = isBuy
                            ? Number(tx.cantidad_invertida)
                            : Number(cantidad) * Number(precio);
                        const ratio = tx.ratio_beneficio;
                        const color = isBuy ? "text-blue-500" : Number(ratio) >= 0 ? "text-green-500" : "text-red-500";

                        return (
                            <tr key={tx.id} className="border-b dark:border-gray-700">
                                <td className={`px-4 py-3 font-medium uppercase ${color}`}>
                                    {tx.tipo_operacion}
                                </td>
                                <td className="px-4 py-3">{Number(cantidad ?? 0).toFixed(2)}</td>
                                <td className="px-4 py-3">{Number(precio ?? 0).toFixed(2)} €</td>
                                <td className="px-4 py-3">{total.toFixed(2)} €</td>
                                <td className="px-4 py-3">
                                    {tx.impuesto !== null && tx.impuesto !== undefined
                                        ? `${tx.impuesto.toFixed(2)} €`
                                        : "—"}
                                </td>
                                <td className="px-4 py-3">
                                    {ratio !== null && ratio !== undefined
                                        ? `${(ratio * 100).toFixed(2)}%`
                                        : "—"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal para  añadir una nueva transacción */}
            {modalOpen && (
                <TransactionModal
                    activo={activo}
                    onSuccess={() => {
                        refresh();
                        setModalOpen(false);
                    }}

                    onClose={() => setModalOpen(false)}
                />
            )}
        </main>
    );
}
