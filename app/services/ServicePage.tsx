"use client";

import { useEffect, useRef } from "react";
import ServicesSection from "@/components/features/ServicesSection";
import Link from "next/link";
import { ArrowLeft, Cpu, Globe, Rocket, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceStats } from "@/constant/constant";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";

export default function ServicePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Content Reveal (Heading, Paragraph, Stats Grid)
      gsap.from(".service-hero-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Parallax effect for background image
      gsap.to(".hero-bg-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".service-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Background decorative elements
      gsap.to(".bg-orb", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    Rocket: <Rocket className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
  };

  return (
    <main ref={containerRef} className="relative bg-background min-h-screen">
      {/* 1. Services Hero Section */}
      <section className="service-hero relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        {/* Cinematic Background Image */}
        <div className="hero-bg-image absolute inset-0 z-0 opacity-80">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Services Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/60 to-background" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background/20" />
        </div>

        {/* Animated Background Orbs */}
        <div className="bg-orb absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="bg-orb absolute bottom-0 -right-20 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="service-hero-content flex flex-col items-center text-center gap-8 max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> [ BACK TO HOME ]
            </Link>

            <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.85]">
              CRAFTING DIGITAL <br />
              <span className="text-primary italic font-light">EXCELLENCE</span>
            </h1>

            <p className="text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              We don't just build software; we engineer competitive advantages.
              Our specialized services are designed to scale your vision into a
              global reality.
            </p>

            <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-white/10 w-full">
              {serviceStats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card flex flex-col items-center text-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all group cursor-default"
                >
                  <div className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    {iconMap[stat.iconName]}
                  </div>
                  <h4 className="text-white font-bold text-sm tracking-tight uppercase font-mono">
                    {stat.label}
                  </h4>
                  <p className="text-foreground/40 text-xs leading-relaxed max-w-[150px]">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Services Stack (Imported Section) */}
      <div className="relative">
        <ServicesSection />
      </div>
    </main>
  );
}
