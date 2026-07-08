/**
 * Video 1 — Channel intro / trailer (v2, credibility-forward, 2026-07-07).
 * Who Joseph is (a PROFESSIONAL ML engineer w/ an M.S. in data science) + what the
 * channel is (holistic sports analytics, "the why" not just picks) + proof.
 *
 * Credibility framing per [[joseph-credentials]]: "I build ML models for a living" +
 * "master's in data science" + "code's on my GitHub" — do NOT name Booz Allen/Northrop.
 * Stat: 64.7% on high-confidence picks (2025 live test, 117 games) — his resume number.
 * Style: hardest hook first + human/personable voice (see [[tiktok-video-style]]).
 * `seconds` are placeholders — re-sync after Joseph re-records the VO.
 */
import type { Beat, VideoMeta } from "../shared/types";
import { DASHBOARD_URL } from "../shared/funnel";

export const META: VideoMeta = {
  id: "ChannelIntro",
  title: "Welcome — a model, not a hot take",
  angleType: "intro",
  lengthMode: "growth",
  ctaUrl: DASHBOARD_URL,
};

export const STATS = {
  atsPct: 64.7,
  atsN: 117,
  season: 2025,
} as const;

export const BEATS: Beat[] = [
  {
    id: "hook",
    seconds: 5.5,
    hook: true,
    vo: "Everybody online's got a hot take. I've got a model — and I build machine-learning systems for a living.",
    caption: "Everybody's got a hot take. I've got a model.",
  },
  {
    id: "intro",
    seconds: 8.0,
    vo: "I'm Joseph. I've got a master's in data science, and I build prediction models professionally — so this isn't some guy with a spreadsheet and a hunch. Football, basketball, soccer — if it's got data, we're breaking it down.",
    caption: "M.S. Data Science · I build ML models professionally",
  },
  {
    id: "proof",
    seconds: 11.0,
    vo: "I already run a live site modeling the NFL — fantasy, DFS, spreads. Out of sample, its most confident picks beat the spread almost sixty-five percent of the time. And the code's public on my GitHub — nothing to hide.",
    caption: "64.7% ATS on top picks · code public on GitHub",
  },
  {
    id: "why",
    seconds: 6.5,
    vo: "But look, I'm not just gonna throw picks at you. I want to show you the why — the actual reasoning behind every call. No vibes, just numbers.",
    caption: "It's about the WHY — the reasoning behind every call",
  },
  {
    id: "cta",
    seconds: 5.0,
    cta: true,
    vo: "So follow along. Honestly, this one's gonna be a fun ride.",
    caption: "Follow along — full site's in my bio.",
  },
];

export const INTRO_DURATION_SECONDS = BEATS.reduce((s, b) => s + b.seconds, 0);
