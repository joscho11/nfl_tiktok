/**
 * Video 1 — "My NFL model beats the spread 64% of the time"
 *
 * Every number here is verified against BettingEdgeContinued/betting/clv_backtest.py
 * on the out-of-sample openline predictions (2018-2025):
 *   HIGH tier: 380/592 = 64.2% ATS vs the OPENING line, Wilson-95 floor 60.2%
 *   Break-even at -110 juice = 52.38%
 *
 * `seconds` is the estimated VO length of each beat. When Joseph records the real
 * voiceover, retime by replacing these with the actual per-line durations.
 */
import type { Beat, VideoMeta } from "./types";
import { DASHBOARD_URL } from "./funnel";

export const META: VideoMeta = {
  id: "ModelCredibility",
  title: "My model beats the spread 64%",
  angleType: "ats",
  lengthMode: "growth",
  ctaUrl: DASHBOARD_URL,
};

export const STATS = {
  highAts: 64.2,
  highWins: 380,
  highN: 592,
  wilsonLo: 60.2,
  breakEven: 52.4,
  seasonsFrom: 2018,
  seasonsTo: 2025,
} as const;

export const BEATS: Beat[] = [
  {
    id: "hook",
    seconds: 3.5,
    hook: true,
    // Qualified on purpose: 64.2% is HIGH-tier / top picks, NOT all picks. Dropping
    // "top picks" would overstate the stat in a video whose whole point is credibility.
    vo: "My NFL model beats the spread 64% — on its top picks.",
    caption: "My NFL model beats the spread 64% — on its top picks",
  },
  {
    id: "about",
    seconds: 6.5,
    vo: "I build machine-learning models for a living, so I built one for the NFL. Every call comes from the data — never a hot take.",
    caption: "Built by an ML engineer. Every call from the data.",
  },
  {
    id: "bar",
    seconds: 4.5,
    vo: "That number matters, because to actually make money betting the NFL, you only need to clear about fifty-two point four percent.",
    caption: "You only need 52.4% to profit",
  },
  {
    id: "gap",
    seconds: 5.0,
    vo: "Sixty-four versus fifty-two. That gap is the entire game — and most so-called experts never clear the line at all.",
    caption: "64 vs 52. That gap is everything.",
  },
  {
    id: "honest",
    seconds: 5.5,
    vo: "And this isn't cherry-picked. It's out-of-sample: the model was trained on past seasons, then tested on games it had never seen, from twenty-eighteen through twenty-twenty-five.",
    caption: "Out-of-sample. 2018–2025. Never-seen games.",
  },
  {
    id: "floor",
    seconds: 5.0,
    vo: "Almost six hundred picks. And even the pessimistic statistical floor still lands at sixty percent.",
    caption: "592 picks. Even the worst-case floor: 60%.",
  },
  {
    id: "cta",
    seconds: 4.0,
    cta: true,
    vo: "I'll be posting the model's highest-confidence picks every week. Follow so you don't miss them.",
    caption: "Highest-confidence picks, every week. Follow.",
  },
];
