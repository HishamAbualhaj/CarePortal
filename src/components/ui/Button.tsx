import React from "react";

interface buttonProps {
  buttonAction: () => void;
  text?: String;
}
function Button({ buttonAction, text = "Submit" }: buttonProps) {
  return (
    <div
      onClick={buttonAction}
      className="bg-blue-500 hover:bg-blue-500/80 py-2 rounded-md text-center text-white cursor-pointer"
    >
      {text}
    </div>
  );
}

export default Button;
