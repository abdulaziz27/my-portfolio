import HeroSection from "@/features/hero/HeroSection";
import AboutSection from "@/features/about/AboutSection";
import GlobalFootprint from "@/features/map/GlobalFootprint";
import WorkSection from "@/features/work/WorkSection";
import WorkflowSection from "@/features/workflow/WorkflowSection";
import TechSection from "@/features/tech/TechSection";
import ContactSection from "@/features/contact/ContactSection";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-black">
      <HeroSection />
      <AboutSection />
      <GlobalFootprint />
      <WorkSection />
      <WorkflowSection />
      <TechSection />
      <ContactSection />
    </main>
  );
}