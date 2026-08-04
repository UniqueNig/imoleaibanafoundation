import { connectDB } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";
import ContactRowActions from "./ContactRowActions";

export default async function ContactMessagesPage() {
  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Contact Messages</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        {messages.length === 0
          ? "No messages yet."
          : `${messages.length} message${messages.length === 1 ? "" : "s"}`}
      </p>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-navy-950/10 bg-white p-8 text-center text-sm text-navy-700/60 dark:border-white/10 dark:bg-navy-900 dark:text-white/50">
            Submissions from the public contact form will appear here.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={String(msg._id)}
              className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy-950 dark:text-white">{msg.name}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        msg.status === "read"
                          ? "bg-navy-950/5 text-navy-700/60 dark:bg-white/10 dark:text-white/50"
                          : "bg-royal-500/10 text-royal-600 dark:bg-royal-400/15 dark:text-royal-300"
                      }`}
                    >
                      {msg.status === "read" ? "Read" : "New"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-navy-700/70 dark:text-white/60">
                    <a href={`mailto:${msg.email}`} className="hover:underline">
                      {msg.email}
                    </a>
                  </p>
                </div>
                <ContactRowActions id={String(msg._id)} name={msg.name} status={msg.status ?? "new"} />
              </div>

              {msg.subject && (
                <p className="mt-3 text-sm font-medium text-navy-950 dark:text-white">
                  {msg.subject}
                </p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-navy-700/80 dark:text-white/70">
                {msg.message}
              </p>

              <p className="mt-3 text-xs text-navy-700/40 dark:text-white/35">
                Received{" "}
                {new Date(msg.createdAt).toLocaleDateString(undefined, {
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
