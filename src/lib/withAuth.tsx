import { adminAuth } from "@/firebase/adminConfig";
import { NextRequest, NextResponse } from "next/server";

interface FirebaseDecodedToken {
  uid: string;
  email?: string;
  role?: string;
  [key: string]: any;
}
async function withAuth(
  req: NextRequest,
  handler: (user: FirebaseDecodedToken, req: NextRequest) => Promise<Response>
): Promise<Response> {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { msg: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);

    return await handler(decodedToken as FirebaseDecodedToken, req);
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json(
      { msg: "Unauthorized or Invalid Token" },
      { status: 401 }
    );
  }
}

export default withAuth;
