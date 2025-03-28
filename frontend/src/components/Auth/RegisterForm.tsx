export default function RegisterForm() {
    return (
      
        
  
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Introduce tu email"
            className="px-4 py-3 rounded-md border border-indigo-300 dark:border-indigo-100 bg-white dark:bg-violet-900 text-violet-800 dark:text-white focus:outline-none focus:ring-3 focus:ring-rose-400"
          />
          <input
            type="password"
            placeholder="Escoge tu contraseña"
            className="px-4 py-3 rounded-md border border-indigo-300 dark:border-indigo-100 bg-white dark:bg-violet-900 text-violet-800 dark:text-white focus:outline-none focus:ring-3 focus:ring-rose-400"
          />
          <button
            type="submit"
            className="bg-violet-400 hover:bg-violet-600 text-white hover:text-white font-semibold py-3 rounded-md transition-colors
            dark:bg-rose-400 dark:hover:bg-rose-500 dark:text-white dark:font-black"
          >
            Crear cuenta
          </button>
        </form>
  
    );
  }
  