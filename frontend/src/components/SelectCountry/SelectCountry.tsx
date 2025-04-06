import React, { useState } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

function SelectCountry() {
  const [country, setCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCountry = (pais: string) => {
    setCountry(pais);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-around mt-10 items-center">
        <div
          onClick={toggleMenu}
          className="flex items-center text-slate-800 dark:text-slate-200 mb-5 p-4 rounded-2xl border-2 border-slate-200 dark:border-amber-500 w-fit text-lg cursor-pointer"
        >
          País seleccionado: {country === "" ? "Ninguno" : country}
          <ChevronDownIcon className="w-6 h-6 ml-2 text-slate-800 dark:text-slate-200" />
        </div>
      </div>
      {isOpen && (
        <div className="w-full bg-slate-50 dark:bg-blue-900 rounded-md shadow-lg z-10 text-slate-800 dark:text-slate-200 cursor-pointer">
          <div
            className="border-b-2 flex items-center gap-4 p-4 text-xl border-slate-200 transform hover:bg-slate-100 dark:hover:bg-blue-800 hover:scale-103 transition-transform duration-200 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleSelectCountry("España"))
            }
            onClick={() => handleSelectCountry("España")}
          >
            España
          </div>

          <div
            className="flex items-center gap-4 p-4 text-xl border-slate-200 transform hover:bg-slate-100 dark:hover:bg-blue-800 hover:scale-103 transition-transform duration-200 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleSelectCountry)}
            onClick={() => handleSelectCountry("Andorra")}
          >
            Andorra
          </div>
        </div>
      )}
      {!isOpen && country === "" && (
        <div className="flex items-center justify-center gap-2 text-slate-800 dark:text-slate-200 mt-10 mb-10">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>Selecciona un país del menú desplegable</span>
        </div>
      )}

      {country === "España" && (
        <div className="mt-4 flex items-start gap-3 text-slate-800 dark:text-slate-200 bg-yellow-200 dark:bg-yellow-600 p-4 rounded-md text-justify w-fit">
          <InformationCircleIcon className="w-8 h-8  shrink-0 text-slate-800 dark:text-slate-200" />

          <p className="max-w-md text-start">
            En España, las ganancias por criptomonedas tributan como ganancias
            patrimoniales en el IRPF. Los tramos actuales son: 19% hasta
            6.000 €, 21% entre 6.000 € y 50.000 €, 23% hasta 200.000 € y 27% a
            partir de ahí.
          </p>
        </div>
      )}
      {country === "Andorra" && (
        <div className="mt-4 flex items-start gap-3 text-slate-800 dark:text-slate-200 bg-yellow-200 dark:bg-yellow-600 p-4 rounded-md text-justify w-fit">
          <InformationCircleIcon className="w-8 h-8  shrink-0 text-slate-800 dark:text-slate-200" />

          <p className="max-w-md text-start">
            En Andorra, las ganancias por criptomonedas tributan como ganancias
            de capital. Se aplica una tasa fija del 10%, con una exención de los
            primeros 3.000 € anuales. No existe impuesto al patrimonio ni a las
            herencias.
          </p>
        </div>
      )}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-violet-400 hover:bg-violet-600 text-white hover:text-white font-semibold rounded-md
              dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-white hover:scale-103 transition-transform duration-200 cursor-pointer"
      >
        <span>Continuar</span>
      </button>
    </div>
  );
}

export default SelectCountry;
