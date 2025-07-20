import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDB } from "@/firebase/adminConfig";
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    let tokenAge = 60 * 60 * 24 * 7; // 7 days
    const userDataFromToken = await adminAuth.verifyIdToken(body?.token);
    if (body?.type === "unset") {
      tokenAge = 0;
      await adminDB
        .collection(
          `${userDataFromToken?.role === "doctor" ? "doctors" : "users"}`
        )
        .doc(userDataFromToken.uid)
        .update({
          status: false,
        });
    } else {
      await adminDB
        .collection(
          `${userDataFromToken?.role === "doctor" ? "doctors" : "users"}`
        )
        .doc(userDataFromToken.uid)
        .update({
          status: true,
        });
    }

    const userData = await adminDB
      .collection(
        `${userDataFromToken?.role === "doctor" ? "doctors" : "users"}`
      )
      .doc(userDataFromToken.uid)
      .get();
    (await cookies()).set({
      name: "token",
      value: body?.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenAge,
    });

    return NextResponse.json({ status: "success", msg: userData.data() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "Invalid token", msg: "Can't set token" },
      { status: 500 }
    );
  }
}
