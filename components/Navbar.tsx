"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import Logo from "./Logo";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor page scroll to apply condensed styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll offset transition
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "py-3 bg-[var(--bg-secondary)]/90 backdrop-blur-xl border-[var(--border-color)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo element */}
          <Logo />

          {/* Desktop Navigation Link items */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              <li>
                <a href="#hero" className="link-underline hover:text-[var(--accent)] transition-colors cursor-none">Home</a>
              </li>
              <li>
                <a href="#courses" className="link-underline hover:text-[var(--accent)] transition-colors cursor-none">Courses</a>
              </li>
              <li>
                <a href="#keyboard" className="link-underline hover:text-[var(--accent)] transition-colors cursor-none">Keyboard</a>
              </li>
              <li>
                <a href="#contact" className="link-underline hover:text-[var(--accent)] transition-colors cursor-none">Contact</a>
              </li>
            </ul>

            {/* Accent Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-white/5 hover:bg-white/10 hover:border-[var(--accent)] text-white text-[9px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.02)] cursor-none"
              title="Toggle website visual theme"
            >
              {theme === "a" ? (
                <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
              )}
              <span>{theme === "a" ? "Classic" : "Bold"}</span>
            </button>
          </div>

          {/* Mobile Buttons Bar */}
          <div className="flex md:hidden items-center gap-4">
            {/* Theme switcher on mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--border-color)] bg-white/5 text-white cursor-none"
              aria-label="Toggle Theme"
            >
              {theme === "a" ? (
                <Moon className="w-4 h-4 text-[var(--accent)]" />
              ) : (
                <Sun className="w-4 h-4 text-[var(--accent)]" />
              )}
            </button>
            
            {/* Hamburger controller */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full border border-[var(--border-color)] bg-white/5 text-white cursor-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen z-40 bg-[var(--bg-secondary)] flex flex-col justify-center items-center px-6 dot-grid"
          >
            {/* Background glowing mesh */}
            <div className="absolute top-[20%] w-[300px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none" />

            <ul className="flex flex-col gap-8 text-center text-xl font-bold uppercase tracking-[0.2em] font-display text-white relative z-10">
              <li>
                <button
                  onClick={() => handleMobileLinkClick("#hero")}
                  className="hover:text-[var(--accent)] transition-colors cursor-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMobileLinkClick("#courses")}
                  className="hover:text-[var(--accent)] transition-colors cursor-none"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMobileLinkClick("#keyboard")}
                  className="hover:text-[var(--accent)] transition-colors cursor-none"
                >
                  Keyboard Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMobileLinkClick("#contact")}
                  className="hover:text-[var(--accent)] transition-colors cursor-none"
                >
                  Contact
                </button>
              </li>
            </ul>

            {/* Extra brand footer inside mobile overlay */}
            <div className="absolute bottom-12 text-center text-[10px] text-slate-500 font-sans tracking-wide">
              দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউট &copy; 2025
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
