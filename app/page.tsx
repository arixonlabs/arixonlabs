import dynamic from "next/dynamic";
import HeroSection from "@/components/features/HeroSection";

// Performance Optimization: Dynamic imports for below-the-fold sections
// This reduces the initial JS bundle size and improves mobile TBT (Total Blocking Time)
const ServicesSection = dynamic(() => import("@/components/features/ServicesSection"), { 
  ssr: true,
  loading: () => <div className="min-h-screen bg-background" /> 
});
const WorksSection = dynamic(() => import("@/components/features/WorksSection"), { 
  ssr: true,
  loading: () => <div className="min-h-screen bg-background" /> 
});
const FaqSection = dynamic(() => import("@/components/features/FaqSection"), { 
  ssr: true,
  loading: () => <div className="min-h-screen bg-background" /> 
});
const ContactSection = dynamic(() => import("@/components/features/ContactSection"), { 
  ssr: true,
  loading: () => <div className="min-h-screen bg-background" /> 
});

export default function Home() {
  return (
    <main className="relative bg-background">
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}