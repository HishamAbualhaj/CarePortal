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
import { handleChange } from "../../../helpers/handleInputChange";
import useFetch from "@/hooks/useFetch";
import { Response } from "@/types/adminTypes";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import DashoardHeader from "@/components/layouts/dashboard/DashoardHeader";
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
  const [filterData, setFilterData] = useState<Record<string, any>>({
    status: "",
    date: "",
  });
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      return await useFetch(
        "/api/getAppointment",
        "POST",
        { ...filterData },
        userToken
      );
    },
    enabled: !!userToken,
  });

  const doctors = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      return await useFetch("/api/getDoctors", "POST", {}, userToken);
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
       <DashoardHeader name={user?.user?.name ?? ""} />
        <div className="mt-5">
          {(isFetching || doctors.isFetching) && (
            <div className="py-2 xl:px-10 px-5 text-xl animate-pulse">
              Loading data ...
            </div>
          )}
          {doctors.isSuccess && Array.isArray(doctors.data?.msg) && (
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
                      doctorData={
                        typeof doctors.data?.msg === "string"
                          ? []
                          : (doctors.data?.msg as Record<string, any>[]) ?? []
                      }
                      data={item as formAppointment}
                      setData={setEditAppointment}
                      user_data={{
                        role: user?.user?.role ?? "",
                        doctor_id: user?.user?.uid ?? "",
                      }}
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
                  <AddItems
                    doctorData={
                      typeof doctors.data?.msg === "string"
                        ? []
                        : (doctors.data?.msg as Record<string, any>[]) ?? []
                    }
                    data={addAppointment}
                    setData={setAddAppointment}
                    user_data={{
                      role: user?.user?.role ?? "",
                      doctor_id: user?.user?.uid ?? "",
                    }}
                  />
                ),
                popupActionText: `${add.isPending ? "Loading ..." : "Add"}`,
                popupAction: async () => {
                  await add.mutateAsync();
                  refetch();
                },
              }}
              data={typeof data?.msg === "string" ? [] : data?.msg ?? []}
              filterContent={(handleChange) => (
                <>
                  <select onChange={handleChange} id="status">
                    <option value="">Select value</option>
                    <option value="booked">booked</option>
                    <option value="available">available</option>
                  </select>
                  <input id="date" onChange={handleChange} type="date" />
                </>
              )}
              setFilterData={setFilterData}
              filterAction={refetch}
              isPending={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
const Items: FormItem<formAppointment, keyof formAppointment>[] = [
  {
    key: "doctor_id",
    text: "Doctor",
    item: (inputData: string, handleChange, data) => (
      <select
        id="doctor_id"
        onChange={handleChange}
        value={inputData}
        className="bg-gray-100 border-none"
      >
        <option value="">Select Doctor</option>
        {data?.map((item, i) => (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        ))}
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

const ItemsDoctor: FormItem<formAppointment, keyof formAppointment>[] = [
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
const AddItems = ({
  data,
  setData,
  doctorData,
  user_data,
}: {
  data: formAppointment | Record<string, any>;
  setData: Dispatch<SetStateAction<formAppointment | Record<string, any>>>;
  doctorData?: Record<string, any>[];
  user_data: { role: string; doctor_id: string };
}) => {
  const [formData, setFormData] = useState<
    formAppointment | Record<string, any>
  >(data);
  useEffect(() => {
    setData(formData);
    if (user_data.role === "doctor") {
      setData((prev) => ({ ...prev, doctor_id: user_data.doctor_id }));
    }
  }, [formData]);

  return (
    <>
      {user_data.role === "doctor"
        ? ItemsDoctor?.map((item, i) => (
            <div
              key={i}
              className="flex items-center py-4 gap-4 justify-between"
            >
              <div className="text-gray-700">{item.text}</div>
              <div className="flex-1 md:min-w-[400px] max-w-[400px]">
                {item.item(formData[item.key] || "", (e) => {
                  handleChange(e, setFormData);
                })}
              </div>
            </div>
          ))
        : Items?.map((item, i) => (
            <div
              key={i}
              className="flex items-center py-4 gap-4 justify-between"
            >
              <div className="text-gray-700">{item.text}</div>
              <div className="flex-1 md:min-w-[400px] max-w-[400px]">
                {item.item(
                  formData[item.key] || "",
                  (e) => {
                    handleChange(e, setFormData);
                  },
                  doctorData
                )}
              </div>
            </div>
          ))}
    </>
  );
};

const EditItems = ({
  data,
  setData,
  doctorData,
  user_data,
}: {
  data: formAppointment | Record<string, any>;
  setData: Dispatch<SetStateAction<formAppointment | Record<string, any>>>;
  doctorData?: Record<string, any>[];
  user_data: { role: string; doctor_id: string };
}) => {
  const [formData, setFormData] = useState<
    formAppointment | Record<string, any>
  >(data);
  useEffect(() => {
    setData(formData);
    if (user_data.role === "doctor") {
      setData((prev) => ({ ...prev, doctor_id: user_data.doctor_id }));
    }
  }, [formData]);
  return (
    <>
      {user_data.role === "doctor"
        ? ItemsDoctor?.map((item, i) => (
            <div
              key={i}
              className="flex items-center py-4 gap-4 justify-between"
            >
              <div className="text-gray-700">{item.text}</div>
              <div className="flex-1 md:min-w-[400px] max-w-[400px]">
                {item.item(formData[item.key] || "", (e) => {
                  handleChange(e, setFormData);
                })}
              </div>
            </div>
          ))
        : Items?.map((item, i) => (
            <div
              key={i}
              className="flex items-center py-4 gap-4 justify-between"
            >
              <div className="text-gray-700">{item.text}</div>
              <div className="flex-1 md:min-w-[400px] max-w-[400px]">
                {item.item(
                  formData[item.key] || "",
                  (e) => {
                    handleChange(e, setFormData);
                  },
                  doctorData
                )}
              </div>
            </div>
          ))}
    </>
  );
};

export default ClientAppointments;
