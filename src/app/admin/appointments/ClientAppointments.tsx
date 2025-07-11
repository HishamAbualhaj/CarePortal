"use client";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { AuthContext } from "@/context/AuthContextUser";
import { formAppointment, FormItem } from "@/types/adminTypes";
import { handleChange } from "@/app/helpers/handleInputChange";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/types/adminTypes";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
function ClientAppointments() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);

  const [addAppointment, setAddAppointment] = useState<
    formAppointment | Record<string, any>
  >({
    doctor_id: "",
    patient_id: "",
    doctor: "",
    patient: "",
    date: "",
    time: "",
    status: "",
  });

  const [editAppointment, setEditAppointment] = useState<
    formAppointment | Record<string, any>
  >({
    doctor_id: "",
    patient_id: "",
    doctor: "",
    date: "",
    time: "",
    status: "",
  });

  const useAppointmentMutation = (
    apiFn: (url: string | null, token: string) => Promise<Response>,
    stateData: formAppointment | Record<string, any>,
    text: string,
    token: string
  ) => {
    const userMutation = useMutation<Response>({
      mutationFn: async (): Promise<Response> => {
        if (!stateData.doctor_id || !stateData.time || !stateData.date) {
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

    return userMutation;
  };

  const addAppointmentFn = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      "/api/addAppointment",
      "POST",
      {
        ...addAppointment,
      },
      token
    );
  };

  const editAppointmentFn = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      "/api/editAppointment",
      "PUT",
      editAppointment,
      token
    );
  };

  const add = useAppointmentMutation(
    addAppointmentFn,
    addAppointment,
    "Appointment added successfully",
    userToken
  );
  const edit = useAppointmentMutation(
    editAppointmentFn,
    editAppointment,
    "Appointment updated successfully",
    userToken
  );

  const deleteMutation = useMutation({
    mutationFn: async (data: formAppointment) => {
      return await deleteAppointment(data, userToken);
    },
    onSuccess: (data) => {
      if (!data || Object.keys(data).length === 0) return;
      if (data.status) {
        toast.success("Appointment deleted successfully!");
        return;
      }
      if (typeof data?.msg === "string") toast.error(data?.msg || "");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const deleteAppointment = async (
    dataForDelete: formAppointment,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      "/api/deleteAppointment",
      "DELETE",
      {
        ...dataForDelete,
      },
      token
    );
  };

  const { data, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      return await useFetch("/api/getAppointment", "GET", {}, userToken);
    },
    enabled: !!userToken,
  });

  useEffect(() => {
    setIsLoading(edit.isPending);
  }, [edit.isPending]);
  useEffect(() => {
    setIsLoading(deleteMutation.isPending);
  }, [deleteMutation.isPending]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-1 w-full bg-secondary">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "doctor", label: "Doctor" },
              { key: "patient", label: "Patient" },
              { key: "date", label: "Date" },
              { key: "time", label: "Time" },
              { key: "status", label: "Status" },
              { key: "message", label: "Message" },
              { key: "action", label: "Actions" },
            ]}
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
                popupTitle: "Delete Appointment",
                PopupContent: (
                  <div className="text-xl py-5">
                    Are you sure you want to delete this appointment?
                  </div>
                ),
                popupActionText: "Delete",
                popupAction: async () => {
                  await deleteMutation.mutateAsync(item as formAppointment);
                  refetch();
                },
              },
              {
                popupTitle: "Edit Appointment",
                PopupContent: (
                  <EditItems
                    data={item as formAppointment}
                    setData={setEditAppointment}
                  />
                ),
                popupActionText: "Edit",
                popupAction: async () => {
                  await edit.mutateAsync();
                  refetch();
                },
              },
            ]}
            panelTitle="All Appointments"
            btnText="Add Appointment"
            mainPopup={{
              popupTitle: "Add Appointment",
              PopupContent: (
                <AddItems data={addAppointment} setData={setAddAppointment} />
              ),
              popupActionText: `${add.isPending ? "Loading ..." : "Add"}`,
              popupAction: async () => {
                await add.mutateAsync();
              },
            }}
            data={typeof data?.msg === "string" ? [] : data?.msg ?? []}
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
                  placeholder="Doctor Name"
                  type="text"
                />
                <input
                  disabled={idChange}
                  className={`${idChange ? "opacity-50" : ""}`}
                  onChange={handleChange}
                  placeholder="Patient Name"
                  type="text"
                />
              </>
            )}
            isPending={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

const AddItems = ({
  data,
  setData,
}: {
  data: formAppointment | Record<string, any>;
  setData: Dispatch<SetStateAction<formAppointment | Record<string, any>>>;
}) => {
  const Items: FormItem<formAppointment, keyof formAppointment>[] = [
    {
      key: "doctor_id",
      text: "Doctor",
      item: (inputData: string, handleChange) => (
        <select
          id="doctor_id"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
        >
          <option value="Doctor 1">Doctor 1 </option>
          <option value="Doctor 2">Doctor 2</option>
        </select>
      ),
    },
    {
      key: "date",
      text: "Date",
      item: (inputData: string, handleChange) => (
        <input
          id="date"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
          type="date"
          placeholder="Date of appointment"
        />
      ),
    },
    {
      key: "time",
      text: "Time",
      item: (inputData: string, handleChange) => (
        <input
          id="time"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Date of appointment"
        />
      ),
    },
  ];
  const [formData, setFormData] = useState<
    formAppointment | Record<string, any>
  >(data);
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

const EditItems = ({
  data,
  setData,
}: {
  data: formAppointment | Record<string, any>;
  setData: Dispatch<SetStateAction<formAppointment | Record<string, any>>>;
}) => {
  const Items: FormItem<formAppointment, keyof formAppointment>[] = [
    {
      key: "doctor_id",
      text: "Doctor",
      item: (inputData: string, handleChange) => (
        <select
          id="doctor_id"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
        >
          <option value="1">Doctor 1</option>
          <option value="2">Doctor 2</option>
        </select>
      ),
    },
    {
      key: "date",
      text: "Date",
      item: (inputData: string, handleChange) => (
        <input
          id="date"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
          type="date"
          placeholder="Date of appointment"
        />
      ),
    },
    {
      key: "time",
      text: "Time",
      item: (inputData: string, handleChange) => (
        <input
          id="time"
          onChange={handleChange}
          value={inputData}
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Date of appointment"
        />
      ),
    },
  ];
  const [formData, setFormData] = useState<
    formAppointment | Record<string, any>
  >(data);
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

export default ClientAppointments;
