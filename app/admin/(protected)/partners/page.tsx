import { connectDB } from "@/lib/db";
import PartnerRequest from "@/lib/models/PartnerRequest";
import PartnerRowActions from "./PartnerRowActions";

export default async function PartnersPage() {
  await connectDB();
  const requests = await PartnerRequest.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Partnership Requests</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        {requests.length === 0
          ? "No requests yet."
          : `${requests.length} request${requests.length === 1 ? "" : "s"}`}
      </p>

      <div className="mt-8 space-y-4">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-navy-950/10 bg-white p-8 text-center text-sm text-navy-700/60 dark:border-white/10 dark:bg-navy-900 dark:text-white/50">
            Submissions from the public partnership form will appear here.
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={String(req._id)}
              className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy-950 dark:text-white">
                      {req.organizationName}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        req.status === "contacted"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "bg-royal-500/10 text-royal-600 dark:bg-royal-400/15 dark:text-royal-300"
                      }`}
                    >
                      {req.status === "contacted" ? "Contacted" : "New"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-navy-700/70 dark:text-white/60">
                    {req.contactName} &middot;{" "}
                    <a href={`mailto:${req.email}`} className="hover:underline">
                      {req.email}
                    </a>
                    {req.phone && <> &middot; {req.phone}</>}
                  </p>
                </div>
                <PartnerRowActions
                  id={String(req._id)}
                  organizationName={req.organizationName}
                  status={req.status ?? "new"}
                />
              </div>

              {req.partnershipType && (
                <p className="mt-3 text-xs text-navy-700/60 dark:text-white/50">
                  <strong className="text-navy-950 dark:text-white">Type:</strong>{" "}
                  {req.partnershipType}
                </p>
              )}

              {req.message && (
                <p className="mt-3 text-sm leading-relaxed text-navy-700/80 dark:text-white/70">
                  {req.message}
                </p>
              )}

              <p className="mt-3 text-xs text-navy-700/40 dark:text-white/35">
                Submitted{" "}
                {new Date(req.createdAt).toLocaleDateString(undefined, {
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
