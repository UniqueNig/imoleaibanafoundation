import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";
import slugify from "slugify";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, trim: true, default: "" },
    description: { type: String, default: "" }, // sanitized TipTap HTML
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, trim: true, default: "" },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.index({ published: 1, startDate: 1 });

// Slug is derived once at creation and left stable afterwards — editing the
// title later shouldn't silently break a URL someone already bookmarked or
// shared. There's no manual slug field in the admin UI (yet).
eventSchema.pre("validate", async function () {
  if (this.slug) return;

  const base = slugify(this.title ?? "", { lower: true, strict: true }) || "event";
  let candidate = base;
  let suffix = 2;

  const EventModel = this.constructor as mongoose.Model<unknown>;
  while (await EventModel.exists({ slug: candidate })) {
    candidate = `${base}-${suffix++}`;
  }
  this.slug = candidate;
});

export type Event = InferSchemaType<typeof eventSchema>;

export default (models.Event as mongoose.Model<Event>) ?? model<Event>("Event", eventSchema);
