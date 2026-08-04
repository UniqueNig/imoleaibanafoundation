import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { sendEmail } from "@/lib/resend";
import { donationReceiptEmail } from "@/lib/emailTemplates";

// Paystack calls this server-to-server on payment events. This — not the
// browser redirect in app/(site)/donate/callback — is the reliable source of
// truth for whether a donation actually succeeded, since a user can close
// their browser before the redirect completes but the webhook still fires.
export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return new Response("Server misconfigured", { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
  const signatureValid =
    !!signature &&
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!signatureValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const data = event.data;
    await connectDB();
    const donation = await Donation.findOne({ reference: data.reference });
    if (donation && donation.status !== "success") {
      donation.status = "success";
      donation.channel = data.channel ?? "";
      donation.paidAt = data.paid_at ? new Date(data.paid_at) : new Date();
      await donation.save();

      await sendEmail({
        to: donation.email,
        subject: "Your donation receipt",
        html: donationReceiptEmail({
          donorName: donation.donorName ?? "",
          amount: donation.amount,
          reference: donation.reference,
          paidAt: donation.paidAt,
        }),
      });
    }
  }

  return new Response("OK", { status: 200 });
}
