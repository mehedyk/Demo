"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// --- AUDIO SYNTHESIZER FALLBACK CLASS ---
// Generates satisfying click sounds in-code if static mp3 assets are missing
class ClickSynth {
  private ctx: AudioContext | null = null;

  constructor() {}

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  play(type: "click" | "thock" | "clack") {
    try {
      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;

      // ±5% Pitch variation
      const pitchMod = 0.95 + Math.random() * 0.1;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      const time = ctx.currentTime;

      if (type === "thock") {
        // Spacebar: deep bass thock
        osc.type = "sine";
        osc.frequency.setValueAtTime(85 * pitchMod, time);
        osc.frequency.exponentialRampToValueAtTime(30 * pitchMod, time + 0.15);
        
        gainNode.gain.setValueAtTime(0.35, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        
        osc.start(time);
        osc.stop(time + 0.15);
      } else if (type === "clack") {
        // Enter: heavier click
        osc.type = "triangle";
        osc.frequency.setValueAtTime(280 * pitchMod, time);
        osc.frequency.exponentialRampToValueAtTime(100 * pitchMod, time + 0.08);
        
        gainNode.gain.setValueAtTime(0.25, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.085);
        
        osc.start(time);
        osc.stop(time + 0.085);
      } else {
        // Alphanumeric keys: crisp tactile mechanical click
        osc.type = "sine";
        osc.frequency.setValueAtTime(800 * pitchMod, time);
        osc.frequency.exponentialRampToValueAtTime(350 * pitchMod, time + 0.04);
        
        gainNode.gain.setValueAtTime(0.18, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.042);
        
        osc.start(time);
        osc.stop(time + 0.042);
      }
    } catch (e) {
      console.warn("Synth failed to output audio stream:", e);
    }
  }
}

let audioSynth: ClickSynth;
let keyClickSound: any = null;
let spacebarSound: any = null;
let enterSound: any = null;

if (typeof window !== "undefined") {
  audioSynth = new ClickSynth();
  try {
    const { Howl } = require("howler");
    keyClickSound = new Howl({ src: ["/sounds/key-click.mp3"], volume: 0.5, html5: false });
    spacebarSound = new Howl({ src: ["/sounds/spacebar.mp3"], volume: 0.6, html5: false });
    enterSound = new Howl({ src: ["/sounds/enter.mp3"], volume: 0.6, html5: false });
  } catch (e) {
    console.warn("Howler load error, falling back to Web Audio API synthesizer node:", e);
  }
}

// Key data mappings
interface KeyData {
  char: string;
  x: number;
  z: number;
  width?: number;
  type?: "click" | "thock" | "clack";
}

const keyboardLayout: {
  row1: KeyData[];
  row2: KeyData[];
  row3: KeyData[];
  row4: KeyData[];
  row5: KeyData[];
} = {
  row1: [
    { char: "1", x: -1.35, z: -0.5 },
    { char: "2", x: -1.05, z: -0.5 },
    { char: "3", x: -0.75, z: -0.5 },
    { char: "4", x: -0.45, z: -0.5 },
    { char: "5", x: -0.15, z: -0.5 },
    { char: "6", x: 0.15, z: -0.5 },
    { char: "7", x: 0.45, z: -0.5 },
    { char: "8", x: 0.75, z: -0.5 },
    { char: "9", x: 1.05, z: -0.5 },
    { char: "0", x: 1.35, z: -0.5 },
  ],
  row2: [
    { char: "Q", x: -1.35, z: -0.25 },
    { char: "W", x: -1.05, z: -0.25 },
    { char: "E", x: -0.75, z: -0.25 },
    { char: "R", x: -0.45, z: -0.25 },
    { char: "T", x: -0.15, z: -0.25 },
    { char: "Y", x: 0.15, z: -0.25 },
    { char: "U", x: 0.45, z: -0.25 },
    { char: "I", x: 0.75, z: -0.25 },
    { char: "O", x: 1.05, z: -0.25 },
    { char: "P", x: 1.35, z: -0.25 },
  ],
  row3: [
    { char: "A", x: -1.2, z: 0 },
    { char: "S", x: -0.9, z: 0 },
    { char: "D", x: -0.6, z: 0 },
    { char: "F", x: -0.3, z: 0 },
    { char: "G", x: 0, z: 0 },
    { char: "H", x: 0.3, z: 0 },
    { char: "J", x: 0.6, z: 0 },
    { char: "K", x: 0.9, z: 0 },
    { char: "L", x: 1.2, z: 0 },
  ],
  row4: [
    { char: "Z", x: -1.05, z: 0.25 },
    { char: "X", x: -0.75, z: 0.25 },
    { char: "C", x: -0.45, z: 0.25 },
    { char: "V", x: -0.15, z: 0.25 },
    { char: "B", x: 0.15, z: 0.25 },
    { char: "N", x: 0.45, z: 0.25 },
    { char: "M", x: 0.75, z: 0.25 },
  ],
  row5: [
    { char: "SPACE", x: -0.2, z: 0.5, width: 1.6, type: "thock" },
    { char: "ENTER", x: 1.0, z: 0.5, width: 0.7, type: "clack" },
  ],
};

// 3D Key Component
function Key3D({
  data,
  themeValue,
  onPress,
  highlightedKeys,
}: {
  data: KeyData;
  themeValue: number;
  onPress: (char: string, type?: "click" | "thock" | "clack") => void;
  highlightedKeys: string[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const currentY = useRef(0);

  // Position displacement: Y decreases (depresses) on hover/press
  const targetY = pressed ? -0.04 : hovered ? -0.02 : 0;
  
  useFrame(() => {
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, 0.22);
    if (meshRef.current) {
      meshRef.current.position.y = currentY.current;
    }
  });

  const width = data.width || 0.24;
  const isHighlighted = highlightedKeys.includes(data.char);

  // Theme colors
  const normalColor = themeValue === 0 ? "#0d1b3e" : "#1a122c"; // Navy vs Dark Violet
  const accentColor = themeValue === 0 ? "#c9a84c" : "#7c3aed"; // Gold vs Violet
  const keycapColor = isHighlighted || hovered ? accentColor : normalColor;

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setPressed(true);
    onPress(data.char, data.type);
    setTimeout(() => setPressed(false), 150);
  };

  return (
    <group position={[data.x, 0, data.z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onPointerDown={handlePointerDown}
      >
        <RoundedBox args={[width, 0.15, 0.22]} radius={0.02} smoothness={3}>
          <meshStandardMaterial
            color={keycapColor}
            roughness={0.25}
            metalness={0.7}
            emissive={isHighlighted ? accentColor : "#000000"}
            emissiveIntensity={isHighlighted ? 0.35 : 0}
          />
        </RoundedBox>
      </mesh>
    </group>
  );
}

// 3D Keyboard Wrapper Component
function InteractiveKeyboard({
  themeValue,
  onKeyClick,
  highlightedKeys,
}: {
  themeValue: number;
  onKeyClick: (char: string, type?: "click" | "thock" | "clack") => void;
  highlightedKeys: string[];
}) {
  const keyboardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!keyboardRef.current) return;
    const time = state.clock.getElapsedTime();
    // Bouncing float animation + fixed rotation tilt
    keyboardRef.current.position.y = Math.sin(time * 0.8) * 0.06;
  });

  const allKeys = [
    ...keyboardLayout.row1,
    ...keyboardLayout.row2,
    ...keyboardLayout.row3,
    ...keyboardLayout.row4,
    ...keyboardLayout.row5,
  ];

  return (
    <group ref={keyboardRef} rotation={[-Math.PI / 8, 0, 0]} scale={2.2}>
      {/* Keyboard Base housing */}
      <mesh position={[0, -0.12, 0.05]}>
        <RoundedBox args={[3.2, 0.12, 1.4]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#050505" roughness={0.4} metalness={0.9} />
        </RoundedBox>
      </mesh>

      {allKeys.map((k) => (
        <Key3D
          key={k.char}
          data={k}
          themeValue={themeValue}
          onPress={onKeyClick}
          highlightedKeys={highlightedKeys}
        />
      ))}
    </group>
  );
}

export default function Keyboard3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [activeCard, setActiveCard] = useState<any>(null);
  const [showDiscountAlert, setShowDiscountAlert] = useState(false);
  const [highlightedKeys, setHighlightedKeys] = useState<string[]>([]);
  const hoverIntervalRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Set up periodic sequential hovering animation for visual cueing (OFFICE / DESIGN)
  useEffect(() => {
    let tick = 0;
    const officeChars = ["O", "F", "F", "I", "C", "E"];
    const designChars = ["D", "E", "S", "I", "G", "N"];
    
    hoverIntervalRef.current = setInterval(() => {
      const mode = Math.floor(tick / 6) % 2;
      const idx = tick % 6;
      if (mode === 0) {
        setHighlightedKeys([officeChars[idx]]);
      } else {
        setHighlightedKeys([designChars[idx]]);
      }
      tick++;
    }, 1200);

    return () => {
      if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
    };
  }, []);

  const handleKeyInteraction = (char: string, type?: "click" | "thock" | "clack") => {
    // 1. Play sound (Howler or Synth fallback)
    const soundType = type || "click";
    try {
      if (soundType === "thock" && spacebarSound && spacebarSound.state() === "loaded") {
        spacebarSound.play();
      } else if (soundType === "clack" && enterSound && enterSound.state() === "loaded") {
        enterSound.play();
      } else if (soundType === "click" && keyClickSound && keyClickSound.state() === "loaded") {
        keyClickSound.play();
      } else {
        if (audioSynth) audioSynth.play(soundType);
      }
    } catch (e) {
      if (audioSynth) audioSynth.play(soundType);
    }

    // 2. Process content mappings
    if (["O", "F", "I", "C", "E"].includes(char)) {
      setActiveCard({
        title: "অফিস অ্যাপ্লিকেশন কোর্স (MS Office)",
        engTitle: "Office Applications (MS Word, Excel, PowerPoint)",
        duration: "৩ মাস / ৬ মাস",
        price: "৳১,৮৫০ থেকে শুরু",
        desc: "বেসিক কম্পিউটার চালনা, টাইপিং, ডাটা এন্ট্রি ও অফিস ম্যানেজমেন্টের জন্য আমাদের সবচেয়ে জনপ্রিয় সরকারি কোর্স।",
        key: "OFFICE",
      });
    } else if (["D", "E", "S", "G", "N"].includes(char)) {
      setActiveCard({
        title: "অ্যাডভান্সড ডিজাইন কোর্স (UX/UI & Graphics)",
        engTitle: "Graphic Design & UI/UX Advanced Program",
        duration: "৪ মাস / ৬ মাস",
        price: "৳৩,০০০ থেকে শুরু",
        desc: "Figma, Adobe Illustrator, and Photoshop এর মাধ্যমে প্রফেশনাল লোগো ডিজাইন, ইউজার ইন্টারফেস ও ব্র্যান্ডিং আর্ট।",
        key: "DESIGN",
      });
    } else if (char === "1") {
      setActiveCard({
        title: "৩ মাস মেয়াদী প্রাতিষ্ঠানিক সার্টিফিকেট",
        engTitle: "3-Month Basic IT Program",
        duration: "৩ মাস",
        price: "৳১,৮৫০",
        desc: "কম্পিউটার টাইপিং, এমএস অফিস টুলস, ব্রাউজিং ও ইমেইলিং সহ প্রয়োজনীয় প্রাতিষ্ঠানিক কারিগরি জ্ঞান অর্জন করুন।",
        key: "1",
      });
    } else if (char === "2") {
      setActiveCard({
        title: "৬ মাস মেয়াদী প্রফেশনাল ডিপ্লোমা",
        engTitle: "6-Month Professional Diploma",
        duration: "৬ মাস",
        price: "৳৪,৫০০",
        desc: "যেকোনো একটি অ্যাডভান্সড ট্র্যাকে প্রফেশনাল স্কিলস: ওয়েব ডিজাইন, গ্রাফিক আর্ট বা অ্যাডভান্সড ডেক্সটপ পাবলিশিং।",
        key: "2",
      });
    } else if (char === "3") {
      setActiveCard({
        title: "১ বছর মেয়াদী অ্যাডভান্সড ডিপ্লোমা",
        engTitle: "1-Year Advance Technical Diploma",
        duration: "১ বছর",
        price: "৳১২,০০০",
        desc: "ফুল স্ট্যাক সফটওয়্যার ডেভেলপমেন্ট, সিস্টেম অ্যাডমিনিস্ট্রেশন, ডেটা স্ট্রাকচার ও কারিগরি বোর্ডের চূড়ান্ত প্রজেক্ট ডিপ্লোমা।",
        key: "3",
      });
    } else if (char === "ENTER") {
      // Smooth scroll to Contact
      const target = document.querySelector("#contact");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else if (char === "SPACE") {
      // Flash discount banner
      setShowDiscountAlert(true);
      setTimeout(() => setShowDiscountAlert(false), 2500);
    }
  };

  // Touch fallback illustrated layout renderer
  const renderTouchKeyboard = () => {
    const rows = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    return (
      <div className="w-full max-w-2xl mx-auto bg-slate-950 p-4 rounded-xl border border-slate-900 shadow-2xl relative z-10 flex flex-col gap-2.5 select-none">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5 w-full">
            {row.map((char) => (
              <button
                key={char}
                onClick={() => handleKeyInteraction(char)}
                className={`h-11 flex-1 max-w-[48px] rounded-lg border font-mono font-bold text-xs uppercase transition-all active:scale-95 duration-100 ${
                  highlightedKeys.includes(char)
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        ))}
        {/* Row 5: Space / Enter */}
        <div className="flex justify-center gap-2 w-full mt-1.5">
          <button
            onClick={() => handleKeyInteraction("SPACE", "thock")}
            className="h-11 w-3/5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-400 active:scale-95 font-mono"
          >
            SPACE (৬০% ছাড়)
          </button>
          <button
            onClick={() => handleKeyInteraction("ENTER", "clack")}
            className="h-11 w-2/5 rounded-lg border border-[var(--border-color)] bg-[var(--accent)] text-xs font-bold uppercase tracking-wider text-white active:scale-95 font-sans"
          >
            ভর্তি হোন (ENTER)
          </button>
        </div>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <section id="keyboard" className="relative w-full bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="dot-grid" />
      
      {/* Background radial highlight */}
      <div className="absolute left-[10%] bottom-[10%] w-[350px] h-[350px] bg-[var(--accent)]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--accent)] text-glow">
            Interactive Learning
          </span>
          <h2 className="mt-4 font-display font-black text-3xl md:text-5xl tracking-tight text-white leading-tight">
            আমাদের প্রোগ্রামসমূহ অন্বেষণ করুন
          </h2>
          <p className="mt-4 text-xs md:text-sm text-slate-400 font-sans tracking-wide">
            কীবোর্ডের কীগুলো হোভার বা ক্লিক করুন (Hover or click the keycaps to explore course modules)
          </p>
        </div>

        {/* Dynamic Spacebar Flash overlay alert banner */}
        <AnimatePresence>
          {showDiscountAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-xl p-6 text-center text-black font-black text-xl tracking-widest uppercase border border-white/20 shadow-[0_0_30px_var(--accent-glow)] mb-12 flex items-center justify-center gap-3 select-none"
            >
              <span>✦ ৬০% সরাসরি ভর্তি ফি ছাড় অফার চলছে! আজই যোগাযোগ করুন ✦</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Floating Card Overlay */}
        <div className="min-h-[140px] max-w-xl mx-auto mb-8 flex justify-center items-center">
          <AnimatePresence mode="wait">
            {activeCard ? (
              <motion.div
                key={activeCard.key}
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/90 backdrop-blur-md p-6 relative flex flex-col justify-between gap-4 shadow-2xl"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <span 
                      className="text-[10px] font-mono tracking-widest text-[var(--accent)] uppercase border border-[var(--border-color)] px-2.5 py-0.5 rounded-full"
                    >
                      Key Module: {activeCard.key}
                    </span>
                    <button
                      onClick={() => setActiveCard(null)}
                      className="text-slate-400 hover:text-white text-xs font-mono border border-slate-800 rounded px-1.5 cursor-none"
                    >
                      ESC
                    </button>
                  </div>
                  <h3 className="mt-3 font-bold text-white text-lg font-bengali leading-snug">
                    {activeCard.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block mt-1">
                    {activeCard.engTitle}
                  </span>
                  <p className="mt-3 text-xs text-slate-300 font-sans leading-relaxed">
                    {activeCard.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-900 pt-4 text-xs font-mono text-slate-300">
                  <div>মেয়াদ: <span className="text-white font-bold">{activeCard.duration}</span></div>
                  <div>কোর্স ফি: <span className="text-white font-bold">{activeCard.price}</span></div>
                  <a
                    href="#courses"
                    className="px-4 py-2 rounded-lg bg-white/5 border border-slate-800 text-[10px] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 text-white font-bold transition-all duration-300 cursor-none"
                  >
                    আরও জানুন
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-center font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase select-none pointer-events-none"
              >
                [ কীবোর্ডের ওপরে কোর্স মডিউল দেখতে প্রেস করুন ]
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Core Keyboard Canvas / Mobile panel */}
        <div className="w-full select-none">
          {isMobile ? (
            renderTouchKeyboard()
          ) : (
            <div className="w-full h-[400px] relative">
              <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 2.2], fov: 48 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[0, 4, 2]} intensity={1.5} />
                <pointLight position={[4, 2, 2]} color="var(--accent)" intensity={1.2} />
                <pointLight position={[-4, 2, 2]} color="#0055ff" intensity={0.8} />
                <spotLight position={[0, 5, 0]} intensity={1} />
                
                <Suspense fallback={null}>
                  <InteractiveKeyboard
                    themeValue={theme === "a" ? 0 : 1}
                    onKeyClick={handleKeyInteraction}
                    highlightedKeys={highlightedKeys}
                  />
                </Suspense>
              </Canvas>
              
              {/* HTML Legends position indicators overlay in desktop R3F */}
              <div className="absolute inset-x-0 bottom-4 pointer-events-none flex justify-center text-[10px] font-mono text-slate-500 tracking-wider">
                Tip: Press O-F-F-I-C-E, D-E-S-I-G-N, or Numbers 1-3 keys.
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
