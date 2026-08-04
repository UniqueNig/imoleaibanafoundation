import { connectDB } from "@/lib/db";
import Donation from "@/lib/models/Donation";

export default async function DonationsPage() {
  await connectDB();
  const donations = await Donation.find().sort({ createdAt: -1 }).lean();

  const totalRaised = donations
    .filter((d) => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);
  const successCount = donations.filter((d) => d.status === "success").length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Donations</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        {donations.length === 0 ? "No donations yet." : `${donations.length} transaction${donations.length === 1 ? "" : "s"}`}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900">
          <p className="text-xs font-medium uppercase tracking-wide text-navy-700/50 dark:text-white/40">
            Total Raised
          </p>
          <p className="mt-1.5 text-2xl font-semibold text-navy-950 dark:text-white">
            ₦{totalRaised.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900">
          <p className="text-xs font-medium uppercase tracking-wide text-navy-700/50 dark:text-white/40">
            Successful Donations
          </p>
          <p className="mt-1.5 text-2xl font-semibold text-navy-950 dark:text-white">{successCount}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-950/10 bg-white dark:border-white/10 dark:bg-navy-900">
        {donations.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-700/60 dark:text-white/50">
            Donations made through the public Donate page will appear here.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-950/10 text-xs uppercase tracking-wide text-navy-700/50 dark:border-white/10 dark:text-white/40">
              <tr>
                <th className="px-5 py-3 font-medium">Donor</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr
                  key={String(donation._id)}
                  className="border-b border-navy-950/5 last:border-0 dark:border-white/5"
                >
                  <td className="px-5 py-3.5 text-navy-950 dark:text-white">
                    <div className="font-medium">{donation.donorName || "Anonymous"}</div>
                    <div className="text-xs text-navy-700/60 dark:text-white/50">{donation.email}</div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-navy-950 dark:text-white">
                    ₦{donation.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        donation.status === "success"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : donation.status === "failed"
                            ? "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                            : "bg-navy-950/5 text-navy-700/60 dark:bg-white/10 dark:text-white/50"
                      }`}
                    >
                      {donation.status === "success"
                        ? "Success"
                        : donation.status === "failed"
                          ? "Failed"
                          : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-navy-700/70 dark:text-white/60">
                    {new Date(donation.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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
