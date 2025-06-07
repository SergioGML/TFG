import React from "react";

interface SectionContainerProps {
  borderColor: string; // e.g. "border-amber-300" or "border-red-500"
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  borderColor,
  children,
}) => {
  return (
    <div
      className={`
        max-w-3xl mx-auto
        bg-white dark:bg-blue-800/20
        rounded-xl border-2 ${borderColor}
        shadow p-8 px-4
      `}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
