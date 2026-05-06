"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Refresh ScrollTrigger when pathname changes to ensure correct heights
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal columns
      gsap.from(".footer-col", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      // Reveal bottom bar
      gsap.from(".footer-bottom", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
          toggleActions: "play none none reverse",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power4.inOut" });
  };

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Works", href: "/works" },
    { name: "Home", href: "/home" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ), 
      href: "https://www.instagram.com/arixon.labs/" 
    },
  ];

  return (
    <footer ref={footerRef} className="relative z-30 bg-[#020617] border-t border-white/5 pt-16 pb-8 px-6 overflow-hidden">
      {/* Cinematic Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <div className="text-[20vw] font-black tracking-tighter select-none">
          ARIXON
        </div>
      </div>


      {/* Cinematic Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
        
          {/* Column 1: Brand */}
          <div className="footer-col lg:col-span-2 flex flex-col gap-6">
            <Link href="/" aria-label="Arixon Labs Home" className="relative h-12 w-32 -ml-4">
              <Image 
                src="/assets/logo.png" 
                alt="Arixon Labs Logo" 
                fill 
                className="object-contain brightness-110" 
              />
            </Link>
            <p className="text-white/80 max-w-sm text-lg font-light leading-relaxed">
              Turning complex ideas into scalable digital products. We bridge the gap between vision and technical excellence.
            </p>
          </div>


          {/* Column 2: Quick Links */}
          <div className="footer-col flex flex-col gap-8">
            <h3 className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase font-bold opacity-70">
              NAVIGATION
            </h3>

            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors font-light tracking-wide text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="footer-col flex flex-col gap-8">
            <h3 className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase font-bold opacity-70">
              SOCIALS
            </h3>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={`Follow Arixon Labs on ${social.name}`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} ARIXON LABS. ALL RIGHTS RESERVED.
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex cursor-pointer items-center gap-4 text-foreground/40 hover:text-white transition-colors"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">BACK TO TOP</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
