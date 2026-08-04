"use client";

import { useMemo, useState } from "react";
import { X, Play } from "lucide-react";

export type GalleryGridItem = {
  id: string;
  caption?: string;
  category?: string;
  type: "photo" | "video";
  url: string;
};

export default function GalleryGrid({ items }: { items: GalleryGridItem[] }) {
  const categories = useMemo(() => {
    const set = new Set(items.map((item) => item.category).filter(Boolean) as string[]);
    return ["All", ...Array.from(set)];
  }, [items]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryGridItem | null>(null);

  const filtered =
    activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950"
                  : "glass-light text-navy-700 dark:text-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-navy-700/60 dark:text-white/50">
          Nothing in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxItem(item)}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              {item.type === "video" ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={item.url} className="h-full w-full object-cover" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.caption ?? ""}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}

              {item.type === "video" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy-950/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                    <Play size={18} className="ml-0.5 text-navy-950" fill="currentColor" />
                  </div>
                </div>
              )}

              {item.caption && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="line-clamp-2 text-left text-xs font-medium text-white">{item.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-6"
          onClick={() => setLightboxItem(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxItem(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {lightboxItem.type === "video" ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={lightboxItem.url}
                className="max-h-[85vh] w-full rounded-2xl"
                controls
                autoPlay
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lightboxItem.url}
                alt={lightboxItem.caption ?? ""}
                className="max-h-[85vh] w-full rounded-2xl object-contain"
              />
            )}
            {lightboxItem.caption && (
              <p className="mt-3 text-center text-sm text-white/80">{lightboxItem.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
