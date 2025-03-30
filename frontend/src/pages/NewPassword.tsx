export default function NewPassword() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white dark:bg-violet-700 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <form className="flex flex-col gap-4">
          <h2 className="text-violet-800 dark:text-white text-2xl font-semibold text-center mb-6">
            Restablece tu contraseña
          </h2>
          <input
            type="text"
            placeholder="Nueva contraseña"
            className="px-4 py-3 rounded-md border border-indigo-300 dark:border-indigo-100 bg-white dark:bg-violet-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            placeholder="Repite la contraseña"
            className="px-4 py-3 rounded-md border border-indigo-300 dark:border-indigo-100 bg-white dark:bg-violet-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            className="bg-rose-400 hover:bg-rose-600 text-white hover:text-white font-semibold py-3 mt-4 rounded-md transition-colors
              dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-white dark:font-black"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
