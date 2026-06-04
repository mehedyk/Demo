"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.message) return;

    setLoading(true);

    // --- PHASE 2 DATABASE INTEGRATION ---
    // {/* TODO: connect to API route in Phase 2 */}
    // Example hook:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formState)
    // })
    
    // Simulate pipeline delay
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormState({ name: "", phone: "", message: "" });
      
      // Auto-clear success overlay banner after 4s
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative rounded-2xl border border-[var(--border-color)] bg-white/5 p-6 md:p-10 backdrop-blur-md shadow-2xl">
      <h3
        className="text-white text-xl font-bold mb-6"
        style={{ fontFamily: "var(--font-bengali)" }}
      >
        বার্তা পাঠান / Send Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formState.name}
            onChange={handleInputChange}
            placeholder="আপনার নাম লিখুন"
            className="w-full bg-[#050c20]/30 rounded-xl border border-[var(--border-color)] px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[var(--accent)] focus:shadow-[0_0_8px_var(--accent-glow)] transition-all duration-300 cursor-none"
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formState.phone}
            onChange={handleInputChange}
            placeholder="01XXX-XXXXXX"
            className="w-full bg-[#050c20]/30 rounded-xl border border-[var(--border-color)] px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[var(--accent)] focus:shadow-[0_0_8px_var(--accent-glow)] transition-all duration-300 cursor-none"
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={4}
            value={formState.message}
            onChange={handleInputChange}
            placeholder="এখানে লিখুন..."
            className="w-full bg-[#050c20]/30 rounded-xl border border-[var(--border-color)] px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[var(--accent)] focus:shadow-[0_0_8px_var(--accent-glow)] transition-all duration-300 resize-none cursor-none"
          />
        </div>

        {/* Submit button with hover shimmer */}
        <button
          type="submit"
          disabled={loading}
          className="shimmer-btn w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-xs hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_var(--accent-glow)] flex items-center justify-center cursor-none"
        >
          {loading ? (
            <span className="w-5 h-5 rounded-full border-2 border-[var(--text-inverse)] border-t-transparent animate-spin" />
          ) : (
            "বার্তা পাঠান"
          )}
        </button>
      </form>

      {/* Submission Success Toast Overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            className="absolute inset-0 bg-[#020718]/95 rounded-2xl flex flex-col items-center justify-center text-center p-8 z-20 border border-[var(--accent)]/30 shadow-[0_0_30px_var(--accent-glow)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <CheckCircle2 className="w-16 h-16 text-[var(--accent)] animate-bounce mb-4 text-glow" />
            <h4 
              className="font-black text-2xl text-white font-bengali"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              বার্তা পাঠানো হয়েছে!
            </h4>
            <p className="mt-3 text-slate-400 text-xs max-w-xs leading-relaxed">
              আপনার অনুসন্ধানটি সফলভাবে দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউটের নিকট পাঠানো হয়েছে। দ্রুত সময়ের মধ্যে যোগাযোগ করা হবে।
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
