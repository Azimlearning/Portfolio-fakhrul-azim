'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import ScrollManager from '../ui/ScrollManager';
import SmoothScroll from '../ui/SmoothScroll';
import CustomCursor from '../ui/CustomCursor';
import BootScreen from '../boot/BootScreen';
import TopBar from './TopBar';
import Hero from './Hero';
import About from './About';
import ToolsMarquee from './ToolsMarquee';
import ImageMarquee from './ImageMarquee';
import ProjectsSection from './ProjectsSection';
import LeadershipSection from './LeadershipSection';
import EventsSection from './EventsSection';
import SideRails from '../ui/SideRails';
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
    // Always start at the top — the browser otherwise restores the previous
    // scroll position mid-page before the boot screen / animations run.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#070a12]" />;
  }

  return (
    <div className="relative min-h-screen">
      <ScrollManager />
      <SmoothScroll />
      <CustomCursor />

      {/* Cinematic 3D background */}
      {bootComplete && <Scene />}

      {/* Intro preloader (first visit per session) */}
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}

      <TopBar />
      <SideRails />

      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <ToolsMarquee />
        {/* Experience before Projects: the internship is the strongest single
            credential for a recruiter-heavy audience */}
        <ExperienceSection />
        <ProjectsSection />
        {/* Visual breather: photo rows drifting in alternating directions */}
        <ImageMarquee />
        <LeadershipSection />
        <EventsSection />
        <EducationSection />
        <CertificatesSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
