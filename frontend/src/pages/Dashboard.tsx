import { useState, useCallback, useMemo } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import SearchAssetModal from "../components/Transactions/SearchAssetModal";
import TransactionModal from "../components/Transactions/TransactionModal";
import CriptoTable from "../components/Transactions/CriptoTable";
import { useTransactions } from "../hooks/useTransactions";
import { useMarketData } from "../hooks/useMarketData";
import Resume from "../components/Dashboard/Resume";

import type { Active } from "../types";

export default function Dashboard() {
  const { user } = useAuth();
  const portfolioName = user ? `Portfolio de ${user.name}` : "Mi Portfolio";

  const {
    transacciones,
    loading: txLoading,
    error: txError,
    refresh: refreshTx,
  } = useTransactions();

  const grouped = useMemo(() => {
    type G = { activo: Active; netCantidad: number; netInvertido: number };
    const map = new Map<number, G>();

    transacciones.forEach((tx) => {
      const key = tx.activo.id;
      const g = map.get(key) || {
        activo: tx.activo,
        netCantidad: 0,
        netInvertido: 0,
      };

      if (tx.tipo_operacion === "compra") {
        g.netCantidad += Number(tx.cantidad_comprada ?? 0);
        g.netInvertido += Number(tx.cantidad_invertida ?? 0);
      } else {
        g.netCantidad -= Number(tx.cantidad_vendida ?? 0);
        g.netInvertido -= Number(tx.cantidad_vendida ?? 0) * Number(tx.precio_venta ?? 0);
      }

      map.set(key, g);
    });

    return Array.from(map.values()).filter((g) => g.netCantidad !== 0);
  }, [transacciones]);

  const symbols = grouped.map((g) => g.activo.simbolo);
  const { data: marketData = {} } = useMarketData(symbols);

  const costBasis = useMemo(
    () =>
      transacciones
        .filter((t) => t.tipo_operacion === "compra")
        .reduce((sum, t) => sum + Number(t.cantidad_invertida ?? 0), 0),
    [transacciones]
  );

  const assetsWithBenefit = useMemo(
    () =>
      grouped.map((g) => {
        const md = marketData[g.activo.simbolo] || {
          price: 0,
          change1h: 0,
          change24h: 0,
          change7d: 0,
        };
        const benefit = md.price * g.netCantidad - g.netInvertido;
        const percent = g.netInvertido
          ? (benefit / g.netInvertido) * 100
          : 0;
        return { simbolo: g.activo.simbolo, benefit, percent };
      }),
    [grouped, marketData]
  );

  const balanceTotal = useMemo(
    () => assetsWithBenefit.reduce((sum, a) => sum + a.benefit, 0),
    [assetsWithBenefit]
  );
  const balancePercent = costBasis ? (balanceTotal / costBasis) * 100 : 0;

  const best = useMemo(() => {
    if (assetsWithBenefit.length === 0) return null;
    return assetsWithBenefit.reduce((prev, curr) =>
      curr.benefit > prev.benefit ? curr : prev
    );
  }, [assetsWithBenefit]);

  const realizedProfit = useMemo(
    () =>
      transacciones
        .filter((t) => t.tipo_operacion === "venta")
        .reduce((sum, t) => {
          const cantidad = Number(t.cantidad_vendida ?? 0);
          const precio = Number(t.precio_venta ?? 0);
          return sum + cantidad * precio;
        }, 0),
    [transacciones]
  );

  const [showSearch, setShowSearch] = useState(false);
  const [modalAsset, setModalAsset] = useState<Active | null>(null);

  const handleSelectAsset = useCallback((a: Active) => {
    setModalAsset(a);
    setShowSearch(false);
  }, []);
  const handleCloseSearch = useCallback(() => setShowSearch(false), []);
  const handleCloseTx = useCallback(() => setModalAsset(null), []);
  const handleSuccessTx = useCallback(() => {
    refreshTx();
    setModalAsset(null);
  }, [refreshTx]);
  const onAddTransaction = useCallback((a: Active) => {
    setModalAsset(a);
  }, []);

  const pieChartData = grouped.map((g) => ({
    simbolo: g.activo.simbolo,
    valor: marketData[g.activo.simbolo]?.price * g.netCantidad || 0,
  }));

  return (
    <main className="w-full pt-32 px-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <section className="flex items-center my-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {portfolioName}
          </h1>
        </section>

        <div className="flex flex-wrap gap-6 mb-8 items-center text-center">
          <Resume title="Total Invertido" amount={costBasis} />
          {best && (
            <Resume
              title="Mejor Activo"
              subtitle={best.simbolo}
              amount={best.benefit}
            />
          )}
          <Resume title="Ganancias Potenciales" amount={balanceTotal} percent={balancePercent} />
          <Resume title="Ingresos por ventas" amount={realizedProfit} />
        </div>

        <div className="my-20 flex justify-between items-center">
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 text-amber-500 hover:text-amber-600 mb-4"
          >
            <PlusCircleIcon className="w-9 h-9" />
            <span className="text-xl font-medium">Añade Activo</span>
          </button>
        </div>
      </div>



      <section className="w-full px-24 text-gray-900 dark:text-white">
        <CriptoTable
          transacciones={transacciones}
          marketData={marketData}
          loading={txLoading}
          error={txError}
          onAddTransaction={onAddTransaction}
        />

        {showSearch && (
          <SearchAssetModal onSelect={handleSelectAsset} onClose={handleCloseSearch} />
        )}
        {modalAsset && (
          <TransactionModal
            activo={modalAsset}
            onSuccess={handleSuccessTx}
            onClose={handleCloseTx}
          />
        )}
      </section>
    </main>
  );
}
