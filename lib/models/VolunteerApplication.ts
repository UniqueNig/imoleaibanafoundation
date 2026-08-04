import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";

const volunteerApplicationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    areaOfInterest: { type: String, trim: true, default: "" },
    availability: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["new", "contacted"], default: "new" },
  },
  { timestamps: true }
);

volunteerApplicationSchema.index({ status: 1, createdAt: -1 });

export type VolunteerApplication = InferSchemaType<typeof volunteerApplicationSchema>;

export default (models.VolunteerApplication as mongoose.Model<VolunteerApplication>) ??
  model<VolunteerApplication>("VolunteerApplication", volunteerApplicationSchema);
