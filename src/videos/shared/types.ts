/** Shared vocabulary for every video. One place so scripts + compositions agree. */

export type LengthMode = "growth" | "rewards";

export type Beat = {
  id: string;
  seconds: number;
  /** The voiceover line Joseph reads. Beat 1 is the hook; the last beat is the funnel CTA. */
  vo: string;
  /** The on-screen burned-in caption (shorter than the VO). */
  caption: string;
  /** Mark beat 1. Enforced by scripts/lint-hooks.ts (must be ≤ HOOK_MAX_WORDS). */
  hook?: boolean;
  /** Mark the closing funnel beat (drives to the dashboard). */
  cta?: boolean;
  /** Basename of this beat's per-beat VO clip in public/<video>/ (e.g. "hook" -> hook.wav). */
  audio?: string;
};

export type VideoMeta = {
  /** Remotion composition id (matches Root.tsx). */
  id: string;
  title: string;
  /** e.g. "ats" | "line-movement" | "player" — used later by the performance loop. */
  angleType: string;
  lengthMode: LengthMode;
  ctaUrl: string;
};

/** Target runtime windows per mode. `growth` = punchy for follower growth; `rewards` = 60s+ for Creator-Rewards eligibility. */
export const LENGTH_TARGETS: Record<LengthMode, { min: number; max: number }> = {
  // growth max is a soft cap for punchiness; 40 leaves room for natural VO delivery
  // (a channel intro reads a touch longer) while still flagging real bloat.
  growth: { min: 20, max: 40 },
  rewards: { min: 60, max: 90 },
};

/** A hook should land its surprising claim in ~1 second of speech. */
export const HOOK_MAX_WORDS = 12;

export const totalSeconds = (beats: Beat[]): number => beats.reduce((s, b) => s + b.seconds, 0);

export const wordCount = (s: string): number => s.trim().split(/\s+/).filter(Boolean).length;
