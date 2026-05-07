"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PerformanceManager() {
  useEffect(() => {
    // 1. Aggressive TBT Reduction for Mobile
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Lower GSAP ticker frequency on mobile to save CPU/Battery
      // 30fps is plenty for mobile scroll animations and drastically reduces TBT
      gsap.ticker.fps(30);
      
      // Lag smoothing prevents long frames from causing huge jumps/blocking
      gsap.ticker.lagSmoothing(1000, 16);
    }

    // 2. Global ScrollTrigger Optimization
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize", // Refresh on all major events
    });

    // 3. Normalize Scroll (Industrial Strength Fix)
    // This forces the browser to sync all scroll events, preventing "stuck" sections
    ScrollTrigger.normalizeScroll(true);


    // 3. Force refresh on full load to prevent "stuck" scroll
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);
    
    // Refresh after a short delay as a fallback for dynamic images
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 2000);

    // 4. Cleanup
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.ticker.fps(60);
    };

  }, []);

  return null;
}
