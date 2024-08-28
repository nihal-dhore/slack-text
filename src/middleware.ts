import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface CustomNextRequest extends NextRequest {
  userId: string;
}

export default async function middleware(req: CustomNextRequest) {
  const session = await auth();


  if (!session?.user) {

    if (req.nextUrl.pathname.startsWith("/api/v1")) return NextResponse.json({
      error: "Unauthorized Request",
    }, {
      status: 401
    });
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // req.userId = session.user.userId;

  NextResponse.next();
}

export const config = {
  matcher: ['/((?!|api/auth|auth|_next/static|_next/image|.*\\.png$).*)']
};