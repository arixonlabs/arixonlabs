"use client";

import { useEffect, useRef } from "react";
import WorksSection from "@/components/features/WorksSection";
import ContactSection from "@/components/features/ContactSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    id: 1,
    title: "Arixon SaaS Dashboard",
    category: "All-in-One Business Software",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    link: "#",
  },
  {
    id: 2,
    title: "E-commerce AI Bot",
    category: "Smart AI Tools",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
    link: "#",
  },
  {
    id: 3,
    title: "Enterprise ERP",
    category: "Custom Built Software",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
    link: "#",
  },
  {
    id: 4,
    title: "FinTech Mobile App",
    category: "Modern Mobile Apps",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000",
    link: "#",
  },
  {
    id: 5,
    title: "Smart Logistics System",
    category: "Smart AI Automation",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&q=80",
    link: "#",
  },
  {
    id: 6,
    title: "Healthcare SaaS Architecture",
    category: "Business Software Solutions",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
];

export default function WorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".work-card");

      cards.forEach((card: any) => {
        const image = card.querySelector(".work-image");
        const content = card.querySelector(".work-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        );

        tl.fromTo(
          image,
          { scale: 1.3 },
          { scale: 1, duration: 1.2, ease: "power2.out" },
          0,
        );

        tl.fromTo(
          content,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.4,
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={containerRef} className="relative bg-background min-h-screen">
      <div className="relative pt-24">
        <WorksSection />
      </div>

      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase mb-8 hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> [ BACK TO HOME ]
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              DETAILED{" "}
              <span className="text-primary italic font-light">SHOWCASE</span>
            </h1>
          </div>
          <p className="text-foreground/60 max-w-xs text-sm md:text-base font-light leading-relaxed mb-2">
            A curated selection of our most impactful digital solutions,
            engineered for scale and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="work-card group relative flex flex-col gap-6 will-change-transform"
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="work-image object-cover will-change-transform"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="work-content flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-primary tracking-widest uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="w-10 h-px bg-white/20 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactSection />
    </main>
  );
}
