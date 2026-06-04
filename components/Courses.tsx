"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, Code, Cpu, ShieldAlert, Award, LineChart, Clock, Banknote } from "lucide-react";

interface Course {
  id: number;
  name: string;
  duration: string;
  price: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 3D Perspective Card Component
function CourseCard({ course }: { course: Course }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to track normalized coordinates [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs mapping normalized coordinates to rotational degrees
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    
    // Position relative to card center, normalized between -0.5 and 0.5
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const IconComponent = course.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full rounded-2xl border border-slate-900 bg-gradient-to-b from-slate-900/40 to-slate-950/80 p-6 md:p-8 flex flex-col justify-between overflow-hidden group hover:border-primary/45 transition-colors duration-500 perspective-1000 interactive-3d-card"
    >
      {/* 1. Neon glow border element appearing on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_60%)] -z-10" />

      {/* 2. Front content, translateZ lifts it on hover */}
      <div 
        className="flex flex-col h-full justify-between gap-6 transition-transform duration-500 ease-out" 
        style={{ transform: "translateZ(40px)" }}
      >
        <div>
          {/* Header row: category and icon */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase border-b border-slate-800 pb-1 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
              {course.category}
            </span>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary group-hover:border-primary/40 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all duration-500">
              <IconComponent className="w-5 h-5" />
            </div>
          </div>

          {/* Course details /} */}
          <h3 className="font-display font-bold text-xl text-white group-hover:text-glow-cyan transition-all duration-300">
            {course.name}
          </h3>

          <p className="mt-3 text-sm text-slate-400 font-sans leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Footer info: duration and pricing */}
        <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-primary/75" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-white font-bold">
            <Banknote className="w-3.5 h-3.5 text-primary/75" />
            <span>{course.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  // Course placeholders database
  // EDIT: course details /}
  const coursesList: Course[] = [
    {
      id: 1,
      name: "Full Stack Web Development",
      duration: "6 Months",
      price: "15,000 BDT",
      description: "Master Modern React, Next.js, Node.js, and databases. Architect production-ready responsive applications with zero-lag interfaces.",
      category: "Development",
      icon: Code,
    },
    {
      id: 2,
      name: "Advanced Graphic Design & UX",
      duration: "4 Months",
      price: "10,000 BDT",
      description: "Establish strong design fundamentals. Sculpt stunning assets, vector typography, and interactive UI prototypes in Figma and Illustrator.",
      category: "Creative",
      icon: Cpu,
    },
    {
      id: 3,
      name: "Cybersecurity & Ethical Hacking",
      duration: "5 Months",
      price: "18,000 BDT",
      description: "Gain hands-on command of penetration testing, firewall defenses, network sniffing, security compliance, and system hardening protocols.",
      category: "Security",
      icon: ShieldAlert,
    },
    {
      id: 4,
      name: "Professional Office Application",
      duration: "3 Months",
      price: "4,000 BDT",
      description: "Excel in corporate administration workflow. Drive professional word docs, complex Excel data models, and engaging slide decks.",
      category: "Productivity",
      icon: Award,
    },
    {
      id: 5,
      name: "Mobile App Development",
      duration: "6 Months",
      price: "16,000 BDT",
      description: "Create highly responsive cross-platform native applications for Android and iOS using React Native and Flutter frameworks.",
      category: "Development",
      icon: Terminal,
    },
    {
      id: 6,
      name: "Digital Marketing & SEO",
      duration: "3 Months",
      price: "8,000 BDT",
      description: "Dominate search indexes and target customer conversions. Formulate targeted SEO campaigns, social automation, and analytics pipelines.",
      category: "Marketing",
      icon: LineChart,
    },
  ];
  // / EDIT

  return (
    <section id="courses" className="relative w-full bg-[#050505] py-24 md:py-32">
      {/* Back glow */}
      <div className="absolute right-0 top-[20%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-[10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-xl mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary text-glow-cyan">
            Curriculum Hub
          </span>
          <h2 className="mt-4 font-display font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
            Level Up Your Digital Craft.
          </h2>
          <p className="mt-4 font-sans text-sm md:text-base text-slate-400 leading-relaxed">
            Acquire high-demand technical capabilities. Our structured, government-approved syllabi align with current industry standards.
          </p>
        </div>

        {/* 3D Tilt Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
