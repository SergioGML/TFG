import React from "react";

interface BoxContainerProps {
  children: React.ReactNode;
}

const Modal = ({ children }: BoxContainerProps) => {
  return (
    <div className="bg-white dark:bg-blue-800 rounded-2xl px-8 py-10 shadow-xl ring-1 ring-indigo-900/10 w-full max-w-md mx-auto">
      {children}
    </div>
  );
};

export default Modal;
