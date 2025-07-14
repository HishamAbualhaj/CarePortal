import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let snapshot = null;
    if (body?.search) {
      snapshot = await adminDB
        .collection("news")
        .orderBy("title")
        .orderBy("created_at", "desc")
        .startAt(body?.search)
        .endAt(body?.search + "\uf8ff")
        .limit(5)
        .get();
    } else {
      snapshot = await adminDB
        .collection("news")
        .orderBy("created_at", "desc")
        .limit(5)
        .get();
    }

    const newsData: Record<string, any>[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ status: true, msg: newsData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
