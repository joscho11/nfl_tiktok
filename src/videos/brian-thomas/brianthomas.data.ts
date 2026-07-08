/**
 * Video — "The market is wrong about Brian Thomas Jr." (player value profile).
 *
 * Every stat verified against BettingEdge + nflverse (NGS / PBP / player stats):
 *   value board  : fantasy/seasonal_projections/value_board_2026.csv (our WR17; +value vs ADP; Sleeper agrees)
 *   trajectory   : fantasy/raw_dataset.csv
 *                  2024 rookie: 1282 yds / 10 TD / 65.4% catch / WOPR .636 / sep 3.04 (above avg)
 *                  2025 soph:   707 yds / 2 TD / 52.7% catch (7th pctile) / WOPR .511 (82nd pctile)
 *   NGS/PBP 2025 : separation 2.66 (24th pctile); intended air yards 11.4->14.2 (deeper);
 *                  deep-target share 72nd pctile; DEEP CATCH just 6/23 = 26% (below ~35% league)
 *   QB context   : Lawrence 2025 deep comp% 38.8% (ABOVE league median 34.7) — the "can't throw
 *                  deep" narrative is FALSE; the deep struggles were BTJ-specific (drops/separation).
 *                  Lawrence CPOE -2.05 = a down passing year overall (fair falling-tide context).
 *   depth chart  : JAX WR1 (Meyers WR3, Hunter WR4 — Hunter two-way) — BTJ is the alpha.
 *   SHAP         : ./shap.ts (base 4.9 -> proj 10.5; #1 driver = 2-yr scoring avg)
 *   analog       : Brandon Aiyuk 2020-22 (12.9->7.1->9.4 PPG), then broke out
 *   market       : Sleeper ADP WR31 as of Jul 7 (was WR37 Jun 15 — already correcting). RE-PULL before render.
 *
 * Full-screen footage (public/brian-thomas/clip1.mp4, muted) + charts on a dark scrim.
 * CAPTIONS ARE PLACEHOLDERS — re-sync to Joseph's exact VO before final render.
 */
import type { Beat, VideoMeta } from "../shared/types";
import { DASHBOARD_URL } from "../shared/funnel";

export const META: VideoMeta = {
  id: "BrianThomas",
  title: "The market is wrong about Brian Thomas Jr.",
  angleType: "player-value",
  lengthMode: "rewards",
  ctaUrl: DASHBOARD_URL,
};

export const STATS = {
  // trajectory
  rookieYards: 1282, rookieTds: 10, rookieCatch: 65.4, rookieSep: 3.04, rookieWopr: 0.636,
  sophYards: 707, sophTds: 2, sophCatch: 52.7, sophSep: 2.66,
  ptsDropPct: 52, tgtShareRookie: 25.5, tgtShareSoph: 19.3,
  // talent / role (2025 percentiles among WRs)
  woprPctile: 82, deepSharePctile: 72,
  // hands / deep-ball
  catchPctile: 7, leagueCatch: 66, sepPctile: 24,
  deepTargetsSoph: 23, deepCatchSoph: 26, leagueDeepCatch: 35,
  intAyRookie: 11.4, intAySoph: 14.2,
  // QB split (2024-25, BTJ production by passer) — the centerpiece insight
  jonesGames: 10, jonesYpg: 70.2, jonesCatch: 67.5, jonesHalfPpg: 12.7,
  lawrenceGames: 25, lawrenceYpg: 52.3, lawrenceCatch: 56.1, lawrenceHalfPpg: 8.8,
  // career context (PBP, on each QB's throws)
  jonesTypicalWr1Ypg: 52,           // Meyers 52.6/54.5, Bourne 48.2 — BTJ (70.2) was Jones's best ever
  lawrenceKirkYds: 1223, lawrenceRidleyYds: 967, lawrenceRidleyAdot: 13.6,
  lawrenceWashington2025Yds: 954,   // Lawrence's 2025 WR1 was Washington, not BTJ
  // JAX depth chart
  depthBtj: "WR1", depthMeyers: "WR3", depthHunter: "WR4",
  // model + market. adpRank is LIVE Sleeper ADP (drifts) — re-pull before final render.
  ourRank: 17, adpRank: 31, adpAsOf: "Jul 7", adpRankRookie: 10, projPpg: 10.5, basePpg: 4.9,
} as const;

/**
 * 8 beats, timed to Joseph's recorded per-section audio (public/brian-thomas/*.m4a).
 * `seconds` = each chunk's measured length; `audio` = its file basename. Total ~107s.
 * Captions are concise summaries of what he says (offer: switch to verbatim subtitles).
 */
export const BEATS: (Beat & { audio: string })[] = [
  {
    id: "hook",
    audio: "hook",
    seconds: 7.26,
    hook: true,
    vo: "Football's over a month away, but it's never too early for a player deep dive. Let's take a look at Brian Thomas Jr.",
    caption: "Player deep dive: Brian Thomas Jr.",
  },
  {
    id: "panic",
    audio: "panic",
    seconds: 14.86,
    vo: "As a rookie, BTJ was a top-ten fantasy receiver. Then as a sophomore, his production dropped by over 50% — and drafters are panicking, dropping him from a top-ten pick to the 31st receiver off the board. My model has him at wide receiver 17.",
    caption: "Rookie WR10 → drafted WR31. My model: WR17.",
  },
  {
    id: "disconnect",
    audio: "disconnect",
    seconds: 11.82,
    vo: "But here's what they're missing. His fantasy points fell 52% — but his share of the targets barely moved. He wasn't benched. He's still a full-time and an explosive downfield weapon.",
    caption: "Points fell 52% — but his target share barely moved.",
  },
  {
    id: "tdregression",
    audio: "td_regression",
    seconds: 16.20,
    vo: "So you might ask, where did the points go? The answer: touchdowns. He went from ten scores as a rookie to just two as a sophomore, while maintaining the same air yards. And touchdown rate is one of the flukiest, most bounce-back stats in all of football. The market is treating bad luck like a real decline.",
    caption: "10 TDs → 2, on the same air yards. That's fluke, not decline.",
  },
  {
    id: "qbsplit",
    audio: "qb_split",
    seconds: 20.78,
    vo: "Looking back at his first two seasons — with Mac Jones, BTJ played like a top-12 receiver. With Trevor Lawrence he has been a WR3. I'm betting that is a fluke — BTJ had the best statistical output for a receiver in Mac Jones's entire career. Meanwhile Lawrence has fed a 1,000-yard deep threat before, in Calvin Ridley.",
    caption: "By QB: Mac Jones top-12, Lawrence WR3. Betting it's a fluke.",
  },
  {
    id: "shap",
    audio: "model",
    seconds: 14.86,
    vo: "My model reinforces these points. It doesn't overreact to one down year — the elite rookie season still counts. Add first-round pedigree, a full-time role, his age-23 season, and lackluster competition for targets behind him, and BTJ is a clear value.",
    caption: "Model agrees: rookie year counts, WR1 role → clear value.",
  },
  {
    id: "verdict",
    audio: "verdict",
    seconds: 10.78,
    vo: "So here's the edge: a WR31 price for a top-17 projection — a 6th-round dart with a 2nd-round ceiling. The risk is real, but it's already baked in.",
    caption: "WR31 price. WR17 projection. 2nd-round ceiling.",
  },
  {
    id: "cta",
    audio: "cta",
    seconds: 5.04,
    cta: true,
    vo: "Follow for more sports analytics, and check out my site for the full breakdown.",
    caption: "Follow for the analytics. Full breakdown on my site.",
  },
];

/** Silence before the first word so the open doesn't feel abrupt. */
export const LEAD_IN_SECONDS = 0.5;
/** A natural breath held after each section so the separately-recorded chunks don't butt together. */
export const INTER_BEAT_GAP = 0.15;

export const BRIANTHOMAS_DURATION_SECONDS =
  LEAD_IN_SECONDS + BEATS.reduce((s, b) => s + b.seconds, 0) + INTER_BEAT_GAP * BEATS.length;
