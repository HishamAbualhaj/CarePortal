import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

type FirestoreDocInput = {
  data: Record<string, any>;
  docName: string;
  id?: string;
};

const createDataDoc = async ({ data, docName, id }: FirestoreDocInput) => {
  let userRef = null;
  let docRef = null;

  if (id) {
    userRef = doc(db, docName, id);
    await setDoc(userRef, data);
    return id;
  }

  userRef = collection(db, docName);
  docRef = await addDoc(userRef, data);

  return docRef;
};


export { createDataDoc };
