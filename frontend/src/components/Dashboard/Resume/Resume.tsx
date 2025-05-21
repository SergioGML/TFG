// frontend/src/components/Dashboard/Resume/Resume.tsx
import React from "react";

interface ResumeProps {
  /** Título del card (ej. "Balance total") */
  title: string;
  /** Monto principal (€ x.xxx,xx) */
  amount?: number;
  /** Porcentaje opcional (se pinta en verde si ≥0, en rojo si <0) */
  percent?: number;
  /** Texto secundario opcional (por ejemplo el símbolo del mejor activo) */
  subtitle?: string;
}

export default function Resume({
  title,
  amount,
  percent,
  subtitle,
}: ResumeProps) {
  const hasAmount = typeof amount === "number";
  const hasPercent = typeof percent === "number";
  const isPositive = (percent ?? 0) >= 0;

  // Formateadores
  const fmtCurrency = (v: number) =>
    v.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const fmtPercent = (v: number) =>
    `${v >= 0 ? "+" : ""}${v.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex-1 min-w-[200px] max-w-sm">
      {/* Título */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </p>

      {/* Subtítulo */}
      {subtitle && (
        <p className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
          {subtitle}
        </p>
      )}

      {/* Amount */}
      {hasAmount && (
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">
          {fmtCurrency(amount!)}
        </p>
      )}

      {/* Percent */}
      {hasPercent && (
        <p
          className={`mt-1 text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"
            }`}
        >
          {fmtPercent(percent!)}
        </p>
      )}
    </div>
  );
}
