import Link from "next/link";
import { Plus, User } from "lucide-react";
import { connectDB } from "@/lib/db";
import TeamMember from "@/lib/models/TeamMember";
import TeamMemberRowActions from "./TeamMemberRowActions";

export default async function TeamListPage() {
  await connectDB();
  const members = await TeamMember.find().sort({ order: 1, createdAt: 1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Team</h1>
          <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
            {members.length === 0
              ? "No team members yet."
              : `${members.length} member${members.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 rounded-xl bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-white dark:text-navy-950 dark:hover:bg-white/90"
        >
          <Plus size={16} />
          New Team Member
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-950/10 bg-white dark:border-white/10 dark:bg-navy-900">
        {members.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-700/60 dark:text-white/50">
            Add your first team member to see them here.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-950/10 text-xs uppercase tracking-wide text-navy-700/50 dark:border-white/10 dark:text-white/40">
              <tr>
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={String(member._id)}
                  className="border-b border-navy-950/5 last:border-0 dark:border-white/5"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-950/5 text-navy-700 dark:bg-white/10 dark:text-white/70">
                        {member.photo?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.photo.url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <span className="font-medium text-navy-950 dark:text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-navy-700/80 dark:text-white/70">{member.role}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        member.published
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "bg-navy-950/5 text-navy-700/60 dark:bg-white/10 dark:text-white/50"
                      }`}
                    >
                      {member.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <TeamMemberRowActions
                        id={String(member._id)}
                        name={member.name}
                        published={Boolean(member.published)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
