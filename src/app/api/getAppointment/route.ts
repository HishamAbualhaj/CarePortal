import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
import {
  type Query,
  type DocumentData,
} from "firebase-admin/firestore";
export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      let snapshot = null;
      if (user.role === "user") {
        snapshot = await adminDB
          .collection("appointment")
          .where("status", "==", "available")
          .get();
      } else {
        let queryRef: Query<DocumentData> = adminDB.collection("appointment");

        if (body?.status) {
          queryRef = queryRef.where("status", "==", body.status);
        }
        if (body?.date) {
          queryRef = queryRef.where("date", "==", body.date);
        }

        snapshot = await queryRef.get();
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
