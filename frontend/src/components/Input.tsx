import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  pattern?: string;
  className?: string;
}
//Componente de Input reutilizable que soporte iconos y validación
const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  pattern,
  className = "",
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full min-h-[72px]">
        {icon && (
          <div className="absolute left-3 top-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className={`
            ${className}
            pl-10 pr-10 h-12 w-full rounded-md border
            ${error
              ? "border-red-500 focus:ring-red-500"
              : "border-indigo-300 focus:ring-amber-400"
            }
            bg-white dark:bg-blue-900 text-amber-800 dark:text-white
            focus:outline-none focus:ring-2 transition-colors
          `}
        />

        {error && (
          <p className="absolute left-0 bottom-0 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
