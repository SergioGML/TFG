import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import Menu from "../Menu/Menu";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Componente de cabecera que muestra el logo, enlaces de navegación y menú de usuario
function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Si el usuario hace clic en el logo, lo redirige al dashboard
  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const isTaxPage = location.pathname === "/tax";

  return (
    <header
      className="w-full h-20 px-4 flex fixed items-center justify-between
     bg-white dark:bg-blue-950 dark:text-white shadow-inner dark:shadow-gray-500/20 border-t dark:border-gray-700"
    >
      <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogoClick} role="button" tabIndex={0} >
        <CurrencyEuroIcon className="w-9 h-9 text-gray-800 dark:text-gray-200" />
        <span className="text-2xl" >Crypto Wallet</span>
      </div>

      <div className="flex items-center gap-14">
        {user && (
          <>
            <a
              href={isTaxPage ? "/dashboard" : "/tax"}
              className="text-2xl text-amber-300 dark:text-white hover:underline font-medium"
            >
              {isTaxPage ? "Ir al Dashboard" : "Ir a Fiscalidad"}
            </a>
            <div className="flex items-center gap-4">
              {/* Si el usuario está autenticado, muestra el menú */}
              <Menu />
            </div>
          </>
        )}
      </div>

    </header>
  );
}

export default Header;
