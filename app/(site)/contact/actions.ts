"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";
import { sendEmail, notifyAdmin } from "@/lib/resend";
import { contactConfirmationEmail, contactAdminNotification } from "@/lib/emailTemplates";

export type ContactActionState = { error: string } | { success: true } | undefined;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(5, "Message is too short."),
});

export async function submitContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const subject = String(formData.get("subject") ?? "").trim();

  await connectDB();
  await ContactMessage.create({
    name: parsed.data.name,
    email: parsed.data.email,
    subject,
    message: parsed.data.message,
  });

  revalidatePath("/admin/contact");

  await Promise.all([
    sendEmail({
      to: parsed.data.email,
      subject: "We received your message",
      html: contactConfirmationEmail(parsed.data.name),
    }),
    notifyAdmin(
      `New contact message from ${parsed.data.name}`,
      contactAdminNotification({ ...parsed.data, subject })
    ),
  ]);

  return { success: true };
}
