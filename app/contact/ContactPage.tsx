"use client";

import { useRef } from "react";
import ContactSection from "@/components/features/ContactSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);


export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    gsap.from(".contact-hero-content > *", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    });

    // Parallax effect for background image
    gsap.to(".contact-bg-image", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Ambient light pulse
    gsap.to(".ambient-glow", {
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });


  return (
    <main ref={containerRef} className="relative bg-background min-h-screen overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="contact-bg-image absolute inset-0 z-0 opacity-80">
        <Image 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/10 via-background/60 to-background" />
        <div className="absolute inset-0 bg-linear-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Cinematic Background Elements */}
      <div className="ambient-glow absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="ambient-glow absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <section className="contact-hero relative pt-48 pb-24">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="contact-hero-content flex flex-col items-center text-center gap-8 max-w-5xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase hover:gap-4 transition-all">
              <ArrowLeft className="w-4 h-4" /> [ BACK TO HOME ]
            </Link>
            
            <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.85]">
              LET'S START A <br />
              <span className="text-primary italic font-light">GLOBAL</span> DIALOGUE
            </h1>
            
            <p className="text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Ready to elevate your digital presence? We combine technical mastery with creative vision to build products that stand out. Reach out via the form below or our direct channels.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <div className="relative border-t border-white/5">
        <ContactSection />
      </div>
    </main>
  );
}
