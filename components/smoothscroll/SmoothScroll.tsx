"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    
    // 1. Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Add GSAP ticker synchronization
    // This is the industrial-strength way to sync GSAP and Lenis
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(update);

    // Clean up
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return (
    <ReactLenis 
      root 
      autoRaf={false} 
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: true, // Better trackpad/mobile support
        infinite: false,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}



