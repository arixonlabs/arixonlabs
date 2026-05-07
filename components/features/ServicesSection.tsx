"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "SaaS PLATFORMS",
    headline: "All-in-One Software for Your Business",
    desc: "We provide scalable cloud software solutions to help your business grow effortlessly. Our platforms are easy to use, secure, and highly reliable.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "CUSTOM SOFTWARE",
    headline: "Software Built Just for You",
    desc: "We build customized software to automate your unique business workflows and eliminate manual errors. Everything is designed to be fast, simple, and efficient.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "AI INTEGRATIONS",
    headline: "Smart AI for Smarter Work",
    desc: "Automate your daily tasks using smart chatbots and advanced AI tools. Focus on what matters most while technology handles the repetitive work.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "04",
    title: "WEB DEVELOPMENT",
    headline: "Fast Websites that Get You Clients",
    desc: "We build high-speed, SEO-optimized websites that rank higher on Google. Turn your visitors into loyal customers with a premium digital experience.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "05",
    title: "MOBILE APPS",
    headline: "Modern Apps for Your Customers",
    desc: "Premium mobile applications that work seamlessly on both iOS and Android. We focus on simple design and a smooth experience for your users.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "06",
    title: "SEARCH OPTIMIZATION",
    headline: "SEO -> GEO -> AEO",
    desc: "As the best IT company for search visibility, we ensure your brand dominates search results across Google (SEO), AI Engines (GEO), and Voice platforms (AEO).",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "07",
    title: "BUSINESS PORTFOLIOS",
    headline: "Build a Strong Brand Online",
    desc: "High-end digital portfolios designed to boost your brand value and credibility. Stand out from your competitors with a polished, professional look.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const cards = gsap.utils.toArray(".service-card");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${services.length * 150}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      cards.forEach((card: any, i: number) => {
        const q = gsap.utils.selector(card);
        const image = q(".service-image-wrapper");
        const content = q(".service-content");

        const step = 1.5;
        const position = i * step;

        if (i !== 0) {
          tl.fromTo(card,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, ease: "none", duration: 1 },
            position
          );
        }

        tl.fromTo(image, { scale: 1.2 }, { scale: 1, duration: 1, ease: "none" }, position);
        tl.fromTo(content, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, position + 0.2);

        if (i < cards.length - 1) {
          tl.to(card, { scale: 0.9, opacity: 0, yPercent: -20, duration: 1, ease: "none" }, position + step);
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


    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative z-20 bg-background overflow-hidden py-12 md:py-0 transition-colors duration-500"
    >
      <div ref={triggerRef} className="relative md:h-screen w-full">
        <div className="tech-grid absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.2)_0,transparent_50%)]" />
          <div
            className="w-full h-full opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(var(--primary-rgb),0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-rgb),0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative h-full w-full flex flex-col md:block">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`service-card relative md:absolute inset-0 w-full md:h-full flex items-center justify-center p-6 md:p-12 mb-24 md:mb-0 will-change-transform ${i === 0 ? "z-10" : "z-0 md:opacity-0"}`}
            >
              <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center max-w-6xl">
                <div className={`service-image-wrapper relative aspect-video md:aspect-16/10 overflow-hidden rounded-xl border border-white/10 shadow-2xl will-change-transform ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image 
                    src={s.image} 
                    fill 
                    alt={s.title} 
                    className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none">

                    <div className="flex justify-between items-start">
                      <span className="text-primary font-mono text-[8px] tracking-widest uppercase">MODULE-{s.id}</span>
                      <div className="w-5 h-5 border-t border-r border-primary/30" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="w-5 h-5 border-b border-l border-primary/30" />
                      <span className="text-primary font-mono text-[8px]">ENCRYPTED</span>
                    </div>
                  </div>
                </div>

                <div className={`service-content flex flex-col gap-4 lg:gap-6 will-change-transform ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-mono text-[10px] tracking-widest uppercase font-bold opacity-70">SRV-0{i + 1}</span>
                      <div className="h-px w-8 bg-primary/20" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-white">
                      {s.headline.split(" ").slice(0, -1).join(" ")} <br />
                      <span className="text-primary italic font-light">{s.headline.split(" ").slice(-1)}</span>
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-foreground/80 font-light leading-relaxed max-w-xs">{s.desc}</p>
                  <div className="flex flex-wrap items-center gap-6 mt-2 group cursor-pointer w-fit">
                    <Link 
                      href="/contact"
                      aria-label={`Get in touch about ${s.title}`}
                      className="group  hover:text-white inline-flex items-center gap-1 text-blue-600 px-3 py-2 rounded-full font-bold text-[10px] md:text-sm tracking-widest hover:scale-105 transition-all"
                    >
                      <span>INFO</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" aria-hidden="true" />
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
