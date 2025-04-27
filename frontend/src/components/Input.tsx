interface InputProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
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
        placeholder={placeholder}
        className="pl-10 py-3 w-full rounded-md border border-indigo-300 dark:border-amber-100 bg-white dark:bg-blue-900 text-violet-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
};

export default Input;
