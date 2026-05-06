"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question:
      "Why is Arixon Labs considered the best IT company for SaaS development?",
    answer:
      "Arixon Labs is recognized as a top IT company because we don't just build software; we engineer scalable SaaS platforms with high-performance architectures. Our development process integrates SEO, GEO, and AEO from day one, ensuring your product is ready for both human users and AI search engines.",
  },
  {
    question: "How does AI automation benefit my business?",
    answer:
      "AI automation streamlines repetitive workflows, reduces human error, and provides 24/7 customer engagement through intelligent agents. Arixon Labs specializes in custom AI integrations that help businesses scale without proportionally increasing operational costs.",
  },
  {
    question: "What are SEO, GEO, and AEO, and why do they matter?",
    answer:
      "SEO (Search Engine Optimization) is for Google ranking. GEO (Generative Engine Optimization) ensures AI tools like ChatGPT recommend you. AEO (Answer Engine Optimization) optimizes for voice search and direct answers. Together, they form a complete visibility strategy for the modern digital era.",
  },
  {
    question: "Can Arixon Labs help startups with limited technical knowledge?",
    answer:
      "Absolutely. As a leading IT agency, we act as your technical partner. We handle everything from concept and design to deployment and scaling, allowing you to focus on business growth while we manage the complex engineering.",
  },
  {
    question: "What technologies does Arixon Labs use for web development?",
    answer:
      "We use cutting-edge technologies like Next.js, React, Node.js, and advanced AI frameworks. This ensures your website is fast, secure, and future-proof, meeting the high standards required by global enterprises.",
  },
];

const FaqSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Pinning the header on the left while items scroll on the right
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: "#faq-header",
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: -1, // Ensures correct calculation after long pinned sections above
        });

        // Subtle parallax for grid background
        gsap.to(".faq-grid", {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 1. Cinematic Scroll-Driven Entrance (Scrubbing)
      gsap.from(".faq-item", {
        opacity: 0.3,
        y: 100,
        rotateX: -10,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });

      // 2. Active Card Glow Parallax
      gsap.to(".faq-grid", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  const toggleFaq = (index: number | null) => {
    // If clicking the same index, close it
    if (index === activeIndex && index !== null) {
      const currentContent = document.getElementById(`faq-content-${activeIndex}`);
      if (currentContent) {
        gsap.to(currentContent, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
      }
      setActiveIndex(null);
      return;
    }

    const isOpening = index !== null;
    const currentContent = document.getElementById(
      `faq-content-${activeIndex}`,
    );
    const nextContent = isOpening
      ? document.getElementById(`faq-content-${index}`)
      : null;

    if (activeIndex !== null && currentContent) {
      gsap.to(currentContent, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }

    if (isOpening && nextContent) {
      gsap.fromTo(
        nextContent,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" },
      );
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative z-0 isolate bg-background overflow-hidden pt-12 pb-32 px-6"
    >
      {/* Cinematic Background Elements */}
      <div className="faq-grid absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Sticky Header Section - True Viewport Centering */}
          <div
            id="faq-header"
            className="lg:w-1/3 flex flex-col justify-center items-start text-left lg:h-screen"
          >
            <span className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase opacity-70 mb-6 block">
              [ FAQ MODULE ]
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9] mb-8">
              KNOWLEDGE <br />{" "}
              <span className="text-primary italic font-light">REVEALED</span>
            </h2>
            <div className="h-px w-24 bg-primary/30 mb-8" />
            <p className="text-white/90 text-sm md:text-lg max-w-sm font-light leading-relaxed">
              Explore the technical foundation and strategic principles that
              drive our agency&apos;s digital innovations.
            </p>
          </div>

          {/* Scrolling FAQ List */}
          <div className="lg:w-2/3 faq-list flex flex-col gap-4 perspective-1000">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) toggleFaq(index);
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024) toggleFaq(null);
                }}
                className={`faq-item group border transition-all duration-700 rounded-2xl overflow-hidden ${
                  activeIndex === index
                    ? "bg-primary/20 border-primary/60 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] scale-[1.02] cursor-pointer"
                    : "bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/25 hover:translate-x-2 cursor-pointer"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                  className="w-full flex items-center justify-between p-6 md:p-10 text-left transition-transform active:scale-[0.98]"
                >
                  <span
                    className={`text-xl md:text-2xl font-medium tracking-tight pr-8 transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-primary font-bold"
                        : "text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      activeIndex === index
                        ? "bg-primary border-primary text-black rotate-90 scale-110"
                        : "border-white/10 text-white/30"
                    }`}
                  >
                    {activeIndex === index ? (
                      <X size={24} strokeWidth={1.5} />
                    ) : (
                      <ChevronDown size={24} strokeWidth={1.5} />
                    )}
                  </div>
                </button>

                <div
                  id={`faq-content-${index}`}
                  className="h-0 opacity-0 overflow-hidden"
                >
                  <div className="px-10 pb-10 text-white font-light leading-relaxed text-lg max-w-3xl border-t border-primary/10 pt-8 mx-10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
