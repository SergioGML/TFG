// frontend/src/pages/Dashboard.tsx
import React, { useState, useCallback, useMemo } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import SearchAssetModal from "../components/Transactions/SearchAssetModal";
import TransactionModal from "../components/Transactions/TransactionModal";
import CriptoTable from "../components/Transactions/CriptoTable";
import { useTransactions } from "../hooks/useTransactions";
import { useMarketData } from "../hooks/useMarketData";
import Resume from "../components/Dashboard/Resume/Resume";
import type { Active } from "../types";

export default function Dashboard() {
  const { user } = useAuth();
  const portfolioName = user ? `Portfolio de ${user.name}` : "Mi Portfolio";

  // 1) Traemos transacciones
  const {
    transacciones,
    loading: txLoading,
    error: txError,
    refresh: refreshTx,
  } = useTransactions();

  // 2) Agrupamos por activo y parseamos strings a números
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
        g.netInvertido -= Number(tx.cantidad_obtenida ?? 0);
      }

      map.set(key, g);
    });

    // Solo activos con cantidad neta ≠ 0
    return Array.from(map.values()).filter((g) => g.netCantidad !== 0);
  }, [transacciones]);

  // 3) Precios y cambios cada 10s (no afecta al agrupamiento)
  const symbols = grouped.map((g) => g.activo.simbolo);
  const { data: marketData = {} } = useMarketData(symbols);

  // 4a) Cost Basis: suma de todas las compras
  const costBasis = useMemo(
    () =>
      transacciones
        .filter((t) => t.tipo_operacion === "compra")
        .reduce(
          (sum, t) => sum + Number(t.cantidad_invertida ?? 0),
          0
        ),
    [transacciones]
  );

  // 4b) Calculamos beneficio y % por activo
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
        return { ...g, benefit, percent };
      }),
    [grouped, marketData]
  );

  // 4c) Balance total y % global
  const balanceTotal = useMemo(
    () =>
      assetsWithBenefit.reduce((sum, a) => sum + a.benefit, 0),
    [assetsWithBenefit]
  );
  const balancePercent = costBasis
    ? (balanceTotal / costBasis) * 100
    : 0;

  // 4d) Mejor activo
  const best = useMemo(() => {
    if (assetsWithBenefit.length === 0) return null;
    return assetsWithBenefit.reduce((prev, curr) =>
      curr.benefit > prev.benefit ? curr : prev
    );
  }, [assetsWithBenefit]);

  // 5) Modales y callbacks
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

  return (
    <div className="w-full pt-15 px-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera */}
        <section className="flex items-center my-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {portfolioName}
          </h1>
        </section>

        {/* Cuadros de resumen */}
        <div className="flex flex-wrap gap-6 mb-8">
          <Resume
            title="Ganancia Total"
            amount={balanceTotal}
            percent={balancePercent}
          />
          <Resume title="Coste Total" amount={costBasis} />
          {best && (
            <Resume
              title="Best Performer"
              subtitle={best.activo.simbolo}
              amount={best.benefit}
              percent={best.percent}
            />
          )}
          <Resume title="Impuestos" />
        </div>

        {/* Botón “Añade Activo” */}
        <button
          onClick={() => setShowSearch(true)}
          className="flex items-center gap-2 text-amber-500 hover:text-amber-600 mb-4"
        >
          <PlusCircleIcon className="w-9 h-9" />
          <span className="text-xl font-medium">Añade Activo</span>
        </button>
        <hr className="my-10 border-gray-300 dark:border-gray-700" />

        {/* Tabla de criptos */}
        <CriptoTable
          transacciones={transacciones}
          loading={txLoading}
          error={txError}
          onAddTransaction={onAddTransaction}
        />

        {/* Modales */}
        {showSearch && (
          <SearchAssetModal
            onSelect={handleSelectAsset}
            onClose={handleCloseSearch}
          />
        )}
        {modalAsset && (
          <TransactionModal
            activo={modalAsset}
            onSuccess={handleSuccessTx}
            onClose={handleCloseTx}
          />
        )}
      </div>
    </div>
  );
}
