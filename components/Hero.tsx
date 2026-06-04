"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Blob3D from "./Blob3D";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  
  // EDIT: course name /}
  const courseTexts = ["Office Course", "Designing Course", "3 Month Program"];
  // / EDIT

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % courseTexts.length);
    }, 3000);
    return () => clearInterval(textTimer);
  }, [courseTexts.length]);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between overflow-hidden pt-24 md:pt-0"
    >
      {/* Interactive WebGL Morphing Blob Badge (handles its own fixed scroll alignments) */}
      <Blob3D />

      {/* Main Split Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow w-full relative z-10 py-12 md:py-24">
        
        {/* Left Column (60%): Text contents */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-white/5 text-[var(--accent)] text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,255,255,0.02)] mb-6 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            {/* EDIT: accreditation details /} */}
            বাংলাদেশ কারিগরি শিক্ষাবোর্ড অনুমোদিত
            {/* / EDIT */}
          </motion.div>

          {/* Bengali Title */}
          <motion.h1
            variants={itemVariants}
            className="font-black text-4xl md:text-6xl text-white tracking-tight leading-[1.15] select-none"
            style={{ fontFamily: "var(--font-bengali)" }}
          >
            দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউট
          </motion.h1>

          {/* English Title */}
          <motion.h2
            variants={itemVariants}
            className="mt-3 font-display font-black text-2xl md:text-4xl tracking-tight text-[var(--accent)] text-glow select-none"
          >
            Dristy Computer Training Institute
          </motion.h2>

          {/* Subtext Location */}
          <motion.p
            variants={itemVariants}
            className="mt-4 font-sans text-xs md:text-sm text-slate-400 font-medium tracking-wide uppercase select-none"
          >
            Near Sonali Bank, Gopalpur, Tangail — Est. 2023
          </motion.p>

          {/* Price Callout */}
          <motion.div
            variants={itemVariants}
            className="mt-6 px-5 py-3 rounded-2xl border border-[var(--border-color)] bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(var(--accent-rgb),0.05)] inline-flex flex-col select-none"
          >
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">COURSE ENROLLMENT FROM</span>
            <span className="mt-1 font-bold text-white text-lg font-bengali leading-none">
              মাত্র <span className="text-[var(--accent)] text-glow">৳১,৮৫০</span> থেকে
            </span>
          </motion.div>

          {/* Animated Course Text Cycle */}
          <motion.div variants={itemVariants} className="mt-6 h-8 overflow-hidden select-none flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">PROGRAMS :</span>
            <div className="relative h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="font-mono text-xs font-bold text-white tracking-widest uppercase absolute left-0 whitespace-nowrap"
                >
                  {courseTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4 items-center w-full">
            <a
              href="#courses"
              className="shimmer-btn px-8 py-3.5 rounded-full bg-[var(--accent)] text-black text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_var(--accent-glow)] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-none"
            >
              কোর্স দেখুন
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-[var(--border-color)] bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 cursor-none"
            >
              যোগাযোগ করুন
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column (40%): Reserve area for the morphing blob */}
        {/* On mobile: occupies height at the top, text flows below */}
        <div className="lg:col-span-5 h-[40vh] lg:h-[60vh] w-full flex items-center justify-center order-1 lg:order-2 select-none" />

      </div>

      {/* Bouncing Scroll Chevron Indicator */}
      <div className="relative z-10 pb-6 flex items-center justify-center pointer-events-none select-none">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center justify-center gap-1.5 text-slate-500 text-[8px] font-bold tracking-[0.25em] uppercase"
        >
          <span>Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-[var(--accent)]" />
        </motion.div>
      </div>
    </section>
  );
}
