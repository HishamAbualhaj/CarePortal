import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      const snapshot = await adminDB
        .collection("appointment")
        .where("status", "==", "available")
        .where("patient_id", "==", `${body.id}`)
        .get();
      const appointmentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const appointmentWithDoctor = await Promise.all(
        appointmentData.map(async (appt: Record<string, any>) => {
          const snapshot = await adminDB
            .collection("doctors")
            .doc(appt.doctor_id)
            .get();

          return {
            ...appt,
            doctor: snapshot?.data()?.name || "Unknown",
          };
        })
      );

      return NextResponse.json({ status: true, msg: appointmentWithDoctor });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
