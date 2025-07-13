import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
export async function GET(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      if (user.role !== "admin") {
        return NextResponse.json(
          {
            status: false,
            msg: "Authentication credentials are wrong",
          },
          { status: 401 }
        );
      }
      const snapshot = await adminDB.collection("messages").get();
      const messageData: Record<string, any>[]  = snapshot.docs.map((doc) => ({
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
