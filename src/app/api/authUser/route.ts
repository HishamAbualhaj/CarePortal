import { NextRequest, NextResponse } from "next/server";
import { authUser } from "@/firebase/auth";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await authUser({ email: data.email, password: data.password });

    return NextResponse.json(
      { message: "User Logined Successfully", data: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Faild to login" }, { status: 500 });
  }
}
