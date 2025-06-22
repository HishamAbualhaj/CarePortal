"use client";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ClientNews({ data }: { data: any[] }) {
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
      text: "title",
      item: (
        <input
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Title"
        />
      ),
    },
    {
      text: "Description",
      item: (
        <textarea
          className="bg-gray-100 border-none"
          placeholder="Description"
        />
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
              { key: "image_url", label: "Image" },
              { key: "title", label: "Title" },
              { key: "doctor", label: "Doctor" },
              { key: "desc", label: "Description" },
              { key: "date", label: "Publish Date" },
              { key: "action", label: "Actions" },
            ]}
            panelTitle="News"
            btnText="Add News"
            popupTitle="Add News"
            popupAction={() => {}}
            popupContent={items}
            popupActionText="Add"
            data={data}
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
                  placeholder="title"
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

export default ClientNews;
