import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      const snapshot = await adminDB
        .collection("messages")
        .where("patient_id", "==", `${body.id}`)
        .get();
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
