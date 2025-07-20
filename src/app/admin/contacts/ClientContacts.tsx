"use client";
import React, { useContext, useEffect, useState } from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { AuthContext } from "@/context/AuthContextUser";
import { formContact, Response } from "@/types/adminTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import DashoardHeader from "@/components/layouts/dashboard/DashoardHeader";
function ClientContacts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);

  const useContactMutation = (
    apiFn: (
      url: string | null,
      token: string,
      data: formContact
    ) => Promise<Response>,
    text: string,
    token: string,
    type?: string
  ) => {
    return useMutation({
      mutationFn: async (data: formContact): Promise<Response> => {
        if (type === "delete") {
          return await apiFn("", token, data);
        }

        return await apiFn("", token, {} as formContact);
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
  const deleteContact = async (
    url: string | null,
    token: string,
    data: formContact
  ) => {
    return await useFetch("/api/deleteContact", "DELETE", data, token);
  };

  const deleteMutation = useContactMutation(
    deleteContact,
    "Contact Message deleted",
    userToken,
    "delete"
  );

  const [filterData, setFilterData] = useState<Record<string, any>>({
    patient: "",
    date: "",
  });
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      return await useFetch(
        "/api/getContact",
        "POST",
        { ...filterData },
        userToken
      );
    },
    enabled: !!userToken,
  });

  useEffect(() => {
    setIsLoading(deleteMutation.isPending);
  }, [deleteMutation.isPending]);

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
              { key: "subject", label: "Subject" },
              { key: "message", label: "Message" },
              { key: "sent_at", label: "Sent At" },
              { key: "action", label: "Actions" },
            ]}
            panelTitle="All Contacts Messages"
            data={typeof data?.msg === "string" ? [] : data?.msg ?? []}
            customAction={(item, setPopUp, tablePopup) => (
              <ActionButtons
                item={item}
                tablePopup={tablePopup}
                setPopUp={setPopUp}
                btns={["delete"]}
              />
            )}
            tablePopup={(item) => [
              {
                popupTitle: "Delete Contact",
                PopupContent: (
                  <div className="text-xl py-5">
                    Are you sure you want to delete this contact?
                  </div>
                ),
                popupActionText: "Delete",
                popupAction: async () => {
                  await deleteMutation.mutateAsync(item as formContact);
                  refetch();
                },
              },
            ]}
            filterContent={(handleChange) => (
              <>
                <input
                  id="patient"
                  onChange={handleChange}
                  placeholder="Username"
                  type="text"
                />
                <input id="date" onChange={handleChange} type="date" />
              </>
            )}
            filterAction={refetch}
            setFilterData={setFilterData}
            isPending={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientContacts;
