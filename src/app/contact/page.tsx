"use client";
import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { AuthContext } from "@/context/AuthContextUser";
import useFetch from "@/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Response } from "@/types/adminTypes";
function page() {
  const userContext = useContext(AuthContext);
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [contactData, setContactData] = useState<Record<string, any>>({});

  const contactInfo = [
    {
      icon: "📞",
      title: "EMERGENCY",
      lines: ["(+972) 432-678-123", "(+972) 432-678-123"],
    },
    {
      icon: "📍",
      title: "LOCATION",
      lines: ["Palestine - Gaza", "9876 Some country"],
    },
    {
      icon: "✉️",
      title: "EMAIL",
      lines: ["Medicalcare@gmail.com", "mywebstudios@gmail.com"],
    },
    {
      icon: "⏰",
      title: "WORKING HOURS",
      lines: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"],
    },
  ];

  useEffect(() => {
    setUserData({
      patient_id: userContext?.user?.uid ?? "",
      patient: userContext?.user?.name ?? "User",
    });
  }, [userContext]);

  const sendMessage = async (
    userData: Record<string, any> | null,
    contactData: Record<string, any>
  ): Promise<Response> => {
    return await useFetch("/api/sendContact", "POST", {
      ...userData,
      ...contactData,
    });
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!userData) return;
      return await sendMessage(userData, contactData);
    },
    onSuccess: (data) => {
      if (!data || Object.keys(data).length === 0) return;
      if (data.status) {
        toast.success("Contact sent");
        return;
      }
      if (typeof data?.msg === "string") toast.error(data?.msg);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { value, id } = e.target;

    setContactData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="shadow-main">
        <Header />
      </div>
      <div className="max-container py-[80px]">
        <div className="flex gap-3 max-xl:flex-col px-5">
          <div className="bg-secondary rounded-lg p-5 flex-1">
            <Title title="get in touch" subtitle="Contact" />
            <div className="flex mt-5 flex-col gap-5">
              <input
                id="name"
                onChange={handleChange}
                type="text"
                placeholder="Name"
              />
              <input
                id="email"
                onChange={handleChange}
                type="text"
                placeholder="Email"
              />
              <input
                id="subject"
                onChange={handleChange}
                type="text"
                placeholder="Subject"
              />
              <textarea
                id="message"
                onChange={handleChange}
                className="min-h-[200px]"
                placeholder="Your Message"
              ></textarea>
              <Button onClick={mutate} />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="bg-secondary p-4 rounded-md">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-gray-700 mb-1">
                  {item.title}
                </h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-[30] bg-blue-500">
        <Footer />
      </div>
    </>
  );
}

export default page;
