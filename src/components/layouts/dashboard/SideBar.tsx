"use client";
import {
  faAddressBook,
  faArrowLeft,
  faArrowRight,
  faBars,
  faCalendarCheck,
  faMessage,
  faNewspaper,
  faUserDoctor,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

function SideBar({ isAdmin = false }) {
  const adminRoute = "/admin";

  const [isTranslate, setIsTranslate] = useState<boolean>(false);

  const [minimize, setMinimize] = useState<boolean>(false);
  const sideBarItems = [
    {
      text: "Users",
      icon: <FontAwesomeIcon icon={faUsers} />,
      link: `${adminRoute}/users`,
      adminRoute: true,
    },
    {
      text: "Doctors",
      icon: <FontAwesomeIcon icon={faUserDoctor} />,
      link: `${adminRoute}/doctors`,
      adminRoute: true,
    },
    {
      text: "Appointments",
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      link: `${adminRoute}/appointments`,
    },
    {
      text: "Messages",
      icon: <FontAwesomeIcon icon={faMessage} />,
      link: `${adminRoute}/messages`,
    },
    {
      text: `News`,
      icon: <FontAwesomeIcon icon={faNewspaper} />,
      link: `${adminRoute}/news`,
    },
    {
      text: `Contacts`,
      icon: <FontAwesomeIcon icon={faAddressBook} />,
      link: `${adminRoute}/contacts`,
      adminRoute: true,
    },
    { text: "Roles List", icon: null, link: "", adminRoute: true },
  ];
  return (
    <>
      <div
        onClick={() => {
          setIsTranslate(!isTranslate);
        }}
        className="lg:hidden absolute"
      >
        <FontAwesomeIcon className="text-xl mt-5 px-5" icon={faBars} />
      </div>

      <div
        className={`bg-[#1c1e2d] shadow-main text-[#8d8a9d]  max-lg:absolute transition max-lg:h-[750px] ${
          isTranslate ? "translate-x-0" : "max-lg:-translate-x-full"
        } max-lg:mt-[68px]`}
      >
        <div className="flex flex-col gap-5">
          <div
            className={`flex gap-2 bg-[#191b28] items-center ${
              !minimize ? "px-10 py-5" : "px-5 py-5"
            } `}
          >
            {!minimize && (
              <div className="font-bold text-xl text-center flex-1">
                Care Portal
              </div>
            )}

            <div
              onClick={() => {
                setMinimize(!minimize);
              }}
              className="max-lg:hidden"
            >
              <FontAwesomeIcon
                className="cursor-pointer hover:bg-gray-300 hover:text-black transition rounded-md p-2"
                icon={!minimize ? faArrowLeft : faArrowRight}
              />
            </div>
          </div>

          <div className="">
            {!minimize && (
              <div className="flex text-xl bg-[#191b28] py-3 px-3 justify-center">
                ADMIN PANEL
              </div>
            )}

            <div className="mt-2">
              <div className="flex flex-col gap-2">
                {sideBarItems.map((item, i) =>
                  isAdmin ? (
                    <Link
                      href={item.link}
                      key={i}
                      className={`flex ${
                        !minimize ? "px-5 py-3 text-[15px]" : "justify-center px-3 py-3 text-xl"
                      } items-center gap-2 hover:bg-[#191b28] hover:text-white cursor-pointer `}
                    >
                      {item.icon}
                      {!minimize && item.text}
                    </Link>
                  ) : (
                    !item?.adminRoute && (
                      <Link
                        href={item.link}
                        key={i}
                        className={`flex ${
                          !minimize ? "px-5 py-3 text-[15px]" : "justify-center px-3 py-3 text-xl"
                        } items-center gap-2 hover:bg-[#191b28] hover:text-white cursor-pointer`}
                      >
                        {item.icon}
                        {!minimize && item.text}
                      </Link>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
