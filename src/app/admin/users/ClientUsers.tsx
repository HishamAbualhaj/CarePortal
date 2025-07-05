"use client";
import React from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
function ClientUsers({ data }: { data: any[] }) {
  const items = [
    {
      text: "Image",
      item: (
        <div className="relative">
          <input
            className="absolute left-0 h-full w-full opacity-0"
            type="file"
          />
          <FontAwesomeIcon
            className="text-8xl bg-gray-300 text-gray-400 p-4"
            icon={faUser}
          />
        </div>
      ),
    },
    {
      text: "Name",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Name"
        />
      ),
    },
    {
      text: "Email",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Email"
        />
      ),
    },
    {
      text: "Password",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="password"
          placeholder="Password"
        />
      ),
    },
    {
      text: "Confirm Password",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="password"
          placeholder="Confirm password"
        />
      ),
    },
    {
      text: "Mobile",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Mobile"
        />
      ),
    },
    {
      text: "Gender",
      item: (
        <select className="bg-gray-100 border-none">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ),
    },
    {
      text: "Status",
      item: (
        <select className="bg-gray-100 border-none">
          <option value="Sick">Sick</option>
          <option value="Good">Good</option>
        </select>
      ),
    },
    {
      text: "Birthday",
      item: <input className="bg-gray-100 border-none" type="date" />,
    },
    {
      text: "Diseases",
      item: (
        <select className="bg-gray-100 border-none">
          <option value="d1">Disease 1</option>
          <option value="d2">Disease 2</option>
        </select>
      ),
    },
  ];
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 w-full bg-secondary relative">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "image_url", label: "Image" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "mobile", label: "Mobile" },
              { key: "gender", label: "Gender" },
              { key: "status", label: "Status" },
              { key: "birthday", label: "Birthday" },
              { key: "diseases", label: "Diseases" },
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
            tablePopup={() => [
              {
                popupTitle: "Delete User",
                popupContent: "Are you sure you want to delete this user?",
                popupActionText: "Delete",
                popupAction: () => {},
              },
              {
                popupTitle: "Edit User",
                popupContent: items,
                popupActionText: "Edit",
                popupAction: () => {},
              },
            ]}
            btnText="Add User"
            mainPopup={{
              popupTitle: "Add User",
              popupContent: items,
              popupActionText: "Add",
              popupAction: () => {},
            }}
            data={[{ id: "1" }]}
            panelTitle="Users"
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
                <select
                  className={`${idChange ? "opacity-50" : ""}`}
                  disabled={idChange}
                  onChange={handleChange}
                  name=""
                  id=""
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientUsers;
