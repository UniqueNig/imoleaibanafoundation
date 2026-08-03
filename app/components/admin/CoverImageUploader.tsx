"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";

type Props = {
  urlFieldName: string;
  publicIdFieldName: string;
  initialUrl?: string;
  initialPublicId?: string;
  label?: string;
};

export default function CoverImageUploader({
  urlFieldName,
  publicIdFieldName,
  initialUrl = "",
  initialPublicId = "",
  label = "Cover image",
}: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [publicId, setPublicId] = useState(initialPublicId);

  return (
    <div>
      <label className="block text-sm font-medium text-navy-950 dark:text-white">{label}</label>

      <input type="hidden" name={urlFieldName} value={url} readOnly />
      <input type="hidden" name={publicIdFieldName} value={publicId} readOnly />

      <div className="mt-1.5">
        {url && (
          <div className="relative mb-2 w-full max-w-sm overflow-hidden rounded-xl border border-navy-950/10 dark:border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-40 w-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setUrl("");
                setPublicId("");
              }}
              aria-label="Remove image"
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
              {url ? "Replace image" : "Upload image"}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
