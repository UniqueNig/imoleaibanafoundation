import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import ProgrammeForm from "../../ProgrammeForm";

export default async function EditProgrammePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const programme = await Programme.findById(id).lean();
  if (!programme) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Edit Programme</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{programme.title}</p>

      <div className="mt-8">
        <ProgrammeForm
          programme={{
            id: String(programme._id),
            title: programme.title,
            excerpt: programme.excerpt ?? "",
            description: programme.description ?? "",
            icon: programme.icon ?? "Sparkles",
            coverImageUrl: programme.coverImage?.url ?? "",
            coverImagePublicId: programme.coverImage?.publicId ?? "",
            published: programme.published ?? false,
          }}
        />
      </div>
    </div>
  );
}
