import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Button from "./Button";
import { PopupProps } from "@/types/AdminPanelProps";

interface ComponentProps extends PopupProps {
  setPopup: Dispatch<SetStateAction<PopupProps | null>>;
}
function Popup({
  popupTitle,
  popupContent,
  popupAction,
  popupActionText,
  setPopup,
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
          {typeof popupContent === "string" ? (
            <div className="text-xl py-5">{popupContent}</div>
          ) : (
            popupContent?.map((item, i) => (
              <div
                key={i}
                className="flex items-center py-4 gap-4 justify-between"
              >
                <div className="text-gray-700">{item.text}</div>
                <div className="flex-1 md:min-w-[400px] max-w-[400px]">
                  {item.item}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 border-t p-5 border-gray-300">
          <div className="flex justify-end gap-5">
            <Button onClick={popupAction} text={popupActionText} />
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
