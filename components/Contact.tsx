"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.message) return;

    setLoading(true);
    // Simulate API pipeline delay
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormState({ name: "", phone: "", message: "" });
      
      // Auto-clear notification after 4s
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
    <section id="contact" className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-slate-900">
      {/* Background radial glow */}
      <div className="absolute left-[15%] bottom-[15%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-[15%] top-[15%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: CTA Content & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary text-glow-cyan mb-4">
              Get in Touch
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
              Begin Your Professional Tech Path.
            </h2>
            <p className="mt-4 font-sans text-sm md:text-base text-slate-400 leading-relaxed">
              Have questions about registration, course schedules, or payment installments? Reach out today. Our student advisers are ready to guide you.
            </p>

            {/* Contact details /} */}
            <div className="mt-10 space-y-6">
              
              {/* Address details */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary group-hover:border-primary/40 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-widest">
                    HQ Location
                  </h4>
                  <p className="mt-1 text-sm text-white font-sans font-medium">
                    {/* EDIT: contact info /} */}
                    House 45, Road 2, Block D, Mirpur-10, Dhaka-1216, Bangladesh
                    {/* / EDIT */}
                  </p>
                </div>
              </div>

              {/* Call details */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary group-hover:border-primary/40 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-widest">
                    Direct Line
                  </h4>
                  <p className="mt-1 text-sm text-white font-mono font-bold">
                    {/* EDIT: contact info /} */}
                    +880 1712-345678, +880 1987-654321
                    {/* / EDIT */}
                  </p>
                </div>
              </div>

              {/* Mail details */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary group-hover:border-primary/40 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-widest">
                    General Inquiries
                  </h4>
                  <p className="mt-1 text-sm text-white font-mono font-medium">
                    {/* EDIT: contact info /} */}
                    info@dristyinstitute.com
                    {/* / EDIT */}
                  </p>
                </div>
              </div>

              {/* Registration details */}
              <div className="flex gap-4 items-start group border-t border-slate-900 pt-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-secondary group-hover:border-secondary/40 transition-all duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-widest">
                    Government Accreditation
                  </h4>
                  <p className="mt-1 text-sm text-white font-sans font-medium">
                    {/* EDIT: contact info /} */}
                    BTEB Code: 50436 | Bangladesh Technical Education Board Approved
                    {/* / EDIT */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Contact Form Card */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              className="relative rounded-2xl border border-slate-900 bg-gradient-to-b from-slate-900/30 to-slate-950/70 p-6 md:p-10 backdrop-blur-md"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display font-bold text-xl text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-[#0a0f1d]/40 rounded-xl border border-slate-800 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:shadow-[0_0_8px_rgba(0,212,255,0.15)] transition-all duration-300 cursor-none"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full bg-[#0a0f1d]/40 rounded-xl border border-slate-800 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:shadow-[0_0_8px_rgba(0,212,255,0.15)] transition-all duration-300 cursor-none"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Course details or Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Describe your goals or ask a question..."
                    className="w-full bg-[#0a0f1d]/40 rounded-xl border border-slate-800 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:shadow-[0_0_8px_rgba(0,212,255,0.15)] transition-all duration-300 resize-none cursor-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold uppercase tracking-widest text-xs md:text-sm hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_#00d4ff] flex items-center justify-center cursor-none"
                >
                  {loading ? (
                    <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>

              {/* Form Success Banner */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    className="absolute inset-0 bg-[#050505]/95 rounded-2xl flex flex-col items-center justify-center text-center p-8 z-20 border border-primary/20 shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-primary animate-bounce mb-4 text-glow-cyan" />
                    <h4 className="font-display font-black text-2xl text-white">
                      Inquiry Dispatched!
                    </h4>
                    <p className="mt-3 text-slate-400 text-sm max-w-sm leading-relaxed">
                      Thank you for contacting Dristy Institute. A student adviser will connect with you via your phone number shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
