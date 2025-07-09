import { adminDB, adminAuth } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

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

      await adminAuth.updateUser(body.id, {
        displayName: body?.name,
        email: body?.email,
      });

      const updatedUser: Record<string, any> = {
        name: body?.name,
        email: body?.email,
        date: body?.date,
        gender: body?.gender,
        mobile: body?.mobile,
        diseases: body?.diseases,
        fileName: body?.fileName,
      };
      if (body?.image_url) {
        updatedUser.image_url = body?.image_url;
      }

      await adminDB.collection("users").doc(body.id).update(updatedUser);

      return NextResponse.json({ status: true, msg: "User updated" });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
