import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebase/adminConfig";
import useUpload from "@/hooks/useUpload";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  
    if (!body?.password || body.password.length < 6) {
      await useUpload(body?.fileName, "delete");
      return NextResponse.json({
        status: false,
        msg: "Password is too short. It should be at least 6 characters.",
      });
    }

    const user = await adminAuth.createUser({
      displayName: body?.name,
      email: body?.email,
      password: body?.password,
      phoneNumber: body?.mobile,
      photoURL: body?.image_url,
      emailVerified: false,
    });

    await adminAuth.setCustomUserClaims(user.uid, {
      role: "user",
      date: body?.date,
      status: false,
      diseases: body?.diseases,
    });

    return NextResponse.json({
      status: true,
      msg: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
