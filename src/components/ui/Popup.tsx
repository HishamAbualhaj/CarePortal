import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Button from "./Button";

interface popup {
  title?: string;
  content?: { text: string; item: ReactNode }[];
  actionText?: string;
  action?: () => void;
  setPopup: Dispatch<SetStateAction<boolean>>;
}
function Popup({ title, content, action, setPopup }: popup) {
  return (
    <div
      onClick={() => {
        setPopup(false);
      }}
      className=" absolute w-full h-full bg-black/20 left-0 top-0 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white rounded-md overflow-auto max-h-[900px] min-w-[500px]"
      >
        <div className="text-gray-700 text-xl border-b p-5 border-gray-300">
          {title}
        </div>
        <div className="px-5">
          {content?.map((item, i) => (
            <div
              key={i}
              className="flex items-center py-4 gap-4 justify-between"
            >
              <div className="text-gray-700">{item.text}</div>
              <div className="flex-1 md:min-w-[400px] max-w-[400px]">
                {item.item}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 border-t p-5 border-gray-300">
          <div className="flex justify-end gap-5">
            <Button onClick={action} text="Add" />
            <Button
              onClick={() => {
                setPopup(false);
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
