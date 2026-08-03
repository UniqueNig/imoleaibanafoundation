import Hero from "@/app/components/Hero";
import VisionMission from "@/app/components/VisionMission";
import FocusAreas from "@/app/components/FocusAreas";
import UpcomingEvents from "@/app/components/UpcomingEvents";
import LatestPosts from "@/app/components/LatestPosts";
import CtaBand from "@/app/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <VisionMission />
      <FocusAreas />
      <UpcomingEvents />
      <LatestPosts />
      <CtaBand />
    </>
  );
}
