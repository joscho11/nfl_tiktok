/**
 * Video 03 — Rhamondre Stevenson (TAKE). Deep-dive rewrite 2026-07-14.
 * The take is JOSEPH'S ("price overcorrected," "the better runner") — never the
 * model's. The board's Stevenson gap is +1 and it never calls him underpriced;
 * that is deliberately uncited. The honest counter (Henderson outproduced him)
 * is a REQUIRED beat, not optional (CONTENT_POLICY.md floor + §A invariant 3).
 * Floor enforced: no certainty words, no record claims, no promo, first-person.
 *
 * PER-STAT VERIFICATION (all verified 2026-07-14, read-only, local sources):
 *  NGS 2025 — nfl.load_nextgen_stats(2025,"rushing"), the board's own source:
 *   1. Stevenson RYOE/att +1.361486, #1 of 45 qualified (98th %ile), 130 att.
 *      talent_index_2026.csv (=NGS rush_yards_over_expected_per_att). Runners-up:
 *      Cook 1.174, Henry 1.119, Dobbins 1.081, Achane 1.030.
 *   2. Stevenson expected 427 rush yds vs actual 603 = +176 over expected (130 att).
 *      Henderson expected 741 vs actual 911 = +170 over expected (180 att) — so
 *      per carry Stevenson +1.35 vs Henderson +0.94.
 *   3. 8+ defender box: Stevenson 31.5% of carries vs Henderson 30.6% (as loaded).
 *      avg time to LOS: Stevenson 2.68s vs Henderson 2.92s (quicker to the hole).
 *  raw_dataset.csv 2025 game logs (weekly, verified):
 *   4. Stevenson: 14 gm, 130 car, 603 rush yds, 4.64 ypc, 7 rush TD, 2 fum lost,
 *      32/37 rec 345 yds, 146.8 std fpts. Missed wk 9/10/11/14 (~a month).
 *   5. Henderson: 17 gm, 180 car, 911 rush yds, 5.06 ypc, 9 rush TD, 1 fum lost,
 *      35/42 rec 221 yds, 171.2 std fpts. Out-carried/out-gained/out-scored Stevenson.
 *   6. NE backfield carries 2025: Henderson 180, Stevenson 130 (rookie won the job;
 *      Henderson led wk 9-11 while Stevenson was out and stayed ahead late).
 *   7. Stevenson career ypc: '21 4.56 · '22 4.95 (210 car/1040 yd/69 rec — bell-cow) ·
 *      '23 3.97 · '24 3.87 (down year, 3 fum) · '25 4.64 (bounce-back).
 *  phase4_band_2026.csv (frozen): P10 58 / P50 133 / P90 212; rank_equiv RB12=212.5.
 *  Drake Maye 2025 (raw_dataset + talent_index): 4394 pass yds, 31 TD/8 INT,
 *   450 rush yds, +165 pass EPA, CPOE 9.14 = 97.6th %ile.
 *  board_adp_live_2026.csv (LIVE 2026-07-13 — RE-PULL day of render): Stevenson
 *   adp 73.7 / RB28; Henderson adp 41.3 / RB19; Stevenson 2023 adp 31.8 (season_dataset).
 *
 * WANTED — NEEDS JOSEPH'S SOURCING (not local; NOT used until supplied):
 *   - Henderson's 2025 NFL draft round/pick (referenced only as "the rookie"/"younger").
 *   - A league percentile for time-to-LOS (I only have Stevenson-vs-Henderson).
 *   - Exact per-game snap share (raw has snap_pct_roll3 only).
 *   - Any 2026 camp / beat-writer read on the timeshare (off-board news).
 *
 * ANALYST NOTE FOR JOSEPH: the data LEANS AGAINST this take. Henderson beat
 * Stevenson on every counting stat in 2025 and owns the job trend, so "the fear is
 * overpriced" is genuinely contrarian, not an obvious market miss. Kept as a
 * take with a strong, honest counter (frame 4). A pivot (Henderson angle, or a
 * "NE backfield the market has wrong" angle) is on the table — your call.
 *
 * CAPTIONS ARE PLACEHOLDERS — re-sync verbatim to recorded VO. seconds are estimates.
 */
import type { Beat, VideoMeta } from "../shared/types";
import { DASHBOARD_URL } from "../shared/funnel";

export const META: VideoMeta = {
  id: "RhamondreStevenson",
  title: "The most efficient back in football is a 7th-round afterthought",
  angleType: "player-take",
  lengthMode: "growth",
  ctaUrl: `${DASHBOARD_URL}/draft-board`,
};

export const STATS = {
  // NGS 2025 (frozen board source)
  ryoePerAtt: 1.361, effRank: 1, qualifiedRbs: 45, effPctile: 98,
  expYds: 427, actYds: 603, overExp: 176, carries: 130,
  boxStacked: 31.5, timeToLos: 2.68, timeToLosHend: 2.92,
  // Henderson 2025
  hendCarries: 180, hendYds: 911, hendTds: 9, hendFpts: 171.2, hendRyoe: 0.846,
  stevTds: 7, stevFpts: 146.8, stevGames: 14,
  // market (live — re-pull)
  adpPosRank: 28, adpOverall: 73.7, hendPosRank: 19, hendAdp: 41.3, adp2023: 31.8,
  adpAsOf: "2026-07-13",
  // range + offense
  ceilingP90: 212, ceilingEquiv: "RB12", expectedP50: 133, floorP10: 58,
  mayeTds: 31, mayeInts: 8, mayeCpoePctile: 97.6,
} as const;

// VO de-slopped 2026-07-14 (stop-slop pass): killed the "not X, that's Y" flip,
// the rule-of-three, the pull-quote enders, and the stacked em-dashes; kept the
// spoken rhythm. Facts + fence unchanged.
export const BEATS: (Beat & { audio: string })[] = [
  {
    id: "hook",
    audio: "hook",
    seconds: 7,
    hook: true,
    vo: "Last year the most efficient running back in football, by yards over expected per carry, wasn't Derrick Henry or Bijan Robinson. It was Rhamondre Stevenson. First out of forty-five.",
    caption: "Most efficient RB in football, 2025: #1 of 45, RYOE/carry",
  },
  {
    id: "why",
    audio: "why",
    seconds: 12,
    vo: "And he earned it. A third of his carries ran into a stacked box, eight defenders or more, the same wall the rookie behind him saw. Stevenson hit the hole quicker and made more of it. A hundred seventy-six yards over what his blocking gave him, and most per carry in the league.",
    caption: "176 yds over expected. Most per carry in the NFL.",
  },
  {
    id: "tension",
    audio: "tension",
    seconds: 10,
    vo: "So why is he the twenty-eighth back off the board, three rounds after his own teammate? One reason: TreVeyon Henderson. The rookie out-carried him one-eighty to one-thirty last season and outscored him while Stevenson missed a month. Drafters are paying for the carries.",
    caption: "RB28. Henderson out-carried him 180 to 130.",
  },
  {
    id: "flag",
    audio: "flag",
    seconds: 7,
    vo: "My read: drafters are chasing the carries and forgetting who the better runner is. RB28 is too cheap for that guy. I'm planting my flag on Stevenson.",
    caption: "My read: RB28 is too cheap.",
  },
  {
    id: "otherside",
    audio: "otherside",
    seconds: 10,
    vo: "Now, I could be wrong, and I won't hide it. Henderson was the more productive back last season, and he's younger. If New England just hands him the job, this take falls apart. I'm buying the talent and the price, and I'll live with the risk.",
    caption: "The catch: Henderson outproduced him in 2025.",
  },
  {
    id: "cta",
    audio: "cta",
    seconds: 9,
    cta: true,
    vo: "But you're paying backup money for the most efficient runner in the league, on a Drake Maye offense that just took a real jump. My board gives him an RB12 ceiling. The whole range and every caveat, none of my spin, are all on there. Link's in my bio. Follow for the next flag.",
    caption: "Full range, no spin: joschoanalytics.streamlit.app/draft-board",
  },
];

/** Estimated ~55s (house pacing 30–60s; the lint's growth 20–40 window warns only). */
export const RHAMONDRE_ESTIMATED_SECONDS = BEATS.reduce((s, b) => s + b.seconds, 0);
