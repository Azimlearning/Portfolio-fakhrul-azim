import { create } from 'zustand';

interface PortfolioState {
  bootComplete: boolean;
  audioEnabled: boolean;
  scrollProgress: number; // 0 to 1
  activeSection: string;

  setBootComplete: (complete: boolean) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  bootComplete: false,
  audioEnabled: false,
  scrollProgress: 0,
  activeSection: 'hero',

  setBootComplete: (bootComplete) => set({ bootComplete }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));
