import Header from "@/components/layouts/Landing/Header";
import Table from "@/components/ui/Table";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function page() {
  const inputs = [
    { title: "Full Name:", type: "text", data: "Hisham Alhaj" },
    { title: "Phone:", type: "text", data: "0598883212" },
    { title: "Birthday:", type: "text", data: "14/08-2001" },
  ];

  const input_sec = [
    {
      title: "Gender:",
      type: "select",
      options: ["Male", "Female"],
      data: "",
    },
    { title: "Email:", type: "text", data: "hishamraid0@gmail.com" },
    {
      title: "Diseases:",
      type: "select",
      options: ["Disease 1", "Disease 1"],
      data: "",
    },
  ];
  return (
    <>
      <div className="shadow-main">
        <Header />
      </div>

      <div className="max-container px-5 pb-10">
        <div className="text-4xl font-bold py-5 after:absolute after:left-0 relative after:bottom-0 after:bg-black/80 md:after:w-[500px] after:w-[300px] after:h-[2px] text-black/80">
          Profile
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <div className="bg-white shadow-main rounded-md py-3">
            <div className="flex lg:flex-row flex-col">
              <div className="flex flex-col gap-2 text-center py-8 px-16  lg:border-r border-gray-300">
                <FontAwesomeIcon
                  className="text-8xl bg-gray-200 text-gray-400 w-fit mx-auto rounded-3xl p-5"
                  icon={faUser}
                />
                <div className="text-black">Hisham Alhaj</div>
                <div className="bg-blue-200 rounded-md p-2 cursor-pointer hover:bg-blue-100 transition">
                  Update
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center p-5 border-b border-gray-300">
                  <div className="text-gray-500 font-bold">
                    General Information
                  </div>
                  <Link href="/">
                    <div className="text-black p-2 rounded-md text-md hover:bg-blue-100 bg-blue-200">
                      Change Password
                    </div>
                  </Link>
                </div>

                <div className="flex max-md:flex-col gap-3 justify-between md:items-center p-5 border-b border-gray-300">
                  {inputs.map((input, i) => (
                    <div key={i} className="flex flex-col gap-1 flex-1">
                      <div className="text-gray-500">{input.title}</div>
                      <input placeholder={input.data} type={input.type} />
                    </div>
                  ))}
                </div>

                <div className="flex max-md:flex-col gap-3 justify-between md:items-center p-5">
                  {input_sec.map((input, i) => (
                    <div key={i} className="flex flex-col gap-1 flex-1">
                      <div className="text-gray-500">{input.title}</div>
                      {input.type === "select" ? (
                        <select name="" id="">
                          {input.options?.map((option, i) => (
                            <option key={i} value="">
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input placeholder={input.data} type={input.type} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-main rounded-md p-5">
            <div className="font-bold xl:text-2xl text-xl">
              Booked appointments
            </div>
            <div className="mt-3 overflow-auto">
              <Table
                columns={[
                  { key: "name", label: "Doctor" },
                  { key: "department", label: "Department" },
                  { key: "created_date", label: "Date" },
                  { key: "time", label: "Time" },
                  { key: "message", label: "Message" },
                  { key: "action", label: "Delete" },
                ]}
                customAction={() => (
                  <div className="hover:bg-red-400 transition cursor-pointer bg-red-500 w-fit text-white p-2 rounded-md">
                    Delete
                  </div>
                )}
              />
            </div>
          </div>
          <div className="bg-white shadow-main  rounded-md p-5">
            <div className="font-bold xl:text-2xl text-xl">
              Telemedicine consultation
            </div>
            <div className="mt-3 overflow-auto">
              <Table
                columns={[
                  { key: "name", label: "Doctor" },
                  { key: "department", label: "Date Sent" },
                  { key: "created_date", label: "Time Sent" },
                  { key: "time", label: "Message" },
                  { key: "message", label: "Dr.message" },
                  { key: "action", label: "Delete" },
                ]}
                customAction={() => (
                  <div className="hover:bg-red-400 transition cursor-pointer bg-red-500 w-fit text-white p-2 rounded-md">
                    Delete
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
