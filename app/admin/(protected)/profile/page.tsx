import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await requireAdmin();

  await connectDB();
  const user = await User.findById(session.userId).lean();

  if (!user) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Profile</h1>
        <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">Account not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Profile</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        Update your name, email, and password.
      </p>

      <div className="mt-8">
        <ProfileForm user={{ name: user.name, email: user.email }} />
      </div>
    </div>
  );
}
