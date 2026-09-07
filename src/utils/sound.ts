/**
 * Procedural Web Audio API sound generator for Menungsa Writing Research.
 * Generates an organic, rich palette of tactile editorial micro-sounds:
 * - tick: Subtle mechanical/paper micro-tick with organic pitch jitter
 * - tab: Index tab card-flip slide
 * - click: Solid mechanical switch / shutter
 * - pop: Resonant bubble confirmation pop
 * - chip: Ceramic / wooden token snap (for word tags, chips, radio filters)
 * - paper: Soft paper brush sweep (for clear / reset draft)
 * - theme-light: Ascending solar bell chime
 * - theme-dark: Descending nocturnal velvet chime
 * - expand: Upward acoustic reveal
 * - collapse: Downward acoustic fold
 * - modal-open: Airy crystalline chime ping
 * - modal-close: Discreet soft retreat
 *
 * Zero external assets, 0ms latency, zero memory leaks, ultra-lightweight.
 */

export type SoundType =
  | 'tick'
  | 'tab'
  | 'click'
  | 'pop'
  | 'chip'
  | 'paper'
  | 'theme-light'
  | 'theme-dark'
  | 'expand'
  | 'collapse'
  | 'modal-open'
  | 'modal-close'
  | 'none';

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
 * Creates pinkish soft noise buffer for acoustic paper sweeps.
 */
function createNoiseBuffer(ctx: AudioContext, duration = 0.05): AudioBuffer {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Simple 1-pole filter to produce warm pink noise
    data[i] = (lastOut + 0.04 * white) / 1.04;
    lastOut = data[i];
  }
  return buffer;
}

/**
 * Play subtle, tactile micro-sounds for UX interactions.
 */
export function playSound(type: SoundType = 'tick'): void {
  if (!soundEnabled || type === 'none') return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Subtle organic pitch jitter (±4%) so repeated actions sound like physical material
  const jitter = 0.96 + Math.random() * 0.08;

  try {
    switch (type) {
      case 'tick': {
        // Crisp mechanical/haptic micro-tick (Apple Watch digital crown / camera dial style)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500 * jitter, now);
        filter.Q.setValueAtTime(3.2, now);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(650 * jitter, now + 0.015);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.016);
        break;
      }

      case 'tab': {
        // Index tab card-flip slide: quick rising glide with warm body
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(540 * jitter, now);
        osc1.frequency.exponentialRampToValueAtTime(780 * jitter, now + 0.024);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(270 * jitter, now);
        osc2.frequency.exponentialRampToValueAtTime(390 * jitter, now + 0.024);

        gain.gain.setValueAtTime(0.075, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.028);
        osc2.stop(now + 0.028);
        break;
      }

      case 'click': {
        // Tactile button click (warm mechanical switch)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(760 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.022);

        gain.gain.setValueAtTime(0.095, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'chip': {
        // Ceramic / wooden token snap: crisp high-precision click for tags & filters
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2100 * jitter, now);
        filter.Q.setValueAtTime(4.0, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(1050 * jitter, now + 0.012);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.013);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.014);
        break;
      }

      case 'pop': {
        // Soft organic bubble pop / copy confirmation with harmonic sparkle
        const oscFundamental = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gain = ctx.createGain();

        oscFundamental.type = 'sine';
        oscFundamental.frequency.setValueAtTime(440, now);
        oscFundamental.frequency.exponentialRampToValueAtTime(880, now + 0.034);

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(880, now);
        oscHarmonic.frequency.exponentialRampToValueAtTime(1760, now + 0.034);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

        oscFundamental.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(ctx.destination);

        oscFundamental.start(now);
        oscHarmonic.start(now);
        oscFundamental.stop(now + 0.04);
        oscHarmonic.stop(now + 0.04);
        break;
      }

      case 'paper': {
        // Acoustic paper brush sweep for clearing drafts or reset
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(ctx, 0.045);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.Q.setValueAtTime(1.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.045);
        break;
      }

      case 'theme-light': {
        // Ascending dual-tone solar bell chime (E5 -> G#5)
        const note1 = ctx.createOscillator();
        const note2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();

        note1.type = 'sine';
        note1.frequency.setValueAtTime(659.25, now); // E5
        gain1.gain.setValueAtTime(0.05, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        note2.type = 'sine';
        note2.frequency.setValueAtTime(830.61, now + 0.035); // G#5
        gain2.gain.setValueAtTime(0.0001, now);
        gain2.gain.setValueAtTime(0.06, now + 0.035);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

        note1.connect(gain1);
        gain1.connect(ctx.destination);
        note2.connect(gain2);
        gain2.connect(ctx.destination);

        note1.start(now);
        note1.stop(now + 0.085);
        note2.start(now + 0.035);
        note2.stop(now + 0.125);
        break;
      }

      case 'theme-dark': {
        // Descending nocturnal velvet chime (G#5 -> E5 with warm filter)
        const note1 = ctx.createOscillator();
        const note2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        note1.type = 'sine';
        note1.frequency.setValueAtTime(830.61, now); // G#5
        gain1.gain.setValueAtTime(0.05, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        note2.type = 'sine';
        note2.frequency.setValueAtTime(659.25, now + 0.035); // E5
        gain2.gain.setValueAtTime(0.0001, now);
        gain2.gain.setValueAtTime(0.06, now + 0.035);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

        note1.connect(filter);
        note2.connect(filter);
        gain1.connect(ctx.destination);
        gain2.connect(ctx.destination);
        filter.connect(gain1);
        filter.connect(gain2);

        note1.start(now);
        note1.stop(now + 0.085);
        note2.start(now + 0.035);
        note2.stop(now + 0.135);
        break;
      }

      case 'expand': {
        // Upward acoustic fold reveal
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(560 * jitter, now + 0.022);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'collapse': {
        // Downward acoustic fold
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(560 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(340 * jitter, now + 0.022);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'modal-open': {
        // Airy crystalline chime ping for Search Modal
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(740, now); // F#5
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1108, now); // C#6

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.095);
        osc2.stop(now + 0.095);
        break;
      }

      case 'modal-close': {
        // Soft receding breath
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.03);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.038);
        break;
      }
    }
  } catch {
    // Gracefully handle any browser audio context error
  }
}

/**
 * Initializes global pointerdown listener for tactile UX sounds on interactive elements.
 * Automatically equips buttons, tabs, links, chips, and accordions with context-aware sound feedback.
 */
export function initSoundInteraction(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    // Only trigger for primary button (left click or touch tap)
    if (e.button !== 0) return;

    const target = (e.target as HTMLElement | null)?.closest(
      'button, a, [role="button"], [role="radio"], [role="tab"], input[type="radio"], input[type="checkbox"], summary, .chart-mark-interactive'
    ) as HTMLElement | null;

    if (!target) return;

    // Honor explicit data-sound attribute if provided
    const soundAttr = target.getAttribute('data-sound');
    if (soundAttr === 'none') return;
    if (soundAttr) {
      playSound(soundAttr as SoundType);
      return;
    }

    // Context-aware smart sound selection:
    // 1. Navigation tabs:
    if (target.getAttribute('role') === 'tab' || target.closest('nav[aria-label="Navigasi utama"]') || target.closest('nav')) {
      playSound('tab');
      return;
    }

    // 2. Filter chips, tags, or radio pills:
    if (
      target.getAttribute('role') === 'radio' ||
      target.classList.contains('chip') ||
      target.closest('[role="radiogroup"]') ||
      target.closest('.filter-group') ||
      target.className.includes('rounded-full')
    ) {
      playSound('chip');
      return;
    }

    // 3. Search triggers:
    if (
      target.getAttribute('aria-label')?.toLowerCase().includes('cari') ||
      target.getAttribute('title')?.toLowerCase().includes('cari')
    ) {
      playSound('modal-open');
      return;
    }

    // 4. Accordions & disclosures:
    if (target.tagName === 'SUMMARY' || target.hasAttribute('aria-expanded')) {
      const isExpanded = target.getAttribute('aria-expanded') === 'true' || target.parentElement?.hasAttribute('open');
      playSound(isExpanded ? 'collapse' : 'expand');
      return;
    }

    // 5. Interactive chart nodes:
    if (target.classList.contains('chart-mark-interactive') || target.tagName === 'circle') {
      playSound('chip');
      return;
    }

    // 6. Reset / clear buttons:
    if (
      target.innerText?.toLowerCase().includes('reset') ||
      target.innerText?.toLowerCase().includes('bersihkan') ||
      target.getAttribute('aria-label')?.toLowerCase().includes('reset')
    ) {
      playSound('paper');
      return;
    }

    // Default button / link interaction
    playSound('tick');
  };

  window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  };
}
