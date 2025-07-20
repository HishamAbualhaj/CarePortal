import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      const currentMessage = await adminDB
        .collection("messages")
        .doc(body.id)
        .get();

      if (currentMessage.data()?.patient_id === body.patient_id) {
        await adminDB.collection("messages").doc(body.id).delete();
      }

      return NextResponse.json({ status: true, msg: "Message deleted" });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
