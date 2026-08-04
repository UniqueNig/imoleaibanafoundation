import Link from "next/link";
import { Plus, Play } from "lucide-react";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/lib/models/GalleryItem";
import GalleryItemActions from "./GalleryItemActions";

export default async function GalleryListPage() {
  await connectDB();
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Gallery</h1>
          <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
            {items.length === 0 ? "No items yet." : `${items.length} item${items.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-2 rounded-xl bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-white dark:text-navy-950 dark:hover:bg-white/90"
        >
          <Plus size={16} />
          Add Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-navy-950/10 bg-white p-8 text-center text-sm text-navy-700/60 dark:border-white/10 dark:bg-navy-900 dark:text-white/50">
          Add your first photo or video to see it here.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={String(item._id)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-navy-950/10 dark:border-white/10"
            >
              {item.type === "video" ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={item.media?.url} className="h-full w-full object-cover" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.media?.url} alt="" className="h-full w-full object-cover" />
              )}

              {item.type === "video" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy-950/20">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
                    <Play size={16} className="ml-0.5 text-navy-950" fill="currentColor" />
                  </div>
                </div>
              )}

              <div
                className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  item.published ? "bg-emerald-500 text-white" : "bg-navy-950/70 text-white/80"
                }`}
              >
                {item.published ? "Published" : "Draft"}
              </div>

              <div className="absolute bottom-2 right-2">
                <GalleryItemActions
                  id={String(item._id)}
                  caption={item.caption ?? ""}
                  published={Boolean(item.published)}
                />
              </div>

              {item.caption && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-2.5 pt-6">
                  <p className="line-clamp-1 text-xs font-medium text-white">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
