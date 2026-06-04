import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import ScrollLinkedFeature from "@/components/ScrollLinkedFeature";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-white selection:bg-primary/25">
      {/* 1. Hero Section with full-screen 3D canvas and scroll fading */}
      <Hero />

      {/* 2. Stats Bar displaying key numbers that animate in on scroll */}
      <Stats />

      {/* 3. Grid of course cards with 3D tilts and gradient border glows */}
      <Courses />

      {/* 4. Sticky 400vh scroll-linked 3D visual showcase */}
      <ScrollLinkedFeature />

      {/* 5. Team of instructors fading in smoothly */}
      <Instructors />

      {/* 6. Continuous sliding student feedback carousel */}
      <Testimonials />

      {/* 7. Action CTA and contact form */}
      <Contact />

      {/* 8. Footer with credits and clean navigation links */}
      <Footer />
    </main>
  );
}
