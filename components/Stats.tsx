"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";

interface CountUpProps {
  value: number;
}

// Highly premium spring-based numeric counter
function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 45, stiffness: 120, mass: 1 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  // Stat definitions
  // EDIT: stats /}
  const statsList = [
    { value: 500, suffix: "+", label: "Graduates Trained" },
    { value: 10, suffix: "+", label: "Professional Courses" },
    { value: 2010, suffix: "", label: "Serving Since" },
    { value: 100, suffix: "%", label: "Govt. Approved & Certified" }
  ];
  // / EDIT

  return (
    <section className="relative z-10 w-full bg-[#050505] py-12 border-y border-slate-900 overflow-hidden">
      {/* Absolute back-glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[80px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          {statsList.map((stat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center text-center px-4 pt-6 md:pt-0 group cursor-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Stat number with glow */}
              <div className="font-display font-black text-4xl md:text-6xl text-white tracking-tight flex items-center gap-0.5 group-hover:text-primary transition-colors duration-500">
                <CountUp value={stat.value} />
                <span className="text-primary text-glow-cyan">{stat.suffix}</span>
              </div>
              
              {/* Stat subtitle label */}
              <p className="mt-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 font-sans group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
