"use client";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ClientDoctors({ data }: { data: any[] }) {
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
      text: "specialization",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="text"
          placeholder="specialization"
        />
      ),
    },
    {
      text: "Years of Experience",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="number"
          placeholder="Years of Experience"
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
      text: "City",
      item: (
        <select className="bg-gray-100 border-none">
          <option value="Gaza">Gaza 1 </option>
          <option value="Gaza">Gaza 2</option>
        </select>
      ),
    },
    {
      text: "Birthday",
      item: <input className="bg-gray-100 border-none" type="date" />,
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
              { key: "image_url", label: "Image" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "mobile", label: "Mobile" },
              { key: "age", label: "Age" },
              { key: "city", label: "City" },
              { key: "country_graduation", label: "Country of Graduation" },
              { key: "specialization", label: "specialization" },
              { key: "years_exp", label: "Years of Experience" },
              { key: "decs", label: "description" },
            ]}
            panelTitle="Doctors"
            btnText="Add Doctor"
            mainPopup={{
              popupTitle: "Add Doctor",
              popupContent: items,
              popupActionText: "Add",
              popupAction: () => {},
            }}
            data={data}
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
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientDoctors;
