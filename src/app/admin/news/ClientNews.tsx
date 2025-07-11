"use client";
import { handleChange } from "@/app/helpers/handleInputChange";
import ActionButtons from "@/components/layouts/dashboard/ActionButtons";
import AdminPanel from "@/components/layouts/dashboard/AdminPanel";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { AuthContext } from "@/context/AuthContextUser";
import { FormItem, formNews } from "@/types/adminTypes";
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import { Response } from "@/types/adminTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUpload from "@/hooks/useUpload";
import useFetch from "@/hooks/useFetch";
function ClientNews() {
  const user = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>("");
  useEffect(() => {
    setUserToken(user?.user?.token ?? "");
  }, [user]);
  const [file, setFile] = useState<File | null>(null);

  const [addData, setAddData] = useState<formNews | Record<string, any>>({
    image_url: "",
    title: "",
    description: "",
    fileName: "",
    doctor: "",
  });

  const [editData, setEditData] = useState<formNews | Record<string, any>>({
    image_url: "",
    title: "",
    description: "",
    fileName: "",
  });

  const useNewsMutation = (
    apiFn: (url: string | null, token: string) => Promise<Response>,
    stateData: formNews | Record<string, any>,
    text: string,
    token: string
  ) => {
    return useMutation<Response>({
      mutationFn: async (): Promise<Response> => {
        if (!stateData.title || !stateData.description) {
          toast.error("Fields are required");
          return {} as Response;
        }
        let url = "";
        if (file) {
          url = (await useUpload(file)) || "";
        }

        return await apiFn(url, token);
      },
      onSuccess: (data) => {
        handleSuccess(data, text);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const handleSuccess = (data: Response, text: string) => {
    if (!data || Object.keys(data).length === 0) return;
    if (data.status) {
      toast.success(text);
      return;
    }
    if (typeof data?.msg === "string") toast.error(data?.msg || text);
  };
  const createNews = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      "/api/addNews",
      "POST",
      {
        ...addData,
        image_url: url,
      },
      token
    );
  };

  const updateNews = async (
    url: string | null,
    token: string
  ): Promise<Response> => {
    let updatedData = { ...editData };
    if (url) {
      updatedData = { ...editData, image_url: url };
    }
    return await useFetch("/api/editNews", "PUT", updatedData, token);
  };

  const add = useNewsMutation(
    createNews,
    addData,
    "News added successfully!",
    userToken
  );

  const edit = useNewsMutation(
    updateNews,
    editData,
    "News updated successfully!",
    userToken
  );

  const deleteNews = async (
    dataForDelete: formNews,
    token: string
  ): Promise<Response> => {
    return await useFetch(
      "/api/deleteNews",
      "DELETE",
      {
        ...dataForDelete,
      },
      token
    );
  };

  const deleteMutation = useMutation({
    mutationFn: async (data: formNews) => {
      return await deleteNews(data, userToken);
    },
    onSuccess: (data) => {
      handleSuccess(data, "news deleted successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      return await useFetch("/api/getNews", "GET", {}, userToken);
    },
    enabled: !!userToken,
  });

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar />
      <div className="flex-1 w-full bg-secondary">
        <div className="bg-white py-[34px] shadow-main"></div>
        <div className="mt-5">
          <AdminPanel
            columns={[
              { key: "id", label: "ID" },
              { key: "image_url", label: "Image" },
              { key: "title", label: "Title" },
              { key: "doctor", label: "Doctor" },
              { key: "description", label: "Description" },
              { key: "created_at", label: "Publish Date" },
              { key: "action", label: "Actions" },
            ]}
            panelTitle="News"
            btnText="Add News"
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
                popupTitle: "Delete News",
                PopupContent: (
                  <div className="text-xl py-5">
                    Are you sure you want to delete this news?
                  </div>
                ),
                popupActionText: "Delete",
                popupAction: async () => {
                  await deleteMutation.mutateAsync(item as formNews);
                  refetch();
                },
              },
              {
                popupTitle: "Edit News",
                PopupContent: (
                  <EditItems
                    data={item as formNews}
                    setEditFile={setFile}
                    setData={setEditData}
                  />
                ),
                popupActionText: "Edit",
                popupAction: async () => {
                  await edit.mutateAsync();
                  refetch();
                },
              },
            ]}
            mainPopup={{
              popupTitle: "Add News",
              PopupContent: (
                <AddItems
                  data={addData as formNews}
                  setAddFile={setFile}
                  setData={setAddData}
                />
              ),
              popupActionText: `${add.isPending ? "Loading ... " : "Add"}`,
              popupAction: async () => {
                await add.mutateAsync();
                refetch();
              },
            }}
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
                  placeholder="title"
                  type="text"
                />
                <input
                  disabled={idChange}
                  className={`${idChange ? "opacity-50" : ""}`}
                  onChange={handleChange}
                  placeholder="Doctor Name"
                  type="text"
                />
              </>
            )}
            isPending={edit.isPending}
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
  data: formNews;
  setData: Dispatch<SetStateAction<formNews | Record<string, any>>>;
  setAddFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<formNews | Record<string, any>>(
    data
  );

  useEffect(() => {
    setData(formData);
  }, [formData]);

  useEffect(() => {
    setAddFile(file);
  }, [file]);

  const itemsArr: FormItem<formNews, keyof formNews>[] = [
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
      key: "title",
      text: "title",
      item: (inputData: string, handleChange) => (
        <input
          id="title"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={inputData}
        />
      ),
    },
    {
      key: "description",
      text: "Description",
      item: (inputData: string, handleChange) => (
        <textarea
          id="description"
          className="bg-gray-100 border-none"
          placeholder="Description"
          onChange={handleChange}
          value={inputData}
        />
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
  data: formNews;
  setData: Dispatch<SetStateAction<formNews | Record<string, any>>>;
  setEditFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<formNews | Record<string, any>>(
    data
  );

  useEffect(() => {
    setData(formData);
  }, [formData]);

  useEffect(() => {
    setEditFile(file);
  }, [file]);

  const itemsArr: FormItem<formNews, keyof formNews>[] = [
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
      key: "title",
      text: "title",
      item: (inputData: string, handleChange) => (
        <input
          id="title"
          className="bg-gray-100 border-none"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={inputData}
        />
      ),
    },
    {
      key: "description",
      text: "Description",
      item: (inputData: string, handleChange) => (
        <textarea
          id="description"
          className="bg-gray-100 border-none"
          placeholder="Description"
          onChange={handleChange}
          value={inputData}
        />
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

export default ClientNews;
