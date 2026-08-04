import ProgrammeForm from "../ProgrammeForm";

export default function NewProgrammePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">New Programme</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        Create a programme. Only published programmes appear on the public site.
      </p>

      <div className="mt-8">
        <ProgrammeForm />
      </div>
    </div>
  );
}
