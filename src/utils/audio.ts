/**
 * Audio Controller
 * - "Lullaby Harp Twinkle" by SergeQuadrado (Freesound #711913, CC BY-NC 4.0)
 * - Casino slot machine cascading coin payout sound on envelope open
 * - Soft paper/chime effects for album page turns and adding blessings
 */

let bgAudio: HTMLAudioElement | null = null;
let audioCtx: AudioContext | null = null;
let isPlaying = false;

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
    audioCtx.resume();
  }
  return audioCtx;
}

function getBackgroundAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!bgAudio) {
    bgAudio = new Audio('/audio/lullaby-harp.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.45;
    bgAudio.preload = 'auto';
  }
  return bgAudio;
}

export function startBackgroundMusic(): boolean {
  try {
    const audio = getBackgroundAudio();
    if (!audio) return false;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio playback prevented or failed:', err);
        isPlaying = false;
      });
    }
    isPlaying = true;
    return true;
  } catch (err) {
    console.warn('Could not start background audio:', err);
    return false;
  }
}

export function stopBackgroundMusic() {
  isPlaying = false;
  if (bgAudio) {
    bgAudio.pause();
  }
}

export function isMelodyPlaying(): boolean {
  return isPlaying;
}

/**
 * Synthesizes a realistic casino slot-machine cascading coin payout sound
 * (rapid metallic clinks, high overtones, and tray clatter)
 */
export function playSlotMachineCoinSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 14 rapid cascading coins falling into a metal payout tray
    const coinTimings = [
      0.0, 0.055, 0.105, 0.16, 0.21, 0.255, 0.305,
      0.36, 0.415, 0.47, 0.53, 0.595, 0.665, 0.75
    ];

    coinTimings.forEach((offset, idx) => {
      const start = now + offset;
      // Slight pitch variation per coin for realistic metallic scatter
      const baseFreq = 2400 + ((idx * 317) % 900);
      const overtoneFreq = baseFreq * 1.54;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(baseFreq, start);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.12, start + 0.04);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(overtoneFreq, start);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, start);
      filter.Q.setValueAtTime(2.5, start);

      // Sharp metallic strike, fast crisp ring decay
      const volume = idx < 10 ? 0.14 : 0.14 - (idx - 9) * 0.02;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(Math.max(0.04, volume), start + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(start);
      osc2.start(start);
      osc1.stop(start + 0.15);
      osc2.stop(start + 0.15);
    });

    // Subtle slot-machine win bell ding right at the start
    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = 'sine';
    bell.frequency.setValueAtTime(1567.98, now); // bright G6 jackpot bell
    bellGain.gain.setValueAtTime(0.08, now);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    bell.start(now);
    bell.stop(now + 0.5);
  } catch {
    // ignore audio context errors
  }
}

/**
 * Soft tactile slow-motion paper page-turn swoop + gentle settle
 */
export function playPageTurnSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 0.95;

    // Gentle filtered noise for a slow-motion parchment page turn
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      // Smooth bell-shaped air rustle envelope peaking mid-turn
      const envelope = Math.pow(Math.sin(progress * Math.PI), 1.35);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(1950, now + 0.45);
    filter.frequency.exponentialRampToValueAtTime(920, now + duration);
    filter.Q.setValueAtTime(1.1, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.linearRampToValueAtTime(0.085, now + 0.38);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } catch {
    // ignore
  }
}

/**
 * Procedural interaction chimes
 */
export function playChime(type: 'untie' | 'hang' | 'chime' = 'chime') {
  if (type === 'untie') {
    playSlotMachineCoinSound();
    return;
  }

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'hang') {
      const freqs = [880, 1174.66, 1760];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.6);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(739.99, now);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    }
  } catch {
    // ignore
  }
}
