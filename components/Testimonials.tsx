"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  course: string;
  quote: string;
  avatarGradient: string;
  rating: number;
}

export default function Testimonials() {
  // Testimonials database
  // EDIT: real student testimonials /}
  const reviews: Testimonial[] = [
    {
      id: 1,
      name: "রাকিব হাসান",
      course: "Computer Office Application",
      quote: "দৃষ্টি ইনস্টিটিউটের অফিস অ্যাপ্লিকেশন কোর্সটি করার পর আমার কম্পিউটারের ভীতি কেটে গেছে। মিরপুরের অভিজ্ঞ শিক্ষকদের বোঝানোর স্টাইল চমৎকার এবং সরকারি সার্টিফিকেটটি চাকরিতে অনেক সাহায্য করেছে।",
      avatarGradient: "from-blue-500 to-cyan-500",
      rating: 5,
    },
    {
      id: 2,
      name: "নুসরাত শারমিন",
      course: "Advanced Graphic Design & UX",
      quote: "ডিজাইনিং কোর্সের প্রজেক্ট ল্যাবগুলো অত্যন্ত কাজের। মেন্টরদের গাইডেন্সে ফিজমা ও ইলাস্ট্রেটর শিখে আমি এখন অনলাইন মার্কেটপ্লেসে চমৎকার কাজ করছি। এটি সত্যিই প্রফেশনাল ট্রেনিং সেন্টার।",
      avatarGradient: "from-purple-500 to-pink-500",
      rating: 5,
    },
    {
      id: 3,
      name: "মেহেদী হাসান",
      course: "Web Design & Development",
      quote: "কারিগরি শিক্ষাবোর্ড অনুমোদিত ১ বছরের ডিপ্লোমা কোর্সটি করেছি। ডাটাবেস ও ওয়েব ডেভেলপমেন্টের প্র্যাক্টিক্যাল কোডিং সেশনগুলো আমাকে সরাসরি একটি লোকাল সফটওয়্যার ফার্মে চাকরি পেতে সাহায্য করেছে।",
      avatarGradient: "from-orange-500 to-yellow-500",
      rating: 5,
    },
  ];
  // / EDIT

  // Repeat for loop
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="relative w-full bg-[var(--bg-secondary)] py-24 md:py-32 border-t border-[var(--border-color)] overflow-hidden">
      <div className="dot-grid" />

      {/* Glow highlight */}
      <div className="absolute right-[10%] top-[25%] w-[350px] h-[350px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--accent)] text-glow">
            Feedback Reviews
          </span>
          <h2 
            className="mt-4 font-black text-3xl md:text-5xl tracking-tight text-white"
            style={{ fontFamily: "var(--font-bengali)" }}
          >
            শিক্ষার্থীদের কথা / Student Reviews
          </h2>
          <p className="mt-4 font-sans text-xs md:text-sm text-slate-400 leading-relaxed">
            দৃষ্টি ইনস্টিটিউট থেকে পাস করা শিক্ষার্থীদের প্রফেশনাল ফিডব্যাক ও সাফল্যের গল্প।
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Container */}
      <div className="w-full flex overflow-hidden py-4 select-none relative z-10">
        {/* Shadow masks at edges for Awwwards-style fading margins */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 flex-nowrap shrink-0"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
          }}
        >
          {doubleReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[310px] md:w-[410px] shrink-0 rounded-2xl border border-[var(--border-color)] bg-gradient-to-b from-slate-900/40 to-slate-950/80 p-6 md:p-8 flex flex-col justify-between group hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <div>
                {/* Stars and Quote mark */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)] text-glow" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-800 group-hover:text-[var(--accent)]/30 transition-colors" />
                </div>

                <p 
                  className="text-slate-300 text-xs md:text-sm leading-relaxed italic"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  "{rev.quote}"
                </p>
              </div>

              {/* Student Metadata */}
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-3">
                {/* Visual Gradient Avatar Circle */}
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${rev.avatarGradient} flex items-center justify-center font-bold text-xs text-white shadow-md select-none`}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 
                    className="font-bold text-xs text-white group-hover:text-[var(--accent)] transition-colors"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    {rev.name}
                  </h4>
                  <span className="text-[9px] font-mono tracking-wide text-slate-500 block uppercase mt-0.5">
                    {rev.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
