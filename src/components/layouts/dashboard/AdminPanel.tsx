"use client";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import {
  faArrowLeft,
  faArrowRight,
  faFilter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";
import Popup from "@/components/ui/Popup";
import { adminPanelProps, PopupProps } from "@/types/AdminPanelProps";
function AdminPanel({
  columns,
  customAction,
  panelTitle,
  btnText,
  tablePopup,
  mainPopup,
  data,
  filterContent,
  isPending,
  filterAction,
}: adminPanelProps) {
  const [filter, setFilter] = useState<boolean>(false);
  const [idChange, setIdChange] = useState<boolean>(false);

  const [isPop, setPopUp] = useState<PopupProps | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (value === "") {
      setIdChange(false);
      return;
    }
    if (id === "id") {
      setIdChange(true);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="xl:px-10 px-5">
        {isPop && (
          <Popup
            popupTitle={mainPopup?.popupTitle}
            PopupContent={mainPopup?.PopupContent}
            popupActionText={mainPopup?.popupActionText}
            popupAction={mainPopup?.popupAction}
            setPopup={setPopUp}
          />
        )}
        <div className="bg-white p-5 pt-0 shadow-main rounded-md">
          <div className="flex flex-col">
            <div className="flex items-center justify-between py-5">
              <div className="text-black font-bold text-xl">{panelTitle}</div>

              {btnText && (
                <Button
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => {
                    setPopUp({} as PopupProps);
                  }}
                  text={btnText}
                />
              )}
            </div>

            <div
              onClick={() => {
                setFilter(!filter);
              }}
              className="pb-5 flex items-center gap-2 w-fit"
            >
              <div className="px-5 py-2 cursor-pointer rounded-md text-lg bg-gray-200 text-gray-800 flex gap-2 items-center">
                <FontAwesomeIcon icon={faFilter} />
                filter
              </div>
            </div>
            {filter && (
              <div className="flex max-md:flex-col gap-4 pb-5">
                {filterContent && filterContent(handleChange, idChange)}
                <Button text="Filter" />
              </div>
            )}

            <div className="pb-5 mt-5 flex gap-2 items-center">
              <div className="tex">Show</div>
              <select className="!px-4 !w-fit" name="" id="">
                {[1, 2, 3, 4, 5, 10, 15, 20].map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="tex">entries</div>
            </div>
            <div className="overflow-auto h-[500px]">
              <Table
                columns={columns}
                customAction={customAction}
                data={data}
                tablePopup={tablePopup}
                isPending={isPending}
              />
            </div>
            <div className="flex justify-end pt-5">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 px-4 py-2 text-gray-600 rounded-md">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="font-bold bg-blue-400 text-white px-4 py-2 rounded-md">
                  1
                </div>
                <div className="bg-gray-100 px-4 py-2 text-gray-600 rounded-md">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
