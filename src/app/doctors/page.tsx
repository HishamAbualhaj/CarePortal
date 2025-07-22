"use client";
import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { baseURL } from "@/helpers/getApiUrl";
function page() {
  const selectButton = [
    {
      id: "country",
      text: "Country",
      options: [
        "Algeria",
        "Bahrain",
        "Comoros",
        "Djibouti",
        "Egypt",
        "Iraq",
        "Jordan",
        "Kuwait",
        "Lebanon",
        "Libya",
        "Mauritania",
        "Morocco",
        "Oman",
        "Palestine",
        "Qatar",
        "Saudi Arabia",
        "Somalia",
        "Sudan",
        "Syria",
        "Tunisia",
        "United Arab Emirates",
        "Yemen",
        "Western Sahara",
      ],
    },
    {
      id: "speciality",
      text: "Speciality",
      options: [
        "Cardiology",
        "Neurology",
        "Dermatology",
        "Pediatrics",
        "Psychiatry",
        "Orthopedics",
        "Gastroenterology",
        "Oncology",
        "Endocrinology",
        "Pulmonology",
        "Urology",
        "Nephrology",
        "Ophthalmology",
        "Obstetrics and Gynecology",
        "Rheumatology",
      ],
    },
    {
      id: "gender",
      text: "Gender",
      options: ["Male", "Female"],
    },
  ];

  const [searchData, setSearchData] = useState<Record<string, any>>({
    search: "",
    country: "",
    speciality: "",
    gender: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["doctors", searchData],
    queryFn: async () => {
      return await useFetch(`${baseURL}/api/getSearchDoctor`, "POST", searchData);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setSearchData((prev) => ({ ...prev, [id]: value }));
  };
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
              <input
                id="search"
                value={searchData["search"]}
                onChange={handleChange}
                type="text"
                placeholder="Search doctor"
              />
            </div>

            {selectButton.map((btn, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="font-bold text-black/80">{btn.text}</div>
                <select
                  onChange={handleChange}
                  value={searchData[btn.id]}
                  id={btn.id}
                >
                  <option value="">Select Data</option>
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
          <div className="border border-gray-200 xl:flex-1 relative">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 p-3 h-[700px] overflow-auto">
              {typeof data?.msg === "string"
                ? []
                : data?.msg.map((doc: Record<string, any>, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between flex-col gap-3 border border-gray-200 p-2 lg:h-fit"
                    >
                      <div className="">
                        {doc?.image_url ? (
                          <Image
                            alt="user profile"
                            src={doc.image_url}
                            width={500}
                            height={500}
                            className="w-full h-auto"
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="lg:text-8xl text-4xl text-gray-300 lg:p-10 p-5"
                            icon={faUser}
                          />
                        )}
                        <div className="font-bold text-xl">{doc.name}</div>
                        <div className="text-gray-500">
                          {doc.specialization}
                        </div>
                      </div>
                      <Link href={`/doctors/${doc.id}`}>
                        <Button text="View Profile" />
                      </Link>
                    </div>
                  ))}
            </div>
            {isLoading && (
              <div className="text-2xl text-center mt-5 animate-pulse absolute top-5 left-1/2 -translate-x-1/2">
                Loading ...
              </div>
            )}
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
