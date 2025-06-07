import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import Menu from "../Menu/Menu";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header
      className="w-full h-20 px-4 flex absolute items-center justify-between
     bg-white dark:bg-blue-950/80 shadow-inner dark:shadow-gray-500/20 border-t dark:border-gray-700"
    >
      <div>
        <CurrencyEuroIcon className="w-9 h-9 text-slate-800 dark:text-slate-200" />
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <Menu />
        </div>
      )}
    </header>
  );
}

export default Header;
