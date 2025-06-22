import Link from "next/link";
import React from "react";

function SideBar() {
  const sideBarItems = [
    { text: "Users", icon: null, link: "/admin/users" },
    { text: "Doctors", icon: null, link: "/admin/doctors" },
    { text: "Appointments", icon: null, link: "/admin/appointments" },
    { text: "Messages", icon: null, link: "/admin/messages" },
    { text: "News", icon: null, link: "/admin/news" },
    { text: "Contacts", icon: null, link: "/admin/contacts" },
    { text: "Roles List", icon: null, link: "/admin/" },
  ];
  return (
    <div className="bg-[#1c1e2d] shadow-main min-w-[250px] text-[#8d8a9d]">
      <div className="flex flex-col gap-5">
        <div className="flex bg-[#191b28]  px-10 py-5">
          <div className=" font-bold  text-xl text-center flex-1">
            Care Portal
          </div>
        </div>

        <div className="">
          <div className="flex text-xl bg-[#191b28] py-3 px-3 justify-center">ADMIN PANEL</div>
          <div className="mt-2">
            <div className="flex flex-col gap-2">
              {sideBarItems.map((item, i) => (
                <Link
                  href={item.link}
                  key={i}
                  className=" px-5 py-3 hover:bg-[#191b28] hover:text-white cursor-pointer text-[15px]"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
