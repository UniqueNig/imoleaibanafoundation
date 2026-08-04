import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "read"], default: "new" },
  },
  { timestamps: true }
);

contactMessageSchema.index({ status: 1, createdAt: -1 });

export type ContactMessage = InferSchemaType<typeof contactMessageSchema>;

export default (models.ContactMessage as mongoose.Model<ContactMessage>) ??
  model<ContactMessage>("ContactMessage", contactMessageSchema);
