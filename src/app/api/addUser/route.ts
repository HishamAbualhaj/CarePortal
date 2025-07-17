import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDB } from "@/firebase/adminConfig";
import useUpload from "@/hooks/useUpload";
import withAuth from "@/lib/withAuth";

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

      if (!body?.password || body.password.length < 6) {
        await useUpload(body?.fileName, "delete");
        return NextResponse.json({
          status: false,
          msg: "Password is too short. It should be at least 6 characters.",
        });
      }

      const userCreation = await adminAuth.createUser({
        displayName: body?.name,
        email: body?.email,
        password: body?.password,
        emailVerified: false,
      });

      await adminAuth.setCustomUserClaims(userCreation.uid, {
        role: "user",
      });

      await adminDB.collection("users").doc(userCreation.uid).set({
        id: userCreation.uid,
        name: body?.name,
        email: body?.email,
        role: "user",
        date: body?.date,
        gender: body?.gender,
        image_url: body?.image_url,
        fileName: body?.fileName,
        status: "inactive",
        mobile: body?.mobile,
        diseases: body?.diseases,
      });
      return NextResponse.json({
        status: true,
        msg: "User created successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
