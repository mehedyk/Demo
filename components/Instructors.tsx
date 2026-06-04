"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Globe, Shield } from "lucide-react";

interface Instructor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  github: string;
  linkedin: string;
}

export default function Instructors() {
  // Instructors data list
  // EDIT: instructor details /}
  const instructorsList: Instructor[] = [
    {
      id: 1,
      name: "Tariqul Islam",
      role: "Lead Full-Stack Instructor",
      avatar: "/instructor_1.png",
      bio: "Ex-Senior Engineer at local fintech hubs. Master of Node.js, Next.js, and cloud orchestration with 10+ years experience.",
      skills: ["REACT", "NEXTJS", "NODE", "AWS"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Creative UI/UX & Graphics Lead",
      avatar: "/instructor_2.png",
      bio: "Certified Design System architect. Passionate about user-centric product flows, high-end vector typography, and Figma frameworks.",
      skills: ["FIGMA", "ILLUSTRATOR", "UX/UI", "BRANDING"],
      github: "#",
      linkedin: "https://linkedin.com",
    },
    {
      id: 3,
      name: "Mahmudul Hasan",
      role: "Cybersecurity & Linux Expert",
      avatar: "/instructor_3.png",
      bio: "Network analyst and active ethical hacker. Specializes in Unix system administration, vulnerability detection, and network security.",
      skills: ["LINUX", "DOCKER", "PENTESTING", "PYTHON"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  ];
  // / EDIT

  return (
    <section id="instructors" className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-slate-900">
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary text-glow-cyan">
            Expert Mentorship
          </span>
          <h2 className="mt-4 font-display font-black text-3xl md:text-5xl tracking-tight text-white">
            Learn From Engineers.
          </h2>
          <p className="mt-4 font-sans text-sm md:text-base text-slate-400 leading-relaxed">
            Our trainers are not just teachers; they are active creators and professionals who build high-end tech products daily.
          </p>
        </div>

        {/* Instructor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructorsList.map((inst, idx) => (
            <motion.div
              key={inst.id}
              className="relative rounded-2xl border border-slate-900/80 bg-gradient-to-b from-slate-900/20 to-slate-950/60 p-6 md:p-8 flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-500 cursor-none"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Profile Image with Glowing Border */}
              <div className="relative w-28 h-28 rounded-full mb-6 p-1 border border-slate-800 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-500">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
                  {/* Next Image fallback with standard layout */}
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      // fallback to standard avatar if not available
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${inst.name}`;
                    }}
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="font-display font-bold text-lg text-white group-hover:text-glow-cyan transition-all duration-300">
                {inst.name}
              </h3>
              <span className="mt-1 text-[11px] font-mono tracking-wider text-primary/80 uppercase">
                {inst.role}
              </span>

              {/* Bio */}
              <p className="mt-4 text-xs md:text-sm text-slate-400 font-sans leading-relaxed min-h-[72px]">
                {inst.bio}
              </p>

              {/* Skills Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5 justify-center">
                {inst.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400 uppercase group-hover:border-primary/20 group-hover:text-slate-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Channels */}
              <div className="mt-6 flex items-center gap-4 text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                <a
                  href={inst.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors cursor-none"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={inst.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors cursor-none"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
