import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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

      await adminDB.collection("contacts").doc(body.id).delete();

      return NextResponse.json({ status: true, msg: "Contact deleted" });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
