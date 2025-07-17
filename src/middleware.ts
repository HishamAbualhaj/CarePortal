import { NextResponse, type NextRequest } from "next/server";
// import { adminAuth } from "@/firebase/adminConfig";
import { jwtDecode } from "jwt-decode";
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded: any = jwtDecode(token);
    const userRole = decoded.role || decoded.customClaims?.role || "user";
    console.log("user role", userRole);
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      pathname.startsWith("/admin") &&
      userRole !== "admin" &&
      userRole !== "doctor"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/admin")) {
      if (userRole === "admin") return NextResponse.next();

      if (userRole === "doctor") {
        const allowedDoctorPaths = [
          "/admin/appointments",
          "/admin/messages",
          "/admin/news",
        ];

        const isDoctorAllowed = allowedDoctorPaths.some((route) =>
          pathname.startsWith(route)
        );

        if (isDoctorAllowed) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/admin/appointments", req.url));
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error(error);

    return NextResponse.json({ status: false, msg: "Something went wrong" });
  }
}
export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
