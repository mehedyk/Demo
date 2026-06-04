"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  course: string;
  quote: string;
  avatarSeed: string;
  rating: number;
}

export default function Testimonials() {
  // Database of student reviews
  // EDIT: testimonials /}
  const reviews: Testimonial[] = [
    {
      id: 1,
      name: "Asif Rahman",
      course: "Full Stack Web Development",
      quote: "The practical coding labs at Dristy completely transformed my skill set. I went from knowing zero code to building commercial React web applications and landing an agency role.",
      avatarSeed: "asif",
      rating: 5,
    },
    {
      id: 2,
      name: "Sabrina Chowdhury",
      course: "Advanced Graphic Design & UX",
      quote: "The design training was very intense. Working through real-world system interfaces and Figma design projects helped me curate a portfolio that stands out internationally.",
      avatarSeed: "sabrina",
      rating: 5,
    },
    {
      id: 3,
      name: "Naimur Hasan",
      course: "Cybersecurity & Ethical Hacking",
      quote: "Setting up virtual testing labs, scanning vulnerabilities, and defending firewalls in live simulations gave me the corporate IT-security command I needed to get hired.",
      avatarSeed: "naimur",
      rating: 5,
    },
  ];
  // / EDIT

  // Double the list to create a seamless infinite loop scrolling effect
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-slate-900 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute right-[10%] top-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary text-glow-cyan">
            Student Success
          </span>
          <h2 className="mt-4 font-display font-black text-3xl md:text-5xl tracking-tight text-white">
            Proven Graduate Growth.
          </h2>
          <p className="mt-4 font-sans text-sm md:text-base text-slate-400 leading-relaxed">
            Real stories from our students who graduated and entered the professional tech workforce.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Container */}
      <div className="w-full flex overflow-hidden py-4 select-none relative z-10">
        {/* Shadow masks at edges for Awwwards-style fading margins */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 flex-nowrap shrink-0"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {doubleReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[320px] md:w-[420px] shrink-0 rounded-2xl border border-slate-900/60 bg-gradient-to-b from-slate-900/25 to-slate-950/65 p-6 md:p-8 flex flex-col justify-between group hover:border-primary/20 transition-all duration-300"
            >
              {/* Quote details */}
              <div>
                {/* Stars and Quote mark */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary text-glow-cyan" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700/80 group-hover:text-primary/40 transition-colors" />
                </div>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed italic font-sans">
                  "{rev.quote}"
                </p>
              </div>

              {/* Student Metadata */}
              <div className="mt-8 pt-4 border-t border-slate-900 flex items-center gap-3">
                {/* Dicebear Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rev.avatarSeed}`}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-primary transition-colors">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] font-mono tracking-wide text-slate-500 block">
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
