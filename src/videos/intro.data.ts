/**
 * Video 1 — Channel intro / trailer. Who Joseph is + what the channel is about
 * (holistic sports analytics, "the why" not just picks) + one proof point.
 *
 * ~64% ATS verified against BettingEdgeContinued/betting/clv_backtest.py —
 * walk-forward OUT-OF-SAMPLE 2018–2025, HIGH tier: 380/592 = 64.2% ATS vs the
 * opening line. Deliberately NOT the site's 2025 Track-Record tab number
 * (11/17 = 64.7%, n far too small to headline). Say "out-of-sample", not
 * "walk-forward" loosely, and never imply all picks hit 64% (it's top picks).
 */
import type { Beat, VideoMeta } from "./types";
import { DASHBOARD_URL } from "./funnel";

export const META: VideoMeta = {
  id: "ChannelIntro",
  title: "Welcome — sports analytics, not hot takes",
  angleType: "intro",
  lengthMode: "growth",
  ctaUrl: DASHBOARD_URL,
};

export const STATS = {
  atsPct: 64,
  atsN: 592,
  seasonsFrom: 2018,
  seasonsTo: 2025,
} as const;

// `seconds` are SYNCED to public/audio/intro.m4a (37.25s total): scene cuts land in
// the longest pauses of Joseph's delivery (~5.0 / 10.65 / 23.1 / 30.3s), corroborated
// by word-count pacing. Nudge an individual value if a caption feels early/late.
export const BEATS: Beat[] = [
  {
    id: "hook",
    seconds: 5.0,
    hook: true,
    vo: "Sports analytics — the real numbers behind the games, no hot takes.",
    caption: "The data behind the games — no hot takes",
  },
  {
    id: "intro",
    seconds: 5.65,
    vo: "I'm Joseph. Football, basketball, soccer — if there's data in it, we'll break it down.",
    caption: "I'm Joseph. Football, basketball, soccer — all of it.",
  },
  {
    id: "proof",
    seconds: 12.45,
    vo: "I recently created a live site modeling the most recent NFL season — fantasy, DFS, and weekly spread predictions. One angle I plan to tackle is spread betting. My model's top picks beat the spread better than 64% of the time.",
    caption: "Live NFL site · top picks beat the spread 64%+ (out-of-sample)",
  },
  {
    id: "why",
    seconds: 7.2,
    vo: "But I'm not here to just hand you picks. This channel is about the why — the analytics behind every call. Come along for the ride.",
    caption: "It's about the WHY — the analytics behind every call",
  },
  {
    id: "cta",
    seconds: 6.95,
    cta: true,
    vo: "Drop a follow so you don't miss it — the deep dives start now. Full site's in my bio.",
    caption: "Follow — deep dives start now. Site in bio.",
  },
];

export const INTRO_DURATION_SECONDS = BEATS.reduce((s, b) => s + b.seconds, 0);
