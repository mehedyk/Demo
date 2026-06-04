"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { Check } from "lucide-react";

interface CountUpProps {
  value: number;
}

function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 40, stiffness: 110, mass: 1 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  return (
    <section className="relative z-10 w-full bg-[var(--bg-primary)] py-20 border-y border-[var(--border-color)] overflow-hidden">
      <div className="dot-grid" />
      
      {/* Absolute back-glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[80px] bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-y-10 md:gap-y-0 text-center">
          
          {/* Stat 1: 500+ Graduates */}
          {/* EDIT: stats /} */}
          <motion.div
            className="flex flex-col items-center justify-center md:col-span-1 cursor-none group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="font-display font-black text-4xl md:text-5xl text-white tracking-tight flex items-center justify-center gap-0.5">
              <CountUp value={500} />
              <span className="text-[var(--accent)] text-glow">+</span>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans group-hover:text-white transition-colors duration-300">
              Graduates
            </p>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex justify-center md:col-span-1">
            <div className="w-px h-12 bg-[var(--border-color)] self-center" />
          </div>

          {/* Stat 2: 10+ Courses */}
          <motion.div
            className="flex flex-col items-center justify-center md:col-span-1 cursor-none group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="font-display font-black text-4xl md:text-5xl text-white tracking-tight flex items-center justify-center gap-0.5">
              <CountUp value={10} />
              <span className="text-[var(--accent)] text-glow">+</span>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans group-hover:text-white transition-colors duration-300">
              Courses
            </p>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex justify-center md:col-span-1">
            <div className="w-px h-12 bg-[var(--border-color)] self-center" />
          </div>

          {/* Stat 3: 3 Durations */}
          <motion.div
            className="flex flex-col items-center justify-center md:col-span-1 cursor-none group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="font-display font-black text-4xl md:text-5xl text-white tracking-tight flex items-center justify-center gap-0.5">
              <CountUp value={3} />
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans group-hover:text-white transition-colors duration-300">
              Durations
            </p>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex justify-center md:col-span-1">
            <div className="w-px h-12 bg-[var(--border-color)] self-center" />
          </div>

          {/* Stat 4: Govt. Approved */}
          <motion.div
            className="flex flex-col items-center justify-center col-span-2 md:col-span-1 cursor-none group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="font-display font-black text-3xl md:text-4xl text-white tracking-tight flex items-center justify-center gap-1.5">
              <span className="text-white">Govt.</span>
              <span className="text-[var(--accent)] text-glow flex items-center gap-0.5">
                Approved
                <Check className="w-5 h-5 text-[var(--accent)]" />
              </span>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans group-hover:text-white transition-colors duration-300">
              Accreditation
            </p>
          </motion.div>
          {/* / EDIT */}

        </div>
      </div>
    </section>
  );
}
