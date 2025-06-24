"use client";
import React from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { PopupProps } from "@/types/AdminPanelProps";
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
            customAction={(item, setPopUp, tablePopup) => (
              <ActionButtons
                item={item}
                tablePopup={tablePopup}
                setPopUp={setPopUp}
                btns={["edit", "delete"]}
              />
            )}
            tablePopup={[
              {
                popupTitle: "Delete Appointment",
                popupContent:
                  "Are you sure you want to delete this appointment?",
                popupActionText: "Delete",
                popupAction: () => {},
              },
              {
                popupTitle: "Edit Appointment",
                popupContent: items,
                popupActionText: "Edit",
                popupAction: () => {},
              },
            ]}
            panelTitle="All Appointments"
            btnText="Add Appointment"
            mainPopup={{
              popupTitle: "Add Appointment",
              popupContent: items,
              popupActionText: "Add",
              popupAction: () => {},
            }}
            data={[{ id: "123" }]}
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
