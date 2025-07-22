"use client";
import React, { useContext, useEffect, useState } from "react";
import Title from "../../ui/Title";
import Button from "../../ui/Button";
import { AuthContext } from "@/context/AuthContextUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/types/adminTypes";
import { toast, ToastContainer } from "react-toastify";
import { baseURL } from "@/helpers/getApiUrl";
function Consultation() {
  const userContext = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  const [userData, setUserData] = useState<Record<string, any> | null>(null);

  const [messageData, setMessgeData] = useState<Record<string, any>>({});
  useEffect(() => {
    setUserToken(userContext?.user?.token ?? "");
    setUserData({
      patient_id: userContext?.user?.uid,
      patient: userContext?.user?.name,
    });
  }, [userContext]);

  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      return await useFetch(`${baseURL}/api/getDoctors`, "POST", {}, userToken);
    },
    enabled: !!userToken,
  });

  const sendMessage = async (
    userData: Record<string, any> | null,
    messageData: Record<string, any>,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      `${baseURL}/api/sendMessage`,
      "POST",
      { ...userData, ...messageData },
      token
    );
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!userData) return;
      return await sendMessage(userData, messageData, userToken);
    },
    onSuccess: (data) => {
      if (!data || Object.keys(data).length === 0) return;
      if (data.status) {
        toast.success("Message sent");
        return;
      }
      if (typeof data?.msg === "string") toast.error(data?.msg);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;

    setMessgeData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div className="max-container px-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between max-xl:flex-col max-xl:gap-10 gap-5">
        <div>
          <Title title="Telemedicine consultation" subtitle="" />
          <div className="mt-5 max-w-[550px] text-lg leading-[30px]">
            I highly recommend you to have a telemedicine consultation with a
            doctor. Telemedicine consultation allows you to receive medical
            evaluation and necessary advice without the need to physically visit
            a medical clinic. Through telemedicine, you can discuss your
            symptoms and health concerns the doctor.
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {userToken ? "" : <div className="border p-2 border-gray-300 text-blue-500 bg-white">Login to send consultation</div> }
          <div className="flex gap-2 max-md:flex-col">
            <select
              onChange={handleChange}
              className="w-full min-h-[50px] border border-gray-300 text-black/80"
              name=""
              id="doctor_id"
            >
              <option value="">Select Doctor</option>

              {typeof data?.msg === "string"
                ? ""
                : data?.msg.map((item: Record<string, any>, i: number) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
            </select>
          </div>

          <textarea
            onChange={handleChange}
            className="min-h-[250px]"
            placeholder="Your Message"
            name=""
            id="message"
          ></textarea>

          <Button onClick={mutate} />
        </div>
      </div>
    </div>
  );
}

export default Consultation;
