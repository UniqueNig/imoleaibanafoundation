import GalleryForm from "../GalleryForm";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Add to Gallery</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        Upload a photo or video. Only published items appear on the public site.
      </p>

      <div className="mt-8">
        <GalleryForm />
      </div>
    </div>
  );
}
