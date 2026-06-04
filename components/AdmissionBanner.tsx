"use client";

import { MessageSquare, ArrowRight } from "lucide-react";

export default function AdmissionBanner() {
  return (
    <section className="relative w-full min-h-[290px] flex items-center justify-center py-16 px-6 overflow-hidden z-10">
      
      {/* Self-contained CSS keyframe animation block for shifting background gradients */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .banner-gradient {
          background: linear-gradient(-45deg, rgba(10,32,96,0.9), rgba(124,58,237,0.85), rgba(249,115,22,0.7), rgba(201,168,76,0.8));
          background-size: 300% 300%;
          animation: gradientShift 16s ease infinite;
        }
      `}} />

      {/* Shifting Gradient Background */}
      <div className="absolute inset-0 banner-gradient -z-20 w-full h-full" />

      {/* Static visual background blurred circles */}
      <div className="absolute top-[10%] left-[15%] w-48 h-48 rounded-full bg-white/10 blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[15%] w-48 h-48 rounded-full bg-black/30 blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Pulsing Main Header */}
        <h2
          className="font-black text-4xl md:text-6xl text-white tracking-wider animate-pulse drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
          style={{ fontFamily: "var(--font-bengali)" }}
        >
          ভর্তি চলছে
        </h2>

        {/* Subtext description */}
        <p 
          className="mt-4 text-sm md:text-xl text-white font-bold tracking-wide drop-shadow-md"
          style={{ fontFamily: "var(--font-bengali)" }}
        >
          ৬০% ছাড়ে ভর্তি হোন — আজই যোগাযোগ করুন
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center">
          <a
            href="https://wa.me/8801643928687"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-none"
          >
            <MessageSquare className="w-4 h-4 text-green-600 fill-green-600" />
            WhatsApp করুন
          </a>
          <a
            href="#courses"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/40 bg-black/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-black/40 hover:border-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-none"
          >
            কোর্স দেখুন
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
