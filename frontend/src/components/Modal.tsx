import React from "react";

interface BoxContainerProps {
  children: React.ReactNode;
}

//Componente de modal que muestra contenido centrado en la pantalla
export default function Modal({ children }: BoxContainerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 bg-white dark:bg-blue-800 rounded-2xl px-8 py-10 shadow-xl ring-1 ring-indigo-900/10 w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
