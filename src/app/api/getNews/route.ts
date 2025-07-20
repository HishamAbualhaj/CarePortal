 import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
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
      let queryRef: Query<DocumentData> = adminDB.collection("news");
      if (body?.date) {
        queryRef = queryRef.where("created_at", "==", body?.date);
      }
      if (body?.title) {
        queryRef = queryRef
          .orderBy("title")
          .startAt(body?.title)
          .endAt(body?.title + "\uf8ff");
      }

      const snapshot = await queryRef.get();
      const newsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json({
        status: true,
        msg: newsData,
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
