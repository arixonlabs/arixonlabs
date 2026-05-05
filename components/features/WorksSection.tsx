"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import Link from "next/link";

const works = [
  {
    title: "Arixon SaaS Dashboard",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "E-commerce AI Bot",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Enterprise ERP",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "FinTech App",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&q=80",
  },
  {
    title: "Cloud Portal",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&q=80",
  },
  {
    title: "Smart Logistics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&q=80",
  },
];

const WorksSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupMarquee = (
      ref: React.RefObject<HTMLDivElement | null>,
      direction: number,
    ) => {
      if (!ref.current) return;
      const element = ref.current;

      if (direction > 0) {
        gsap.fromTo(
          element,
          { x: "0%" },
          { x: "-50%", duration: 60, ease: "none", repeat: -1 },
        );
      } else {
        gsap.fromTo(
          element,
          { x: "-50%" },
          { x: "0%", duration: 80, ease: "none", repeat: -1 },
        );
      }
    };

    setupMarquee(marqueeRef1, 1);
    setupMarquee(marqueeRef2, -1);

    // Staggered Text Animation
    if (textRef.current) {
      const children = textRef.current.children;
      gsap.fromTo(
        children,
        {
          y: 60,
          opacity: 0,
          rotateX: -15,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative h-[90vh]  w-full bg-background overflow-hidden flex items-center justify-center"
    >
      {/* Background Marquee Layer */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 pointer-events-none">
        {/* Row 1 */}
        <div className="flex" ref={marqueeRef1}>
          {[...works, ...works].map((work, i) => (
            <div
              key={`row1-${i}`}
              className="relative shrink-0 w-[200px] h-[260px] md:w-[320px] md:h-[200px] mx-2 md:mx-4 rounded-xl md:rounded-2xl overflow-hidden border border-white/10"
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex" ref={marqueeRef2}>
          {[...works, ...works].map((work, i) => (
            <div
              key={`row2-${i}`}
              className="relative shrink-0 w-[200px] h-[260px] md:w-[320px] md:h-[200px] mx-2 md:mx-4 rounded-xl md:rounded-2xl overflow-hidden border border-white/10"
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 z-10 backdrop-blur-xs bg-background/50 pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-20 container mx-auto text-center px-4">
        <div ref={textRef} className="perspective-1000">
          <span className="text-primary font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase mb-2 md:mb-4 block">
            [ OUR PORTFOLIO ]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6 md:mb-4">
            SUCCESS{" "}
            <span className="text-primary italic font-light">STORIES</span>
          </h2>
          <Link
            href="/works"
            className="group hover:bg-blue-500 hover:text-white inline-flex items-center gap-1.5 bg-white text-black px-6 py-3 rounded-full font-bold text-[10px] md:text-sm tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            VIEW ALL WORKS
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

    </section>
  );
};

export default WorksSection;
