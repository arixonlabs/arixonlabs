"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { platformBadges as PLATFORM_BADGES, businessFeatures as FEATURES } from "@/constant/constant";

export default function BusinessPlatformSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize scroll to the middle copy on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
        const gap = 16;
        const step = cardWidth + gap;
        carouselRef.current.scrollLeft = step * FEATURES.length;
      }
    }, 100);
    return () => {
      clearTimeout(timer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Sync scroll position, update dots and handle silent looping after scroll ends
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
    const gap = 16;
    const step = cardWidth + gap;

    // Calculate current index relative to the middle set (which starts at index 6)
    const index = Math.round(scrollLeft / step);
    const relativeIndex = (index - FEATURES.length + FEATURES.length) % FEATURES.length;
    setCurrentIndex(relativeIndex);

    // Debounce the loop snap until smooth scrolling has stopped
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!carouselRef.current) return;
      const currentScroll = carouselRef.current.scrollLeft;

      // If scrolled past the end of the middle set (into the 3rd set)
      if (currentScroll >= step * FEATURES.length * 2) {
        carouselRef.current.style.scrollBehavior = "auto";
        carouselRef.current.scrollLeft = currentScroll - step * FEATURES.length;
        carouselRef.current.style.scrollBehavior = "smooth";
      }
      // If scrolled before the start of the middle set (into the 1st set)
      else if (currentScroll <= step * (FEATURES.length - 1)) {
        carouselRef.current.style.scrollBehavior = "auto";
        carouselRef.current.scrollLeft = currentScroll + step * FEATURES.length;
        carouselRef.current.style.scrollBehavior = "smooth";
      }
    }, 150);
  };

  const nextSlide = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
      carouselRef.current.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
      carouselRef.current.scrollBy({ left: -(cardWidth + 16), behavior: "smooth" });
    }
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
      const gap = 16;
      const step = cardWidth + gap;
      carouselRef.current.scrollTo({ left: (FEATURES.length + index) * step, behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#fafafa] overflow-hidden z-20 border-t border-slate-300"
    >
      {/* Background Morning-to-Night Gradient Transition starting from behind the cards */}
      <div className="absolute top-[35%] bottom-0 left-0 right-0 bg-linear-to-b from-[#fafafa] via-zinc-900 to-black pointer-events-none z-0" /> 

      <div className="w-full max-w-7xl mx-auto px-6 relative z-20 mt-10 md:mt-10 pb-24 ">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.1]"
          >
            Everything you need on one platform
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Power your business with premium digital experiences, automation, and scalable technology. Engineered for high performance and luxury startup standards.
          </motion.p>
        </div>

        {/* 2. Platform Badges: Horizontal Auto-Scrolling Row */}
        <div className="w-full overflow-hidden py-4 mb-16 relative z-10">
          <motion.div
            className="flex gap-4 md:gap-5 whitespace-nowrap px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...PLATFORM_BADGES, ...PLATFORM_BADGES].map((badge, idx) => (
              <div
                key={idx}
                className="group px-6 py-3 rounded-md bg-white/70 border border-zinc-200/50 shadow-[0_2px_10px_rgba(0,0,0,0.01)] text-zinc-600 font-medium tracking-wide text-xs md:text-sm text-center transition-all duration-500 hover:text-blue-600 hover:border-blue-200 hover:bg-white hover:shadow-[0_10px_20px_rgba(0,0,0,0.03)] relative overflow-hidden shrink-0"
              >
                <span className="relative z-10">{badge}</span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* 3. Interactive Carousel Slider Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 w-full"
        >
          {/* Native scroll container */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden pb-10 px-4 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...FEATURES, ...FEATURES, ...FEATURES].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.3, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="snap-center shrink-0 w-65 md:w-70 lg:w-[320px] h-95 md:h-110"
              >
                <div className="w-full h-full rounded-md overflow-hidden relative group cursor-pointer border border-zinc-200/10 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] transition-all duration-700">
                  <Image 
                    src={feature.image} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={feature.title} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Dark overlay for readability over images */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10 group-hover:from-black group-hover:via-black/50 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <span className="text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 bg-blue-500/10 px-3 py-1 rounded-full w-max backdrop-blur-md border border-blue-500/20">
                      {feature.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls: Dots & Navigation Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 -mt-5 relative z-20 ">
            {/* Left placeholder to balance flex */}
            <div className="flex-1 hidden md:block" />
            
            {/* Center Dots */}
            <div className="flex-1 flex justify-center gap-2">
              {FEATURES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-8 bg-blue-500" 
                      : "w-2 bg-zinc-600 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="flex-1 flex justify-center md:justify-end gap-2">
              <button 
                onClick={prevSlide} 
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide} 
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
