import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackToTop from "@/app/components/BackToTop";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
