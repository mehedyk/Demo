"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function MarqueeStrip() {
  const { theme } = useTheme();

  // Marquee text elements
  // EDIT: marquee text details /}
  const marqueeText = "বাংলাদেশ কারিগরি শিক্ষাবোর্ড অনুমোদিত ✦ ভর্তি চলছে ✦ ৬০% ছাড় ✦ Gopalpur, Tangail ✦ 01643-928687 ✦ ";
  // / EDIT

  // Repeat text to create infinite loop
  const repeatedText = Array(6).fill(marqueeText).join("");

  // Theme-specific colors
  const textClass =
    theme === "a"
      ? "text-[var(--accent)] text-glow font-medium"
      : "text-white font-bold";

  return (
    <section className="relative w-full bg-[var(--bg-secondary)] py-4 overflow-hidden border-y border-[var(--border-color)] select-none">
      <div className="flex w-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex gap-4 items-center shrink-0 uppercase tracking-widest text-xs md:text-sm font-semibold"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {theme === "a" ? (
            // Theme A: Gold text
            <span className={textClass}>
              {repeatedText}
            </span>
          ) : (
            // Theme B: Alternating Violet and Coral text
            <span className={textClass}>
              {Array(12).fill(null).map((_, idx) => (
                <span
                  key={idx}
                  className={idx % 2 === 0 ? "text-[#7c3aed]" : "text-[#f97316]"}
                >
                  {marqueeText}
                </span>
              ))}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
