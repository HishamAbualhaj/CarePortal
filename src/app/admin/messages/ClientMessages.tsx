"use client";
import { handleChange } from "../../../helpers/handleInputChange";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import DashoardHeader from "@/components/layouts/dashboard/DashoardHeader";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { AuthContext } from "@/context/AuthContextUser";
import { baseURL } from "@/helpers/getApiUrl";
import useFetch from "@/hooks/useFetch";
import { FormItem, formMessage } from "@/types/adminTypes";
import { Response } from "@/types/adminTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast, ToastContainer } from "react-toastify";

function ClientMessages() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);

  const [editMessage, setEditMessage] = useState<
    formMessage | Record<string, any>
  >({
    doctor_id: "",
    patient_id: "",
    reply: "",
  });

  const useMessageMutation = (
    apiFn: (
      url: string | null,
      token: string,
      data?: formMessage
    ) => Promise<Response>,
    stateData: formMessage | Record<string, any>,
    text: string,
    token: string,
    type?: string
  ) => {
    return useMutation({
      mutationFn: async (data?: formMessage): Promise<Response> => {
        if (type === "delete") {
          return await apiFn("", token, data);
        }
        if (!stateData.reply) {
          toast.error("Fields are required");
          return {} as Response;
        }
        return await apiFn("", token);
      },
      onSuccess: (data) => {
        if (!data || Object.keys(data).length === 0) return;
        if (data.status) {
          toast.success(text);
          return;
        }
        if (typeof data?.msg === "string") toast.error(data?.msg || text);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const editMessageFn = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    return await useFetch(`${baseURL}/api/editMessage`, "PUT", editMessage, token);
  };

  const deleteMessageFn = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    return await useFetch(`${baseURL}/api/deleteMessage`, "DELETE", {}, token);
  };
  const edit = useMessageMutation(
    editMessageFn,
    editMessage,
    "Message Edited successfully",
    userToken
  );

  const deleteMessage = useMessageMutation(
    deleteMessageFn,
    {},
    "Message Deleted successfully",
    userToken,
    "delete"
  );

  const [filterData, setFilterData] = useState<Record<string, any>>({
    patient: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return await useFetch(
        `${baseURL}/api/getMessages`,
        "POST",
        { ...filterData },
        userToken
      );
    },
    enabled: !!userToken,
  });

  useEffect(() => {
    setIsLoading(edit.isPending);
  }, [edit.isPending]);
  useEffect(() => {
    setIsLoading(deleteMessage.isPending);
  }, [deleteMessage.isPending]);
  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar />
      <div className="flex-1 w-full bg-secondary">
        <DashoardHeader name={user?.user?.name ?? ""} />
        <div className="mt-5">
          {isFetching && (
            <div className="py-2 xl:px-10 px-5 text-xl animate-pulse">
              Loading data ...
            </div>
          )}
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "patient", label: "Patient" },
              { key: "doctor", label: "Doctor" },
              { key: "message", label: "Message" },
              { key: "reply", label: "Reply" },
              { key: "action", label: "Actions" },
            ]}
            panelTitle="Messages"
            data={typeof data?.msg === "string" ? [] : data?.msg ?? []}
            customAction={(item, setPopUp, tablePopup) => (
              <ActionButtons
                item={item}
                tablePopup={tablePopup}
                setPopUp={setPopUp}
                btns={["edit", "delete"]}
              />
            )}
            tablePopup={(item) => [
              {
                popupTitle: "Delete Message",
                PopupContent: (
                  <div className="text-xl py-5">
                    Are you sure you want to delete this message?
                  </div>
                ),
                popupActionText: "Delete",
                popupAction: async () => {
                  await deleteMessage.mutateAsync(item as formMessage);
                },
              },
              {
                popupTitle: "Edit Message",
                PopupContent: (
                  <EditItems
                    data={item as formMessage}
                    setData={setEditMessage}
                  />
                ),
                popupActionText: "Edit",
                popupAction: async () => {
                  await edit.mutateAsync(undefined);
                },
              },
            ]}
            filterContent={(handleChange) => (
              <>
                <input
                  id="patient"
                  onChange={handleChange}
                  placeholder="Patient Name"
                  type="text"
                />
              </>
            )}
            setFilterData={setFilterData}
            filterAction={refetch}
            isPending={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
const EditItems = ({
  data,
  setData,
}: {
  data: formMessage | Record<string, any>;
  setData: Dispatch<SetStateAction<formMessage | Record<string, any>>>;
}) => {
  const Items: FormItem<formMessage, keyof formMessage>[] = [
    {
      key: "reply",
      text: "Reply",
      item: (inputData: string, handleChange) => (
        <textarea
          id="reply"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
          placeholder="Message"
        />
      ),
    },
  ];
  const [formData, setFormData] = useState<formMessage | Record<string, any>>(
    data
  );
  useEffect(() => {
    setData(formData);
  }, [formData]);
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

export default ClientMessages;
