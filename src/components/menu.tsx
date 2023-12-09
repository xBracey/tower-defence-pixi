// Create icon for menu

import React from "react";

interface MenuIconProps {
  className?: string;
}

export const MenuIcon = ({ className }: MenuIconProps) => {
  return (
    <svg
      className={"w-6 h-6" + (className ? " " + className : "")}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
      ></path>
    </svg>
  );
};
