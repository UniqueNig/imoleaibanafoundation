"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";

type MediaType = "photo" | "video";

type Props = {
  urlFieldName: string;
  publicIdFieldName: string;
  typeFieldName: string;
  initialUrl?: string;
  initialPublicId?: string;
  initialType?: MediaType;
};

export default function GalleryMediaUploader({
  urlFieldName,
  publicIdFieldName,
  typeFieldName,
  initialUrl = "",
  initialPublicId = "",
  initialType = "photo",
}: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [publicId, setPublicId] = useState(initialPublicId);
  const [type, setType] = useState<MediaType>(initialType);

  return (
    <div>
      <label className="block text-sm font-medium text-navy-950 dark:text-white">Media</label>

      <input type="hidden" name={urlFieldName} value={url} readOnly />
      <input type="hidden" name={publicIdFieldName} value={publicId} readOnly />
      <input type="hidden" name={typeFieldName} value={type} readOnly />

      <div className="mt-1.5">
        {url && (
          <div className="relative mb-2 w-full max-w-sm overflow-hidden rounded-xl border border-navy-950/10 dark:border-white/10">
            {type === "video" ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={url} className="h-40 w-full object-cover" controls />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="h-40 w-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => {
                setUrl("");
                setPublicId("");
              }}
              aria-label="Remove media"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy-950/70 text-white transition-colors hover:bg-navy-950"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result) => {
            if (typeof result.info === "object" && result.info?.secure_url) {
              setUrl(result.info.secure_url);
              setPublicId(result.info.public_id ?? "");
              setType(result.info.resource_type === "video" ? "video" : "photo");
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center gap-2 rounded-xl border border-dashed border-navy-950/20 px-4 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:border-navy-950/40 dark:border-white/20 dark:text-white/70 dark:hover:border-white/40"
            >
              <ImagePlus size={16} />
              {url ? "Replace media" : "Upload photo or video"}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
