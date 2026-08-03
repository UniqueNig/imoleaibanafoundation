import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signSessionToken,
  verifySessionToken,
} from "./lib/session";

// UX convenience only — keeps a logged-out visitor from seeing the admin
// shell flash before redirecting. It is NOT the security boundary: Server
// Actions invoked from an admin page are not covered by this matcher, so
// every admin Server Action/Route Handler independently calls
// requireAdmin() from lib/auth.ts.
//
// This is also where sliding-expiry cookie refresh happens: Next.js forbids
// mutating cookies during a Server Component render (lib/auth.ts's
// getSession() is read-only for that reason), but proxy is allowed to set
// cookies on the response, and it runs on every /admin/** request.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();
  const refreshedToken = await signSessionToken(session);
  response.cookies.set(SESSION_COOKIE_NAME, refreshedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
