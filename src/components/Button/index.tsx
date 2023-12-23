import React from "react";

export type ButtonType = "primary" | "secondary" | "danger" | "success";

export const getButtonColoursClass = (type: ButtonType, disabled: boolean) => {
  if (disabled) {
    return "bg-gray-500 text-white border-gray-800 border-4 disabled:hover:scale-100";
  }

  switch (type) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-700 text-white border-blue-800 border-4";
    case "secondary":
      return "bg-purple-500 hover:bg-purple-700 text-white border-purple-800 border-4";
    case "danger":
      return "bg-red-500 hover:bg-red-700 text-white border-red-800 border-4";
    case "success":
      return "bg-green-500 hover:bg-green-700 text-white border-green-800 border-4";
  }
};

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
  className?: string;
}

export const Button = ({
  disabled = false,
  children,
  onClick,
  type = "primary",
  className,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonColoursClass(
        type,
        disabled
      )} rounded-md px-4 p-2 transition-all hover:scale-105 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};
