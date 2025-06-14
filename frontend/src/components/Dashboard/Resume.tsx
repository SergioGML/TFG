interface ResumeProps {
  title: string;
  amount?: number;
  percent?: number;
  subtitle?: string;
  taxPercent?: number;
}

// Componente de resumen para mostrar información financiera. Son las tarjetas que aparecen en el dashboard o en la página de fiscalidad.
export default function Resume({
  title,
  amount,
  percent,
  subtitle,
  taxPercent,
}: ResumeProps) {
  const hasAmount = typeof amount === "number";
  const hasPercent = typeof percent === "number";
  const hasTaxPercent = typeof taxPercent === "number";
  const isPositive = (percent ?? 0) >= 0;

  // Formateadores de números para mostrar en el formato adecuado
  // Formatea números a moneda y porcentaje según la configuración regional española (es-ES)
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex-1 min-w-[200px] max-w-sm shadow-xl">
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

      {/* Cantidad */}
      {hasAmount && (
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">
          {fmtCurrency(amount!)}
        </p>
      )}

      {/* Percent (positivo/negativo, como para criptos) */}
      {hasPercent && (
        <p
          className={`mt-1 text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"
            }`}
        >
          {fmtPercent(percent!)}
        </p>
      )}

      {/* TaxPercent (solo valor plano con % sin signo ni colores) */}
      {hasTaxPercent && (
        <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white">
          {taxPercent.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}%
        </p>
      )}

    </div>
  );
}
