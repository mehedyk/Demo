"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, useScroll, MotionValue } from "framer-motion";
import * as THREE from "three";

// Custom premium 3D laptop vector model built using ThreeJS primitives
function LaptopModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const progress = scrollProgress.get();

    // Map scroll progress to a smooth full rotation + positioning
    // Stage 1 (progress 0) to Stage 4 (progress 1)
    const targetYRotation = progress * Math.PI * 2.2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYRotation, 0.08);

    // Dynamic scale/position shift per stage
    let targetScale = 1.35;
    let targetX = 0;
    
    if (progress < 0.25) {
      // Stage 1: Centered, standard size
      targetScale = 1.3;
      targetX = 0;
    } else if (progress < 0.5) {
      // Stage 2: Rotated, shifts slightly
      targetScale = 1.4;
      targetX = -0.2;
    } else if (progress < 0.75) {
      // Stage 3: Backside rotate
      targetScale = 1.45;
      targetX = 0.2;
    } else {
      // Stage 4: Full reveal
      targetScale = 1.5;
      targetX = 0;
    }

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

    // Floating idle animation
    groupRef.current.position.y = Math.sin(time * 1.2) * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.6) * 0.03 + 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 1. Base of Laptop */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[2.2, 0.06, 1.5]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.35} metalness={0.8} />
      </mesh>
      
      {/* 2. Trackpad / Keypad Tray Indicator */}
      <mesh position={[0, -0.02, 0.15]}>
        <boxGeometry args={[1.8, 0.03, 0.8]} />
        <meshStandardMaterial color="#050505" roughness={0.7} emissive="#00d4ff" emissiveIntensity={0.15} />
      </mesh>

      {/* 3. Screen Lid with Hinge Group */}
      <group position={[0, -0.03, -0.7]} rotation={[-Math.PI / 2.6, 0, 0]}>
        {/* Screen Outer Panel */}
        <mesh position={[0, 0.7, -0.02]}>
          <boxGeometry args={[2.2, 1.4, 0.04]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.35} metalness={0.8} />
        </mesh>
        
        {/* Screen Display Mesh with Grid Terminal Pattern */}
        <mesh position={[0, 0.7, 0.01]}>
          <boxGeometry args={[2.08, 1.28, 0.01]} />
          <meshStandardMaterial 
            color="#011627" 
            emissive="#00d4ff" 
            emissiveIntensity={1.2} 
            roughness={0.15}
            wireframe
          />
        </mesh>
      </group>
    </group>
  );
}

export default function ScrollLinkedFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor scroll progress of the 400vh section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="about" ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      {/* Sticky Inner container */}
      <div className="sticky top-0 w-full h-screen flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
        
        {/* Left Col: R3F 3D Scene (Sticky) */}
        <div className="relative w-full h-[45vh] lg:h-full border-b lg:border-b-0 lg:border-r border-slate-900 bg-black/25">
          <div className="absolute inset-0 w-full h-full">
            {mounted && (
              <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.2], fov: 55 }}>
                <ambientLight intensity={0.15} />
                <pointLight position={[6, 3, 4]} color="#00d4ff" intensity={1.6} />
                <pointLight position={[-6, -3, -4]} color="#0055ff" intensity={1.6} />
                
                <Stars radius={80} depth={40} count={1200} factor={4} saturation={0.5} speed={1} />
                
                <LaptopModel scrollProgress={scrollYProgress} />
              </Canvas>
            )}
          </div>
          {/* Subtle instructions layout overlay */}
          <div className="absolute left-6 bottom-6 pointer-events-none hidden lg:block">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Interactive 3D Engine Active
            </span>
          </div>
        </div>

        {/* Right Col: Scroll stages */}
        <div className="relative w-full flex-grow lg:h-full overflow-y-auto lg:overflow-y-visible no-scrollbar">
          
          {/* Stage 1 */}
          <div className="w-full h-[55vh] lg:h-screen flex flex-col justify-center px-8 md:px-16 py-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase text-glow-cyan">
              Stage 01 / 04
            </span>
            {/* EDIT: Stage 1 text /} */}
            <h3 className="mt-4 font-display font-black text-2xl md:text-4xl text-white tracking-tight">
              Learn From Experts
            </h3>
            <p className="mt-4 text-sm md:text-base text-slate-400 font-sans leading-relaxed max-w-lg">
              Our training is led by seasoned industry specialists. Work alongside veteran engineers who have architected and deployed enterprise software systems globally.
            </p>
            {/* / EDIT */}
          </div>

          {/* Stage 2 */}
          <div className="w-full h-[55vh] lg:h-screen flex flex-col justify-center px-8 md:px-16 py-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase text-glow-cyan">
              Stage 02 / 04
            </span>
            {/* EDIT: Stage 2 text /} */}
            <h3 className="mt-4 font-display font-black text-2xl md:text-4xl text-white tracking-tight">
              Hands-On Training
            </h3>
            <p className="mt-4 text-sm md:text-base text-slate-400 font-sans leading-relaxed max-w-lg">
              No dull theories. Spend 90% of your time in dynamic coding labs, design environments, and security terminals. Build production-grade repositories you own.
            </p>
            {/* / EDIT */}
          </div>

          {/* Stage 3 */}
          <div className="w-full h-[55vh] lg:h-screen flex flex-col justify-center px-8 md:px-16 py-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase text-glow-cyan">
              Stage 03 / 04
            </span>
            {/* EDIT: Stage 3 text /} */}
            <h3 className="mt-4 font-display font-black text-2xl md:text-4xl text-white tracking-tight">
              Certified Courses
            </h3>
            <p className="mt-4 text-sm md:text-base text-slate-400 font-sans leading-relaxed max-w-lg">
              Acquire government-approved credentials. Our training institute is officially registered and recognized by national boards, providing robust job placement authority.
            </p>
            {/* / EDIT */}
          </div>

          {/* Stage 4 */}
          <div className="w-full h-[55vh] lg:h-screen flex flex-col justify-center px-8 md:px-16 py-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase text-glow-cyan">
              Stage 04 / 04
            </span>
            {/* EDIT: Stage 4 text /} */}
            <h3 className="mt-4 font-display font-black text-2xl md:text-4xl text-white tracking-tight">
              Start Your Career
            </h3>
            <p className="mt-4 text-sm md:text-base text-slate-400 font-sans leading-relaxed max-w-lg">
              Access career pipelines immediately upon graduation. We provide resume engineering, portfolio reviews, and coordinate directly with recruiters in leading tech hubs.
            </p>
            {/* / EDIT */}
          </div>

        </div>
      </div>
    </section>
  );
}
