import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import Button from "@/components/ui/Button";
import React from "react";
import Image from "next/image";
import doctor from "@/assets/doctor.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function page() {
  const selectButton = [
    {
      text: "Country",
      options: ["Palestine", "Palestine", "Palestine"],
    },
    {
      text: "State",
      options: ["Gaza", "Gaza", "Gaza"],
    },
    {
      text: "Speciality",
      options: ["Neurology", "Oncology", "Urology"],
    },
    {
      text: "Gender",
      options: ["Male", "Female"],
    },
  ];

  const doctors = [
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
    { name: "Dr. Hisham", title: "Urology", link: "/" },
  ];
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>

      <div className="py-[50px] flex justify-center text-center flex-col gap-5 px-10">
        <div className="flex flex-col gap-3 border-b border-gray-300 pb-10 flex-1">
          <div className="text-xl font-bold">
            Choose for Doctor , Make an Appointment
          </div>
          <div className="text-gray-600">
            Discover the best doctors. clinic, hospitals, nearest cities that
            suits your calender
          </div>
        </div>

        <div className="flex xl:flex-row flex-col gap-5">
          <div className="flex flex-col gap-5 text-start ">
            <div className="flex flex-col gap-3">
              <div className="font-bold text-black/80">Search</div>
              <input type="text" placeholder="Search doctor" />
            </div>

            {selectButton.map((btn, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="font-bold text-black/80">{btn.text}</div>
                <select name="" id="">
                  {btn.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <Button text="Search" />
          </div>

          <div className="border border-gray-200 xl:flex-1 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 p-3 h-[700px] overflow-auto">
            {doctors.map((doc, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 border border-gray-200 p-2"
              >
                <FontAwesomeIcon className="lg:text-8xl text-4xl text-gray-300 lg:p-10 p-5" icon={faUser} />
                <div className="font-bold text-xl">{doc.name}</div>
                <div className="text-gray-500">{doc.title}</div>
                <Link href={doc.link}>
                  <Button text="View Profile" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-[30px] bg-blue-500">
        <Footer />
      </div>
    </>
  );
}

export default page;
