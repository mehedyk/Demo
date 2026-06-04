"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import Keyboard3D from "@/components/Keyboard3D";
import AdmissionBanner from "@/components/AdmissionBanner";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* 1. Glassmorphic Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section (with GLSL blob on right, layout details on left) */}
      <Hero />
      
      {/* Divider Hero -> Marquee */}
      <SectionDivider type="diagonal" fill="var(--bg-secondary)" bg="var(--bg-primary)" />

      {/* 3. Infinite Seamless Marquee Strip */}
      <MarqueeStrip />

      {/* Divider Marquee -> Stats */}
      <SectionDivider type="diagonal" fill="var(--bg-primary)" bg="var(--bg-secondary)" inverted />

      {/* 4. Stats Counter Row */}
      <Stats />
      
      {/* Divider Stats -> Courses */}
      <SectionDivider type="wave" fill="var(--bg-secondary)" bg="var(--bg-primary)" />

      {/* 5. Courses Grid */}
      <Courses />

      {/* Divider Courses -> Keyboard */}
      <SectionDivider type="curve" fill="var(--bg-primary)" bg="var(--bg-secondary)" inverted />

      {/* 6. Interactive Keyboard Section */}
      <Keyboard3D />

      {/* Divider Keyboard -> Admission (gradient banner) */}
      <SectionDivider type="diagonal" fill="rgba(0,0,0,0.2)" bg="var(--bg-primary)" />

      {/* 7. Admission CTA Banner */}
      <AdmissionBanner />

      {/* Divider Admission -> Testimonials */}
      <SectionDivider type="diagonal" fill="var(--bg-secondary)" bg="rgba(0,0,0,0.2)" inverted />

      {/* 8. Testimonials Carousel */}
      <Testimonials />

      {/* Divider Testimonials -> Contact */}
      <SectionDivider type="wave" fill="var(--bg-primary)" bg="var(--bg-secondary)" />

      {/* 9. Contact Details & Isolated Message Form */}
      <Contact />

      {/* Divider Contact -> Footer */}
      <SectionDivider type="diagonal" fill="var(--bg-secondary)" bg="var(--bg-primary)" inverted />

      {/* 10. Footer Section with Credits */}
      <Footer />
    </main>
  );
}
