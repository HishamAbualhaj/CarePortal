"use client";
import React, { ReactNode, useEffect, useState } from "react";

import { tableProps, colType } from "@/types/TableTypes";
import Popup from "./Popup";
import { PopupProps } from "@/types/AdminPanelProps";
import Image from "next/image";

function Table({
  columns,
  customAction,
  data,
  tablePopup,
  isPending,
}: tableProps) {
  const [isPop, setPopUp] = useState<PopupProps | null>(null);

  return (
    <>
      {isPop && (
        <Popup
          popupTitle={isPop.popupTitle}
          PopupContent={isPop.PopupContent}
          popupActionText={isPop.popupActionText}
          popupAction={isPop.popupAction}
          setPopup={setPopUp}
          isPending={isPending}
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
            data?.map((item: Record<string, any>, i: number) => {
              const popup = tablePopup?.(item);
              return (
                <tr key={i}>
                  {columns.map((col, i) =>
                    col.key === "action" ? null : (
                      <td
                        key={i}
                        className="text-wrap max-w-[400px] border border-gray-300 p-5"
                      >
                        {col.key === "image_url" ? (
                          item[col.key] ? (
                            <Image
                              alt="image"
                              width={200}
                              height={200}
                              src={item[col.key]}
                            />
                          ) : (
                            "No Image"
                          )
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    )
                  )}
                  {customAction && (
                    <td className="border border-gray-300 p-5">
                      {customAction(item, setPopUp, popup)}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      {!Boolean(data.length) && (
        <div className="text-center text-lg mt-10">No Data Found</div>
      )}
    </>
  );
}

export default Table;
