import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import Event from "@/lib/models/Event";
import Post from "@/lib/models/Post";

const SITE_URL = "https://www.imoleaibanafoundation.com";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programmes", changeFrequency: "weekly", priority: 0.8 },
  { path: "/events", changeFrequency: "weekly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.6 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/donate", changeFrequency: "monthly", priority: 0.9 },
  { path: "/volunteer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const [programmes, events, posts] = await Promise.all([
    Programme.find({ published: true }).select("slug updatedAt").lean(),
    Event.find({ published: true }).select("slug updatedAt").lean(),
    Post.find({ published: true }).select("slug updatedAt").lean(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const programmeEntries: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${SITE_URL}/programmes/${p.slug}`,
    lastModified: p.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: e.updatedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...programmeEntries, ...eventEntries, ...postEntries];
}
