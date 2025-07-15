import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const doctorsRef = adminDB.collection("doctors");
    let queryRef: FirebaseFirestore.Query = doctorsRef;
    if (body?.country) {
      queryRef = queryRef.where("country", "==", body?.country);
    }

    if (body?.speciality) {
      queryRef = queryRef.where("speciality", "==", body?.speciality);
    }

    if (body?.gender) {
      queryRef = queryRef.where("gender", "==", body?.gender);
    }

    let snapshot = null;
    if (body?.limit) {
      snapshot = await queryRef.limit(body?.limit).get();
    } else {
      snapshot = await queryRef.get();
    }

    let doctorsData: Record<string, any>[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (body?.search) {
      const s = body?.search.toLowerCase();
      doctorsData = doctorsData.filter((doc) =>
        doc.name?.toLowerCase().includes(s)
      );
    }

    return NextResponse.json({ status: true, msg: doctorsData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
