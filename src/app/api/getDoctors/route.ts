import { adminDB } from "@/firebase/adminConfig";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "@/lib/withAuth";
import { type Query, type DocumentData } from "firebase-admin/firestore";
export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();
      if (user.role !== "admin") {
        return NextResponse.json(
          {
            status: false,
            msg: "Authentication credentials are wrong",
          },
          { status: 401 }
        );
      }
      let queryRef: Query<DocumentData> = adminDB.collection("doctors");

      if (body?.name) {
        queryRef = queryRef.where("name", "==", body.name);
      }

      if (body?.gender) {
        queryRef = queryRef.where("gender", "==", body.gender);
      }

      const snapshot = await queryRef.get();
      const doctorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json({ status: true, msg: doctorData });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
