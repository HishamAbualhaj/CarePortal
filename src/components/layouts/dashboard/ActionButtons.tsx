import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";
import { formData } from "@/app/admin/users/ClientUsers";
import { PopupProps } from "@/types/AdminPanelProps";

interface ComponentProps {
  item: Record<string, any>;
  tablePopup?: PopupProps[];
  setPopUp: Dispatch<SetStateAction<PopupProps | null>>;
  btns: Array<"edit" | "delete">;
}
function ActionButtons({
  item,
  setPopUp,
  tablePopup,
  btns,
}: ComponentProps) {
  const handleClick = (type: "edit" | "delete") => {
    const index = type === "edit" ? 1 : 0;
    const popup = tablePopup?.[index];

    if (popup) setPopUp(popup);
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      {btns.includes("edit") && (
        <FontAwesomeIcon
          onClick={() => {
            handleClick("edit");
          }}
          className="text-gray-400 bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white transition"
          icon={faPen}
        />
      )}
      {btns.includes("delete") && (
        <FontAwesomeIcon
          onClick={() => {
            handleClick("delete");
          }}
          className="text-red-500 bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white transition"
          icon={faTrash}
        />
      )}
    </div>
  );
}

export default ActionButtons;
