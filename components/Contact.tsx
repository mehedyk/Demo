"use client";

import ContactForm from "./ContactForm";
import { MapPin, Phone, MessageSquare, Facebook, HelpCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="dot-grid" />

      {/* Large decorative background Bengali text */}
      <div className="absolute top-[8%] left-0 w-full text-center select-none pointer-events-none z-0">
        <span 
          className="font-black text-[11vw] leading-none text-white/[0.03] tracking-widest block"
          style={{ fontFamily: "var(--font-bengali)" }}
        >
          যোগাযোগ
        </span>
      </div>

      {/* Background glow highlights */}
      <div className="absolute left-[15%] bottom-[15%] w-[450px] h-[450px] bg-[var(--accent)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--accent)] text-glow mb-4">
              Connect With Us
            </span>
            <h2 
              className="font-black text-3xl md:text-5xl tracking-tight text-white leading-tight"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              যোগাযোগ করুন
            </h2>
            <p className="mt-4 font-sans text-xs md:text-sm text-slate-400 leading-relaxed max-w-md">
              আমাদের প্রতিষ্ঠান সম্পর্কে কোনো তথ্য, কোর্স শিডিউল বা ফি সংক্রান্ত প্রশ্ন থাকলে নিম্নোক্ত ঠিকানায় যোগাযোগ করুন।
            </p>

            {/* Structured details list */}
            <div className="mt-10 space-y-6">
              
              {/* Address */}
              <div className="flex gap-4 items-start group">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all duration-300">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                    HQ Location
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-white font-medium font-sans">
                    Near Sonali Bank, Gopalpur, Tangail, Bangladesh
                  </p>
                </div>
              </div>

              {/* Call Details */}
              <div className="flex gap-4 items-start group">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all duration-300">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                    Direct Hotlines
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-white font-mono font-bold">
                    <a href="tel:+8801643928687" className="hover:text-[var(--accent)] transition-colors cursor-none">
                      01643-928687
                    </a>
                  </p>
                </div>
              </div>

              {/* WhatsApp Redirect */}
              <div className="flex gap-4 items-start group">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all duration-300">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                    WhatsApp Chat
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-white font-sans font-medium">
                    <a 
                      href="https://wa.me/8801643928687" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors flex items-center gap-1 cursor-none"
                    >
                      01643-928687
                      <span className="text-[8px] font-mono border border-green-800 rounded px-1 text-green-500">ACTIVE</span>
                    </a>
                  </p>
                </div>
              </div>

              {/* Facebook Page */}
              <div className="flex gap-4 items-start group">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all duration-300">
                  <Facebook className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                    Social Channel
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-white font-sans font-medium">
                    {/* EDIT: Facebook page URL /} */}
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-[var(--accent)] transition-colors cursor-none"
                    >
                      Dristy Computer Training Institute Page
                    </a>
                    {/* / EDIT */}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Isolated Form */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
