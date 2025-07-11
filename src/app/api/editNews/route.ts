import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/firebase/adminConfig";
import withAuth from "@/lib/withAuth";

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

      const updatedNews: Record<string, any> = {
        title: body?.title,
        description: body?.description,
      };
      if (body?.image_url) {
        updatedNews.image_url = body?.image_url;
      }

      await adminDB.collection("news").doc(body.id).update(updatedNews);
      return NextResponse.json({
        status: true,
        msg: "News created successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
