"use client";

import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link2,
  ImagePlus,
  Undo2,
  Redo2,
} from "lucide-react";

type Props = {
  name: string;
  initialContent?: string;
};

export default function RichTextEditor({ name, initialContent = "" }: Props) {
  const [html, setHtml] = useState(initialContent);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
      TiptapImage,
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none px-4 py-3 focus:outline-none min-h-[220px]",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  function handleImageUploaded(editor: Editor, result: CloudinaryUploadWidgetResults) {
    if (typeof result.info === "object" && result.info?.secure_url) {
      editor.chain().focus().setImage({ src: result.info.secure_url }).run();
    }
  }

  function handleAddLink(editor: Editor) {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  if (!editor) {
    return (
      <div className="min-h-[260px] animate-pulse rounded-2xl border border-navy-950/10 bg-navy-950/[0.03] dark:border-white/10 dark:bg-white/5" />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-950/10 dark:border-white/10">
      <div className="flex flex-wrap items-center gap-1 border-b border-navy-950/10 bg-navy-950/[0.03] p-2 dark:border-white/10 dark:bg-white/5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="Heading 3"
        >
          <Heading3 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bullet list">
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Numbered list">
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleAddLink(editor)} active={editor.isActive("link")} label="Link">
          <Link2 size={15} />
        </ToolbarButton>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result) => handleImageUploaded(editor, result)}
        >
          {({ open }) => (
            <ToolbarButton onClick={() => open()} label="Insert image">
              <ImagePlus size={15} />
            </ToolbarButton>
          )}
        </CldUploadWidget>
        <div className="mx-1 h-5 w-px bg-navy-950/10 dark:bg-white/10" />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} label="Undo">
          <Undo2 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} label="Redo">
          <Redo2 size={15} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />

      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950"
          : "text-navy-700 hover:bg-navy-950/10 dark:text-white/70 dark:hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
