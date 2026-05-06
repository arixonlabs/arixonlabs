"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Heading Letter Reveal
    if (headingRef.current) {
      const text = headingRef.current.innerText;
      headingRef.current.innerHTML = text
        .split("")
        .map((char) => `<span class="letter inline-block">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      gsap.fromTo(
        headingRef.current.querySelectorAll(".letter"),
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // 2. Mouse Reactive Background (Subtle Grid)
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate API call before redirecting
    setTimeout(() => {
      const text = `*New Inquiry from Arixon.LABS*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Project:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/917994010513?text=${text}`;
      window.open(whatsappUrl, "_blank");
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative z-20 pt-16 pb-32 md:pt-24 md:pb-48 bg-background text-foreground px-6 overflow-hidden perspective-1000"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <Image 
          src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1200&auto=format&fit=crop"
          alt="Contact Background"
          fill
          className="object-cover brightness-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
      </div>

      {/* Dynamic Background Grid */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(var(--primary-rgb), 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Left Side Content */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase opacity-70">
                [ GET IN TOUCH ]
              </span>
              <h2 
                ref={headingRef}
                className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-white"
              >
                LET'S BUILD SOMETHING EXTRAORDINARY
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-white/80 max-w-md text-base md:text-lg font-light leading-relaxed">
                Whether you have a fully-formed idea or just a spark of inspiration, we're here to turn it into a digital masterpiece.
              </p>
              
              <div className="flex flex-wrap gap-8 mt-4">
                <a href="mailto:contact.arixon@gmail.com" aria-label="Send an email to Arixon Labs" className="group flex items-center gap-3 text-sm font-mono tracking-widest hover:text-primary transition-colors text-white/90">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  EMAIL US
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" aria-hidden="true" />
                </a>
                <a href="https://wa.me/917994010513" target="_blank" aria-label="Chat with Arixon Labs on WhatsApp" className="group flex items-center gap-3 text-sm font-mono tracking-widest hover:text-[#25D366] transition-colors text-white/90">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                  WHATSAPP
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Side Form (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl overflow-hidden">
               <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                        <label htmlFor="name" className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-bold">Your Name</label>
                        <motion.input 
                          whileFocus={{ scale: 1.02 }}
                          id="name"
                          name="name"
                          type="text" 
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-light tracking-wide placeholder:opacity-20"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-bold">Email Or Phone</label>
                        <motion.input 
                          whileFocus={{ scale: 1.02 }}
                          id="email"
                          name="email"
                          type="text" 
                          required
                          placeholder="Email Address Or Phone Number"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-light tracking-wide placeholder:opacity-20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label htmlFor="message" className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-bold">Project Brief</label>
                      <motion.textarea 
                        whileFocus={{ scale: 1.01 }}
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your idea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-light tracking-wide resize-none placeholder:opacity-20"
                      />
                    </div>

                    <button 
                      type="submit"
                      aria-label="Send your message via WhatsApp"
                      className="group relative flex items-center justify-center bg-white text-black h-16 rounded-xl font-bold tracking-[0.2em] text-xs hover:bg-primary transition-all active:scale-95 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        SEND MESSAGE <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-6"
                  >

                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">MESSAGE SENT!</h3>
                      <p className="text-foreground/50 text-sm">Opening WhatsApp to finalize your request...</p>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

