import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/lib/models/GalleryItem";
import GalleryForm from "../../GalleryForm";

export default async function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const item = await GalleryItem.findById(id).lean();
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Edit Gallery Item</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        {item.caption || "Untitled item"}
      </p>

      <div className="mt-8">
        <GalleryForm
          item={{
            id: String(item._id),
            caption: item.caption ?? "",
            category: item.category ?? "",
            mediaUrl: item.media?.url ?? "",
            mediaPublicId: item.media?.publicId ?? "",
            mediaType: item.type === "video" ? "video" : "photo",
            published: item.published ?? false,
          }}
        />
      </div>
    </div>
  );
}
