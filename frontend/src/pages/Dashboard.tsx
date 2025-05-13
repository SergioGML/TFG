// src/pages/Dashboard.tsx
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import Resume from "../components/Dashboard/Resume/Resume";

export default function Dashboard() {
  const { user } = useAuth();
  const portfolioName = user ? `Portfolio de ${user.name}` : "Mi Portfolio";

  return (
    <div className="w-full pt-15 px-20 bg-gray-50 dark:bg-gray-900 min-h-screen">

      <div className="max-w-4xl ml-6">

        {/* ─── Cabecera ────────────────────────────────────────────── */}
        <section className="flex items-center justify-start my-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {portfolioName}
          </h1>
        </section>

        <div className="flex items-center justify-start gap-4">

          <Resume />
          <Resume />
          <Resume />
        </div>


        <div className="mt-8">
          <button
            className="flex items-center gap-2 text-amber-500 hover:text-amber-600 dark:text-rose-400 dark:hover:text-rose-300"
            type="button"
          >
            <PlusCircleIcon className="w-8 h-8" />
            <span className="text-base font-medium">Añade Activo</span>
          </button>
        </div>

        {/* ─── Línea separadora abajo ──────────────────────────────── */}
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
      </div>
    </div>
  );
}
