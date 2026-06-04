"use client";

import React, { useState } from "react";
import { Briefcase, Palette, Code, ShieldAlert, Smartphone, LineChart, Clock, Tag } from "lucide-react";

interface Course {
  id: number;
  bnName: string;
  engName: string;
  duration: string;
  price: string;
  desc: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

function CourseCard({ course, idx }: { course: Course; idx: number }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Calculate rotation: max 12 degrees
    const rotateX = -(y - yc) / (yc / 12);
    const rotateY = (x - xc) / (xc / 12);
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const IconComponent = course.icon;

  // Alternate gradient direction
  const gradientClass =
    idx % 2 === 0
      ? "bg-gradient-to-br from-slate-900/40 to-slate-950/70"
      : "bg-gradient-to-tr from-slate-950/70 to-slate-900/40";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: rotate.x === 0 ? "transform 0.5s ease" : "none",
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full rounded-2xl border border-[var(--border-color)] ${gradientClass} p-6 md:p-8 flex flex-col justify-between overflow-hidden group hover:border-[var(--accent)]/50 transition-colors duration-500 cursor-none`}
    >
      {/* Rotated 60% discount sticker */}
      <div className="absolute top-3 right-3 z-20 rotate-12 bg-[var(--accent)] text-[var(--text-inverse)] font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-[0_4px_10px_rgba(0,0,0,0.4)] flex items-center gap-0.5 border border-white/10 select-none">
        <Tag className="w-2.5 h-2.5" />
        <span>৬০% ছাড়</span>
      </div>

      {/* Hover glow highlight */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-[var(--accent)]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none -z-10" />

      {/* Contents lifted inside perspective space */}
      <div 
        className="flex flex-col h-full justify-between gap-6 transition-transform duration-500 ease-out"
        style={{ transform: "translateZ(30px)" }}
      >
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase border-b border-slate-800 pb-0.5 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/20 transition-all duration-500">
              {course.category}
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_0_10px_var(--accent-glow)] transition-all duration-500">
              <IconComponent className="w-4.5 h-4.5" />
            </div>
          </div>

          {/* Bengali Name */}
          <h3 
            className="font-black text-lg text-white group-hover:text-[var(--accent)] transition-all duration-300"
            style={{ fontFamily: "var(--font-bengali)" }}
          >
            {course.bnName}
          </h3>
          
          {/* English Name */}
          <span className="text-[10px] font-mono tracking-wider text-slate-400 block mt-1 uppercase">
            {course.engName}
          </span>

          <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
            {course.desc}
          </p>
        </div>

        {/* Footer pricing / duration row */}
        <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]/70" />
            <span>{course.duration}</span>
          </div>
          <div className="text-white font-bold">
            <span>{course.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  // Database of course offerings
  // EDIT: course details /}
  const coursesList: Course[] = [
    {
      id: 1,
      bnName: "কম্পিউটার অফিস অ্যাপ্লিকেশন",
      engName: "Computer Office Applications",
      duration: "৩ মাস / ৬ মাস",
      price: "৳১,৮৫০ থেকে",
      desc: "MS Word, Excel, PowerPoint, এবং ইন্টারনেট ব্রাউজিংয়ের মৌলিক থেকে অ্যাডভান্সড প্রাতিষ্ঠানিক কারিগরি প্রশিক্ষণ।",
      category: "Office",
      icon: Briefcase,
    },
    {
      id: 2,
      bnName: "অ্যাডভান্সড গ্রাফিক ডিজাইন ও ইউএক্স",
      engName: "Advanced Graphic Design & UX",
      duration: "৪ মাস / ৬ মাস",
      price: "৳৩,০০০ থেকে",
      desc: "Figma, Illustrator এবং Photoshop-এর মাধ্যমে আকর্ষক ব্র্যান্ডিং আর্টওয়ার্ক এবং রেসপন্সিভ মোবাইল/ওয়েব প্রোটোটাইপ।",
      category: "Creative",
      icon: Palette,
    },
    {
      id: 3,
      bnName: "ওয়েব ডিজাইন ও ডেভেলপমেন্ট",
      engName: "Web Design & Development",
      duration: "৬ মাস",
      price: "৳৫,০০০ থেকে",
      desc: "HTML, CSS, Tailwind, JavaScript এবং React ফ্রেমওয়ার্ক ব্যবহার করে রেসপন্সিভ এবং আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি।",
      category: "Development",
      icon: Code,
    },
    {
      id: 4,
      bnName: "সাইবার সিকিউরিটি ও নেটওয়ার্কিং",
      engName: "Cybersecurity & Networking",
      duration: "৬ মাস",
      price: "৳৬,০০০ থেকে",
      desc: "নেটওয়ার্ক প্রোটোকল, পেন-টেস্টিং, ফায়ারওয়াল ডিফেন্স এবং উইন্ডোজ/লিনাক্স সিস্টেম সিকিউরিটি অপারেশন।",
      category: "Security",
      icon: ShieldAlert,
    },
    {
      id: 5,
      bnName: "মোবাইল অ্যাপ ডেভেলপমেন্ট",
      engName: "Mobile App Development",
      duration: "৬ মাস",
      price: "৳৬,৫০০ থেকে",
      desc: "Flutter অথবা React Native ফ্রেমওয়ার্ক দিয়ে অ্যান্ড্রয়েড এবং আইওএস (iOS) এর জন্য হাই-পারফরম্যান্স নেটিভ অ্যাপ্লিকেশন।",
      category: "Development",
      icon: Smartphone,
    },
    {
      id: 6,
      bnName: "ডিজিটাল মার্কেটিং ও এসইও",
      engName: "Digital Marketing & SEO",
      duration: "৩ মাস",
      price: "৳২,৫০০ থেকে",
      desc: "সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO), সোশ্যাল মিডিয়া মার্কেটিং, মেটা/গুগল ক্যাম্পেইন এবং ট্রাফিক জেনারেট ট্র্যাকিং।",
      category: "Marketing",
      icon: LineChart,
    },
  ];
  // / EDIT

  return (
    <section id="courses" className="relative w-full bg-[var(--bg-secondary)] py-24 md:py-32">
      {/* Decorative huge background lettering */}
      <div className="absolute top-[12%] left-0 w-full text-center select-none pointer-events-none z-0">
        <span className="font-display font-black text-[12vw] leading-none text-white/5 uppercase tracking-widest">
          COURSES
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--accent)] text-glow">
            Academy Programs
          </span>
          <h2 
            className="mt-4 font-black text-3xl md:text-5xl tracking-tight text-white leading-tight"
            style={{ fontFamily: "var(--font-bengali)" }}
          >
            আমাদের কোর্সসমূহ / Our Courses
          </h2>
          <p className="mt-4 font-sans text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
            {/* EDIT: description /} */}
            বাংলাদেশ কারিগরি শিক্ষাবোর্ড অনুমোদিত পাঠ্যক্রম অনুযায়ী সাজানো আমাদের কোর্সসমূহ।Mirpur এবং Tangail এর অভিজ্ঞ ট্রেইনারদের পরিচালনায় আধুনিক ল্যাব ও হাতে-কলমে প্র্যাক্টিক্যাল প্রশিক্ষণ।
            {/* / EDIT */}
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course, idx) => (
            <div key={course.id}>
              <CourseCard course={course} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
