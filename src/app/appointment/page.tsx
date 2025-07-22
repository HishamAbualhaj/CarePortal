"use client";
import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import Table from "@/components/ui/Table";

import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { AuthContext } from "@/context/AuthContextUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { formAppointment, FormItem } from "@/types/adminTypes";
import { handleChange } from "../../helpers/handleInputChange";
import { Response } from "@/types/adminTypes";
import { toast, ToastContainer } from "react-toastify";
import { baseURL } from "@/helpers/getApiUrl";
function page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pickData, setPickData] = useState({});
  const userContext = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  useEffect(() => {
    setUserToken(userContext?.user?.token ?? "");
    setUserData({
      patient_id: userContext?.user?.uid,
      patient: userContext?.user?.name,
    });
  }, [userContext]);

  const pickAppointment = async (
    userData: Record<string, any> | null,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      `${baseURL}/api/pickAppointment`,
      "POST",
      {
        ...pickData,
        ...userData,
      },
      token
    );
  };

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["pickAppointment"],
    mutationFn: async () => {
      if (!userData) return;
      return await pickAppointment(userData, userToken);
    },
    onSuccess: (data) => {
      if (!data || Object.keys(data).length === 0) return;
      if (data.status) {
        toast.success("You picked an appointment");
        return;
      }
      if (typeof data?.msg === "string") toast.error(data?.msg);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      return await useFetch(`${baseURL}/api/getAppointment`, "POST", {}, userToken);
    },
    enabled: !!userToken,
  });
  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="shadow-main">
        <Header />
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-black/80 lg:py-[80px] py-[50px] bg-secondary font-bold text-2xl lg:pl-32 pl-10">
          Book An Appointment
        </div>

        <div className="lg:py-[50px] py-[35px] max-container">
          <div className="px-5">
            <div className="text-2xl">Book An Appointment</div>
            <div className="text-black/80 mt-3">
              Book an appointment with ease using our simple and intuitive
              system. Whether it's a routine check-up or a specialist
              consultation, you're just a few clicks away. Our scheduling
              feature ensures flexibility, letting you choose the time that
              suits you best. No more waiting in line or lengthy phone calls.
              Reserve your spot now and take control of your health journey.
            </div>
            <div className="mt-5">
              <Table
                columns={[
                  { key: "id", label: "ID" },
                  { key: "doctor", label: "Doctor" },
                  { key: "date", label: "Date" },
                  { key: "time", label: "Time" },
                  { key: "status", label: "Status" },
                  { key: "action", label: "Pick" },
                ]}
                data={typeof data?.msg === "string" ? [] : data?.msg ?? []}
                customAction={(item, setPopUp, tablePopup) => (
                  <div
                    onClick={() => {
                      if (tablePopup) setPopUp(tablePopup[0]);
                    }}
                    className="font-bold text-center mx-auto border rounded-sm w-fit py-2 px-5 text-white bg-blue-400 hover:bg-blue-500 transition cursor-pointer"
                  >
                    Pick
                  </div>
                )}
                tablePopup={(item) => [
                  {
                    popupTitle: "Pick an appointment",
                    PopupContent: (
                      <PickItems
                        data={item as formAppointment}
                        setData={setPickData}
                      />
                    ),
                    popupActionText: "Pick",
                    popupAction: async () => {
                      await mutateAsync();
                      refetch();
                    },
                  },
                ]}
                isPending={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-[30] bg-blue-500">
        <Footer />
      </div>
    </>
  );
}

const PickItems = ({
  data,
  setData,
}: {
  data: formAppointment | Record<string, any>;
  setData: Dispatch<SetStateAction<formAppointment | Record<string, any>>>;
}) => {
  const [formData, setFormData] = useState<
    formAppointment | Record<string, any>
  >(data);

  useEffect(() => {
    setData({
      ...formData,
    });
  }, [formData]);

  const Items: FormItem<formAppointment, keyof formAppointment>[] = [
    {
      key: "message",
      text: "Notes",
      item: (inputData: string, handleChange) => (
        <input
          id="message"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Message"
        />
      ),
    },
  ];

  return (
    <>
      {Items?.map((item, i) => (
        <div key={i} className="flex items-center py-4 gap-4 justify-between">
          <div className="text-gray-700">{item.text}</div>
          <div className="flex-1 md:min-w-[400px] max-w-[400px]">
            {item.item(formData[item.key] || "", (e) => {
              handleChange(e, setFormData);
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default page;
