import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";

export async function PUT(req: NextRequest) {
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
      await adminDB
        .collection("messages")
        .doc(body.id)
        .update({ reply: body?.reply ?? "" });

      return NextResponse.json({
        status: true,
        msg: "Message updated successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
