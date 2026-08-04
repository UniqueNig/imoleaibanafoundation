import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/lib/models/GalleryItem";
import GalleryGrid from "@/app/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Imole Aibana Foundation",
  description: "Photos and videos from our outreach activities and community engagements.",
};

export default async function GalleryPage() {
  await connectDB();
  const items = await GalleryItem.find({ published: true }).sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
            Our Work
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
            Gallery
          </h1>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80 dark:text-white/70 sm:text-lg">
            Photos and videos from our outreach activities and the communities we serve.
          </p>
        </div>

        <div className="mt-14">
          {items.length === 0 ? (
            <p className="text-center text-sm text-navy-700/60 dark:text-white/50">
              Nothing published yet — check back soon.
            </p>
          ) : (
            <GalleryGrid
              items={items.map((item) => ({
                id: String(item._id),
                caption: item.caption,
                category: item.category,
                type: item.type === "video" ? "video" : "photo",
                url: item.media?.url ?? "",
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
