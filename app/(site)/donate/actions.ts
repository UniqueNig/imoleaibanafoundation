"use server";

import { z } from "zod";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { initializeTransaction } from "@/lib/paystack";

export type DonateActionState = { error: string } | undefined;

const donateSchema = z.object({
  amount: z.coerce.number().min(100, "Minimum donation is ₦100."),
  email: z.string().trim().email("Enter a valid email address."),
  name: z.string().trim().optional(),
});

export async function initializeDonation(
  _prevState: DonateActionState,
  formData: FormData
): Promise<DonateActionState> {
  const parsed = donateSchema.safeParse({
    amount: formData.get("amount"),
    email: formData.get("email"),
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const reference = `iaf_${randomUUID()}`;

  await connectDB();
  await Donation.create({
    reference,
    amount: parsed.data.amount,
    email: parsed.data.email,
    donorName: parsed.data.name ?? "",
    status: "pending",
  });

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  let authorizationUrl: string;
  try {
    const result = await initializeTransaction({
      email: parsed.data.email,
      amountKobo: Math.round(parsed.data.amount * 100),
      reference,
      callbackUrl: `${origin}/donate/callback`,
      metadata: { donorName: parsed.data.name ?? "" },
    });
    authorizationUrl = result.authorization_url;
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Could not start payment. Please try again.",
    };
  }

  redirect(authorizationUrl);
}
