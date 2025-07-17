"use client";
import {
  faBars,
  faBone,
  faCalendarCheck,
  faDna,
  faHandSparkles,
  faHeartPulse,
  faNewspaper,
  faNotesMedical,
  faRightFromBracket,
  faTint,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContextUser";
import { AuthContextType } from "@/context/AuthContextUser";
type navsType = navType[];
type navType = {
  text: string | ReactNode;
  link: string;
  popup?: ReactNode | undefined;
};
interface navsProps {
  navs: navsType;
  withClick?: boolean;
  data?: AuthContextType | null;
}

function Header() {
  const arr = [
    {
      text: "Home",
      link: "/",
      popup: null,
    },
    {
      text: "Services",
      link: "/services",
      popup: null,
    },
    {
      text: "Contact",
      link: "/contact",
      popup: null,
    },
    {
      text: "Other",
      link: "/",
      popup: OthersPopup(),
    },
    {
      text: <FontAwesomeIcon icon={faUser} />,
      link: "/",
      popup: UserPopup(),
    },
  ];
  const data = useContext(AuthContext);

  const [navs, setNavs] = useState<navsType>(arr);

  const [activeNav, setActiveNav] = useState<boolean>(false);

  return (
    <div className="max-container px-5 relative">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex gap-1 font-bold text-xl">
            <div className="text-blue-500">Care</div>
            <div className="text-black">Portal</div>
          </div>
        </Link>

        <div className="flex items-center max-md:hidden">
          <RenderNav data={data} navs={navs} withClick={false} />
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
            <RenderNav data={data} navs={navs} withClick={true} />
          </div>
        )}
      </div>
    </div>
  );
}

function RenderNav({ navs, withClick = false, data }: navsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const clickNav = (i: number) => {
    hovered === i ? setHovered(null) : setHovered(i);
  };

  return (
    <>
      {navs.map((nav, i) => (
        <div
          onClick={
            withClick
              ? () => {
                  clickNav(i);
                }
              : undefined
          }
          onMouseEnter={
            !withClick
              ? () => {
                  setHovered(i);
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
          key={i}
        >
          {i === 4 ? (
            data?.user ? (
              <>
                <Link
                  className={`block relative  ${
                    hovered === i
                      ? "after:absolute after:h-[2px] after:w-full after:bottom-0 after:left-0 after:bg-cyan-400"
                      : ""
                  }  cursor-pointer py-6 px-5`}
                  href={nav.link}
                >
                  <div className="flex items-center gap-2">
                    {nav.text}
                    {data.user.name}
                  </div>
                </Link>
                {nav.popup && hovered === i && nav?.popup}
              </>
            ) : (
              <div className="flex items-center gap-2 md:p-0 px-5 pb-5">
                <Link
                  className="px-4 py-2 text-white bg-blue-400 rounded-sm"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="px-4 py-2 text-white bg-blue-400 rounded-sm"
                  href="/register"
                >
                  Signup
                </Link>
              </div>
            )
          ) : (
            <>
              <Link
                className={`block relative ${
                  hovered === i
                    ? "after:absolute after:h-[2px] after:w-full after:bottom-0 after:left-0 after:bg-cyan-400"
                    : ""
                } cursor-pointer py-6 px-5`}
                href={nav.link}
              >
                {nav.text}
              </Link>
              {nav.popup && hovered === i && nav?.popup}
            </>
          )}
        </div>
      ))}
    </>
  );
}

function OthersPopup() {
  const othersMenu = [
    {
      text: "Appointemnt",
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      link: "/appointment",
    },
    {
      text: "Free Checkup",
      icon: <FontAwesomeIcon icon={faNotesMedical} />,
      link: "/services/FreeCheckup",
    },
    {
      text: "Doctors",
      icon: <FontAwesomeIcon icon={faUserDoctor} />,
      link: "/doctors",
    },
    {
      text: "Cardiogram",
      icon: <FontAwesomeIcon icon={faHeartPulse} />,
      link: "/services/Cardiogram",
    },
    {
      text: "DNA Testing",
      icon: <FontAwesomeIcon icon={faDna} />,
      link: "/services/DnaTesting",
    },
    {
      text: "News",
      icon: <FontAwesomeIcon icon={faNewspaper} />,
      link: "/news",
    },
    {
      text: "Blood Bank",
      icon: <FontAwesomeIcon icon={faTint} />,
      link: "/services/BloodBank",
    },
    {
      text: "Dermatology",
      icon: <FontAwesomeIcon icon={faHandSparkles} />,
      link: "/services/Dermatology",
    },
    {
      text: "Orthopedic",
      icon: <FontAwesomeIcon icon={faBone} />,
      link: "/services/Orthopedic",
    },
  ];
  return (
    <div className="z-10 absolute right-0 top-full bg-white p-5 w-full text-black/80 border-b-2 border-cyan-400">
      <div className="grid lg:grid-cols-2 grid-cols-1">
        {othersMenu.map((item, i) => (
          <Link
            href={item.link}
            className={`flex items-center gap-2 py-4 px-2 hover:bg-gray-50 not-last:border-b ${
              othersMenu.at(-2) === item ? `sm:nth-[${i + 1}]:border-0` : ""
            } ${(i + 1) % 2 === 0 ? "lg:ml-8 ml-0" : ""} border-gray-200`}
            key={i}
          >
            <div className="text-cyan-500"> {item.icon}</div>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
function UserPopup() {
  const userMenu = [
    {
      key: 1,
      text: "Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      link: "/profile",
    },
    {
      key: 2,
      text: "Logout",
      icon: (
        <FontAwesomeIcon className="text-red-600" icon={faRightFromBracket} />
      ),
      link: "logout",
    },
  ];
  return (
    <div className="z-10 absolute xl:right-0 max-xl:left-0 top-full bg-white p-2 text-black/80">
      <div className="flex flex-col gap-4">
        {userMenu.map((menuItem) => (
          <div key={menuItem.key} className="hover:bg-gray-50 transition">
            <Link
              href={menuItem.link}
              className="flex items-center gap-2 p-5 cursor-pointer"
            >
              {menuItem.icon}
              {menuItem.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Header;
