// Retro Web Audio chiptune synth engine

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const WebkitAudioContext = (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioCtx = new (window.AudioContext || WebkitAudioContext)();
  }
  return audioCtx;
}

export function isAudioSupported(): boolean {
  if (typeof window === "undefined") return false;
  const WebkitAudioContext = (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return !!(window.AudioContext || WebkitAudioContext);
}

// Check if sound enabled in localStorage
export function getSoundSetting(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("pf-sound-enabled") === "true";
}

export function setSoundSetting(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("pf-sound-enabled", enabled ? "true" : "false");
}

function createOscillator(
  type: OscillatorType,
  freq: number,
  duration: number,
  volume = 0.15
) {
  if (!getSoundSetting()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  // Sweet linear decay
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playSelectBlip() {
  // High-pitch, extremely quick triangle wave for inventory hovers
  createOscillator("triangle", 1200, 0.08, 0.1);
}

export function playClickSound() {
  // Classic short computer key click
  createOscillator("square", 440, 0.12, 0.08);
}

export function playBootSound() {
  // A rapid three-note arpeggio up for retro game starts!
  const ctx = getAudioContext();
  if (!ctx || !getSoundSetting()) return;
  if (ctx.state === "suspended") ctx.resume();

  const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
  notes.forEach((freq, index) => {
    setTimeout(() => {
      createOscillator("square", freq, 0.2, 0.12);
    }, index * 90);
  });
}

export function playTickSound() {
  // Super short blip for letter outputs
  createOscillator("sine", 800, 0.04, 0.05);
}

export function playThemeSound(isNight: boolean) {
  const ctx = getAudioContext();
  if (!ctx || !getSoundSetting()) return;
  if (ctx.state === "suspended") ctx.resume();

  if (isNight) {
    // Elegant slide down (low thrum)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.6);
    
    gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } else {
    // Slide up (ping!)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }
}
