import React from "react";
import Title from "../../ui/Title";
function Sections() {
  const sections = [
    { key: 1, text: "Neurology", icon: null },
    { key: 2, text: "Bones", icon: null },
    { key: 3, text: "Oncology", icon: null },
    { key: 4, text: "Otorhinolaryngology", icon: null },
    { key: 5, text: "Ophthalmology", icon: null },
    { key: 6, text: "Cardiovascular", icon: null },
    { key: 7, text: "Pulmonology", icon: null },
    { key: 8, text: "Renal Medicine", icon: null },
    { key: 9, text: "Gastroenterology", icon: null },
    { key: 10, text: "Urology", icon: null },
    { key: 11, text: "Dermatology", icon: null },
    { key: 12, text: "Gynaecology", icon: null },
  ];
  return (
    <div className="mx-auto max-w-[992px] text-center px-5">
      <Title title="always caring" subtitle="" />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-8">
        {sections.map((section) => (
          <div
            key={section.key}
            className="flex flex-col justify-center items-center border border-gray-300 p-12 text-blue-900"
          >
            {section.icon}
            {section.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sections;
