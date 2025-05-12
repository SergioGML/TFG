interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "default" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  type = "button",
  variant = "default",
}) => {
  const base =
    "w-55 flex items-center justify-center gap-2 py-3 px-4 mt-4 font-semibold rounded-md transition-transform duration-200 cursor-pointer";
  const colors =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-700 text-white"
      : "bg-rose-400 hover:bg-rose-600 text-white dark:bg-amber-500 dark:hover:bg-amber-400";

  return (
    <button type={type} onClick={onClick} className={`${base} ${colors}`}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
