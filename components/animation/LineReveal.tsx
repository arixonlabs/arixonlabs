"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LineReveal() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 95%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      }
    );
  }, []);

  return <div ref={lineRef} className="w-full h-px bg-primary/30 origin-left" />;
}
