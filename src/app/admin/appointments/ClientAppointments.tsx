"use client";
import React from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
function ClientAppointments({ data }: { data: any[] }) {
  const items = [
    {
      text: "Doctor",
      item: (
        <select className="bg-gray-100 border-none">
          <option value="Doctor">Doctor 1 </option>
          <option value="Doctor">Doctor 2</option>
        </select>
      ),
    },
    {
      text: "Name",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Patient Name"
        />
      ),
    },
    {
      text: "Date",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="date"
          placeholder="Date of appointment"
        />
      ),
    },
    {
      text: "Time",
      item: (
        <select className="bg-gray-100 border-none">
          <option value="10 - 11">10 - 11</option>
          <option value="10 - 11">10 - 11</option>
        </select>
      ),
    },
  ];
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 w-full bg-secondary">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "doctor", label: "Doctor" },
              { key: "patient", label: "Patient" },
              { key: "date", label: "Date" },
              { key: "time", label: "Time" },
              { key: "message", label: "Message" },
              { key: "action", label: "Actions" },
            ]}
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
            panelTitle="All Appointments"
            btnText="Add Appointment"
            popupTitle="Add Appointment"
            popupContent={items}
            popupActionText="Add"
            popupAction={() => {}}
            data={[]}
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
                  placeholder="Doctor Name"
                  type="text"
                />
                 <input
                  disabled={idChange}
                  className={`${idChange ? "opacity-50" : ""}`}
                  onChange={handleChange}
                  placeholder="Patient Name"
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

export default ClientAppointments;
