"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { heroCards as CARDS } from "@/constant/constant";

gsap.registerPlugin(ScrollTrigger);

// Simplified Premium Counter Component that counts up smoothly and naturally
const Counter = ({
  value,
  suffix = "",
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      const timeoutId = setTimeout(() => setCount(0), 0);
      return () => clearTimeout(timeoutId);
    }

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMilliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 15);

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="inline-block">
      {count}
      {suffix}
    </span>
  );
};

// Premium Stat Card component managing stagger sequencing and hovers
const StatCard = ({
  value,
  suffix = "",
  label,
  delayIndex,
}: {
  value: number | string;
  suffix?: string;
  label: string;
  delayIndex: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/stat relative flex flex-col items-center lg:items-start text-center lg:text-left px-4 py-3 rounded-md border border-transparent hover:border-white/10 hover:bg-white/3 transition-colors duration-700 overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

      {isHovered && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/4 to-transparent pointer-events-none z-0"
        />
      )}

      <motion.span
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
        className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1.5 text-blue-400 group-hover/stat:text-white transition-colors duration-500"
      >
        {label}
      </motion.span>

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.92, y: 15 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 1,
              delay: 0.15 + delayIndex * 0.15,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        className="relative z-10 text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 transition-all duration-500 group-hover/stat:scale-105 group-hover/stat:text-blue-400"
      >
        {typeof value === "number" ? (
          <Counter value={value} suffix={suffix} />
        ) : (
          <span>{value}</span>
        )}
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const portalImageRef = useRef<HTMLDivElement>(null);
  const ecosystemSceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Clear ScrollTrigger cached positions on mount
      ScrollTrigger.clearScrollMemory();

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=260%", // Slower zoom scroll range
            pin: true,
            pinSpacing: true,
            scrub: 1.2, // Smoother follow-through, less floaty
          },
        });

        // 1. First Zoom Phase (Zoom in deep to create portal entrance feel)
        tl.to(
          bgImageRef.current,
          { scale: 5.0, ease: "power2.inOut", duration: 2.0 },
          0,
        );

        // 1b. First Background Fade Out
        tl.to(
          bgImageRef.current,
          { opacity: 0, ease: "power2.in", duration: 1.2 },
          0.8,
        );

        // 2. Scene 1 Text Exit (Fades out and scales up to fly past the viewer)
        tl.to(
          textRef.current,
          { scale: 3.0, opacity: 0, y: -180, ease: "power2.in", duration: 1.5 },
          0,
        );

        // 3. Scene 2 Background Reveal (Fade in portalImageRef starting small/far away and scaling up)
        tl.fromTo(
          portalImageRef.current,
          { scale: 0.65, opacity: 0 },
          { scale: 1.1, opacity: 1, ease: "power2.out", duration: 1.8 },
          0.8,
        );

        // 4. Scene 2 Content Reveal (Fades in and scales up to standard scale)
        tl.fromTo(
          ecosystemSceneRef.current,
          { scale: 0.65, opacity: 0 },
          { scale: 1.0, opacity: 1, ease: "power2.out", duration: 1.5 },
          1.5,
        );

        // 4b. Slow background parallax zoom for portalImageRef during hold phase (Continues zooming from 1.1 to 1.25)
        tl.to(
          portalImageRef.current,
          { scale: 1.25, ease: "none", duration: 5.0 },
          2.6,
        );

        // 5. Scene 2 Hold Phase
        tl.to({}, { duration: 5.0 }, 2.6);

        // 6. Final Exit Transition (Deep zoom out of the section into the white services section)
        tl.to(
          ecosystemSceneRef.current,
          { scale: 1.15, opacity: 0, ease: "sine.inOut", duration: 1.0 },
          7.6,
        );
        tl.to(
          portalImageRef.current,
          { scale: 1.45, opacity: 0, ease: "sine.inOut", duration: 1.0 },
          7.6,
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set([bgImageRef.current, textRef.current], {
          opacity: 1,
        });
        gsap.set(portalImageRef.current, {
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=220%", // Slower zoom scroll range on mobile
            pin: true,
            pinSpacing: true,
            scrub: 1.2, // Smoother follow-through
            invalidateOnRefresh: true,
          },
        });

        // 1. First Zoom Phase on mobile
        tl.to(
          bgImageRef.current,
          {
            scale: 3.5, // Zoom in deep on mobile too
            ease: "power2.inOut",
            duration: 1.8,
          },
          0,
        );

        // 1b. First Background Fade Out
        tl.to(
          bgImageRef.current,
          {
            opacity: 0,
            ease: "power2.in",
            duration: 1.0,
          },
          0.8,
        );

        // 2. Scene 1 Text Exit
        tl.to(
          textRef.current,
          {
            opacity: 0,
            y: -120,
            scale: 2.2, // Scale up text to fly past
            ease: "power2.in",
            duration: 1.4,
          },
          0,
        );

        // 3. Scene 2 Background Reveal on mobile
        tl.fromTo(
          portalImageRef.current,
          { scale: 0.65, opacity: 0 },
          {
            scale: 1.05,
            opacity: 1,
            ease: "power2.out",
            duration: 1.5,
          },
          0.8,
        );

        // 4. Scene 2 Content Reveal on mobile
        tl.fromTo(
          ecosystemSceneRef.current,
          { scale: 0.65, opacity: 0 },
          {
            scale: 1.0,
            opacity: 1,
            ease: "power2.out",
            duration: 1.2,
          },
          1.2,
        );

        // Mobile hold phase
        tl.to({}, { duration: 2.0 }, 1.5);

        // Mobile exit transition
        tl.to(
          ecosystemSceneRef.current,
          {
            opacity: 0,
            scale: 1.15,
            ease: "sine.inOut",
            duration: 1.0,
          },
          3.5,
        );

        tl.to(
          portalImageRef.current,
          {
            opacity: 0,
            scale: 1.35,
            ease: "sine.inOut",
            duration: 1.0,
          },
          3.5,
        );
      });

      // Refresh ScrollTrigger after a slight delay to ensure Next.js hydration layout is settled
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(refreshTimeout);
        mm.revert(); // Clean up matchMedia to prevent duplicate triggers on Next.js Hot Reloads
      };
    },
    { scope: containerRef },
  );

  // Standalone GSAP Hook for Volumetric Parallax Background Glows
  useGSAP(() => {
    gsap.fromTo(
      ".parallax-glow-left",
      { y: -60 },
      {
        y: 60,
        scrollTrigger: {
          trigger: ".stats-section-trigger",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      },
    );
    gsap.fromTo(
      ".parallax-glow-right",
      { y: 60 },
      {
        y: -60,
        scrollTrigger: {
          trigger: ".stats-section-trigger",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      },
    );
  });

  return (
    <>
      <section
        ref={containerRef}
        className="relative z-10 min-h-svh w-full overflow-hidden flex flex-col justify-center items-center text-center"
      >
        <div
          ref={sceneWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-center items-center text-center pointer-events-none"
        >
          {/* =========================================
              FIRST IMAGE SECTION (MAIN HERO BACKGROUND)
              ========================================= */}
          <div
            ref={bgImageRef}
            className="absolute inset-0 z-0 h-full w-full pointer-events-none"
          >
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <Image
                fill
                src="/herosection.jpeg"
                alt="Arixon Labs Hero Background"
                className="w-full h-full object-cover brightness-[0.7]"
                priority
                fetchPriority="high"
                sizes="100vw"
              />
            </motion.div>
          </div>

          {/* =========================================
              SECOND IMAGE SECTION (PORTAL BACKGROUND)
              ========================================= */}
          <div
            ref={portalImageRef}
            className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-0"
          >
            <div className="w-full h-full relative">
              <Image
                fill
                src="/secodsection.jpeg"
                alt="Arixon Labs Ecosystem Background"
                className="w-full h-full object-cover brightness-[0.6]"
                sizes="100vw"
              />
            </div>
          </div>
          {/* =========================================
              SECOND IMAGE SECTION - CONTENT & CARDS
              ========================================= */}
          <div
            ref={ecosystemSceneRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-0 px-4 md:px-8 mt-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white/5 blur-[90px] rounded-full pointer-events-none" />

            <div className="mb-0 flex items-center justify-center gap-3">
              <div className="h-px w-5 bg-blue-500/30" />
              <span className="text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">
                THE ARIXON ECOSYSTEM
              </span>
              <div className="h-px w-5 bg-blue-500/30" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4 text-center max-w-2xl leading-tight">
              Seamless Digital Systems <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-800">
                Built for Infinite Growth
              </span>
            </h2>

            <p className="text-xs md:text-sm text-white max-w-lg mx-auto font-light leading-relaxed tracking-wide mb-10 text-center">
              Experience layered synergy. We construct premium interfaces,
              intelligent models, and serverless backends integrated perfectly
              for scale.
            </p>

            {/* Ecosystem Cards */}
            <div className="relative w-full max-w-4xl h-70 md:h-50 pointer-events-auto flex flex-wrap justify-center gap-5 items-center">
              {/* Card 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="group relative bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl w-52 text-left transition-all duration-500"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  AI Business Automation
                </h3>
                <p className="text-xs text-white leading-relaxed font-light">
                  Custom digital models trained on your data to automate manual
                  work.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="group relative bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl w-52 text-left transition-all duration-500"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  Premium Web Systems
                </h3>
                <p className="text-xs text-white leading-relaxed font-light">
                  Breathtaking modern websites built with interactive layouts.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="group relative bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl w-52 text-left transition-all duration-500"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  Cloud Infrastructure
                </h3>
                <p className="text-xs text-white leading-relaxed font-light">
                  Global serverless setups delivering 100ms speeds.
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="group relative bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl w-52 text-left transition-all duration-500"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  Analytics & Growth
                </h3>
                <p className="text-xs text-white leading-relaxed font-light">
                  Deep predictive tracking to optimize customer acquisition.
                </p>
              </motion.div>
            </div>
          </div>

          {/* =========================================
            FIRST IMAGE SECTION - CONTENT & TEXT
            ========================================= */}
          <div
            ref={textRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pt-16 pointer-events-auto"
          >
            {/* Small Top Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4 flex items-center justify-center gap-3"
            >
              <div className="h-px w-6 bg-blue-500/30" />
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em]">
                ARIXONLABS
              </span>
              <div className="h-px w-6 bg-blue-500/30" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-5 leading-[1.1] max-w-3xl mx-auto"
            >
              Grow Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-800">
                Business Online
              </span>
            </motion.h1>

            {/* Premium Small Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-sm md:text-base text-white max-w-lg mx-auto font-light leading-relaxed tracking-wide mb-8"
            >
              We create premium websites, apps, and digital experiences for
              modern businesses.
            </motion.p>

            {/* CTA Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-6"
            >
              <Link href="/contact">
                <button className="group relative hover:bg-blue-600 hover:text-white px-3 py-2 cursor-pointer bg-white text-black font-semibold rounded-md overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <span className="relative z-10">Get Started</span>
                </button>
              </Link>
            </motion.div>

            {/* Refined Minimal Scrolling Cards Section */}
            <div className="w-full max-w-[100vw] overflow-hidden p-0 mt-8 relative">
              <motion.div
                className="flex gap-2.5 md:gap-2.5 whitespace-nowrap px-4"
                animate={{ x: [0, -1000] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...CARDS, ...CARDS, ...CARDS, ...CARDS].map(
                  (service, idx) => (
                    <div
                      key={idx}
                      className="group px-6 py-2.5 rounded-md bg-white/2 border
                  border-white/5 backdrop-blur-xl shrink-0
                  text-white/40 font-semibold tracking-wider text-xs text-center
                  transition-all duration-500 hover:text-white hover:border-white/20
                  hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] relative
                  overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10">{service}</span>
                    </div>
                  ),
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Section */}
      <motion.section
        className="stats-section-trigger relative z-20 py-10 md:py-14 overflow-hidden border-t border-white/5"
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: "#0b0c10" }}
      >
        {/* Background Glows */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="parallax-glow-left absolute top-1/2 left-1/4 -translate-y-1/2 w-150 h-75 bg-white/2 blur-[100px] rounded-full pointer-events-none z-0"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="parallax-glow-right absolute top-1/2 right-1/4 -translate-y-1/2 w-150 h-75 bg-white/2 blur-[100px] rounded-full pointer-events-none z-0"
        />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full max-w-6xl mx-auto px-6 relative z-10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            {/* Left Side: Trust Message & Header */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm"
            >
              <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-3">
                Trusted Digital Experiences
              </span>
              <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 leading-snug tracking-tight">
                Designed for ambitious brands and growing businesses.
              </h3>
            </motion.div>

            {/* Vertical Divider for desktop */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleY: 0 },
                visible: {
                  opacity: 1,
                  scaleY: 1,
                  transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="hidden lg:block w-px h-24 bg-linear-to-b from-white/10 via-white/5 to-transparent self-stretch origin-top"
            />

            {/* Responsive Stats Grid */}
            <div className="grid grid-cols-2  md:grid-cols-4 gap-8 md:gap-12 w-full lg:w-auto">
              <StatCard
                value={50}
                suffix="+"
                label="Projects Delivered"
                delayIndex={0}
              />
              <StatCard
                value={20}
                suffix="+"
                label="Business Solutions"
                delayIndex={1}
              />
              <StatCard
                value={100}
                suffix="%"
                label="Custom Built"
                delayIndex={2}
              />
              <StatCard value="24/7" label="Support & Growth" delayIndex={3} />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default HeroSection;
