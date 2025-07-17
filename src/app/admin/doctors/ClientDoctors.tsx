"use client";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormItem, formDoctor } from "@/types/adminTypes";
import Image from "next/image";
import { handleChange } from "../../../helpers/handleInputChange";
import { AuthContext } from "@/context/AuthContextUser";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUpload from "@/hooks/useUpload";
import { Response } from "@/types/adminTypes";
import useFetch from "@/hooks/useFetch";
import DashoardHeader from "@/components/layouts/dashboard/DashoardHeader";
function ClientDoctors() {
  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  const [addData, setAddData] = useState<formDoctor | Record<string, any>>({
    image_url: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "+",
    specialization: "",
    yearsofexperience: "",
    gender: "Male",
    city: "",
    date: "",
    desc: "",
    country_graduation: "",
    fileName: null,
  });

  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);
  const [file, setFile] = useState<File | null>(null);

  const useDoctorMutation = (
    apiFn: (url: string | null, token: string) => Promise<Response>,
    stateData: formDoctor | Record<string, any>,
    text: string,
    token: string
  ) => {
    return useMutation<Response>({
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
  };

  const createDoctor = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    const { confirmPassword, ...data } = addData;
    return await useFetch(
      "/api/addDoctor",
      "POST",
      {
        ...data,
        image_url: url,
      },
      token
    );
  };
  const add = useDoctorMutation(
    createDoctor,
    addData,
    "Doctor added successfully!",
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
    queryKey: ["doctors"],
    queryFn: async () => {
      return await useFetch(
        "/api/getDoctors",
        "POST",
        { ...filterData },
        userToken
      );
    },
    enabled: !!userToken,
  });

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar />
      <div className="flex-1 w-full bg-secondary">
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
              { key: "date", label: "Birthday" },
              { key: "city", label: "City" },
              { key: "country_graduation", label: "Country of Graduation" },
              { key: "specialization", label: "specialization" },
              { key: "yearsofexperience", label: "Years of Experience" },
              { key: "decs", label: "description" },
            ]}
            panelTitle="Doctors"
            btnText="Add Doctor"
            mainPopup={{
              popupTitle: "Add Doctor",
              PopupContent: (
                <AddDoctor
                  data={addData}
                  setData={setAddData}
                  setAddFile={setFile}
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
                <input
                  id="name"
                  onChange={handleChange}
                  placeholder="Doctor Name"
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
          />
        </div>
      </div>
    </div>
  );
}

const AddDoctor = ({
  data,
  setData,
  setAddFile,
}: {
  data: formDoctor | Record<string, any>;
  setData: Dispatch<SetStateAction<formDoctor | Record<string, any>>>;
  setAddFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<formDoctor | Record<string, any>>(
    data
  );

  useEffect(() => {
    setAddFile(file);
  }, [file]);

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const specializations = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Pediatrics",
    "Psychiatry",
    "Orthopedics",
    "Gastroenterology",
    "Oncology",
    "Endocrinology",
    "Pulmonology",
    "Urology",
    "Nephrology",
    "Ophthalmology",
    "Obstetrics and Gynecology",
    "Rheumatology",
  ];

  const countries = [
    "Algeria",
    "Bahrain",
    "Comoros",
    "Djibouti",
    "Egypt",
    "Iraq",
    "Jordan",
    "Kuwait",
    "Lebanon",
    "Libya",
    "Mauritania",
    "Morocco",
    "Oman",
    "Palestine",
    "Qatar",
    "Saudi Arabia",
    "Somalia",
    "Sudan",
    "Syria",
    "Tunisia",
    "United Arab Emirates",
    "Yemen",
    "Western Sahara",
  ];
  const items: FormItem<formDoctor, keyof formDoctor>[] = [
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
              alt="dcotor profile"
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
      key: "specialization",
      text: "specialization",
      item: (inputData: string, handleChange) => (
        <select
          id="specialization"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="">Select specialization</option>
          {specializations.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "yearsofexperience",
      text: "Years of Experience",
      item: (inputData: string, handleChange) => (
        <input
          id="yearsofexperience"
          className="bg-gray-100 border-none"
          type="number"
          placeholder="Years of Experience"
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
          value={inputData}
          onChange={handleChange}
          className="bg-gray-100 border-none"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ),
    },
    {
      key: "city",
      text: "City",
      item: (inputData: string, handleChange) => (
        <select
          id="city"
          className="bg-gray-100 border-none"
          value={inputData}
          onChange={handleChange}
        >
          <option value="">Select city</option>
          {countries.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
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
          onChange={handleChange}
          value={inputData}
        />
      ),
    },
    {
      key: "country_graduation",
      text: "Country of graduation",
      item: (inputData: string, handleChange) => (
        <input
          id="country_graduation"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Country of graduation"
          onChange={handleChange}
          value={inputData}
        />
      ),
    },
    {
      key: "desc",
      text: "Description",
      item: (inputData: string, handleChange) => (
        <textarea
          id="desc"
          placeholder="Description"
          className="bg-gray-100 border-none"
          onChange={handleChange}
          value={inputData}
        />
      ),
    },
  ];
  return (
    <>
      {items?.map((item, i) => (
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

export default ClientDoctors;
