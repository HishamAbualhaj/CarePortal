import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
import { type Query, type DocumentData } from "firebase-admin/firestore";
export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      if (user.role !== "admin" && user.role !== "doctor") {
        return NextResponse.json(
          {
            status: false,
            msg: "Authentication credentials are wrong",
          },
          { status: 401 }
        );
      }
      let queryRef: Query<DocumentData> = adminDB.collection("messages");
      if (body?.patient) {
        queryRef = queryRef.where("patient", "==", body.patient);
      }

      const snapshot = await queryRef.get();

      const messageData: Record<string, any>[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const messageWithDoctor = await Promise.all(
        messageData.map(async (message) => {
          const snapshot = await adminDB
            .collection("doctors")
            .doc(message.doctor_id)
            .get();

          return {
            ...message,
            doctor: snapshot?.data()?.name || "Unknown",
          };
        })
      );

      return NextResponse.json({ status: true, msg: messageWithDoctor });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
