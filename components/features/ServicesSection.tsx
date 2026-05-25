"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

import { services } from "@/constant/constant";

const ServicesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Clear ScrollTrigger's cached scroll memory to prevent position restoration jumps
    ScrollTrigger.clearScrollMemory();
    
    const cards = gsap.utils.toArray<HTMLElement>(".service-card");
    const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${services.length * 200}%`,
            pin: true,
            scrub: 0.8,
            snap: {
              snapTo: 1 / (services.length - 1),
              duration: { min: 0.3, max: 0.7 },
              delay: 0.1,
              ease: "power2.out"
            }
          },
        });

        cards.forEach((card, i: number) => {
          const q = gsap.utils.selector(card);
          const image = q(".service-image-wrapper");
          const content = q(".service-content");

          const step = 3;
          const position = i * step;

          // Entrance Animation: Slide up from bottom
          if (i !== 0) {
            tl.fromTo(card,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, ease: "power2.inOut", duration: 2 },
              position
            );
          } else {
            gsap.set(card, { yPercent: 0, opacity: 1, zIndex: 10 });
          }

          // Internal movement for depth
          tl.fromTo(image, { y: 100 }, { y: 0, duration: 2, ease: "power2.out" }, position);
          tl.fromTo(content, { y: 50, opacity: 0 }, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, position + 0.3);

          // Exit Animation: Instead of sliding away, it gets 'covered' and shrinks slightly
          if (i < cards.length - 1) {
            tl.to(card, { 
              scale: 0.95,
              opacity: 0.2,
              filter: "blur(4px)",
              duration: 2, 
              ease: "power2.inOut" 
            }, position + step);
            
            // Bring the next card to a higher z-index dynamically
            const nextCard = cards[i + 1];
            if (nextCard) {
              tl.set(nextCard, { zIndex: 20 + i }, position + step);
            }
          }
        });
      });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Extremely lightweight entrance to save TBT
      gsap.fromTo(".service-card", 
        { opacity: 0.1, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );
    });


    // Refresh ScrollTrigger after a slight delay to ensure Next.js hydration layout is settled
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimeout);
      mm.revert(); // Clean up matchMedia to prevent duplicate triggers
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative z-20 bg-slate-50 overflow-hidden py-0 transition-colors duration-700"
    >
      {/* 1. Static Header Section (Scrolls naturally) */}
      <div className="relative z-30 container mx-auto px-6 pt-0 md:pt-15 pb-0 text-center">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-slate-900">
          Grow Your Business
        </h2>
        <p className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          You deserve digital solutions that do more than just look good. We engineer competitive advantages for modern brands.
        </p>
      </div>

      <div ref={triggerRef} className="relative md:h-screen w-full -mt-40">
        {/* Premium Light Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px]" />
          
          <div
            className="w-full h-full opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative h-full w-full flex flex-col md:block">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`service-card relative md:absolute inset-0 w-full md:h-full flex items-center justify-center p-6 md:p-12 mb-16 md:mb-0 lg:pb-12 will-change-transform ${i === 0 ? "z-10" : "z-0 md:opacity-0"}`}
            >
              <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-6xl">
                <div className={`service-image-wrapper relative aspect-video overflow-hidden rounded-xl  shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] backdrop-blur-sm will-change-transform ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image 
                    src={s.image} 
                    fill 
                    alt={s.title} 
                    className="object-cover transition-all duration-700 brightness-95 contrast-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Glassmorphism Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full shadow-lg">
                    <span className="text-slate-900 text-[10px] font-bold tracking-widest uppercase">{s.title}</span>
                  </div>
                </div>

                <div className={`service-content flex flex-col gap-6 lg:gap-8 will-change-transform ${i % 2 === 1 ? "md:order-1 text-left md:text-right" : "text-left"}`}>
                  <div className={`flex flex-col gap-3 ${i % 2 === 1 ? "md:items-end" : "items-start"}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-12 bg-blue-600/20" />
                      <span className="text-blue-600 font-mono text-[10px] tracking-widest uppercase font-bold">0{i + 1} / {services.length}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-slate-900">
                      {s.headline}
                    </h3>
                  </div>
                  
                  <p className={`text-base md:text-lg text-slate-600 font-light leading-relaxed max-w-md ${i % 2 === 1 ? "md:ml-auto" : ""}`}>
                    {s.desc}
                  </p>

                  <div className={`flex items-center gap-6 mt-4 ${i % 2 === 1 ? "md:justify-end" : "justify-start"}`}>
                    <Link 
                      href="/contact"
                      className="group relative inline-flex items-center gap-2 text-slate-900 font-bold text-xs md:text-sm tracking-widest pb-1 overflow-hidden"
                    >
                      <span className="relative z-10 text-blue-600 transition-colors duration-300">DISCOVER MORE</span>
                      <div className="relative overflow-hidden flex items-center justify-center w-5 h-5 text-blue-600 transition-colors duration-300">
                        <ArrowUpRight className="w-full h-full absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full" />
                        <ArrowUpRight className="w-full h-full absolute -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-600 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default ServicesSection;
