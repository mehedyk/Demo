"use client";

import Logo from "./Logo";
import { Facebook, ArrowUp, MessageSquare } from "lucide-react";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-8 overflow-hidden z-10 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12 border-b border-[var(--border-color)]/60">
          
          {/* Logo, Bio & Social row */}
          <div className="md:col-span-5 space-y-6">
            <Logo />
            <p className="text-slate-400 text-xs max-w-sm font-sans leading-relaxed">
              {/* EDIT: footer bio /} */}
              দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউট একটি সরকারি অনুমোদিত প্রতিষ্ঠান। Gopalpur, Tangail এবং সংলগ্ন অঞ্চলের শিক্ষার্থীদের আধুনিক আইটি শিক্ষায় শিক্ষিত করাই আমাদের মূল লক্ষ্য।
              {/* / EDIT */}
            </p>
            
            {/* Social channels */}
            {/* EDIT: social links /} */}
            <div className="flex items-center gap-4 text-slate-500">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors cursor-none"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/8801643928687"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors cursor-none"
                aria-label="WhatsApp Hotline"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
            </div>
            {/* / EDIT */}
          </div>

          {/* Col 2: About / Academy details */}
          <div className="md:col-span-3">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white mb-6">
              About Institute
            </h4>
            {/* EDIT: legal details /} */}
            <ul className="space-y-3.5 text-xs text-slate-400 font-sans">
              <li>
                <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Accreditation</span>
                <span>বাংলাদেশ কারিগরি শিক্ষাবোর্ড অনুমোদিত</span>
              </li>
              <li>
                <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Established</span>
                <span>২০২৩ খ্রিষ্টাব্দ</span>
              </li>
              <li>
                <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">BTEB Code</span>
                <span className="font-mono">কোড: ৫০৪৩৬</span>
              </li>
            </ul>
            {/* / EDIT */}
          </div>

          {/* Col 3: Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white mb-6">
              Quick Links
            </h4>
            {/* EDIT: nav links /} */}
            <ul className="space-y-3 text-xs text-slate-400 font-sans">
              <li>
                <a href="#hero" className="hover:text-[var(--accent)] transition-colors cursor-none">Home</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[var(--accent)] transition-colors cursor-none">Our Courses</a>
              </li>
              <li>
                <a href="#keyboard" className="hover:text-[var(--accent)] transition-colors cursor-none">Keyboard Lab</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--accent)] transition-colors cursor-none">Contact Info</a>
              </li>
            </ul>
            {/* / EDIT */}
          </div>

          {/* Col 4: Contacts shortcut */}
          <div className="md:col-span-2">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-xs text-slate-400 font-sans">
              <li>
                <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Helpline</span>
                <span className="font-mono font-bold">01643-928687</span>
              </li>
              <li>
                <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Location</span>
                <span>Gopalpur, Tangail</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright notice */}
          <div className="text-[10px] md:text-xs text-slate-500 font-sans text-center md:text-left">
            <span>&copy; 2025 দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউট। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>

          {/* Developed By credit (Required exact signature) */}
          <div className="text-[10px] md:text-xs text-slate-500 font-sans text-center md:text-right">
            Developed by{" "}
            <a
              href="https://mehedyk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[var(--accent)] hover:text-glow font-bold transition-all duration-300 cursor-none"
            >
              Mehedyk
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            className="p-2 rounded-full border border-[var(--border-color)] bg-slate-950/40 text-slate-500 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all duration-300 cursor-none"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
