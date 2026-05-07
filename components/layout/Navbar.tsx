"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "WORK", href: "/works" },
  { name: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-100 px-6 py-3">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between bg-background/40 backdrop-blur-xl border border-white/10 rounded-full px-6 h-16 shadow-xl">

            <Link href="/" className="flex items-center" aria-label="Arixon Labs Home">
              <div className="relative h-16 w-32 md:h-24 md:w-48 ml-[-20px] md:ml-[-45px]">
                <Image
                  src="/assets/logo.png"
                  alt="Arixon Labs Logo"
                  fill
                  className="object-contain brightness-110 drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
            </Link>

            {/* Desktop Links - Tighter Spacing */}
            <div className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-mono font-bold tracking-[0.3em] hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-2 bg-primary px-5 py-2 rounded-full text-[10px] font-bold text-black hover:scale-105 transition-transform"
                aria-label="Start a new project"
              >
                START A PROJECT <ArrowRight className="w-3 h-3" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-foreground z-101 pointer-events-auto relative"
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            id="mobile-menu"
            className="fixed inset-0 z-99 bg-background flex flex-col justify-center px-10 gap-8 md:hidden"

          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-light tracking-tighter hover:italic hover:pl-4 transition-all"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-sm font-mono tracking-[0.2em] text-primary flex items-center gap-2"
              >
                [ GET STARTED ] <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
