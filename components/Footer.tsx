"use client";

import Logo from "./Logo";
import { Facebook, Youtube, Twitter, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-slate-900/80 pt-16 pb-8 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-slate-900/60">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-6">
            <Logo />
            <p className="text-slate-400 text-xs md:text-sm max-w-sm font-sans leading-relaxed">
              {/* EDIT: footer bio /} */}
              Providing premium technical training and certification since 2010. Empowers professionals in software development, visual arts, and security networks under official national board permissions.
              {/* / EDIT */}
            </p>
            {/* Social channels */}
            {/* EDIT: social links /} */}
            <div className="flex items-center gap-4 text-slate-500">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors cursor-none"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors cursor-none"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors cursor-none"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            {/* / EDIT */}
          </div>

          {/* Col 2: Navigation links */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-6">
              Quick Shortcuts
            </h4>
            {/* EDIT: nav links /} */}
            <ul className="space-y-3.5 text-xs text-slate-400 font-sans">
              <li>
                <a href="#hero" className="hover:text-primary transition-colors cursor-none">Home</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-primary transition-colors cursor-none">Courses Offered</a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors cursor-none">Feature Lab</a>
              </li>
              <li>
                <a href="#instructors" className="hover:text-primary transition-colors cursor-none">Mentors Team</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors cursor-none">Support Contact</a>
              </li>
            </ul>
            {/* / EDIT */}
          </div>

          {/* Col 3: Legal & Support */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-6">
              Institutional Info
            </h4>
            {/* EDIT: legal details /} */}
            <ul className="space-y-3.5 text-xs text-slate-400 font-sans">
              <li>
                <span className="block text-slate-500">Registration</span>
                <span className="font-mono">BTEB Code: 50436</span>
              </li>
              <li>
                <span className="block text-slate-500">Operating Hours</span>
                <span>Sat - Thu (9 AM - 8 PM)</span>
              </li>
              <li>
                <span className="block text-slate-500">Student Helpline</span>
                <span className="font-mono">+880 1712-345678</span>
              </li>
            </ul>
            {/* / EDIT */}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright notice */}
          <div className="text-[10px] md:text-xs text-slate-500 font-sans font-medium text-center md:text-left">
            <span>&copy; {currentYear} Dristy Computer Training Institute. All rights reserved.</span>
          </div>

          {/* Developed By credit (Required exact signature) */}
          <div className="text-[10px] md:text-xs text-slate-500 font-sans text-center md:text-right">
            Developed by{" "}
            <a
              href="https://mehedyk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary hover:text-glow-cyan font-bold transition-all duration-300 cursor-none"
            >
              Mehedyk
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            className="p-2.5 rounded-full border border-slate-900 bg-slate-950/40 text-slate-500 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-none"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
