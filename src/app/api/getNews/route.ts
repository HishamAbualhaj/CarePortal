import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
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

      const snapshot = await adminDB.collection("news").get();
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
