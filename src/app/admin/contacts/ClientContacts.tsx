"use client";
import React, { useContext, useEffect, useState } from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { AuthContext } from "@/context/AuthContextUser";
import { formContact, Response } from "@/types/adminTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
function ClientContacts() {
  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);

  const useContactMutation = (
    apiFn: (
      url: string | null,
      token: string,
      data?: formContact
    ) => Promise<Response>,
    stateData: formContact | Record<string, any>,
    text: string,
    token: string,
    type?: string
  ) => {
    return useMutation({
      mutationFn: async (data?: formContact): Promise<Response> => {
        if (type === "delete") {
          return await apiFn("", token, data);
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
  const deleteContact = async (url: string | null, token: string) => {
    return await useFetch("/api/deleteContact", "DELETE", {}, token);
  };

  const deleteMutation = useContactMutation(
    deleteContact,
    {},
    "Contact Message deleted",
    userToken,
    "delete"
  );
  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      return await useFetch("/api/getContacts", "GET", {}, userToken);
    },
    enabled: !!userToken,
  });
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 w-full bg-secondary">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
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
                },
              },
            ]}
            filterContent={(handleChange, idChange) => (
              <>
                <input
                  id="id"
                  onChange={handleChange}
                  placeholder="ID"
                  type="text"
                />
                <input
                  disabled={idChange}
                  className={`${idChange ? "opacity-50" : ""}`}
                  onChange={handleChange}
                  placeholder="Username"
                  type="text"
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientContacts;
