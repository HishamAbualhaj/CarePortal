import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";

export async function PUT(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      if (user.role !== "admin" && user.role !== "doctor") {
        return NextResponse.json(
          {
            status: false,
            msg: "Authentication credentials are wrong",
          },
          { status: 401 }
        );
      }
      const body = await req.json();

      await adminDB.collection("appointment").doc(body.id).update(body);

      return NextResponse.json({
        status: true,
        msg: "Appointment updated successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
