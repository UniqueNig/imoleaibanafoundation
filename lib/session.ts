import { SignJWT, jwtVerify } from "jose";

// Shared, runtime-agnostic session token logic — no `next/headers` import
// here so this can be used from proxy.ts (root, runs outside the normal
// request-render context) as well as from lib/auth.ts (Server
// Components/Actions/Route Handlers).

export const SESSION_COOKIE_NAME = "session";
export const SESSION_TTL_SECONDS = 60 * 60 * 2; // 2h, refreshed on each authenticated request

export type SessionPayload = {
  userId: string;
  role: string;
};

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Missing SESSION_SECRET environment variable");
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.userId !== "string" || typeof payload.role !== "string") {
      return null;
    }
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}
