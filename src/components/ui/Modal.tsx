import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  text?: string;
  status?: boolean;
  setModel: Dispatch<SetStateAction<boolean>>;
}
function Modal({ text, status, setModel }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger animation after mount
    setMounted(true);
  }, [text, status]);

  return ReactDOM.createPortal(
    <div
      className={`flex text-lg items-center absolute min-w-[150px] ${
        status ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } ${
        mounted ? "translate-x-0 left-5" : "-translate-x-full left-0"
      } py-2 pr-5 top-5 rounded-md transition`}
    >
      <FontAwesomeIcon
        onClick={() => {
          setModel(false);
        }}
        className="px-2 cursor-pointer"
        icon={faClose}
      />
      <div>{text}</div>
    </div>,
    document.body
  );
}

export default Modal;
