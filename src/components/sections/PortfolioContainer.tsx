'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import ScrollManager from '../ui/ScrollManager';
import SmoothScroll from '../ui/SmoothScroll';
import BootScreen from '../boot/BootScreen';
import TopBar from './TopBar';
import Hero from './Hero';
import About from './About';
import ProjectsSection from './ProjectsSection';
import LeadershipSection from './LeadershipSection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import CertificatesSection from './CertificatesSection';
import Contact from './Contact';
import Footer from './Footer';
import Scene from '../three/Scene';

export default function PortfolioContainer() {
  // Narrow selectors — subscribing to the whole store re-renders the entire
  // tree on every per-frame scrollProgress write.
  const bootComplete = usePortfolioStore((s) => s.bootComplete);
  const setBootComplete = usePortfolioStore((s) => s.setBootComplete);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#070a12]" />;
  }

  return (
    <div className="relative min-h-screen">
      <ScrollManager />
      <SmoothScroll />

      {/* Cinematic 3D background */}
      {bootComplete && <Scene />}

      {/* Intro preloader (first visit per session) */}
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}

      <TopBar />

      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <ProjectsSection />
        <LeadershipSection />
        <ExperienceSection />
        <EducationSection />
        <CertificatesSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
