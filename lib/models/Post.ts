import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";
import slugify from "slugify";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, default: "" }, // sanitized TipTap HTML
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    tags: { type: [String], default: [] },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    published: { type: Boolean, default: false },
    // Set the first time `published` flips to true, kept stable afterwards —
    // used for public sort order so editing a draft for days doesn't make it
    // look "old" the moment it finally goes live.
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

postSchema.index({ published: 1, publishedAt: -1 });

postSchema.pre("validate", async function () {
  if (this.slug) return;

  const base = slugify(this.title ?? "", { lower: true, strict: true }) || "post";
  let candidate = base;
  let suffix = 2;

  const PostModel = this.constructor as mongoose.Model<unknown>;
  while (await PostModel.exists({ slug: candidate })) {
    candidate = `${base}-${suffix++}`;
  }
  this.slug = candidate;
});

postSchema.pre("save", function () {
  if (this.isModified("published") && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export type Post = InferSchemaType<typeof postSchema>;

export default (models.Post as mongoose.Model<Post>) ?? model<Post>("Post", postSchema);
