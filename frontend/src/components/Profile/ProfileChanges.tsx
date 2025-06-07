import React from "react";
import Button from "../Button";

interface ProfileChangesProps {
  label: string;
  value: React.ReactNode;
  buttonText: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

const ProfileChanges: React.FC<ProfileChangesProps> = ({
  label,
  value,
  buttonText,
  onClick,
  variant = "default",
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-800 dark:text-white text-2xl">{label}</p>
        <p className="text-gray-800 dark:text-rose-500 text-2xl">{value}</p>
      </div>
      <Button
        text={buttonText}
        variant={variant}
        onClick={onClick}
      />
    </div>
  );
};

export default ProfileChanges;
