import type { Metadata } from "next";
import { Images } from "lucide-react";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/lib/models/GalleryItem";
import GalleryGrid from "@/app/components/GalleryGrid";
import PageHero from "@/app/components/PageHero";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from our outreach activities and community engagements.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    url: "/gallery",
    title: "Gallery | Imole Aibana Foundation",
    description: "Photos and videos from our outreach activities and community engagements.",
  },
};

export default async function GalleryPage() {
  await connectDB();
  const items = await GalleryItem.find({ published: true }).sort({ createdAt: -1 }).lean();

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Gallery"
        description="Photos and videos from our outreach activities and the communities we serve."
        photo={STOCK_PHOTOS.youthCelebration}
      />

      <div className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {items.length === 0 ? (
            <div className="mesh-hero relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-royal-400/25 blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold-400/25 blur-[90px]"
              />

              <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
                <div className="glass-gold flex h-14 w-14 items-center justify-center rounded-2xl">
                  <Images size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our gallery is just getting started</h3>
                <p className="text-sm leading-relaxed text-white/65">
                  We're gathering photos and videos from our outreach activities. Check back soon to
                  see the communities we serve.
                </p>
              </div>
            </div>
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
    </>
  );
}
