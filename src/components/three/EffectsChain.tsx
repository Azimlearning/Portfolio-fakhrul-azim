'use client';

import React from 'react';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

// Cast components to sidestep React 19 / postprocessing JSX type incompatibilities.
const SafeEffectComposer = EffectComposer as React.ComponentType<{
  children: React.ReactNode;
  multisampling?: number;
}>;

const SafeBloom = Bloom as React.ComponentType<{
  intensity?: number;
  luminanceThreshold?: number;
  luminanceSmoothing?: number;
  mipmapBlur?: boolean;
}>;

const SafeDepthOfField = DepthOfField as React.ComponentType<{
  target?: [number, number, number];
  focalLength?: number;
  bokehScale?: number;
  height?: number;
}>;

/**
 * High-quality post chain. Skipped entirely on weak GPUs (see Scene.tsx);
 * the vignette lives in CSS so it applies in both modes for free.
 */
export default function EffectsChain() {
  return (
    <SafeEffectComposer multisampling={0}>
      <SafeBloom intensity={0.55} luminanceThreshold={0.45} luminanceSmoothing={0.7} mipmapBlur />
      <SafeDepthOfField target={[0, 0, 0]} focalLength={0.055} bokehScale={3} height={360} />
    </SafeEffectComposer>
  );
}
