/**
 * Procedural Web Audio API sound generator for Menungsa Writing Research.
 * Generates tactile micro-interactions (haptic tick, click, soft pop, toggle)
 * with zero external assets, zero latency, and minimal CPU footprint.
 */

export type SoundType = 'tick' | 'click' | 'pop' | 'toggle-on' | 'toggle-off' | 'none';

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

const STORAGE_KEY = 'menungsa_sound_enabled';

// Read stored preference
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    soundEnabled = stored === 'true';
  }
} catch {
  // Fallback to true if localStorage is restricted
}

const listeners = new Set<(enabled: boolean) => void>();

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  try {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // Ignore storage errors
  }
  listeners.forEach((cb) => cb(enabled));
  if (enabled) {
    playSound('pop');
  }
}

export function subscribeSound(callback: (enabled: boolean) => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play subtle tactile micro-sounds for UX interactions.
 */
export function playSound(type: SoundType = 'tick'): void {
  if (!soundEnabled || type === 'none') return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (type) {
      case 'tick': {
        // Crisp mechanical/haptic micro-tick (Apple Watch digital crown / camera dial style)
        // High-frequency damped impulse (15ms duration)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500, now);
        filter.Q.setValueAtTime(3.0, now);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.015);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.016);
        break;
      }

      case 'click': {
        // Tactile button click (warm mechanical switch)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.022);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'pop': {
        // Soft organic bubble pop / copy confirmation
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.032);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.038);
        break;
      }

      case 'toggle-on': {
        // Soft rising chime for activating toggles
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.04);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'toggle-off': {
        // Soft falling chime for deactivating toggles
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(780, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.04);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
    }
  } catch {
    // Gracefully handle any browser audio context error
  }
}

/**
 * Initializes global pointerdown listener for tactile UX sounds on interactive elements.
 * Automatically equips buttons, tabs, links, and chips with tactile sound feedback.
 */
export function initSoundInteraction(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    // Only trigger for primary button (left click or touch tap)
    if (e.button !== 0) return;

    const target = (e.target as HTMLElement | null)?.closest(
      'button, a, [role="button"], [role="radio"], [role="tab"], input[type="radio"], input[type="checkbox"], summary'
    ) as HTMLElement | null;

    if (!target) return;

    const soundAttr = target.getAttribute('data-sound');
    if (soundAttr === 'none') return;

    const soundType = (soundAttr as SoundType) || 'tick';
    playSound(soundType);
  };

  window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  };
}
