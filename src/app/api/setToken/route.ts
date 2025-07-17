import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDB } from "@/firebase/adminConfig";
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    let tokenAge = 60 * 60 * 24 * 7; // 7 days
    const userData = await adminAuth.verifyIdToken(body?.token);
    if (body?.type === "unset") {
      tokenAge = 0;
      await adminDB
        .collection(`${userData?.role === "doctor" ? "doctors" : "users"}`)
        .doc(userData.uid)
        .update({
          status: false,
        });
    } else {
      await adminDB
        .collection(`${userData?.role === "doctor" ? "doctors" : "users"}`)
        .doc(userData.uid)
        .update({
          status: true,
        });
    }
    await adminAuth.verifyIdToken(body?.token);

    (await cookies()).set({
      name: "token",
      value: body?.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenAge,
    });

    return NextResponse.json({ status: "success", msg: userData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "Invalid token", msg: "Can't set token" },
      { status: 500 }
    );
  }
}
