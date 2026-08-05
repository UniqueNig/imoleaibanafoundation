import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import TeamMember from "@/lib/models/TeamMember";
import TeamMemberForm from "../../TeamMemberForm";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const member = await TeamMember.findById(id).lean();
  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Edit Team Member</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{member.name}</p>

      <div className="mt-8">
        <TeamMemberForm
          member={{
            id: String(member._id),
            name: member.name,
            role: member.role,
            bio: member.bio ?? "",
            photoUrl: member.photo?.url ?? "",
            photoPublicId: member.photo?.publicId ?? "",
            order: member.order ?? 0,
            published: member.published ?? false,
          }}
        />
      </div>
    </div>
  );
}
