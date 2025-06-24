"use client";
import React, { ReactNode, useEffect, useState } from "react";

import { tableProps, colType } from "@/types/TableTypes";
import Popup from "./Popup";
import { PopupProps } from "@/types/AdminPanelProps";

interface ComponentProps extends tableProps {
  tablePopup?: PopupProps[];
}
function Table({ columns, customAction, data, tablePopup }: ComponentProps) {
  const [isPop, setPopUp] = useState<PopupProps | null>(null);

  return (
    <>
      {isPop && (
        <Popup
          popupTitle={isPop.popupTitle}
          popupContent={isPop.popupContent}
          popupActionText={isPop.popupActionText}
          popupAction={isPop.popupAction}
          setPopup={setPopUp}
        />
      )}
      <table className="border border-collapse w-full">
        <thead>
          <tr>
            {columns.map((column: colType, i: number) => (
              <th
                key={i}
                className="font-normal border border-gray-300 p-3 bg-gray-300/30"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Boolean(data.length) &&
            data?.map((item: Record<string, any>, i: number) => (
              <tr key={i}>
                {columns.map((col, i) =>
                  col.key === "action" ? null : (
                    <td
                      key={i}
                      className="text-nowrap border border-gray-300 p-5"
                    >
                      {item[col.key]}
                    </td>
                  )
                )}
                {customAction && (
                  <td className="border border-gray-300 p-5">
                    {customAction(item, setPopUp, tablePopup)}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {!Boolean(data.length) && (
        <div className="text-center text-lg mt-10">No Data Found</div>
      )}
    </>
  );
}

export default Table;
