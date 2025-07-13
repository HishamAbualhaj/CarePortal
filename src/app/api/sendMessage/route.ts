import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (user, req) => {
      const body = await req.json();

      await adminDB.collection("messages").add(body);

      return NextResponse.json({ status: true, msg: "Message sent" });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
