// src/pages/Dashboard.tsx
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import Resume from "../components/Dashboard/Resume/Resume";

export default function Dashboard() {
  const { user } = useAuth();
  const portfolioName = user ? `Portfolio de ${user.name}` : "Mi Portfolio";

  return (
    <div className="w-full pt-15 px-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl ml-6">
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
            <PlusCircleIcon className="w-9 h-9" />
            <span className="text-xl font-medium">Añade Activo</span>
          </button>
        </div>

        {/* Línea separadora */}
        <hr className="my-10 border-gray-300 dark:border-gray-700" />
      </div>
    </div>
  );
}
