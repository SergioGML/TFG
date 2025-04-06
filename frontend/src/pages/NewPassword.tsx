import { Link } from "react-router-dom";
import {
  KeyIcon,
  CheckCircleIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import Modal from "../components/Modal";

export default function NewPassword() {
  return (
    <Modal>
      <form className="flex flex-col gap-4">
        <h2 className="mb-4 text-violet-800 dark:text-white text-2xl font-semibold text-center">
          Restablece tu contraseña
        </h2>
        <div className="relative w-full">
          <KeyIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            placeholder="Nueva Contraseña"
            className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-amber-100 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="relative w-full">
          <KeyIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="password"
            placeholder="Repite la contraseña"
            className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-amber-100 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-rose-400 hover:bg-rose-600 text-white hover:text-white font-semibold rounded-md
              dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-white hover:scale-103 transition-transform duration-200 cursor-pointer"
        >
          <span>Cambiar Contraseña</span>
          <CheckCircleIcon className="w-5 h-5" />
        </button>
        <p className="mt-2 text-center text-sm">
          <Link
            to={"/"}
            className="text-rose-500 hover:underline
             dark:text-yellow-300 dark:hover:text-yellow-200 text-[1.1rem]"
          >
            <ChevronDoubleLeftIcon className="w-4 h-4 inline-block" />
            <span>Volver</span>
          </Link>
        </p>
      </form>{" "}
    </Modal>
  );
}
