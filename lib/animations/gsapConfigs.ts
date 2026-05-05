import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Creates a pin reveal effect for a hero section.
 * The hero pins in place while the next section overlays it.
 */
export const createPinReveal = (
  triggerElement: Element | null,
  endString: string = "bottom top"
) => {
  if (!triggerElement) return;

  return ScrollTrigger.create({
    trigger: triggerElement,
    start: "top top",
    end: endString,
    pin: true,
    pinSpacing: false, // Allows subsequent sections to overlap
  });
};
