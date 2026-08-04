import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";
import slugify from "slugify";
import { PROGRAMME_ICON_NAMES } from "../programmeIcons";

const programmeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, trim: true, default: "" },
    description: { type: String, default: "" }, // sanitized TipTap HTML
    icon: { type: String, enum: PROGRAMME_ICON_NAMES, default: "Sparkles" },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

programmeSchema.index({ published: 1, createdAt: -1 });

// Slug is derived once at creation and left stable afterwards, same
// reasoning as Event/Post: editing the title later shouldn't break a URL
// someone already bookmarked or shared.
programmeSchema.pre("validate", async function () {
  if (this.slug) return;

  const base = slugify(this.title ?? "", { lower: true, strict: true }) || "programme";
  let candidate = base;
  let suffix = 2;

  const ProgrammeModel = this.constructor as mongoose.Model<unknown>;
  while (await ProgrammeModel.exists({ slug: candidate })) {
    candidate = `${base}-${suffix++}`;
  }
  this.slug = candidate;
});

export type Programme = InferSchemaType<typeof programmeSchema>;

export default (models.Programme as mongoose.Model<Programme>) ??
  model<Programme>("Programme", programmeSchema);
