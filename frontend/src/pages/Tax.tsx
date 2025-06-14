import React, { useMemo, useState } from "react";
import { useFiscalidad, TramoFiscalEntry } from "../hooks/useTax";
import { useTransactions } from "../hooks/useTransactions";
import { useMarketData } from "../hooks/useMarketData";
import Resume from "../components/Dashboard/Resume";
import Input from "../components/Input";
import Button from "../components/Button";

// Función para calcular el impuesto basado en los tramos fiscales
function calcularImpuesto(base: number, tramos: TramoFiscalEntry[]): number {
    let impuesto = 0;
    for (const { tramo_min, tramo_max, tasa_impositiva } of tramos) {
        if (base > tramo_min) {
            const limiteSuperior = tramo_max ?? base;
            const parcela = Math.min(base, limiteSuperior) - tramo_min;
            if (parcela > 0) {
                impuesto += (parcela * tasa_impositiva) / 100;
            }
        }
    }
    return impuesto;
}

//Página de fiscalidad
// Muestra un resumen de las obligaciones fiscales relacionadas con criptomonedas
export default function Tax() {
    const { data: fiscalidad, loading: fxLoading, error: fxError } = useFiscalidad();
    const { transacciones } = useTransactions();
    const [otrasGananciasInput, setOtrasGananciasInput] = useState<string>("");
    const [otrasGananciasConfirmadas, setOtrasGananciasConfirmadas] = useState<number>(0);

    //Usamos useMemo para agrupar las transacciones por activo y calcular la cantidad neta y el total invertido
    const grouped = useMemo(() => {
        interface G {
            activoId: number;
            simbolo: string;
            netCantidad: number;
            netInvertido: number;
        }

        const map = new Map<number, G>();
        // Iteramos sobre las transacciones y agrupamos por activo
        // Calculamos la cantidad neta y el total invertido
        transacciones.forEach((tx) => {
            const key = tx.activo.id;
            const existing = map.get(key) || {
                activoId: key,
                simbolo: tx.activo.simbolo,
                netCantidad: 0,
                netInvertido: 0,
            };
            // Si el activo no existe en el mapa, lo inicializamos
            // Actualizamos la cantidad neta y el total invertido según el tipo de operación
            // Si es una compra, sumamos la cantidad comprada e invertida

            if (tx.tipo_operacion === "compra") {
                existing.netCantidad += Number(tx.cantidad_comprada ?? 0);
                existing.netInvertido += Number(tx.cantidad_invertida ?? 0);
            } else {
                // Si es una venta, restamos la cantidad vendida y el importe de la venta
                existing.netCantidad -= Number(tx.cantidad_vendida ?? 0);
                existing.netInvertido -= Number(tx.cantidad_vendida ?? 0) * Number(tx.precio_venta ?? 0);
            }
            // Actualizamos el mapa con el activo modificado
            map.set(key, existing);
        });

        return Array.from(map.values()).filter((g) => g.netCantidad !== 0);
    }, [transacciones]);

    const symbols = grouped.map((g) => g.simbolo);
    const { data: marketData = {} } = useMarketData(symbols);
    // Obtenemos los datos del mercado para los símbolos de los activos agrupados
    // Calculamos el balance no realizado, que es la suma de las ganancias no realizadas de cada activo
    // Ganancias no realizadas = (Precio actual * Cantidad neta) - Invertido
    // Utilizamos useMemo para optimizar el rendimiento y evitar cálculos innecesarios
    const balanceNoRealizado = useMemo(() => {
        return grouped.reduce((sum, g) => {
            const md = marketData[g.simbolo];
            const price = Number(md?.price ?? 0);
            const cantidad = Number(g.netCantidad ?? 0);
            const invertido = Number(g.netInvertido ?? 0);
            const untracked = price * cantidad - invertido;
            return sum + untracked;
        }, 0);
    }, [grouped, marketData]);

    const tramos = fiscalidad?.tramos ?? [];
    // Obtenemos los tramos fiscales del país seleccionado
    const gananciasRealizadas = useMemo(() => {
        const base = transacciones
            // Filtramos las transacciones de tipo "venta" y calculamos las ganancias realizadas
            .filter((t) => t.tipo_operacion === "venta")
            .reduce((sum, t) => {
                const cantidad = Number(t.cantidad_vendida ?? 0);
                const precioVenta = Number(t.precio_venta ?? 0);
                const precioPromedio = Number(t.precio_promedio_compra ?? 0);
                const ganancia = (precioVenta - precioPromedio) * cantidad;
                return sum + ganancia;
            }, 0);

        return base + otrasGananciasConfirmadas;
    }, [transacciones, otrasGananciasConfirmadas]);
    // Calculamos las ganancias realizadas sumando las ganancias de las transacciones de venta y las otras ganancias confirmadas
    const tramoActual = tramos.find(
        (t) =>
            gananciasRealizadas >= t.tramo_min &&
            (t.tramo_max === null || gananciasRealizadas <= t.tramo_max)
    );
    const tasaActual = tramoActual ? Number(tramoActual.tasa_impositiva) : 0;

    const impuestoRealizadas = calcularImpuesto(gananciasRealizadas, tramos);
    const impuestoNoRealizadas = calcularImpuesto(balanceNoRealizado, tramos);

    return (
        <main className="w-full pt-8 px-6 md:px-20 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <section className="flex flex-col md:flex-row bg-amber-gray-50 dark:bg-gray-900 rounded-2xl shadow-2xl dark:text-white mb-8 text gap-8 justify-around p-12 mt-24">
                <section className="w-full md:w-1/2">
                    <h4 className="text-4xl font-semibold mb-10 text-red-500 dark:text-red-400">Ten en cuenta...</h4>
                    <p className="text-2xl mb-4 text-start">
                        En esta sección, puedes ver un resumen de tus obligaciones fiscales relacionadas con criptomonedas.
                    </p>

                    <p className="text-2xl mb-4 text-start my-10">
                        Ten en cuenta que cualquier otro rendimiento de capital deberá tributar también, aunque no esté relacionado con criptomonedas, como por ejemplo:
                        <ul className="list-disc list-inside text-2xl mx-4 my-10">
                            <li><strong>Rendimientos del capital mobiliario</strong></li>
                            <li><strong>Rendimientos del capital inmobiliario</strong></li>
                            <li><strong>Rendimientos de actividades económicas</strong></li>
                        </ul>
                    </p>
                    <Resume title="Tasa impositiva actual" taxPercent={tasaActual} />
                    <div className="my-18 w-fit text-2xl border-2 border-red-500 dark:border-red-400 p-8 rounded-lg">
                        <h3 className="text-4xl font-semibold my-6 text-red-500 dark:text-red-400">¿Otras ganancias?</h3>
                        <p className="mb-10">
                            <strong>Introduce aquí otras ganancias no proventientes <br />
                                de las criptomonedas: (simulador)</strong>
                        </p>
                        <Input
                            type="number"
                            value={otrasGananciasInput}
                            onChange={(e) => setOtrasGananciasInput(e.target.value)}
                            placeholder="Introduce el total"
                            className="w-full max-w-md text-start"
                        />
                        <div className="flex gap-4">
                            <Button
                                text="Aplicar"
                                onClick={() => {
                                    const parsed = parseFloat(otrasGananciasInput);
                                    if (!isNaN(parsed)) {
                                        setOtrasGananciasConfirmadas(parsed);
                                    }
                                }}
                            />
                            <Button
                                text="Reiniciar"
                                variant="danger"
                                onClick={() => {
                                    setOtrasGananciasInput("");
                                    setOtrasGananciasConfirmadas(0);
                                }}
                            />
                        </div>
                    </div>

                </section>

                <section className="w-full md:w-1/3 flex flex-col gap-6 mt-8 ">
                    <div className="my-3">
                        <Resume title="Ganancias no realizadas" amount={balanceNoRealizado} />
                        <p className="text-2xl mb-4 text-start my-6">
                            Ganancias potenciales si vendieras tus criptos hoy.
                        </p>
                        <div className="border-2 border-dashed"></div>
                    </div>
                    <div className="my-3">
                        <Resume title="Impuestos sobre ganancias no realizadas" amount={impuestoNoRealizadas} />
                        <p className="text-2xl mb-4 text-start my-6">
                            Estimación si vendieras toda tu cartera al precio actual.
                        </p>
                        <div className="border-2 border-dashed"></div>
                    </div>
                    <div className="my-3">
                        <Resume title="Ganancias realizadas" amount={gananciasRealizadas} />
                        <p className="text-2xl mb-4 text-start my-6">
                            Beneficio obtenido por ventas menos el importe que costó la inversión
                        </p>
                        <div className="border-2 border-dashed"></div>
                    </div>

                    <div className="my-3">
                        <Resume title="Impuestos sobre ganancias realizadas" amount={impuestoRealizadas} />
                        <p className="text-2xl mb-4 text-start my-6">
                            Impuestos que debes pagar por ventas ya realizadas.
                        </p>
                        <div className="border-2 border-dashed"></div>
                    </div>

                </section>
            </section>
        </main>
    );
}
