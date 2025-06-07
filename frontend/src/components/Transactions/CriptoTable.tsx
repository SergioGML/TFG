import React, { useMemo } from "react";
import type { Active, Transaction } from "../../types";
import CriptoRow from "./CriptoRow";

interface MarketEntry {
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
}

interface Props {
    transacciones: Transaction[];
    marketData: Record<string, MarketEntry>;
    loading: boolean;
    error: string | null;
    onAddTransaction: (activo: Active) => void;
}

function CriptoTableComponent({
    transacciones,
    marketData,
    loading,
    error,
    onAddTransaction,
}: Props) {
    const rows = useMemo(() => {
        const map = new Map<number, Transaction[]>();
        transacciones.forEach((tx) => {
            const arr = map.get(tx.activo_id) || [];
            arr.push(tx);
            map.set(tx.activo_id, arr);
        });

        return Array.from(map.values())
            .map((txs) => {
                const compras = txs.filter((t) => t.tipo_operacion === "compra");
                const ventas = txs.filter((t) => t.tipo_operacion === "venta");

                const compradas = compras.reduce(
                    (s, t) => s + Number(t.cantidad_comprada || 0),
                    0
                );
                const vendidas = ventas.reduce(
                    (s, t) => s + Number(t.cantidad_vendida || 0),
                    0
                );
                const netCantidad = compradas - vendidas;
                if (netCantidad === 0) return null;

                const invertido = compras.reduce(
                    (s, t) => s + Number(t.cantidad_invertida || 0),
                    0
                );
                const obtenido = ventas.reduce(
                    (s, t) =>
                        s + Number(t.cantidad_vendida || 0) * Number(t.precio_venta || 0),
                    0
                );
                const netInvertido = invertido - obtenido;

                const precioPromedioCompra =
                    compradas > 0
                        ? compras.reduce(
                            (s, t) =>
                                s +
                                Number(t.precio_promedio_compra || t.precio_compra || 0),
                            0
                        ) / compras.length
                        : undefined;

                const precioPromedioVenta =
                    vendidas > 0
                        ? ventas.reduce(
                            (s, t) =>
                                s +
                                Number(t.precio_promedio_venta || t.precio_venta || 0),
                            0
                        ) / ventas.length
                        : undefined;

                const ratios = ventas
                    .map((t) => Number(t.ratio_beneficio))
                    .filter((v) => !isNaN(v));
                const avgRatio =
                    ratios.length > 0
                        ? ratios.reduce((s, r) => s + r, 0) / ratios.length
                        : undefined;

                const symbol = txs[0].activo.simbolo;
                const market = marketData[symbol] || {
                    price: 0,
                    change1h: 0,
                    change24h: 0,
                    change7d: 0,
                };

                const beneficio = market.price * netCantidad - netInvertido;

                return {
                    activo: txs[0].activo,
                    marketPrice: market.price,
                    change1h: market.change1h,
                    change24h: market.change24h,
                    change7d: market.change7d,
                    inversionTotal: netInvertido,
                    cantidad: netCantidad,
                    precioPromedioCompra,
                    precioPromedioVenta,
                    avgRatio,
                    beneficio,
                };
            })
            .filter((r): r is NonNullable<typeof r> => r !== null);
    }, [transacciones, marketData]);

    if (loading) return <p>Cargando cartera…</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (rows.length === 0)
        return (
            <p className="text-gray-500 dark:text-gray-400">
                ¡Añade tus activos para ver el rendimiento de tu cartera!
            </p>
        );

    return (
        <div className="w-full">

            <table className="w-full table-auto text-2xl text-gray-800 dark:text-gray-200">
                <thead>
                    <tr className="border-b dark:border-gray-700">
                        <th className="px-4 py-3 text-left">Nombre</th>
                        <th className="px-4 py-3 text-right">Precio</th>
                        <th className="px-4 py-3 text-right">1h%</th>
                        <th className="px-4 py-3 text-right">24h%</th>
                        <th className="px-4 py-3 text-right">7d%</th>
                        <th className="px-4 py-3 text-right">Invertido Neto</th>
                        <th className="px-4 py-3 text-right">Cantidad</th>
                        <th className="px-4 py-3 text-right">Prom. Compra</th>
                        <th className="px-4 py-3 text-right">Prom. Venta</th>
                        <th className="px-4 py-3 text-right">Gan./Pérd.</th>
                        <th className="px-4 py-3 text-right">Ratio Beneficio</th>
                        <th className="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <CriptoRow
                            key={r.activo.id}
                            activo={r.activo}
                            marketPrice={r.marketPrice}
                            change1h={r.change1h}
                            change24h={r.change24h}
                            change7d={r.change7d}
                            inversionTotal={r.inversionTotal}
                            cantidad={r.cantidad}
                            precioPromedioCompra={r.precioPromedioCompra}
                            precioPromedioVenta={r.precioPromedioVenta}
                            avgRatio={r.avgRatio}
                            beneficio={r.beneficio}
                            onAddTransaction={() => onAddTransaction(r.activo)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default React.memo(CriptoTableComponent);
