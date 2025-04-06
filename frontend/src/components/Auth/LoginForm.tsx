import { Link } from "react-router-dom";
import {
  KeyIcon,
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function LoginForm() {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="relative w-full">
          <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Usuario"
            className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-amber-200 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="relative w-full">
          <KeyIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="password"
            placeholder="Contraseña"
            className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-amber-200 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-rose-400 hover:bg-rose-600 text-white font-semibold py-3 rounded-md
       dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-white dark:font-black hover:scale-103 transition-transform duration-200 cursor-pointer"
        >
          <span>Login</span>
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
        </button>
      </form>

      <p className="text-center mt-10 text-sm">
        <Link
          to="/NewPassword"
          className="text-rose-500 hover:underline
          dark:text-yellow-300 dark:hover:text-yellow-200 text-[1.1rem]"
        >
          ¿Has olvidado tu contraseña?
        </Link>
      </p>
    </>
  );
}
