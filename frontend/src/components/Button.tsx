interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-55 flex items-center justify-center gap-2 py-3 px-4 mt-4 bg-rose-400 hover:bg-rose-600 text-white font-semibold rounded-md
        dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-white hover:scale-103 transition-transform duration-200 cursor-pointer"
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
