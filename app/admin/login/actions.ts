"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { createSessionCookie } from "@/lib/auth";

export type LoginState = { error: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  await connectDB();
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createSessionCookie({ userId: user._id.toString(), role: user.role });
  redirect("/admin");
}
