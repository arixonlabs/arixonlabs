import HeroSection from "@/components/features/HeroSection";
import ServicesSection from "@/components/features/ServicesSection";
import WorksSection from "@/components/features/WorksSection";
import ContactSection from "@/components/features/ContactSection";

export default function HomeRoute() {
  return (
    <main className="relative bg-background">
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <ContactSection />
    </main>
  );
}
