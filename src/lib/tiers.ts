import type { Tier } from '@/types/portfolio';

export interface TierStyle {
  /** Solid accent color */
  color: string;
  /** Low-alpha fill for icon chips / washes */
  dim: string;
  /** Mid-alpha for borders / lines */
  line: string;
  /** Human label shown on cards */
  label: string | null;
  /** Hex for use inside the WebGL scene (CSS vars don't reach three.js) */
  hex: string;
}

export const TIER_STYLES: Record<Tier, TierStyle> = {
  legendary: {
    color: 'var(--tier-legendary)',
    dim: 'var(--tier-legendary-dim)',
    line: 'var(--tier-legendary-line)',
    label: 'Flagship',
    hex: '#e2a648',
  },
  epic: {
    color: 'var(--tier-epic)',
    dim: 'var(--tier-epic-dim)',
    line: 'var(--tier-epic-line)',
    label: 'Major build',
    hex: '#7c9fd9',
  },
  rare: {
    color: 'var(--tier-rare)',
    dim: 'var(--tier-rare-dim)',
    line: 'var(--tier-rare-line)',
    label: null,
    hex: '#7dbd93',
  },
  common: {
    color: 'var(--tier-common)',
    dim: 'var(--tier-common-dim)',
    line: 'var(--tier-common-line)',
    label: null,
    hex: '#8b93a8',
  },
};
