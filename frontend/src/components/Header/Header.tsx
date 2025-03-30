import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import Menu from "../DropdownMenu/Menu";

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-20 px-4 bg-white shadow-md dark:bg-slate-800">
      <div>
        <CurrencyEuroIcon className="w-9 h-9 text-slate-800 dark:text-slate-200" />
      </div>
      <div className="flex items-center gap-4">
        <Menu />
      </div>
    </header>
  );
}

export default Header;
