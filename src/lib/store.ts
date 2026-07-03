import { create } from 'zustand';
import type { Tier } from '@/types/portfolio';

interface PortfolioState {
  bootComplete: boolean;
  audioEnabled: boolean;
  scrollProgress: number; // 0 to 1
  activeSection: string;
  /** Tier of the project card currently under the cursor — the 3D scene reacts to it */
  hoveredTier: Tier | null;

  setBootComplete: (complete: boolean) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setHoveredTier: (tier: Tier | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  bootComplete: false,
  audioEnabled: false,
  scrollProgress: 0,
  activeSection: 'hero',
  hoveredTier: null,

  setBootComplete: (bootComplete) => set({ bootComplete }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setHoveredTier: (hoveredTier) => set({ hoveredTier }),
}));
