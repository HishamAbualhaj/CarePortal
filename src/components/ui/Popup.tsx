import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Button from "./Button";
import { PopupProps } from "@/types/AdminPanelProps";

interface ComponentProps extends PopupProps {
  setPopup: Dispatch<SetStateAction<PopupProps | null>>;
}
function Popup({
  popupTitle,
  PopupContent,
  popupAction,
  popupActionText,
  setPopup,
  isPending,
}: ComponentProps) {
  return (
    <div
      onClick={() => {
        setPopup(null);
      }}
      className=" absolute w-full h-full bg-black/20 left-0 top-0 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white rounded-md overflow-auto max-h-[900px] min-w-[500px] max-w-[700px]"
      >
        <div className="text-gray-700 text-xl border-b p-5 border-gray-300">
          {popupTitle}
        </div>
        <div className="px-5">
          {typeof PopupContent === "function" ? <PopupContent /> : PopupContent}
        </div>

        <div className="px-5 border-t p-5 border-gray-300">
          <div className="flex justify-end gap-5">
            <Button
              onClick={popupAction}
              text={`${isPending ? "Loading ..." : popupActionText}`}
            />
            <Button
              onClick={() => {
                setPopup(null);
              }}
              text="close"
              type="close"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
