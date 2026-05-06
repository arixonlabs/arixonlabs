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
    // Only refresh when absolutely necessary
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true, // Prevents layout recalculations on mobile address bar hide/show
    });

    // 3. Cleanup unused GSAP instances on navigation
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.ticker.fps(60); // Reset for desktop
    };
  }, []);

  return null;
}
