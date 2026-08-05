import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, trim: true, default: "" },
    photo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    // Lower sorts first. Lets admins control display order (e.g. Founder
    // before directors) instead of being stuck with creation order.
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

teamMemberSchema.index({ published: 1, order: 1, createdAt: 1 });

export type TeamMember = InferSchemaType<typeof teamMemberSchema>;

export default (models.TeamMember as mongoose.Model<TeamMember>) ??
  model<TeamMember>("TeamMember", teamMemberSchema);
