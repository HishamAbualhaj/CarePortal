import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const snapshot = await adminDB.collection("news").doc(body.id).get();

    const newsData = {
      id: snapshot.id,
      ...snapshot.data(),
    };
    return NextResponse.json({
      status: true,
      msg: newsData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
