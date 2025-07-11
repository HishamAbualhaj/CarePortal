"use client";
import Header from "@/components/layouts/Landing/Header";
import Table from "@/components/ui/Table";
import { faCloudArrowUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContextUser";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import useUpload from "@/hooks/useUpload";
import { toast, ToastContainer } from "react-toastify";

function page() {
  const dataContext = useContext(AuthContext);

  const [userImage, setUserImage] = useState<File | undefined>(undefined);
  const [userData, setUserData] = useState<Record<string, any>>({
    name: "",
    email: "",
    mobile: "",
    date: "",
    gender: "",
    address: "",
  });
  const updateUser = async (userData: Record<string, any>) => {
    try {
      if (dataContext?.user) {
        const userRef = doc(db, "users", dataContext?.user?.uid);
        await updateDoc(userRef, userData);
        return { message: "Profile updated successfully", status: true };
      }
      return null;
    } catch (error) {
      console.error(error);
      return { message: "Profile updated failed", status: false };
    }
  };
  const { mutate, data } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (dataContext?.user) {
      setUserData(dataContext.user);
    }
  }, [dataContext]);

  const inputs = [
    {
      id: "name",
      title: "Full Name:",
      type: "text",
      data: dataContext?.user?.name,
    },
    {
      id: "mobile",
      title: "Phone:",
      type: "text",
      data: dataContext?.user?.mobile,
    },
    {
      id: "date",
      title: "Birthday:",
      type: "text",
      data: dataContext?.user?.date,
    },
  ];

  const input_sec = [
    {
      id: "gender",
      title: "Gender:",
      type: "select",
      options: ["Male", "Female"],
      data: "",
    },
    {
      id: "email",
      title: "Email:",
      type: "text",
      data: dataContext?.user?.email,
    },
    {
      id: "address",
      title: "Address:",
      type: "text",
      data: dataContext?.user?.address,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUserImage(file);

    const tempFile = new Blob([file ?? ""], { type: file?.type });

    const image_url = URL.createObjectURL(tempFile);

    setUserData((prev) => ({ ...prev, image_url }));
  };

  useEffect(() => {
    if (data?.status) {
      toast.success(data.message);
      return;
    }
    toast.error(data?.message);
  }, [data]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
              <div className="">
                <div className="flex flex-col gap-2 text-center py-8 px-16  lg:border-r border-gray-300">
                  <div className="relative">
                    <div className="cursor-pointer absolute -top-5 right-0">
                      <div className="relative flex justify-center">
                        <FontAwesomeIcon
                          className="text-3xl"
                          icon={faCloudArrowUp}
                        />
                        <input
                          onChange={handleFileChange}
                          className="cursor-pointer absolute top-0 left-0 z-10 opacity-0"
                          type="file"
                        />
                      </div>
                    </div>
                    {Boolean(dataContext?.user?.image_url) ? (
                      userImage ? (
                        <Image
                          alt="profile image"
                          src={userData.image_url ?? ""}
                          objectFit="cover"
                          width={250}
                          height={250}
                        />
                      ) : (
                        <Image
                          alt="profile image"
                          src={dataContext?.user?.image_url ?? ""}
                          objectFit="cover"
                          width={250}
                          height={250}
                        />
                      )
                    ) : (
                      // <img src={} alt="" />
                      <FontAwesomeIcon
                        className="text-8xl bg-gray-200 text-gray-400 w-fit mx-auto rounded-3xl p-5"
                        icon={faUser}
                      />
                    )}
                  </div>

                  <div className="text-black">{dataContext?.user?.name}</div>
                  <div
                    onClick={async () => {
                      let newDataWithImageUrl = {};
                      if (userImage) {
                        const image_url = await useUpload(userImage);
                        console.log("Image url", image_url);
                        newDataWithImageUrl = {
                          ...userData,
                          image_url,
                        };
                      } else {
                        newDataWithImageUrl = {
                          ...userData,
                        };
                      }

                      mutate(newDataWithImageUrl);
                    }}
                    className="bg-blue-200 rounded-md p-2 cursor-pointer hover:bg-blue-100 transition"
                  >
                    Update
                  </div>
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
                      <input
                        id={input.id}
                        onChange={handleChange}
                        value={userData[input.id]}
                        type={input.type}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex max-md:flex-col gap-3 justify-between md:items-center p-5">
                  {input_sec.map((input, i) => (
                    <div key={i} className="flex flex-col gap-1 flex-1">
                      <div className="text-gray-500">{input.title}</div>
                      {input.type === "select" ? (
                        <select
                          onChange={handleChange}
                          value={userData[input.id]}
                          id={input.id}
                        >
                          {input.options?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={input.id}
                          onChange={handleChange}
                          value={userData[input.id]}
                          type={input.type}
                        />
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
                data={[]}
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
                data={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
