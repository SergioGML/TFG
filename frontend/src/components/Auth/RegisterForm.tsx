import { KeyIcon, EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="relative w-full">
        <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="email"
          placeholder="Introduce tu email"
          className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-rose-300 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-3 focus:ring-rose-400"
        />
      </div>

      <div className="relative w-full">
        <KeyIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="password"
          placeholder="Escoge tu contraseña"
          className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-rose-300 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-3 focus:ring-rose-400"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-violet-400 hover:bg-violet-600 text-white hover:text-white font-semibold py-3 rounded-md 
            dark:bg-rose-400 dark:hover:bg-rose-500 dark:text-white dark:font-black hover:scale-103 transition-transform duration-200 cursor-pointer"
      >
        <span>Crear cuenta</span>
        <SparklesIcon className="w-5 h-5" />
      </button>
    </form>
  );
}
