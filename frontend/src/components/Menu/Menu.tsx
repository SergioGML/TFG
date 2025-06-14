import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bars4Icon,
  PencilIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";

//Componente de menú que muestra opciones de perfil y cierre de sesión
function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Maneja el clic en el icono del menú para abrir o cerrar el menú
  const handleProfileClick = () => {
    navigate("/profile");
    setIsOpen(false);
  };
  // Maneja el clic en la opción de cerrar sesión
  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };
  // Maneja el evento de teclado para permitir la navegación con Enter o Espacio
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="relative">
      <div onClick={toggleMenu}>
        <Bars4Icon className="w-11 h-11 text-gray-800 dark:text-gray-200" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 text-center bg-gray-50 dark:bg-gray-800 dark:border-2 rounded-md shadow-lg z-10 text-gray-800 dark:text-gray-200 cursor-pointer">
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
