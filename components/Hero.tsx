"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Logo from "./Logo";

// Torus Knot rotating mesh helper
function GlowingTorusKnot() {
  const torusRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Animate the rotation and floating hover
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.15;
      torusRef.current.rotation.y = time * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -time * 0.2;
      coreRef.current.rotation.y = -time * 0.1;
      coreRef.current.position.y = Math.sin(time * 1.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Outer abstract wireframe */}
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1.1, 0.32, 160, 16, 2, 3]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          roughness={0.1}
          metalness={0.9}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Inner solid geometry core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#0055ff"
          roughness={0.2}
          metalness={0.85}
          emissive="#0055ff"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check client mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync scroll positioning with Framer Motion scroll tracker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scale and opacity of the 3D scene as user scrolls
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Transform text contents slightly differently to give parallax separation
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] flex flex-col justify-between overflow-hidden"
    >
      {/* 3D Canvas Background Container */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ scale, opacity, y }}
      >
        {mounted && (
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.5], fov: 60 }}>
            {/* Ambient subtle environment lighting */}
            <ambientLight intensity={0.18} />
            
            {/* Split dual pointLights - Cyan and Blue */}
            <pointLight position={[8, 4, 5]} color="#00d4ff" intensity={1.8} />
            <pointLight position={[-8, -4, -5]} color="#0055ff" intensity={1.8} />
            <pointLight position={[0, 0, 2]} color="#00d4ff" intensity={0.5} />

            {/* Stars background particle field */}
            <Stars radius={100} depth={50} count={3500} factor={5} saturation={0.5} speed={1.2} />

            {/* Glowing torus object */}
            <GlowingTorusKnot />
          </Canvas>
        )}
      </motion.div>

      {/* Header Overlay */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <a href="#courses" className="hover:text-primary transition-colors cursor-none">Courses</a>
          <a href="#about" className="hover:text-primary transition-colors cursor-none">Features</a>
          <a href="#instructors" className="hover:text-primary transition-colors cursor-none">Mentors</a>
          <a href="#testimonials" className="hover:text-primary transition-colors cursor-none">Reviews</a>
          <a href="#contact" className="hover:text-primary transition-colors cursor-none">Contact</a>
        </nav>
        <a
          href="#contact"
          className="relative px-5 py-2 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-wider text-white hover:border-primary transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,212,255,0.3)] bg-black/40 backdrop-blur-md cursor-none"
        >
          Enroll Now
        </a>
      </header>

      {/* Hero Central Text */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto flex-grow"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Glow Tag */}
        <div className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border-glow-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {/* EDIT: Govt Approved Training Badge /} */}
          Government Approved Computer Training
          {/* / EDIT */}
        </div>

        {/* Large Bold Heading */}
        <h1 className="font-display font-black text-5xl md:text-8xl tracking-tight leading-none text-white select-none">
          {/* EDIT: institute name /} */}
          DRISTY INSTITUTE
          {/* / EDIT */}
        </h1>

        {/* Subtitle Tagline */}
        <p className="mt-6 font-sans text-sm md:text-lg text-slate-400 max-w-xl leading-relaxed tracking-wide select-none">
          {/* EDIT: tagline /} */}
          Empowering the next generation of digital leaders in Bangladesh. Premium tech education with state-of-the-art interactive training.
          {/* / EDIT */}
        </p>

        {/* Glowing CTA Button */}
        <div className="mt-10">
          <a
            href="#courses"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-xs md:text-sm font-bold uppercase tracking-widest text-black hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_#00d4ff] transform hover:-translate-y-0.5 cursor-none"
          >
            Explore Courses
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-2">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border border-slate-600 flex justify-center py-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
}
