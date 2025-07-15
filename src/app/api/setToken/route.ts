import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/firebase/adminConfig";
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await adminAuth.verifyIdToken(body?.token);

    (await cookies()).set({
      name: "token",
      value: body?.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json({ status: "Invalid token" }, { status: 500 });
  }
}
