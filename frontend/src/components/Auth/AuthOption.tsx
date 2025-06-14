import React from "react";

interface AuthOptionProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

// Componente que representa una opción de autenticación (Iniciar sesión o Registrarse).
const AuthOption: React.FC<AuthOptionProps> = ({ label, active, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      className={`rounded-2xl px-4 py-2 text-2xl font-semibold text-center transition-colors cursor-pointer
        ${active
          ? "text-amber-800 dark:text-white"
          : "text-amber-800 opacity-50 hover:opacity-100 dark:text-white"
        }
        hover:text-red-500 hover:dark:text-amber-300`}
    >
      {label}
    </div>
  );
};

export default AuthOption;
