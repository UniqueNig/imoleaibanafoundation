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
  Plus,
  Users,
} from "lucide-react";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import Event from "@/lib/models/Event";
import Post from "@/lib/models/Post";
import GalleryItem from "@/lib/models/GalleryItem";
import TeamMember from "@/lib/models/TeamMember";
import Donation from "@/lib/models/Donation";
import VolunteerApplication from "@/lib/models/VolunteerApplication";
import PartnerRequest from "@/lib/models/PartnerRequest";
import ContactMessage from "@/lib/models/ContactMessage";
import { startOfToday } from "@/lib/dates";

const ICON_TONES = {
  royal: "bg-royal-500/10 text-royal-500 dark:bg-royal-400/15 dark:text-royal-300",
  gold: "bg-gold-500/15 text-gold-600 dark:bg-gold-400/20 dark:text-gold-300",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300",
  purple: "bg-purple-500/10 text-purple-600 dark:bg-purple-400/15 dark:text-purple-300",
  rose: "bg-rose-500/10 text-rose-600 dark:bg-rose-400/15 dark:text-rose-300",
  amber: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
};

export default async function AdminDashboardPage() {
  await connectDB();

  const [
    programmeCount,
    eventCount,
    postCount,
    galleryCount,
    teamCount,
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
    TeamMember.countDocuments(),
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

  const contentCards = [
    { label: "Programmes", value: programmeCount, icon: Compass, href: "/admin/programmes", tone: "royal" as const },
    { label: "Events", value: eventCount, icon: CalendarDays, href: "/admin/events", tone: "gold" as const },
    { label: "Blog Posts", value: postCount, icon: Newspaper, href: "/admin/posts", tone: "purple" as const },
    { label: "Gallery Items", value: galleryCount, icon: Images, href: "/admin/gallery", tone: "emerald" as const },
    { label: "Team Members", value: teamCount, icon: Users, href: "/admin/team", tone: "rose" as const },
  ];

  const attentionCards = [
    {
      label: "Total Raised",
      value: `₦ ${totalRaised.toLocaleString()}`,
      icon: HandCoins,
      href: "/admin/donations",
      tone: "emerald" as const,
      highlight: false,
    },
    {
      label: "New Volunteer Applications",
      value: newVolunteers,
      icon: HandHeart,
      href: "/admin/volunteers",
      tone: "rose" as const,
      highlight: newVolunteers > 0,
    },
    {
      label: "New Partner Requests",
      value: newPartners,
      icon: Handshake,
      href: "/admin/partners",
      tone: "amber" as const,
      highlight: newPartners > 0,
    },
    {
      label: "New Contact Messages",
      value: newMessages,
      icon: MessageSquare,
      href: "/admin/contact",
      tone: "royal" as const,
      highlight: newMessages > 0,
    },
  ];

  const quickActions = [
    { label: "New Event", href: "/admin/events/new" },
    { label: "New Post", href: "/admin/posts/new" },
    { label: "New Programme", href: "/admin/programmes/new" },
    { label: "New Gallery Item", href: "/admin/gallery/new" },
    { label: "New Team Member", href: "/admin/team/new" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Dashboard</h1>
          <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
            {needsAttention > 0
              ? `You have ${needsAttention} new submission${needsAttention === 1 ? "" : "s"} to review.`
              : "You're all caught up. Manage content from the sidebar."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-1.5 rounded-xl border border-navy-950/10 bg-white px-3.5 py-2 text-xs font-semibold text-navy-950 transition-colors hover:border-royal-400/40 hover:text-royal-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:hover:text-royal-300"
            >
              <Plus size={14} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <h2 className="mt-9 text-xs font-semibold uppercase tracking-wide text-navy-700/50 dark:text-white/40">
        Content
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {contentCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-navy-950/10 bg-white p-5 transition-colors hover:border-royal-400/40 dark:border-white/10 dark:bg-navy-900"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${ICON_TONES[card.tone]}`}>
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

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wide text-navy-700/50 dark:text-white/40">
        Needs Attention
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${ICON_TONES[card.tone]}`}>
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
