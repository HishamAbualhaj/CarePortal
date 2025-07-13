import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
export async function GET(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      let snapshot = null;
      if (user.role === "user") {
        snapshot = await adminDB
          .collection("appointment")
          .where("status", "==", "available")
          .get();
      } else {
        snapshot = await adminDB.collection("appointment").get();
      }

      const appointmentData: Record<string, any>[] = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      const appointmentWithDoctor = await Promise.all(
        appointmentData.map(async (appt) => {
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

      console.log(appointmentWithDoctor);
      return NextResponse.json({ status: true, msg: appointmentWithDoctor });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
