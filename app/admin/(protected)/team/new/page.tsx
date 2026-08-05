import TeamMemberForm from "../TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">New Team Member</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        Add a team member. Only published members appear on the public site.
      </p>

      <div className="mt-8">
        <TeamMemberForm />
      </div>
    </div>
  );
}
