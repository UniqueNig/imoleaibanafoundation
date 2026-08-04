import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.RESEND_FROM_EMAIL || "Imole Aibana Foundation <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL;

// Email is a courtesy side-effect of a form submission, not the point of it —
// a missing key or a Resend outage should never fail the donation/contact/
// volunteer/partner action itself, so failures are logged, not thrown.
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!resend) {
    console.warn(`[resend] RESEND_API_KEY not set, skipping email "${subject}" to ${to}`);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("[resend] Failed to send email:", err);
  }
}

export async function notifyAdmin(subject: string, html: string) {
  if (!ADMIN_EMAIL) {
    console.warn(`[resend] ADMIN_NOTIFICATION_EMAIL not set, skipping admin notification "${subject}"`);
    return;
  }
  await sendEmail({ to: ADMIN_EMAIL, subject, html });
}
