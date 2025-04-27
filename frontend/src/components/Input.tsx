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
}

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
}) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
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
        className={`pl-10 py-3 w-full rounded-md border
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-indigo-300 focus:ring-amber-400"
          }
          bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
