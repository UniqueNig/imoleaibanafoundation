import mongoose from "mongoose";
import slugify from "slugify";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

function slugFor(title) {
  return slugify(title, { lower: true, strict: true });
}

const programmeSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    description: String,
    icon: String,
    coverImage: { url: String, publicId: String },
    published: Boolean,
  },
  { timestamps: true }
);
const Programme = mongoose.models.Programme ?? mongoose.model("Programme", programmeSchema);

const eventSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    description: String,
    startDate: Date,
    endDate: Date,
    location: String,
    coverImage: { url: String, publicId: String },
    published: Boolean,
  },
  { timestamps: true }
);
const Event = mongoose.models.Event ?? mongoose.model("Event", eventSchema);

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    content: String,
    coverImage: { url: String, publicId: String },
    tags: [String],
    published: Boolean,
    publishedAt: Date,
  },
  { timestamps: true }
);
const Post = mongoose.models.Post ?? mongoose.model("Post", postSchema);

const galleryItemSchema = new mongoose.Schema(
  {
    caption: String,
    category: String,
    type: String,
    media: { url: String, publicId: String },
    published: Boolean,
  },
  { timestamps: true }
);
const GalleryItem = mongoose.models.GalleryItem ?? mongoose.model("GalleryItem", galleryItemSchema);

// Curated, freely-licensed photography (Wikimedia Commons), hand-picked per
// theme — mirrors lib/placeholderPhoto.ts, duplicated here since this is a
// standalone Node script that can't import the app's TS modules directly.
function commonsFile(filename, width = 800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}
const PHOTO = {
  medical: commonsFile("Medical_Outreach_to_Ilaje_Community_of_Lagos_state.jpg"),
  classroom: commonsFile(
    "A_young_Congolese_boy_during_a_lesson_at_the_Mugosi_Primary_School,_which_caters_mostly_for_children_of_the_Kahe_refugee_camp_in_the_town_of_Kitschoro,_in_the_north_eastern_part_of_the_Democratic_Republic_of_the_Congo.jpg"
  ),
  youthCelebration: commonsFile("African_Kids_aim_for_the_sky.jpg"),
  youthEvent: commonsFile("City_Life_Youth_Empowerment.jpg"),
  cleanWater: commonsFile("Cleanwater_mcprogram.jpg"),
};

const programmes = [
  {
    title: "Education Support",
    icon: "BookOpen",
    excerpt:
      "Scholarships, learning materials, and school infrastructure support that keep children in the classroom.",
    description:
      "<p>We work with local schools to identify students who are at risk of dropping out, usually because of unpaid fees, missing books, or a uniform they can't afford. Once a student is on the programme, we stay with them for the full school year, not just a one-time handout.</p><p>Where a school itself needs help, like a leaking roof or a classroom without enough desks, we look at small infrastructure fixes too. A classroom that actually works changes how many children show up.</p>",
    coverImage: { url: PHOTO.classroom, publicId: "" },
  },
  {
    title: "Community Outreach",
    icon: "HeartHandshake",
    excerpt:
      "On-the-ground visits that meet communities where they are and respond to what they actually need.",
    description:
      "<p>Our outreach team visits communities with food support, basic supplies, and time to sit and listen. We don't treat a single visit as the finish line. We go back, build relationships, and let the community tell us what the next visit should focus on.</p>",
    coverImage: { url: PHOTO.youthCelebration, publicId: "" },
  },
  {
    title: "Medical Outreach",
    icon: "Stethoscope",
    excerpt:
      "Free health screenings and basic care for communities with little access to a clinic nearby.",
    description:
      "<p>Working with volunteer doctors and nurses, we run outreach days offering free blood pressure and malaria screening, basic wound care, and health education. For anyone who needs follow-up care beyond what we can offer on the day, we help connect them to a nearby clinic.</p>",
    coverImage: { url: PHOTO.medical, publicId: "" },
  },
  {
    title: "Youth Empowerment",
    icon: "Sparkles",
    excerpt: "Skills training and confidence-building sessions that help young people figure out what's next.",
    description:
      "<p>We run short, practical sessions on things like digital literacy, basic business skills, and interview preparation. The goal isn't a certificate for the wall. It's giving a young person one concrete next step they didn't have before.</p>",
    coverImage: { url: PHOTO.youthEvent, publicId: "" },
  },
  {
    title: "Mentorship Programmes",
    icon: "Handshake",
    excerpt: "Pairing young people with mentors who stick around well past a single session.",
    description:
      "<p>We match students and young adults with mentors in fields they're curious about. Meetings are simple: a regular check-in, honest advice, and someone in their corner. Several of our current mentors started out as mentees themselves.</p>",
    coverImage: { url: PHOTO.classroom, publicId: "" },
  },
  {
    title: "Future Projects",
    icon: "Rocket",
    excerpt: "Vocational training, clean water access, and other projects we're working to grow into.",
    description:
      "<p>As we grow, we're looking at vocational training partnerships and clean water access in the communities we already work in. These are still early, and we'll share updates on the blog as they take shape.</p>",
    coverImage: { url: PHOTO.cleanWater, publicId: "" },
  },
];

const today = new Date();
function daysFromNow(days) {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d;
}

const events = [
  {
    title: "Back-to-School Supply Drive",
    excerpt: "Distributing bags, books, and uniforms ahead of the new school term.",
    description:
      "<p>Every year before school resumes, we put together supply packs for students in our education programme, covering books, bags, and uniforms. Parents and volunteers are both welcome to join and help pack and distribute on the day.</p>",
    startDate: daysFromNow(21),
    location: "Ikeja, Lagos",
    coverImage: { url: PHOTO.classroom, publicId: "" },
  },
  {
    title: "Free Medical Outreach Day",
    excerpt: "A full day of free health screenings and basic care, open to the whole community.",
    description:
      "<p>Volunteer doctors and nurses will be on site offering free screenings, basic care, and health talks. No appointment needed. Just show up any time during the day.</p>",
    startDate: daysFromNow(45),
    location: "Ajah, Lagos",
    coverImage: { url: PHOTO.medical, publicId: "" },
  },
  {
    title: "Community Health and Wellness Fair",
    excerpt: "A past outreach day combining health screenings with food support for local families.",
    description:
      "<p>We partnered with local volunteers to run a full wellness fair, including health screenings, food packs, and a session on basic nutrition. Turnout was higher than we expected, which told us this is a need worth repeating.</p>",
    startDate: daysFromNow(-40),
    location: "Mushin, Lagos",
    coverImage: { url: PHOTO.youthCelebration, publicId: "" },
  },
  {
    title: "Youth Mentorship Kickoff Session",
    excerpt: "The first meeting between our current cohort of mentees and their mentors.",
    description:
      "<p>Our latest group of mentees met their mentors for the first time, ran through what to expect over the coming months, and set their first personal goals together.</p>",
    startDate: daysFromNow(-15),
    location: "Yaba, Lagos",
    coverImage: { url: PHOTO.youthEvent, publicId: "" },
  },
];

const posts = [
  {
    title: "Why We Started Imole Aibana Foundation",
    tags: ["Our Story"],
    excerpt: "A short note on why we do this work and what we're hoping to build.",
    content:
      "<p>We kept running into the same story: a bright student who couldn't afford the next term's fees, a family that had to choose between food and a clinic visit, a young person with real skills but no clear next step. None of these are unusual problems. They're common, and that's exactly why we felt they were worth working on.</p><p>Imole Aibana Foundation isn't trying to solve everything at once. We're starting with education, health, and mentorship, the three areas where a small, consistent push seems to make the biggest difference. Thank you for reading this far. We hope you'll stick around as we grow.</p>",
    coverImage: { url: PHOTO.youthCelebration, publicId: "" },
  },
  {
    title: "Inside Our Latest Medical Outreach",
    tags: ["Health"],
    excerpt: "A quick recap of what a typical outreach day actually looks like.",
    content:
      "<p>Our last outreach day started early, with volunteer doctors setting up screening stations before the community arrived. By mid-morning we had a steady line for blood pressure checks and basic consultations.</p><p>What stood out most wasn't the numbers. It was how many people said this was their first time seeing a doctor in over a year. That's the gap we're trying to close, one outreach day at a time.</p>",
    coverImage: { url: PHOTO.medical, publicId: "" },
  },
  {
    title: "Five Students, Five Stories",
    tags: ["Education"],
    excerpt: "A look at a few of the students currently supported through our education programme.",
    content:
      "<p>Every student in our education programme has their own reason for needing support, and their own goals once they get it. Some want to finish secondary school. Others are aiming for university. A few just want the chance to focus on schoolwork without worrying about whether the next term is paid for.</p><p>We're proud of every one of them, and grateful to the donors and volunteers who make this possible.</p>",
    coverImage: { url: PHOTO.classroom, publicId: "" },
  },
  {
    title: "What We Learned From Our First Year",
    tags: ["Updates"],
    excerpt: "A few honest reflections on what worked, what didn't, and what's next.",
    content:
      "<p>Not everything went the way we planned. Some outreach days had lower turnout than we hoped, and we learned to communicate earlier and more clearly with the communities we visit. Other things worked better than expected, especially our mentorship pairings, which is why we're investing more there going forward.</p><p>We'll keep sharing updates like this, the good and the messy, because we think that's the honest way to do this work.</p>",
    coverImage: { url: PHOTO.youthEvent, publicId: "" },
  },
];

const galleryItems = [
  { caption: "Handing out school supplies", category: "Education", url: PHOTO.classroom },
  { caption: "Volunteer doctors at a screening station", category: "Medical Outreach", url: PHOTO.medical },
  { caption: "Students during a classroom session", category: "Education", url: PHOTO.classroom },
  { caption: "Food packs ready for distribution", category: "Community Engagement", url: PHOTO.youthCelebration },
  { caption: "Youth workshop on digital skills", category: "Youth Empowerment", url: PHOTO.youthEvent },
  { caption: "Community members at an outreach day", category: "Outreach", url: PHOTO.medical },
  { caption: "Mentor and mentee check-in session", category: "Youth Empowerment", url: PHOTO.classroom },
  { caption: "Health talk during the wellness fair", category: "Medical Outreach", url: PHOTO.medical },
  { caption: "Volunteers packing supply bags", category: "Community Engagement", url: PHOTO.youthEvent },
];

async function main() {
  await mongoose.connect(MONGODB_URI);

  for (const p of programmes) {
    const slug = slugFor(p.title);
    await Programme.findOneAndUpdate(
      { slug },
      { $set: { ...p, slug, published: true } },
      { upsert: true }
    );
  }
  console.log(`Seeded ${programmes.length} programmes.`);

  for (const e of events) {
    const slug = slugFor(e.title);
    await Event.findOneAndUpdate(
      { slug },
      { $set: { ...e, slug, published: true } },
      { upsert: true }
    );
  }
  console.log(`Seeded ${events.length} events.`);

  for (const post of posts) {
    const slug = slugFor(post.title);
    await Post.findOneAndUpdate(
      { slug },
      { $set: { ...post, slug, published: true, publishedAt: new Date() } },
      { upsert: true }
    );
  }
  console.log(`Seeded ${posts.length} blog posts.`);

  for (const item of galleryItems) {
    await GalleryItem.findOneAndUpdate(
      { caption: item.caption },
      {
        $set: {
          caption: item.caption,
          category: item.category,
          type: "photo",
          media: { url: item.url, publicId: "" },
          published: true,
        },
      },
      { upsert: true }
    );
  }
  console.log(`Seeded ${galleryItems.length} gallery items.`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
