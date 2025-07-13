import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
import formatDate from "@/helpers/formDate";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await adminDB
      .collection("contacts")
      .add({ ...body, sent_at: formatDate(new Date()) });

    return NextResponse.json({
      status: true,
      msg: "Contact sent successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
