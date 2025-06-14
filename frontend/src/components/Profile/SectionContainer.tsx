import React from "react";

interface SectionContainerProps {
  borderColor: string; // e.g. "border-amber-300" or "border-red-500"
  children: React.ReactNode;
}

// Componente contenedor para las secciones del perfil
const SectionContainer: React.FC<SectionContainerProps> = ({
  borderColor,
  children,
}) => {
  return (
    <div
      className={`
        max-w-3xl mx-auto
        bg-white dark:bg-indigo-800
        rounded-xl border-2 ${borderColor}
        shadow p-8 px-4
      `}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
