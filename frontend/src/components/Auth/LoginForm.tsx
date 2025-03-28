export default function LoginForm() {
  return (
    <>
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

      <p className="text-center mt-10 text-sm">
        <a
          href="/ResetPassword"
          className="text-rose-500 hover:underline
        dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          ¿Has olvidado tu contraseña?
        </a>
      </p>
    </>
  );
}
