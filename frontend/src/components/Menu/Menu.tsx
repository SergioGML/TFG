import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bars4Icon,
  PencilIcon,
  SparklesIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleThemeChange = () => {
    // Logic to change the theme goes here
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="relative">
      <div onClick={toggleMenu}>
        <Bars4Icon className="w-11 h-11 text-slate-800 dark:text-slate-200" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 text-center bg-slate-50 dark:bg-slate-800 dark:border-2 rounded-md shadow-lg z-10 text-slate-800 dark:text-slate-200 cursor-pointer">
          <div
            className="flex items-center gap-4 p-4"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, handleProfileClick)}
            onClick={handleProfileClick}
          >
            <PencilIcon className="w-5" /> Editar perfil
          </div>

          <div
            className="flex items-center gap-4 p-4"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, handleThemeChange)}
            onClick={toggleMenu}
          >
            <SparklesIcon className="w-5" />
            Cambiar Tema
          </div>

          <div
            className="flex items-center gap-4 p-4"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, handleLogout)}
            onClick={handleLogout}
          >
            <ArrowLeftStartOnRectangleIcon className="w-5" /> Cerrar Sesion
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
