import { createDataDoc } from "@/firebase/db";
import { auth } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = await createDataDoc({ data, docName: "users" });

    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return NextResponse.json(
      { message: "User Added Successfully", id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        NextResponse.json(
          { message: "Email is already in use" },
          { status: 500 }
        );
      }
      return;
    }
    NextResponse.json({ message: "Faild to sign up" }, { status: 500 });
    console.error(error);
  }
}
