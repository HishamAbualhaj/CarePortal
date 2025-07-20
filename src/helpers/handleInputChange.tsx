import { Dispatch, SetStateAction } from "react";

export const handleChange = <T,>(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setData: Dispatch<SetStateAction<T | Record<string, any>>>,
  setFile?: Dispatch<SetStateAction<File | null>>,
  setTempFileUrl?: Dispatch<SetStateAction<string | null>>
) => {
  const { id, value, type } = e.target;

  if (type === "file" && e.target instanceof HTMLInputElement) {
    const currentFile = e.target.files?.[0] ?? null;
    setFile?.(currentFile);
    if (currentFile) {
      const tempUrl = URL.createObjectURL(currentFile);
      setTempFileUrl?.(tempUrl);

      setData((prev: Record<string, any>) => ({
        ...prev,
        fileName: currentFile.name,
      }));
    }
  } else {
    setData((prev: Record<string, any>) => ({
      ...prev,
      [id]: value,
    }));
  }
};
