import { connectDB } from "@/lib/db";
import VolunteerApplication from "@/lib/models/VolunteerApplication";
import VolunteerRowActions from "./VolunteerRowActions";

export default async function VolunteersPage() {
  await connectDB();
  const applications = await VolunteerApplication.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Volunteer Applications</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        {applications.length === 0
          ? "No applications yet."
          : `${applications.length} application${applications.length === 1 ? "" : "s"}`}
      </p>

      <div className="mt-8 space-y-4">
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-navy-950/10 bg-white p-8 text-center text-sm text-navy-700/60 dark:border-white/10 dark:bg-navy-900 dark:text-white/50">
            Submissions from the public volunteer form will appear here.
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={String(app._id)}
              className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy-950 dark:text-white">{app.name}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        app.status === "contacted"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "bg-royal-500/10 text-royal-600 dark:bg-royal-400/15 dark:text-royal-300"
                      }`}
                    >
                      {app.status === "contacted" ? "Contacted" : "New"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-navy-700/70 dark:text-white/60">
                    <a href={`mailto:${app.email}`} className="hover:underline">
                      {app.email}
                    </a>
                    {app.phone && <> &middot; {app.phone}</>}
                  </p>
                </div>
                <VolunteerRowActions id={String(app._id)} name={app.name} status={app.status ?? "new"} />
              </div>

              {(app.areaOfInterest || app.availability) && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700/60 dark:text-white/50">
                  {app.areaOfInterest && (
                    <span>
                      <strong className="text-navy-950 dark:text-white">Interest:</strong>{" "}
                      {app.areaOfInterest}
                    </span>
                  )}
                  {app.availability && (
                    <span>
                      <strong className="text-navy-950 dark:text-white">Availability:</strong>{" "}
                      {app.availability}
                    </span>
                  )}
                </div>
              )}

              {app.message && (
                <p className="mt-3 text-sm leading-relaxed text-navy-700/80 dark:text-white/70">
                  {app.message}
                </p>
              )}

              <p className="mt-3 text-xs text-navy-700/40 dark:text-white/35">
                Submitted{" "}
                {new Date(app.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
