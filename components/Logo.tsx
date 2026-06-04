"use client";

export default function Logo() {
  return (
    <a
      href="https://dristy-institute.netlify.app"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 group select-none cursor-none"
    >
      {/* {/* EDIT: replace with real logo asset if available /} */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Outer orbital ring */}
        <div className="absolute inset-0 rounded-full border border-[var(--accent)]/30 group-hover:border-[var(--accent)]/80 group-hover:scale-110 transition-all duration-500 ease-out" />
        
        {/* Eye icon - stylized SVG representing "Dristy" (vision) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.2"
          className="w-4.5 h-4.5 relative z-10 transition-all duration-500 group-hover:scale-110"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" fill="var(--accent)" fillOpacity="0.25" />
          <circle cx="12" cy="12" r="1.2" fill="var(--accent)" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span 
          className="font-black tracking-wide text-lg text-[var(--accent)] text-glow"
          style={{ fontFamily: "var(--font-bengali)" }}
        >
          দৃষ্টি
        </span>
        <span className="font-display font-black tracking-widest text-[9px] uppercase text-white opacity-85 group-hover:opacity-100 transition-opacity">
          INSTITUTE
        </span>
      </div>
      {/* / EDIT */}
    </a>
  );
}
