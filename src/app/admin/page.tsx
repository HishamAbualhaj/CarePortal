import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import React from "react";

function page() {
  return (
    <>
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
                { key: "gender", label: "Gender" },
                { key: "status", label: "Status" },
                { key: "birthday", label: "Birthday" },
                { key: "diseases", label: "Diseases" },
                { key: "delete", label: "Actions" },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
