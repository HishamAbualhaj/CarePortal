import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

async function useUpload(file: File | undefined): Promise<string | undefined> {
  if (!file) return;

  const storageRef = ref(storage, `images/${file.name}`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
}

export default useUpload;
