"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import VolunteerApplication from "@/lib/models/VolunteerApplication";
import PartnerRequest from "@/lib/models/PartnerRequest";
import { sendEmail, notifyAdmin } from "@/lib/resend";
import {
  volunteerConfirmationEmail,
  volunteerAdminNotification,
  partnerConfirmationEmail,
  partnerAdminNotification,
} from "@/lib/emailTemplates";

export type FormActionState = { error?: string; success?: boolean } | undefined;

const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
});

export async function submitVolunteerApplication(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const parsed = volunteerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const areaOfInterest = String(formData.get("areaOfInterest") ?? "").trim();

  await connectDB();
  await VolunteerApplication.create({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: String(formData.get("phone") ?? "").trim(),
    areaOfInterest,
    availability: String(formData.get("availability") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  });

  revalidatePath("/admin/volunteers");

  await Promise.all([
    sendEmail({
      to: parsed.data.email,
      subject: "We received your volunteer application",
      html: volunteerConfirmationEmail(parsed.data.name),
    }),
    notifyAdmin(
      `New volunteer application from ${parsed.data.name}`,
      volunteerAdminNotification({ ...parsed.data, areaOfInterest })
    ),
  ]);

  return { success: true };
}

const partnerSchema = z.object({
  organizationName: z.string().trim().min(2, "Please enter your organization's name."),
  contactName: z.string().trim().min(2, "Please enter a contact name."),
  email: z.string().trim().email("Enter a valid email address."),
});

export async function submitPartnerRequest(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const parsed = partnerSchema.safeParse({
    organizationName: formData.get("organizationName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const partnershipType = String(formData.get("partnershipType") ?? "").trim();

  await connectDB();
  await PartnerRequest.create({
    organizationName: parsed.data.organizationName,
    contactName: parsed.data.contactName,
    email: parsed.data.email,
    phone: String(formData.get("phone") ?? "").trim(),
    partnershipType,
    message: String(formData.get("message") ?? "").trim(),
  });

  revalidatePath("/admin/partners");

  await Promise.all([
    sendEmail({
      to: parsed.data.email,
      subject: "We received your partnership request",
      html: partnerConfirmationEmail(parsed.data.contactName, parsed.data.organizationName),
    }),
    notifyAdmin(
      `New partner request from ${parsed.data.organizationName}`,
      partnerAdminNotification({ ...parsed.data, partnershipType })
    ),
  ]);

  return { success: true };
}
