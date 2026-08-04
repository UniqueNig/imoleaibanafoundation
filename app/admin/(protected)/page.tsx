import Link from "next/link";
import {
  Compass,
  CalendarDays,
  Newspaper,
  Images,
  HandCoins,
  HandHeart,
  Handshake,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import Event from "@/lib/models/Event";
import Post from "@/lib/models/Post";
import GalleryItem from "@/lib/models/GalleryItem";
import Donation from "@/lib/models/Donation";
import VolunteerApplication from "@/lib/models/VolunteerApplication";
import PartnerRequest from "@/lib/models/PartnerRequest";
import ContactMessage from "@/lib/models/ContactMessage";
import { startOfToday } from "@/lib/dates";

export default async function AdminDashboardPage() {
  await connectDB();

  const [
    programmeCount,
    eventCount,
    postCount,
    galleryCount,
    donations,
    newVolunteers,
    newPartners,
    newMessages,
    upcomingEvents,
    recentMessages,
  ] = await Promise.all([
    Programme.countDocuments(),
    Event.countDocuments(),
    Post.countDocuments(),
    GalleryItem.countDocuments(),
    Donation.find({ status: "success" }).select("amount").lean(),
    VolunteerApplication.countDocuments({ status: "new" }),
    PartnerRequest.countDocuments({ status: "new" }),
    ContactMessage.countDocuments({ status: "new" }),
    Event.find({ published: true, startDate: { $gte: startOfToday() } })
      .sort({ startDate: 1 })
      .limit(4)
      .select("title slug startDate")
      .lean(),
    ContactMessage.find().sort({ createdAt: -1 }).limit(4).select("name email subject status createdAt").lean(),
  ]);

  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
  const needsAttention = newVolunteers + newPartners + newMessages;

  const statCards = [
    { label: "Programmes", value: programmeCount, icon: Compass, href: "/admin/programmes" },
    { label: "Events", value: eventCount, icon: CalendarDays, href: "/admin/events" },
    { label: "Blog Posts", value: postCount, icon: Newspaper, href: "/admin/posts" },
    { label: "Gallery Items", value: galleryCount, icon: Images, href: "/admin/gallery" },
  ];

  const attentionCards = [
    {
      label: "Total Raised",
      value: `₦${totalRaised.toLocaleString()}`,
      icon: HandCoins,
      href: "/admin/donations",
      highlight: false,
    },
    {
      label: "New Volunteer Applications",
      value: newVolunteers,
      icon: HandHeart,
      href: "/admin/volunteers",
      highlight: newVolunteers > 0,
    },
    {
      label: "New Partner Requests",
      value: newPartners,
      icon: Handshake,
      href: "/admin/partners",
      highlight: newPartners > 0,
    },
    {
      label: "New Contact Messages",
      value: newMessages,
      icon: MessageSquare,
      href: "/admin/contact",
      highlight: newMessages > 0,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Dashboard</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        {needsAttention > 0
          ? `You have ${needsAttention} new submission${needsAttention === 1 ? "" : "s"} to review.`
          : "You're all caught up. Manage content from the sidebar."}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-navy-950/10 bg-white p-5 transition-colors hover:border-royal-400/40 dark:border-white/10 dark:bg-navy-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-500/10 text-royal-500 dark:bg-royal-400/15 dark:text-royal-300">
                <card.icon size={17} />
              </div>
              <ArrowRight
                size={14}
                className="text-navy-950/20 transition-transform group-hover:translate-x-0.5 group-hover:text-royal-500 dark:text-white/20"
              />
            </div>
            <p className="mt-4 text-2xl font-semibold text-navy-950 dark:text-white">{card.value}</p>
            <p className="mt-0.5 text-xs font-medium text-navy-700/60 dark:text-white/50">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {attentionCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group rounded-2xl border p-5 transition-colors ${
              card.highlight
                ? "border-gold-500/30 bg-gold-500/5 dark:border-gold-400/25 dark:bg-gold-400/10"
                : "border-navy-950/10 bg-white hover:border-royal-400/40 dark:border-white/10 dark:bg-navy-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  card.highlight
                    ? "bg-gold-500/15 text-gold-600 dark:bg-gold-400/20 dark:text-gold-300"
                    : "bg-navy-950/5 text-navy-700 dark:bg-white/10 dark:text-white/70"
                }`}
              >
                <card.icon size={17} />
              </div>
              <ArrowRight
                size={14}
                className="text-navy-950/20 transition-transform group-hover:translate-x-0.5 group-hover:text-royal-500 dark:text-white/20"
              />
            </div>
            <p className="mt-4 text-2xl font-semibold text-navy-950 dark:text-white">{card.value}</p>
            <p className="mt-0.5 text-xs font-medium text-navy-700/60 dark:text-white/50">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy-950 dark:text-white">Upcoming Events</h2>
            <Link href="/admin/events" className="text-xs font-medium text-royal-500 hover:text-royal-400">
              View all
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="mt-6 text-center text-sm text-navy-700/50 dark:text-white/40">
              No upcoming published events.
            </p>
          ) : (
            <ul className="mt-4 space-y-1">
              {upcomingEvents.map((event) => (
                <li key={String(event._id)}>
                  <Link
                    href={`/admin/events/${event._id}/edit`}
                    className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-navy-950/5 dark:hover:bg-white/5"
                  >
                    <span className="font-medium text-navy-950 dark:text-white">{event.title}</span>
                    <span className="text-xs text-navy-700/60 dark:text-white/50">
                      {new Date(event.startDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-navy-950/10 bg-white p-5 dark:border-white/10 dark:bg-navy-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy-950 dark:text-white">Recent Messages</h2>
            <Link href="/admin/contact" className="text-xs font-medium text-royal-500 hover:text-royal-400">
              View all
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="mt-6 text-center text-sm text-navy-700/50 dark:text-white/40">
              No messages yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-1">
              {recentMessages.map((msg) => (
                <li key={String(msg._id)}>
                  <Link
                    href="/admin/contact"
                    className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-navy-950/5 dark:hover:bg-white/5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-navy-950 dark:text-white">
                        {msg.name}
                      </span>
                      <span className="block truncate text-xs text-navy-700/60 dark:text-white/50">
                        {msg.subject || "No subject"}
                      </span>
                    </span>
                    {msg.status === "new" && (
                      <span className="shrink-0 rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-semibold text-gold-600 dark:bg-gold-400/20 dark:text-gold-300">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
