import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();

      const currentAppt = await adminDB
        .collection("appointment")
        .doc(body.id)
        .get();

      if (currentAppt.data()?.patient_id === body.patient_id) {
        await adminDB.collection("appointment").doc(body.id).delete();
      }
      return NextResponse.json({ status: true, msg: "Appointment deleted" });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
