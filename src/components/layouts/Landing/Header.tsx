"use client";
import {
  faBars,
  faRightFromBracket,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

type navsType = navType[];
type navType = {
  key: number;
  text: string | ReactNode;
  link: string;
  popup?: ReactNode | undefined;
};
interface navsProps {
  navs: navsType;
  withClick?: boolean;
}

function Header() {
  const arr = [
    {
      key: 1,
      text: "Home",
      link: "/",
      popup: null,
    },
    {
      key: 2,
      text: "Services",
      link: "/",
      popup: null,
    },
    {
      key: 3,
      text: "Contact",
      link: "/",
      popup: null,
    },
    {
      key: 4,
      text: "Other",
      link: "/",
      popup: OthersPopup(),
    },
    {
      key: 5,
      text: <FontAwesomeIcon icon={faUser} />,
      link: "/",
      popup: UserPopup(),
    },
  ];

  const [navs, setNavs] = useState<navsType>(arr);

  const [activeNav, setActiveNav] = useState<boolean>(false);

  return (
    <div className="max-container px-5 relative">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 font-bold text-xl">
          <div className="text-blue-500">Care</div>
          <div className="text-black">Portal</div>
        </div>

        <div className="flex max-md:hidden">
          <RenderNav navs={navs} withClick={false} />
        </div>

        <div
          onClick={() => {
            setActiveNav(!activeNav);
          }}
          className="max-md:block hidden py-8 text-white cursor-pointer"
        >
          <FontAwesomeIcon className="text-black/80 text-2xl" icon={faBars} />
        </div>

        {activeNav && (
          <div className="flex flex-col absolute top-full left-0 bg-gray-50 shadow-main text-black w-full md:hidden z-10">
            <RenderNav navs={navs} withClick={true} />
          </div>
        )}
      </div>
    </div>
  );
}

function RenderNav({ navs, withClick = false }: navsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const clickNav = (nav: navType) => {
    hovered === nav.key ? setHovered(null) : setHovered(nav.key);
  };

  return (
    <>
      {navs.map((nav) => (
        <div
          onClick={
            withClick
              ? () => {
                  clickNav(nav);
                }
              : undefined
          }
          onMouseEnter={
            !withClick
              ? () => {
                  setHovered(nav.key);
                }
              : undefined
          }
          onMouseLeave={
            !withClick
              ? () => {
                  setHovered(null);
                }
              : undefined
          }
          className="hover:border-b border-cyan-400 py-8 px-5 cursor-pointer"
          key={nav.key}
        >
          <Link href={nav.link}>{nav.text}</Link>
          {nav.popup && hovered === nav.key && nav?.popup}
        </div>
      ))}
    </>
  );
}

function OthersPopup() {
  const othersMenu = [
    { key: 1, text: "Appointemnt", icon: null },
    { key: 2, text: "Internal Medicine", icon: null },
    { key: 3, text: "About", icon: null },
    { key: 4, text: "Bones", icon: null },
    { key: 5, text: "Doctor", icon: null },
    { key: 6, text: "Blood Bank", icon: null },
    { key: 7, text: "News", icon: null },
    { key: 8, text: "Dermalogy", icon: null },
    { key: 9, text: "Surgery", icon: null },
    { key: 10, text: "Orthopedic", icon: null },
  ];
  return (
    <div className="z-10 absolute right-0 top-full bg-white p-5 w-full text-black/80 border-b-2 border-cyan-400">
      <div className="grid lg:grid-cols-2 grid-cols-1">
        {othersMenu.map((item) => (
          <div
            className={`flex gap-2 py-4 px-2 hover:bg-gray-50 not-last:border-b sm:nth-[${
              othersMenu.at(-2)?.key
            }]:border-0 ${
              item.key % 2 === 0 ? "lg:ml-8 ml-0" : ""
            } border-gray-200`}
            key={item.key}
          >
            {item.icon}
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
function UserPopup() {
  const userMenu = [
    { key: 1, text: "Profile", icon: <FontAwesomeIcon icon={faUser} /> },
    {
      key: 2,
      text: "Logout",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    },
  ];
  return (
    <div className="z-10 absolute xl:right-0 max-xl:left-0 top-full bg-white p-2 text-black/80">
      <div className="flex flex-col gap-4">
        {userMenu.map((menuItem) => (
          <div key={menuItem.key} className="hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 p-5">
              {menuItem.icon}
              {menuItem.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Header;
