"use client";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ClientMessages({ data }: { data: any[] }) {
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 w-full bg-secondary">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "patient", label: "Patient" },
              { key: "doctor", label: "Doctor" },
              { key: "message", label: "Message" },
              { key: "reply", label: "Reply" },
              { key: "action", label: "Actions" },
            ]}
            panelTitle="Messages"
            data={[]}
            customAction={() => {
              return (
                <div className="flex gap-2 justify-center items-center">
                  <FontAwesomeIcon
                    className="text-gray-400 bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white transition"
                    icon={faPen}
                  />
                  <FontAwesomeIcon
                    className="text-red-500 bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white transition"
                    icon={faTrash}
                  />
                </div>
              );
            }}
            filterContent={(handleChange, idChange) => (
              <>
                <input
                  id="id"
                  onChange={handleChange}
                  placeholder="ID"
                  type="text"
                />
                <input
                  disabled={idChange}
                  className={`${idChange ? "opacity-50" : ""}`}
                  onChange={handleChange}
                  placeholder="Patient Name"
                  type="text"
                />
                <input
                  disabled={idChange}
                  className={`${idChange ? "opacity-50" : ""}`}
                  onChange={handleChange}
                  placeholder="Doctor Name"
                  type="text"
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientMessages;
