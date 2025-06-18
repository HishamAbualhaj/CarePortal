import React from "react";

interface buttonProps {
  text?: String;
}
function Button({ text = "Submit" }: buttonProps) {
  return (
    <div className="bg-blue-500 hover:bg-blue-500/80 py-2 rounded-md text-center text-white cursor-pointer">
      {text}
    </div>
  );
}

export default Button;
