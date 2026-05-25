"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function PerformanceManager() {
  const pathname = usePathname();

  // Force ScrollTrigger to refresh whenever the URL changes
  // This is critical for Next.js app router navigation smoothness
  useEffect(() => {
    // Small delay to allow the new page content to mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // 1. Disable GSAP lag smoothing to keep it in sync with Lenis RAF updates
    gsap.ticker.lagSmoothing(0);
    
    // 2. Global ScrollTrigger Optimization
    // IMPORTANT: normalizeScroll(true) is REMOVED as it conflicts with Lenis
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize", 
    });

    // 3. Robust Refresh Logic
    // This handles the "Ctrl+Shift+R" issue by ensuring everything refreshes after content loads
    const refreshAll = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshAll);
    
    // Multiple refresh heartbeats to catch late-loading images/fonts
    const timer1 = setTimeout(refreshAll, 500);
    const timer2 = setTimeout(refreshAll, 2000);

    // 4. Cleanup
    return () => {
      window.removeEventListener("load", refreshAll);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return null;
}
