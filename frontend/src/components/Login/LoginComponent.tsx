export default function LoginComponent() {
  return (
    <div
      className="bg-white rounded-2xl px-8 py-10 shadow-xl ring-1 ring-indigo-900/10 w-full max-w-md mx-auto
      dark:bg-violet-900"
    >
      <h1 className="text-2xl font-semibold text-violet-800 dark:text-white mb-6 text-center">
        Inicia Sesión
      </h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Usuario"
          className="px-4 py-3 rounded-md border border-indigo-300 dark:border-indigo-100 bg-white dark:bg-violet-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="px-4 py-3 rounded-md border border-indigo-300 dark:border-indigo-100 bg-white dark:bg-violet-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="bg-rose-400 hover:bg-rose-600 text-white hover:text-white font-semibold py-3 rounded-md transition-colors
          dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-white dark:font-black"
        >
          Login
        </button>
      </form>

      {/*<p className="text-center text-violet-700 mt-6
       dark:text-white">
        Inicia sesión con:
      </p>*/}

      <p className="text-center mt-4 text-sm">
        <a href="/ResetPassword" 
        className="text-rose-500 hover:underline
        dark:text-yellow-400 dark:hover:text-yellow-300">
          ¿Has olvidado tu contraseña?
        </a>
      </p>
      <p className="text-center text-violet-700 mt-2 text-sm
       dark:text-white">
        ¿No tienes cuenta?
        <a href="/SignUp" 
        className="text-rose-500 hover:underline ml-1
         dark:text-yellow-400 dark:hover:text-yellow-300">
          Regístrate
        </a>
      </p>
    </div>
  );
}
