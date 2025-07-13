import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";
import formatDate from "@/helpers/formDate";
export async function POST(req: NextRequest) {
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
      const body = await req.json();

      await adminDB.collection("news").add({
        ...body,
        created_at: formatDate(new Date()),
      });
      return NextResponse.json({
        status: true,
        msg: "News created successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
