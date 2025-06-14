import { useState, KeyboardEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface MenuItem {
  label: string;
  value: string;
}

interface ChooseMenuProps {
  items: MenuItem[];
  selectedItem?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

// Componente de menú desplegable para seleccionar una opción
function ChooseMenu({
  items,
  selectedItem,
  onSelect,
  placeholder = "Selecciona una opción",
}: ChooseMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Estado para controlar si el menú está abierto o cerrado
  const toggleMenu = () => setIsOpen(!isOpen);
  // Maneja el evento de clic para abrir/cerrar el menú
  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    callback: () => void
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      callback();
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div
        onClick={toggleMenu}
        className="flex items-center text-gray-800 dark:text-gray-200 mb-5 p-4 rounded-2xl border-2 border-gray-200 dark:border-amber-500 w-fit text-lg cursor-pointer"
      >
        {selectedItem
          ? `Seleccionado: ${items.find((i) => i.value === selectedItem)?.label
          }`
          : placeholder}
        <ChevronDownIcon className="w-6 h-6 ml-2 text-gray-800 dark:text-gray-200" />
      </div>

      {isOpen && (
        <div className="w-full bg-gray-50 dark:bg-blue-900 rounded-md shadow-lg z-10 text-gray-800 dark:text-gray-200 cursor-pointer">
          {items.map(({ label, value }) => (
            <div
              key={value}
              className="border-b-2 flex items-center gap-4 p-4 text-xl border-gray-200 transform hover:bg-gray-100 dark:hover:bg-blue-800 hover:scale-103 transition-transform duration-200 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelect(value);
                setIsOpen(false);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  onSelect(value);
                  setIsOpen(false);
                })
              }
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChooseMenu;
