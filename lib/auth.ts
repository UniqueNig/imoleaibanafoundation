import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "./session";

export type { SessionPayload };

export async function createSessionCookie(payload: SessionPayload) {
  const token = await signSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

// Read-only: Next.js forbids mutating cookies during a Server Component
// render, so this deliberately does NOT re-issue the cookie — that would
// throw when called from a layout/page (the primary caller, via
// requireAdmin()). Sliding-expiry refresh instead happens in proxy.ts,
// which runs on every /admin/** request and is allowed to set response
// cookies.
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** The real security boundary — call this at the top of every admin Server
 * Action and Route Handler. proxy.ts only prevents the logged-out UI from
 * flashing; it does not protect Server Actions on its own. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
