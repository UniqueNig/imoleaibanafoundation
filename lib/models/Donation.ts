import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";

const donationSchema = new Schema(
  {
    reference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true }, // Naira, not kobo
    email: { type: String, required: true, trim: true, lowercase: true },
    donorName: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    channel: { type: String, trim: true, default: "" },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

donationSchema.index({ status: 1, createdAt: -1 });

export type Donation = InferSchemaType<typeof donationSchema>;

export default (models.Donation as mongoose.Model<Donation>) ?? model<Donation>("Donation", donationSchema);
