'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, PerformanceMonitor, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/lib/store';
import { TIER_STYLES } from '@/lib/tiers';
import EffectsChain from './EffectsChain';

// Cached MediaQueryList — constructing one via matchMedia() every frame
// forces style recalc and cripples the frame rate.
let reducedMq: MediaQueryList | null = null;
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  if (!reducedMq) reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  return reducedMq.matches;
};

const ACCENT = '#e2a648';
const COOL = '#8fb3d9';
const BG = '#070a12';

/* Deterministic pseudo-random so SSR/CSR agree and layouts are stable */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Stardust({ count, radius, size, color, opacity, seed }: {
  count: number; radius: number; size: number; color: string; opacity: number; seed: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(seed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical shell distribution, flattened a little vertically
      const r = radius * (0.5 + rand() * 0.5);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count, radius, seed]);

  useFrame((_, delta) => {
    if (prefersReducedMotion()) return;
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Core() {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetColor = useRef(new THREE.Color(ACCENT));

  useFrame((state, delta) => {
    if (prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    if (solidRef.current) {
      solidRef.current.rotation.y += delta * 0.12;
      solidRef.current.rotation.x = Math.sin(t * 0.15) * 0.18;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.07;
      wireRef.current.rotation.z = Math.cos(t * 0.11) * 0.12;
    }

    // React to the project card under the visitor's cursor: the shell and
    // ember light lerp toward the hovered tier's color, and the core swells.
    const hovered = usePortfolioStore.getState().hoveredTier;
    targetColor.current.set(hovered ? TIER_STYLES[hovered].hex : ACCENT);
    const k = 1 - Math.exp(-5 * delta);
    if (wireMatRef.current) {
      wireMatRef.current.color.lerp(targetColor.current, k);
      wireMatRef.current.opacity += ((hovered ? 0.34 : 0.18) - wireMatRef.current.opacity) * k;
    }
    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor.current, k);
      lightRef.current.intensity += ((hovered ? 7 : 4) - lightRef.current.intensity) * k;
    }
    if (groupRef.current) {
      const s = groupRef.current.scale.x + ((hovered ? 1.08 : 1) - groupRef.current.scale.x) * k;
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef}>
        {/* Faceted dark core — env-map reflections give it a real metal read */}
        <mesh ref={solidRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#141b2c"
            roughness={0.16}
            metalness={0.92}
            flatShading
            emissive="#1b2438"
            emissiveIntensity={0.3}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* Glowing wireframe shell — bloom feeds on this */}
        <mesh ref={wireRef} scale={1.55}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial ref={wireMatRef} color={ACCENT} wireframe transparent opacity={0.18} />
        </mesh>

        {/* Inner ember light */}
        <pointLight ref={lightRef} color={ACCENT} intensity={4} distance={9} decay={2} />
      </group>
    </Float>
  );
}

function OrbitRing({ radius, tilt, speed, opacity }: {
  radius: number; tilt: [number, number, number]; speed: number; opacity: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.008, 8, 160]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={opacity} />
        </mesh>
        {/* Satellite bead riding the ring */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#f5d9a3" />
        </mesh>
      </group>
    </group>
  );
}

function Shards() {
  const shards = useMemo(() => {
    const rand = mulberry32(1337);
    return Array.from({ length: 22 }, (_, i) => {
      const angle = rand() * Math.PI * 2;
      const dist = 3.2 + rand() * 7;
      return {
        id: i,
        position: [
          Math.cos(angle) * dist,
          (rand() - 0.5) * 4.5,
          Math.sin(angle) * dist,
        ] as [number, number, number],
        scale: 0.08 + rand() * 0.22,
        speed: 0.6 + rand() * 1.2,
        rotation: [rand() * Math.PI, rand() * Math.PI, 0] as [number, number, number],
        ember: rand() > 0.72,
      };
    });
  }, []);

  return (
    <>
      {shards.map((s) => (
        <Float key={s.id} speed={s.speed} rotationIntensity={0.8} floatIntensity={1.4}>
          <mesh position={s.position} rotation={s.rotation} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={s.ember ? '#3a2c17' : '#131a29'}
              roughness={0.3}
              metalness={0.8}
              flatShading
              emissive={s.ember ? ACCENT : '#182136'}
              emissiveIntensity={s.ember ? 1.4 : 0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Scroll-driven world rotation + mouse parallax camera rig */
function CameraRig() {
  const world = useRef<THREE.Group>(null);
  const target = useRef({ rotY: 0, camY: 0.3, camX: 0, lookY: 0 });

  useFrame((state, delta) => {
    if (prefersReducedMotion()) return;
    const scroll = usePortfolioStore.getState().scrollProgress;
    const pointer = state.pointer;
    const t = target.current;

    // Where we want to be, given scroll + pointer
    t.rotY = scroll * Math.PI * 1.35;
    t.camY = 0.35 - scroll * 1.6 + pointer.y * 0.35;
    t.camX = pointer.x * 0.55;
    t.lookY = -scroll * 0.8;

    // Critically damped approach for a heavy, cinematic feel
    const k = 1 - Math.exp(-2.2 * delta);
    if (world.current) {
      world.current.rotation.y += (t.rotY - world.current.rotation.y) * k;
    }
    state.camera.position.x += (t.camX - state.camera.position.x) * k;
    state.camera.position.y += (t.camY - state.camera.position.y) * k;
    // Pull back as the visitor scrolls — the core recedes instead of dominating
    state.camera.position.z += (9.5 + scroll * 4.5 - state.camera.position.z) * k;
    state.camera.lookAt(0, t.lookY, 0);
  });

  return (
    <group ref={world}>
      <Core />
      <OrbitRing radius={2.6} tilt={[Math.PI / 2.4, 0.4, 0]} speed={0.16} opacity={0.35} />
      <OrbitRing radius={3.4} tilt={[Math.PI / 1.9, -0.5, 0.2]} speed={-0.1} opacity={0.2} />
      <OrbitRing radius={4.4} tilt={[Math.PI / 2.1, 0.15, -0.3]} speed={0.06} opacity={0.12} />
      <Shards />
    </group>
  );
}

export default function Scene() {
  // One-way quality degrade: PerformanceMonitor watches real frame rate and,
  // on weak GPUs (e.g. integrated graphics), drops DPR + depth-of-field.
  const [degraded, setDegraded] = useState(false);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden data-scene-quality={degraded ? 'low' : 'high'}>
      {/* CSS vignette — replaces the postprocessing Vignette pass in low mode, costs nothing */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(2,4,9,0.55) 100%)' }}
      />
      <Canvas
        dpr={degraded ? [0.6, 0.75] : [1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.35, 9], fov: 42, near: 0.1, far: 60 }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <PerformanceMonitor
          bounds={() => [40, 60]}
          flipflops={1}
          onDecline={() => setDegraded(true)}
        />

        <color attach="background" args={[BG]} />
        <fog attach="fog" args={[BG, 9, 30]} />

        <ambientLight intensity={0.25} color={COOL} />
        <directionalLight position={[6, 8, 4]} intensity={1.6} color="#f3e2c0" />
        <pointLight position={[-8, -4, -6]} intensity={2.5} color="#31507e" distance={30} />

        {/* Local lightformer environment (no network fetch) — reflected by
            every metallic surface; generated once (frames={1}) so it's cheap */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.2} color="#f0c987" position={[5, 4, 3]} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={1.1} color="#4a6fa5" position={[-6, -2, -3]} scale={[5, 3, 1]} />
          <Lightformer form="ring" intensity={0.9} color="#dfe8f5" position={[0, 6, 0]} scale={3} />
        </Environment>

        <CameraRig />

        <Stardust count={degraded ? 900 : 1600} radius={26} size={0.045} color={COOL} opacity={0.55} seed={42} />
        <Stardust count={350} radius={14} size={0.06} color={ACCENT} opacity={0.4} seed={7} />

        {/* Near-field dust drifting in front of the focus plane — DoF blurs it
            into soft bokeh, selling depth. Pointless without DoF, so high only */}
        {!degraded && (
          <group position={[0, 0, 6]}>
            <Stardust count={140} radius={4} size={0.12} color="#c9d6ea" opacity={0.22} seed={99} />
          </group>
        )}

        {/* In low mode skip postprocessing entirely — emissive materials and
            additive points carry the glow on their own */}
        {!degraded && <EffectsChain />}
      </Canvas>
    </div>
  );
}
