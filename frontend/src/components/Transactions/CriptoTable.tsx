import React, { useMemo } from "react";
import type { Active, Transaction } from "../../types";
import CriptoRow from "./CriptoRow";

interface Props {
    transacciones: Transaction[];
    loading: boolean;
    error: string | null;
    onAddTransaction: (activo: Active) => void;
}

function CriptoTableComponent({
    transacciones,
    loading,
    error,
    onAddTransaction,
}: Props) {
    // Agrupamos transacciones por activo_id → filas “estáticas”
    const rows = useMemo(() => {
        const map = new Map<number, Transaction[]>();
        transacciones.forEach((tx) => {
            const arr = map.get(tx.activo_id) || [];
            arr.push(tx);
            map.set(tx.activo_id, arr);
        });

        return Array.from(map.values())
            .map((txs) => {
                const compradas = txs
                    .filter((t) => t.tipo_operacion === "compra")
                    .reduce((s, t) => s + Number(t.cantidad_comprada || 0), 0);
                const vendidas = txs
                    .filter((t) => t.tipo_operacion === "venta")
                    .reduce((s, t) => s + Number(t.cantidad_vendida || 0), 0);
                const netCantidad = compradas - vendidas;
                if (netCantidad === 0) return null;

                const invertido = txs
                    .filter((t) => t.tipo_operacion === "compra")
                    .reduce((s, t) => s + Number(t.cantidad_invertida || 0), 0);
                const obtenido = txs
                    .filter((t) => t.tipo_operacion === "venta")
                    .reduce((s, t) => s + Number(t.cantidad_obtenida || 0), 0);
                const netInvertido = invertido - obtenido;
                const precioMedioCompra =
                    compradas > 0 ? invertido / compradas : 0;

                return {
                    activo: txs[0].activo,
                    inversionTotal: netInvertido,
                    cantidad: netCantidad,
                    precioMedioCompra,
                };
            })
            .filter((r): r is NonNullable<typeof r> => r !== null);
    }, [transacciones]);

    if (loading) return <p>Cargando cartera…</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (rows.length === 0)
        return (
            <p className="text-gray-500 dark:text-gray-400">
                ¡Añade tus activos para ver el rendimiento de tu cartera!
            </p>
        );

    return (
        <table className="w-full table-auto">
            <thead>
                <tr className="border-b dark:border-gray-700">
                    <th className="px-6 py-4 text-left">Nombre</th>
                    <th className="px-6 py-4 text-center">Precio</th>
                    <th className="px-6 py-4 text-center">1h%</th>
                    <th className="px-6 py-4 text-center">24h%</th>
                    <th className="px-6 py-4 text-center">7d%</th>
                    <th className="px-6 py-4 text-center">Inversiones</th>
                    <th className="px-6 py-4 text-center">Cantidad</th>
                    <th className="px-6 py-4 text-center">Precio promedio</th>
                    <th className="px-6 py-4 text-center">Gan./Pérd.</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r) => (
                    <CriptoRow
                        key={r.activo.id}
                        activo={r.activo}
                        inversionTotal={r.inversionTotal}
                        cantidad={r.cantidad}
                        precioMedioCompra={r.precioMedioCompra}
                        onAddTransaction={() => onAddTransaction(r.activo)}
                    />
                ))}
            </tbody>
        </table>
    );
}

// Sólo se re-renderiza si cambian las props transacciones/loading/error/onAddTransaction
export default React.memo(CriptoTableComponent);
