"use client";
import React from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
function ClientContacts({ data }: { data: any[] }) {
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
              { key: "subject", label: "Subject" },
              { key: "message", label: "Message" },
              { key: "sent_at", label: "Sent At" },
              { key: "action", label: "Actions" },
            ]}
            panelTitle="All Contacts Messages"
            data={[{ id: "1" }]}
            customAction={(item, setPopUp, tablePopup) => (
              <ActionButtons
                item={item}
                tablePopup={tablePopup}
                setPopUp={setPopUp}
                btns={["delete"]}
              />
            )}
            tablePopup={() => [
              {
                popupTitle: "Delete Contact",
                popupContent: "Are you sure you want to delete this contact?",
                popupActionText: "Delete",
                popupAction: () => {},
              },
            ]}
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
                  placeholder="Username"
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

export default ClientContacts;
