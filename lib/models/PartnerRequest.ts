import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";

const partnerRequestSchema = new Schema(
  {
    organizationName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    partnershipType: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["new", "contacted"], default: "new" },
  },
  { timestamps: true }
);

partnerRequestSchema.index({ status: 1, createdAt: -1 });

export type PartnerRequest = InferSchemaType<typeof partnerRequestSchema>;

export default (models.PartnerRequest as mongoose.Model<PartnerRequest>) ??
  model<PartnerRequest>("PartnerRequest", partnerRequestSchema);
