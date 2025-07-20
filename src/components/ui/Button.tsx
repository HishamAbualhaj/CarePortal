import React, { ReactNode } from "react";

interface buttonProps {
  text?: string;
  type?: string;
  size?: string;
  onClick?: () => void;
  icon?: ReactNode;
}
function Button({
  text = "Submit",
  type = "default",
  size = "normal",
  onClick,
  icon,
}: buttonProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-blue-400 hover:bg-blue-500 
        ${type === "close" ? "bg-gray-200 !text-black hover:bg-gray-300" : ""}
        ${size === "normal" ? "py-2 px-4" : ""} ${
        size === "large" ? "py-3 px-6 text-xl" : ""
      } py-2 px-4 rounded-md text-center text-white cursor-pointer flex items-center gap-2 justify-center`}
    >
      {icon}
      {text}
    </div>
  );
}

export default Button;
