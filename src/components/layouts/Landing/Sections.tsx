import React from "react";
import Title from "../../ui/Title";
import {
  faBrain,
  faBone,
  faRibbon,
  faEarListen,
  faEye,
  faHeartbeat,
  faLungs,
  faFlask,
  faBowlFood,
  faToilet,
  faHandSparkles,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Sections() {
  const sections = [
    { key: 1, text: "Neurology", icon: faBrain },
    { key: 2, text: "Bones", icon: faBone },
    { key: 3, text: "Oncology", icon: faRibbon },
    { key: 4, text: "Otorhinolaryngology", icon: faEarListen },
    { key: 5, text: "Ophthalmology", icon: faEye },
    { key: 6, text: "Cardiovascular", icon: faHeartbeat },
    { key: 7, text: "Pulmonology", icon: faLungs },
    { key: 8, text: "Renal Medicine", icon: faFlask },
    { key: 9, text: "Gastroenterology", icon: faBowlFood },
    { key: 10, text: "Urology", icon: faToilet },
    { key: 11, text: "Dermatology", icon: faHandSparkles },
    { key: 12, text: "Gynaecology", icon: faVenus },
  ];
  return (
    <div className="mx-auto max-w-[992px] text-center px-5">
      <Title title="always caring" subtitle="" />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-8">
        {sections.map((section) => (
          <div
            key={section.key}
            className="flex flex-col gap-3 justify-center items-center border border-gray-300 p-12 text-blue-900"
          >
            <FontAwesomeIcon className="text-lg text-cyan-500" icon={section.icon} />
            {section.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sections;
