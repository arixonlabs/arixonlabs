"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const portalImageRef = useRef<HTMLDivElement>(null);
  const portalContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(bgImageRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: "blur(2px)",
        ease: "power2.inOut",
      }, 0);

      tl.fromTo(portalImageRef.current, 
        { scale: 0.9, opacity: 0, filter: "blur(2px)" },
        { scale: 1.1, opacity: 0.4, filter: "blur(0px)", ease: "power2.inOut" }, 
        0
      );

      tl.to(textRef.current, {
        scale: 1.5,
        opacity: 0,
        y: -150,
        ease: "power2.inOut",
      }, 0);

      const q = gsap.utils.selector(portalContentRef.current);
      tl.fromTo(q("div > *"),
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        0.4
      );

      tl.fromTo(portalContentRef.current,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, ease: "power3.out" },
        0.3
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Instant visibility for LCP, simple scroll reveal
      gsap.set([bgImageRef.current, textRef.current], { opacity: 1, visibility: "visible" });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(bgImageRef.current, {
        opacity: 0.3,
        scale: 1.1,
      }, 0);

      tl.to(textRef.current, {
        opacity: 0,
        y: -30,
      }, 0);
    });


    // Refresh ScrollTrigger after a short delay to ensure layout is ready
    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-svh w-full overflow-hidden flex flex-col justify-center items-center text-center bg-background"
    >
      {/* 1. Primary Background Layer */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-10 h-full w-full pointer-events-none will-change-transform"
      >
        <Image
          fill
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
          alt="Arixon Labs Hero Background"
          className="w-full h-full object-cover brightness-[0.6]"
          priority
          fetchPriority="high"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-transparent to-background" />
      </div>

      {/* 2. Portal Background Layer - Only visible on Desktop for performance */}
      <div
        ref={portalImageRef}
        className="absolute inset-0 z-0 h-full w-full pointer-events-none will-change-transform hidden md:block"
      >
        <Image
          fill
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-transparent to-background" />
      </div>


      {/* 3. Portal Side Content */}
      <div 
        ref={portalContentRef}
        style={{ opacity: 0, visibility: 'hidden' }}
        className="absolute inset-0 z-15 pointer-events-none flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-32 py-24 md:py-0 will-change-transform translate-y-4"
      >
        <div className="max-w-[320px] md:max-w-[350px] text-center md:text-left">
          <span className="text-[10px] md:text-xs font-mono text-primary tracking-[0.4em] block mb-4 md:mb-8 uppercase font-bold">[ PRECISION ENGINEERING ]</span>
          <p className="text-lg md:text-2xl text-white font-light leading-tight tracking-tight">
            Built for scale. <br /> Designed for performance.
          </p>
        </div>


        {/* Center Section (Apple/Tesla Style) */}
        <div className="hidden lg:flex flex-col items-center gap-16 text-center">
          <div className="flex flex-col items-center gap-3 max-w-[220px]">
            <span className="text-5xl font-medium text-white tracking-tighter">Build Faster.</span>
            <span className="text-[10px] font-mono text-primary/50 tracking-[0.2em] uppercase font-bold">
              Accelerate time-to-market
            </span>
          </div>
          <div className="h-20 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
          <div className="flex flex-col items-center gap-3 max-w-[220px]">
            <span className="text-5xl font-medium text-white tracking-tighter">Scale Smart.</span>
            <span className="text-[10px] font-mono text-primary/50 tracking-[0.2em] uppercase font-bold">
              Infrastructure that grows
            </span>
          </div>
        </div>

        <div className="max-w-[320px] md:max-w-[350px] text-center md:text-right mt-auto md:mt-0">
          <span className="text-[10px] md:text-xs font-mono text-primary tracking-[0.4em] block mb-4 md:mb-8 uppercase font-bold">[ FUTURE PROOF ]</span>
          <p className="text-lg md:text-2xl text-white font-light leading-tight tracking-tight">
            Next-gen automation bridging concept and digital reality.
          </p>
        </div>
      </div>

      <div
        ref={textRef}
        className="relative z-20 flex flex-col items-center px-6 pt-20 md:pt-32 bottom-8"
      >
        <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-white mb-4 md:mb-4 leading-[0.85]">
          ARIXON <span className="text-primary italic font-light tracking-normal">LABS</span>
        </h1>
        <h2 className="sr-only">Best IT Company for Custom AI & SaaS Development</h2>
        <div className="sr-only">
          Arixon Labs is a top-rated IT agency specializing in engineering high-performance custom SaaS platforms and AI automation. 
          We provide scalable digital solutions for global startups and enterprises, bridging concept and digital reality with precision engineering.
        </div>
        <p className="text-base md:text-2xl text-foreground/90 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
          Engineering high-performance software <br className="hidden md:block" /> for the next generation of business.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
