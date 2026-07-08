/**
 * Video 1 — Channel intro / trailer (v2, credibility-forward, 2026-07-07).
 * Who Joseph is (a PROFESSIONAL ML engineer w/ an M.S. in data science) + what the
 * channel is (holistic sports analytics, "the why" not just picks) + proof.
 *
 * Credibility framing per [[joseph-credentials]]: "I build ML models for a living" +
 * "master's in data science" + "code's on my GitHub" — do NOT name Booz Allen/Northrop.
 * Stat: 64.7% on high-confidence picks (2025 live test, 117 games) — his resume number.
 * Style: hardest hook first + human/personable voice (see [[tiktok-video-style]]).
 * VO recorded 2026-07-07 (per-beat clips in public/channel-intro/*.wav). `vo` is the
 * verbatim transcript; `seconds` = each trimmed clip's real duration; captions live in
 * captions.json (Whisper word-timed, word-for-word to the audio).
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

/** Footage-less lead-in before the first word, and a breath held after each beat. */
export const LEAD_IN_SECONDS = 0.2;
export const INTER_BEAT_GAP = 0.18;

export const BEATS: Beat[] = [
  {
    id: "hook",
    audio: "hook",
    seconds: 13.21,
    hook: true,
    vo: "I built a machine-learning model that beats Vegas over 64% of the time. I've also done various projects from Fantasy Football to the World Cup. I'm Joseph, and I hope to share my expertise and insights into sports analytics.",
    caption: "I built a model that beats Vegas over 64% of the time.",
  },
  {
    id: "who",
    audio: "who",
    seconds: 12.12,
    vo: "I have a master's in data science, a bachelor's in computer science, and a minor in statistics. I've always been interested in sports and data, and the goal with this channel is to combine those two loves to create content that people will find interesting.",
    caption: "M.S. Data Science · B.S. CS · minor in Statistics",
  },
  {
    id: "proof",
    audio: "proof",
    seconds: 10.3,
    vo: "I created an entire live website that hosts my spread, fantasy and DFS predictions. My plan is to update it every week, and not just that, but the model itself is public on my GitHub.",
    caption: "Live site + open-source on GitHub — nothing to hide",
  },
  {
    id: "why",
    audio: "why",
    seconds: 6.37,
    vo: "But at the end of the day, I'm not here to just hand you picks. This channel is about the why — the analytics behind every call.",
    caption: "It's about the WHY — the analytics behind every call",
  },
  {
    id: "cta",
    audio: "cta",
    seconds: 6.76,
    cta: true,
    vo: "Come along through the journey. Drop a follow so you don't miss it. The deep dives start now, check out my website in my bio. Thanks!",
    caption: "Drop a follow — deep dives start now.",
  },
];

export const INTRO_DURATION_SECONDS =
  LEAD_IN_SECONDS + BEATS.reduce((s, b) => s + b.seconds + INTER_BEAT_GAP, 0);
