import mongoose, { Schema, type InferSchemaType, models, model } from "mongoose";

const galleryItemSchema = new Schema(
  {
    caption: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    type: { type: String, enum: ["photo", "video"], required: true, default: "photo" },
    media: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

galleryItemSchema.index({ published: 1, createdAt: -1 });

export type GalleryItem = InferSchemaType<typeof galleryItemSchema>;

export default (models.GalleryItem as mongoose.Model<GalleryItem>) ??
  model<GalleryItem>("GalleryItem", galleryItemSchema);
