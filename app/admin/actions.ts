"use server";

import { clearSession } from "@/lib/auth";

// Deliberately does not redirect() here — the caller (a client component)
// awaits this, shows a toast, then navigates. Keeping the redirect
// server-side would skip the toast entirely since the page unmounts first.
export async function logout() {
  await clearSession();
}
