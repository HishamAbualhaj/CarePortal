import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase/config";

async function useUpload(
  file: File | null | string,
  type: string = "upload"
): Promise<string | null> {
  if (!file) return null;

  let storageRef = null;
  if (typeof file === "string") {
    storageRef = ref(storage, `images/${file}`);
  } else {
    storageRef = ref(storage, `images/${file.name}`);
  }

  if (type === "upload" && typeof file !== "string") {
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
  }

  await deleteObject(storageRef);

  return "Image deleted";
}

export default useUpload;
