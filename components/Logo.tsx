"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="#hero" className="flex items-center gap-2.5 group select-none">
      {/* Stylized eye graphic badge representing "Dristy" */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Outer glowing orbital ring */}
        <div className="absolute inset-0 rounded-full border border-primary/30 group-hover:border-primary/80 group-hover:scale-110 transition-all duration-500 ease-out" />
        {/* Inner rotating orbital ring */}
        <div className="absolute w-5 h-5 rounded-full border border-dashed border-secondary/50 group-hover:rotate-180 transition-all duration-1000 ease-in-out" />
        {/* Core glowing pupil */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-secondary to-primary shadow-[0_0_8px_#00d4ff]" />
      </div>
      
      {/* Stylized display text logo */}
      <span className="font-display font-black tracking-widest text-lg bg-gradient-to-r from-white via-slate-200 to-primary bg-clip-text text-transparent group-hover:text-glow-cyan transition-all duration-300">
        {/* EDIT: institute name /} */}
        DRISTY
        {/* / EDIT */}
      </span>
    </Link>
  );
}
