"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import useUpload from "@/hooks/useUpload";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContextUser";
import { formUser as formData, FormItem } from "@/types/adminTypes";
import { handleChange } from "../../../helpers/handleInputChange";
import { Response } from "@/types/adminTypes";
import DashoardHeader from "@/components/layouts/dashboard/DashoardHeader";

function ClientUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);
  const [file, setFile] = useState<File | null>(null);

  const [addData, setAddData] = useState<formData | Record<string, any>>({
    image_url: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "+",
    gender: "Male",
    status: "Sick",
    date: "",
    diseases: "d1",
    fileName: "",
  });

  const [editData, setEditData] = useState<formData | Record<string, any>>({
    name: "",
    email: "",
    mobile: "+",
    gender: "Male",
    status: "Sick",
    date: "",
    diseases: "d1",
    fileName: "",
  });

  const useUserMutation = (
    apiFn: (url: string | null, token: string) => Promise<Response>,
    stateData: formData | Record<string, any>,
    text: string,
    token: string
  ) => {
    const userMutation = useMutation<Response>({
      mutationFn: async (): Promise<Response> => {
        if (!stateData.mobile.startsWith("+")) {
          toast.error("Mobile number wrong formate");
          return {} as Response;
        }
        if (
          !stateData.name ||
          !stateData.email ||
          !stateData.mobile ||
          !stateData.date
        ) {
          toast.error("Fields are required");
          return {} as Response;
        }

        if (stateData.password !== stateData.confirmPassword) {
          toast.error("Passwords do not match");
          return {} as Response;
        }
        let url = "";
        if (file) {
          url = (await useUpload(file)) || "";
        }

        return await apiFn(url, token);
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
  const createUser = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    const { confirmPassword, ...data } = addData;
    return await useFetch(
      "/api/addUser",
      "POST",
      {
        ...data,
        image_url: url,
      },
      token
    );
  };

  const updateUser = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    let updatedData = { ...editData };
    if (url) {
      updatedData = { ...editData, image_url: url };
    }
    return await useFetch("/api/editUser", "PUT", updatedData, token);
  };

  const deleteUser = async (
    dataForDelete: formData,
    token: string
  ): Promise<Response> => {
    await useUpload(dataForDelete.fileName, "delete");
    return await useFetch(
      "/api/deleteUser",
      "DELETE",
      {
        ...dataForDelete,
      },
      token
    );
  };

  const deleteMutation = useMutation({
    mutationFn: async (data: formData) => {
      return await deleteUser(data, userToken);
    },
    onSuccess: (data) => {
      if (!data || Object.keys(data).length === 0) return;
      if (data.status) {
        toast.success("User deleted successfully!");
        return;
      }
      if (typeof data?.msg === "string") toast.error(data?.msg || "");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const add = useUserMutation(
    createUser,
    addData,
    "User added successfully!",
    userToken
  );

  const edit = useUserMutation(
    updateUser,
    editData,
    "User updated successfully!",
    userToken
  );

  const [filterData, setFilterData] = useState<Record<string, any>>({
    name: "",
    gender: "",
  });

  const {
    data,
    refetch,
    isFetching: isFetchingData,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await useFetch(
        "/api/getUsers",
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
    setIsLoading(deleteMutation.isPending);
  }, [deleteMutation.isPending]);
  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar />
      <div className="flex-1 w-full bg-secondary relative">
        <DashoardHeader name={user?.user?.name ?? ""} />
        <div className="mt-5">
          {isFetchingData && (
            <div className="py-2 xl:px-10 px-5 text-xl animate-pulse">
              Loading data ...
            </div>
          )}
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "image_url", label: "Image" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "mobile", label: "Mobile" },
              { key: "gender", label: "Gender" },
              { key: "status", label: "Status" },
              { key: "date", label: "Birthday" },
              { key: "diseases", label: "Diseases" },
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
                popupTitle: "Delete User",
                PopupContent: (
                  <div className="text-xl py-5">
                    Are you sure you want to delete this user ?
                  </div>
                ),
                popupActionText: "Delete",
                popupAction: async () => {
                  await deleteMutation.mutateAsync(item as formData);
                  refetch();
                },
              },
              {
                popupTitle: "Edit User",
                PopupContent: (
                  <EditItems
                    setEditFile={setFile}
                    setData={setEditData}
                    data={item as formData}
                  />
                ),
                popupActionText: "Edit",
                popupAction: async () => {
                  await edit.mutateAsync();
                  refetch();
                },
              },
            ]}
            btnText="Add User"
            mainPopup={{
              popupTitle: "Add User",
              PopupContent: (
                <AddItems
                  setAddFile={setFile}
                  setData={setAddData}
                  data={addData as formData}
                />
              ),
              popupActionText: `${add.isPending ? "Loading ... " : "Add user"}`,
              popupAction: async () => {
                await add.mutateAsync();
                refetch();
              },
            }}
            data={typeof data?.msg === "string" ? [] : data?.msg ?? []}
            panelTitle="Users"
            filterContent={(handleChange) => (
              <>
                <input
                  id="name"
                  onChange={handleChange}
                  placeholder="Username"
                  type="text"
                />
                <select onChange={handleChange} id="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
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
const AddItems = ({
  data,
  setData,
  setAddFile,
}: {
  data: formData;
  setData: Dispatch<SetStateAction<formData | Record<string, any>>>;
  setAddFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<formData | Record<string, any>>(
    data
  );

  useEffect(() => {
    setData(formData);
  }, [formData]);

  useEffect(() => {
    setAddFile(file);
  }, [file]);

  const itemsArr: FormItem<formData, keyof formData>[] = [
    {
      key: "image_url",
      text: "Image",
      item: (inputData: string, handleChange) => (
        <div className="relative">
          <input
            id="image_url"
            className="absolute left-0 h-full w-full opacity-0"
            type="file"
            onChange={handleChange}
          />
          {tempImageUrl ? (
            <Image
              alt="user profile"
              width={200}
              height={200}
              src={tempImageUrl}
            />
          ) : (
            <FontAwesomeIcon
              className="text-8xl bg-gray-300 text-gray-400 p-4"
              icon={faUser}
            />
          )}
        </div>
      ),
    },
    {
      key: "name",
      text: "Name",
      item: (inputData: string, handleChange) => (
        <input
          id="name"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Name"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "email",
      text: "Email",
      item: (inputData: string, handleChange) => (
        <input
          id="email"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Email"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "password",
      text: "Password",
      item: (inputData: string, handleChange) => (
        <input
          id="password"
          className="bg-gray-100 border-none"
          type="password"
          placeholder="Password"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "confirmPassword",
      text: "Confirm Password",
      item: (inputData: string, handleChange) => (
        <input
          id="confirmPassword"
          className="bg-gray-100 border-none"
          type="password"
          placeholder="Confirm password"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "mobile",
      text: "Mobile",
      item: (inputData: string, handleChange) => (
        <input
          id="mobile"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Mobile"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "gender",
      text: "Gender",
      item: (inputData: string, handleChange) => (
        <select
          id="gender"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ),
    },
    {
      key: "status",
      text: "Status",
      item: (inputData: string, handleChange) => (
        <select
          id="status"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="Sick">Sick</option>
          <option value="Good">Good</option>
        </select>
      ),
    },
    {
      key: "date",
      text: "Birthday",
      item: (inputData: string, handleChange) => (
        <input
          id="date"
          className="bg-gray-100 border-none"
          type="date"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "diseases",
      text: "Diseases",
      item: (inputData: string, handleChange) => (
        <select
          id="diseases"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="d1">Disease 1</option>
          <option value="d2">Disease 2</option>
        </select>
      ),
    },
  ];

  return (
    <>
      {itemsArr?.map((item, i) => (
        <div key={i} className="flex items-center py-4 gap-4 justify-between">
          <div className="text-gray-700">{item.text}</div>
          <div className="flex-1 md:min-w-[400px] max-w-[400px]">
            {item.item(formData[item.key] || "", (e) => {
              handleChange(e, setFormData, setFile, setTempImageUrl);
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
  setEditFile,
}: {
  data: formData;
  setData: Dispatch<SetStateAction<formData | Record<string, any>>>;
  setEditFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<formData | Record<string, any>>(
    data
  );

  useEffect(() => {
    setData(formData);
  }, [formData]);

  useEffect(() => {
    setEditFile(file);
  }, [file]);

  const itemsArr: FormItem<formData, keyof formData>[] = [
    {
      key: "image_url",
      text: "Image",
      item: (inputData: string, handleChange) => (
        <div className="relative">
          <input
            id="image_url"
            className="absolute left-0 h-full w-full opacity-0"
            type="file"
            onChange={handleChange}
          />
          {tempImageUrl ? (
            <Image
              alt="news image"
              width={200}
              height={200}
              src={tempImageUrl}
            />
          ) : inputData ? (
            <Image alt="news image" width={200} height={200} src={inputData} />
          ) : (
            <FontAwesomeIcon
              className="text-8xl bg-gray-300 text-gray-400 p-4"
              icon={faUser}
            />
          )}
        </div>
      ),
    },
    {
      key: "name",
      text: "Name",
      item: (inputData: string, handleChange) => (
        <input
          id="name"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Name"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "email",
      text: "Email",
      item: (inputData: string, handleChange) => (
        <input
          id="email"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Email"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "mobile",
      text: "Mobile",
      item: (inputData: string, handleChange) => (
        <input
          id="mobile"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Mobile"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "gender",
      text: "Gender",
      item: (inputData: string, handleChange) => (
        <select
          id="gender"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ),
    },
    {
      key: "status",
      text: "Status",
      item: (inputData: string, handleChange) => (
        <select
          id="status"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="Sick">Sick</option>
          <option value="Good">Good</option>
        </select>
      ),
    },
    {
      key: "date",
      text: "Birthday",
      item: (inputData: string, handleChange) => (
        <input
          id="date"
          className="bg-gray-100 border-none"
          type="date"
          value={inputData}
          onChange={handleChange}
        />
      ),
    },
    {
      key: "diseases",
      text: "Diseases",
      item: (inputData: string, handleChange) => (
        <select
          id="diseases"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="d1">Disease 1</option>
          <option value="d2">Disease 2</option>
        </select>
      ),
    },
  ];

  return (
    <>
      {itemsArr?.map((item, i) => (
        <div key={i} className="flex items-center py-4 gap-4 justify-between">
          <div className="text-gray-700">{item.text}</div>
          <div className="flex-1 md:min-w-[400px] max-w-[400px]">
            {item.item(formData[item.key] || "", (e) => {
              handleChange(e, setFormData, setFile, setTempImageUrl);
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientUsers;
