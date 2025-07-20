import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";

export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      await adminDB
        .collection("appointment")
        .doc(body?.id)
        .update({
          patient: body?.patient,
          patient_id: body?.patient_id,
          status: "booked",
          message: body?.message ?? "",
        });
      return NextResponse.json({
        status: true,
        msg: "Appointment picked successfully!",
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
