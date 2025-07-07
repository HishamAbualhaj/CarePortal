"use client";
import React, { useState } from "react";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import useUpload from "@/hooks/useUpload";
import Image from "next/image";

interface Response {
  status: boolean;
  msg: string;
}

type formData = {
  image_url: string | null;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  gender: string;
  status: string;
  date: string;
  diseases: string;
  fileName: string | null;
};
function ClientUsers({ data }: { data: any[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<formData>({
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === "file") {
      const currentFile = e.target.files?.[0] ?? null;
      setFile(currentFile);
      if (currentFile) {
        const tempUrl = URL.createObjectURL(currentFile);
        setTempImageUrl(tempUrl);

        setFormData((prev) => ({
          ...prev,
          fileName: currentFile.name,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };
  const createUser = async (url: string | null): Promise<Response> => {
    const { confirmPassword, ...data } = formData;
    return await useFetch("/api/addUser", "POST", { ...data, image_url: url });
  };

  const addUserMutation = useMutation<Response>({
    mutationFn: async (): Promise<Response> => {
      if (!formData.mobile.startsWith("+")) {
        toast.error("Mobile number wrong formate");
        return {} as Response;
      }
      if (
        !formData.name ||
        !formData.email ||
        !formData.mobile ||
        !formData.date
      ) {
        toast.error("Fields are required");
        return {} as Response;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return {} as Response;
      }
      const url = await useUpload(file);
      return await createUser(url);
    },
    onSuccess: (data) => {
      if (!data || Object.keys(data).length === 0) return;
      if (data.status) {
        toast.success(data?.msg || "User added successfully!");
        return;
      }

      toast.error(data?.msg || "User added successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const items = [
    {
      text: "Image",
      item: (
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
      text: "Name",
      item: (
        <input
          id="name"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      ),
    },
    {
      text: "Email",
      item: (
        <input
          id="email"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      ),
    },
    {
      text: "Password",
      item: (
        <input
          id="password"
          className="bg-gray-100 border-none"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      ),
    },
    {
      text: "Confirm Password",
      item: (
        <input
          id="confirmPassword"
          className="bg-gray-100 border-none"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      ),
    },
    {
      text: "Mobile",
      item: (
        <input
          id="mobile"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      ),
    },
    {
      text: "Gender",
      item: (
        <select
          id="gender"
          className="bg-gray-100 border-none"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ),
    },
    {
      text: "Status",
      item: (
        <select
          id="status"
          className="bg-gray-100 border-none"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Sick">Sick</option>
          <option value="Good">Good</option>
        </select>
      ),
    },
    {
      text: "Birthday",
      item: (
        <input
          id="date"
          className="bg-gray-100 border-none"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      ),
    },
    {
      text: "Diseases",
      item: (
        <select
          id="diseases"
          className="bg-gray-100 border-none"
          value={formData.diseases}
          onChange={handleChange}
        >
          <option value="d1">Disease 1</option>
          <option value="d2">Disease 2</option>
        </select>
      ),
    },
  ];
  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar />
      <div className="flex-1 w-full bg-secondary relative">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "image_url", label: "Image" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "mobile", label: "Mobile" },
              { key: "gender", label: "Gender" },
              { key: "status", label: "Status" },
              { key: "birthday", label: "Birthday" },
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
            tablePopup={() => [
              {
                popupTitle: "Delete User",
                popupContent: "Are you sure you want to delete this user?",
                popupActionText: "Delete",
                popupAction: () => {},
              },
              {
                popupTitle: "Edit User",
                popupContent: items,
                popupActionText: "Edit",
                popupAction: () => {},
              },
            ]}
            btnText="Add User"
            mainPopup={{
              popupTitle: "Add User",
              popupContent: items,
              popupActionText: `${
                addUserMutation.isPending ? "Loading ... " : "Add user"
              }`,
              popupAction: async () => {
                await addUserMutation.mutateAsync();
              },
            }}
            data={[{ id: "1" }]}
            panelTitle="Users"
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
                <select
                  className={`${idChange ? "opacity-50" : ""}`}
                  disabled={idChange}
                  onChange={handleChange}
                  name=""
                  id=""
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientUsers;
