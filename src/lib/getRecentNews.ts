import { adminDB } from "@/firebase/adminConfig";
import { Response } from "@/types/adminTypes";

export async function getRecentNews(): Promise<Response> {
  try {
    const snapshot = await adminDB
      .collection("news")
      .orderBy("created_at", "desc")
      .limit(4)
      .get();

    const newsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { msg: newsData, status: true };
  } catch (error) {
    return { msg: "Something went wrong", status: false };
  }
}
