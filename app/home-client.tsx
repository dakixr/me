"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), {
  loading: () => <div className="h-screen w-full bg-light dark:bg-dark" />,
});

const SkillsSection = dynamic(() => import("@/components/SkillsSection"), {
  loading: () => <div className="h-screen w-full bg-light dark:bg-dark" />,
});

const CVSection = dynamic(() => import("@/components/CVSection"), {
  loading: () => <div className="h-screen w-full bg-light dark:bg-dark" />,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="h-screen w-full bg-light dark:bg-dark" />,
});

const Footer = dynamic(() => import("@/components/Footer"));

const EasterEggs = dynamic(() => import("@/components/EasterEggs"), {
  ssr: false,
  loading: () => null,
});

export default function HomeClient() {
  return (
    <main>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <EasterEggs />
      <div id="main-content">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <CVSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
