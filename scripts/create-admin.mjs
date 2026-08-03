import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { MONGODB_URI, ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD } = process.env;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI — set it in .env.local first");
}
if (!ADMIN_SEED_EMAIL || !ADMIN_SEED_PASSWORD) {
  throw new Error(
    "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in .env.local before running this script"
  );
}

// Minimal inline schema, deliberately not importing lib/models/User.ts —
// this is a plain Node script (no Next.js/TypeScript loader), so it defines
// just enough of the shape to upsert the document. Keep in sync with
// lib/models/User.ts if that schema changes.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

const User = mongoose.models.User ?? mongoose.model("User", userSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);

  const passwordHash = await bcrypt.hash(ADMIN_SEED_PASSWORD, 12);
  const email = ADMIN_SEED_EMAIL.toLowerCase().trim();

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { passwordHash, role: "admin" }, $setOnInsert: { name: "Admin" } },
    { upsert: true, returnDocument: "after" }
  );

  console.log(`Admin user ready: ${user.email}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
