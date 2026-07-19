/**
 * Video 03 — Jordyn Tyson ("my board is wrong" build, chart-driven). Rewritten 2026-07-18.
 * Spine: hook (neutral setup) → board disagreement (87 resume vs WR36 projection) → Tyson's
 * talent → competition (2025 Olave = volume not talent) → risk (bad Saints offense) →
 * two-sided tally + first-person FLAG → comment-CTA. The take is JOSEPH'S (floor 3). Board
 * numbers cited exactly (floor 4). Stadium = "the Superdome" — NEVER "caesars" (gate blocks).
 *
 * OMISSION NOT DENIAL (both bind): NO sentence claims the rookie score PREDICTS the NFL, and
 * no disclaimer either; validation story omitted. The 87 is a descriptive COLLEGE-RESUME grade
 * cited as a PRO; the WR36 is SLEEPER'S projection, NOT Joseph's forecast — the board's own
 * prior-stats model was measured NOT to beat the market (H4 FAIL), so the point forecast is
 * Sleeper's and what's proprietary is the calibrated band + the ADP-vs-projection disagreement.
 * VO attributes the projection to Sleeper and never says "my projection" (that would overclaim).
 *
 * METRIC LABEL (Joseph, 2026-07-18): the college dominance stat is "SHARE OF TEAM'S RECEIVING
 * YARDS," peak season, YARDS ONLY (TDs excluded — fluky). NOT "dominator," NOT "offense
 * carried." This is a fresh compute (rec_yds_share max), distinct from the board's internal
 * z_dom_best (yds+TD): Tyson peak yardage share = 0.356 (≠ old dominator 0.306).
 *
 * VO passed through STOP-SLOP (no em-dash crutches, throat-clearing, adverb filler).
 * RETIRED NUMBERS — FORBIDDEN in this dir: 0.000, n=278, 0.376, 93.4, 86.4, .385, .086, .028.
 *
 * PER-STAT VERIFICATION (verified 2026-07-18):
 *  BOARD (committed artifacts):
 *   1. rookie_score_2026.csv (blob 57b5b6c5): Tyson 87.0/100, rank 1/16 WR (highest of ANY
 *      2026 rookie). board_adp_live_2026.csv (id 00-0041029, refreshed 2026-07-18): price WR32,
 *      value_gap −4 → proj WR36 (apply_board_labels.py:85). phase4_band: p_top12 0.047 (~1-in-20).
 *      PROJECTION PROVENANCE: phase4_band_2026.csv estimate_source=sleeper, powered_by "Sleeper's
 *      projections vs the draft market" → WR36 = Sleeper's point projection. ADP (WR32) = live
 *      Sleeper draft position (refresh_board_adp.py "re-pulls LIVE Sleeper ADP"). Two different
 *      Sleeper products: ADP = where drafters pick; projection = Sleeper's algorithmic forecast.
 *  TALENT — "SHARE OF TEAM'S RECEIVING YARDS," peak college season (rec_yds_share max;
 *  college_production_2014_2024.csv + college_production_2025_cache.csv):
 *   2. Tyson 0.356 = #1 of 16 in the 2026 rookie WR class (next: Bell .335, Concepcion .330).
 *   3. Recent WR prospects (C2 reference bars/tidbits): T.McMillan .445, G.Wilson .414,
 *      Tyson .356, Nabers .349, London .334, Jefferson .306, Chase .254, Nacua .240.
 *      => Tyson out-carried Jefferson/Chase/Nacua as prospects; Chase & Nacua are the low
 *      outliers who became stars anyway (shared loaded rooms — the "not destiny" tidbit).
 *   4. Contested-catch 67% (2024) + route/hands 9/10 — PFF/ArizonaSports (external, VERIFY).
 *  COMPETITION — OLAVE 2025 NFL vs 71 WRs (≥70 tgt), nflverse NGS+PBP 2025:
 *   5. Air-yards share 39.3% = rank 3/71 (elite volume/role; leaders JSN 48.6, McMillan 44.5).
 *   6. Avg separation 2.95 = rank 38/71 (middle; leader Engram 4.58; worst Tee Higgins 1.83).
 *   7. YAC-over-expected −0.52 = rank 67/71 = 5th-WORST (leaders Metcalf 2.81, Pickens 2.16;
 *      worst Kyle Pitts −0.88). => VOLUME (3rd) vs TALENT (67th) split. PFF grade 79.7 (good).
 *   8. Vacancy: no other Saints WR cleared 500 rec yds in 2025 (Vele 293 top returning behind
 *      Olave; Shaheed 499 TRADED). (nflverse 2025.)
 *  RISK — SAINTS OFFENSE, SHOUGH GAMES (10 g, wks 8-10/12-18), nflverse PBP 2025 vs 32 teams:
 *   9. EPA/play −0.089 = 28th; success 41.2% = 29th; points 18.1/g = 28th; explosive 4.1% = 30th;
 *      pass EPA/DB −0.047 = 27th. Lone bright spot 3rd-down 41.5% = 13th; RZ TD 34.4%. Did NOT
 *      improve vs pre-Shough (EPA/play ≈ −0.09 both). Shough-led record 5-5 (NOT 5-6). League
 *      EPA context (C4): top LA +0.145 / BUF +0.138; bottom LV −0.215 / CLE −0.190.
 *  10. Tyson hamstring limited him to 9 games in 2025; skipped the 40 at the combine (benched 26).
 *
 * ===== RE-VERIFY DAY OF RENDER =====
 *   R1. Board price WR32 / gap −4 / proj WR36 / p_top12 — board_adp_live refreshes DAILY.
 *   R2. External Tyson stats (contested 67%, route/hands grades) — re-locate.
 *   R3. Tyson health tag; Saints WR depth chart (a veteran WR addition changes beat 4).
 *   R4. Live-board spot-check: Tyson still 87 / rank 1 on the site.
 *
 * ANALYST NOTE (video omits; note may not):
 *   (a) OLAVE STILL GOOD — PFF grade 79.7, 1,163 yds. "Volume not talent" is about per-snap
 *       separation/YAC only, not "Olave is bad."
 *   (b) YARDAGE-SHARE CONFOUND: Chase/Nacua (and college-Olave) posted low shares partly from
 *       loaded rooms; C2's low outliers double as the honest "not destiny" hedge.
 *   (c) Shough talent score 65.7 rank 24/31 — CUT; offense beat uses team EPA/explosive ranks.
 *   (d) Full-season 2025 Olave YPRR + contested rate are PFF-paywalled — not cited.
 *   (e) Rookie score is DESCRIPTIVE; cited only as a resume-grade PRO, never a forecast.
 *
 * FOOTAGE MANIFEST — WANTED (college + Saints; college broadcast = ESPN/conference content-ID,
 * Joseph owns the risk). Chart beats render bars over the brand bg — NO footage required.
 * STRIKE-PROOF FALLBACK: the whole video renders charts-over-brand-background.
 *
 * CHARTS (bars only — Bar / BarCompare; each seeded with expected-high, expected-low, outliers):
 *   C1 (board): two-number split — ROOKIE BOARD #1 (87) vs PROJECTION WR36 (market WR32).
 *   C2 (talent): "Share of team's receiving yards — peak college season." Bars (Tyson HL):
 *       McMillan .445 · G.Wilson .414 · TYSON .356 · Nabers .349 · London .334 · Jefferson .306
 *       · Chase .254 · Nacua .240. Tidbit: Chase/Nacua low outliers → "great WRs; not destiny."
 *   C3 (competition): Olave 2025 rank among 71 WRs on 3 bars — air-yards share 3rd (green,
 *       "role/volume") · separation 38th (grey) · YAC-over-expected 67th (red, "talent").
 *       Ref names: JSN tops air share; Metcalf tops YAC-oe; Kyle Pitts worst YAC-oe.
 *   C4 (risk): EPA/play by team (of 32), Saints-with-Shough 28th HL near basement. Top LA/BUF,
 *       bottom LV/CLE. PLUS the metric TABLE on screen: EPA 28th · success 29th · points 28th ·
 *       explosive 30th · 3rd-down 13th · RZ TD 34%.
 * CAPTIONS ARE PLACEHOLDERS — re-sync to Joseph's exact VO before final render.
 * `seconds` are ESTIMATES — retime to recorded VO. No runtime target; warnings accepted.
 */
import type { Beat, VideoMeta } from "../shared/types";
import { DASHBOARD_URL } from "../shared/funnel";

export const META: VideoMeta = {
  id: "JordynTyson",
  title: "Jordyn Tyson: my board is wrong",
  angleType: "rookie-advocacy",
  lengthMode: "growth", // label only — no runtime target (Joseph's ruling)
  ctaUrl: DASHBOARD_URL,
};

export const STATS = {
  // board
  tysonScore: 87.0, tysonRank: 1, projRank: "WR36", priceRank: "WR32", valueGap: -4,
  pTop12: 0.047,
  // talent — share of team's receiving yards, peak college season (C2)
  tysonYardShare: 0.356,
  mcmillanShare: 0.445, gwilsonShare: 0.414, nabersShare: 0.349, londonShare: 0.334,
  jeffersonShare: 0.306, chaseShare: 0.254, nacuaShare: 0.240,
  contestedCatch2024: "67%",
  // competition — Olave 2025 NFL ranks among 71 WRs (C3)
  olaveAirRank: 3, olaveSepRank: 38, olaveYacRank: 67, olavePool: 71, olaveYds2025: 1163,
  // risk — Saints offense, Shough games, ranks of 32 (C4)
  offEpaRank: 28, offExplosiveRank: 30, offPointsRank: 28, offPtsPerG: 18.1,
  // context
  draftSlot: "NO R1 P8",
} as const;

export const BEATS: (Beat & { audio: string })[] = [
  {
    id: "hook",
    audio: "hook",
    seconds: 12,
    hook: true,
    vo: "New Orleans spent the eighth overall pick on Jordyn Tyson. My board has him down at the thirty-sixth receiver. Let's break down that gap.",
    caption: "8th overall pick. My board: WR36. Let's break down the gap.",
  },
  {
    id: "board",
    audio: "board",
    seconds: 22,
    vo: "Tyson has the highest rookie score of any twenty twenty-six prospect: eighty-seven out of a hundred. That score is pure college production, how much of his team's passing game ran through him and how efficient he was. On the other side is the projection. I don't pretend to out-forecast the market, so my board runs on Sleeper's projection with an honest range around it, and that has him at receiver thirty-six, below where drafters are taking him. Elite resume, cold forecast. So which do you trust? Let me walk you through it.",
    caption: "Rookie #1 (87/100) vs Sleeper's projection: WR36. Elite resume, cold forecast.",
  },
  {
    id: "talent",
    audio: "talent",
    seconds: 24,
    vo: "Is the player real? Yeah. Look at the share of his team's receiving yards that ran through him at his peak. Nobody in his draft class touched it. And as a college producer, he carried a bigger chunk of his offense than Justin Jefferson or Ja'Marr Chase did coming out. Pair that with a sixty-seven percent contested-catch rate and elite route grades, and the profile is special.",
    caption: "Peak team-yardage share: #1 in his class, above Jefferson & Chase. 67% contested.",
  },
  {
    id: "competition",
    audio: "competition",
    seconds: 26,
    vo: "So who's in his way? One guy: Chris Olave. Last season he piled up eleven hundred yards, but look closer and that's volume, not dominance. In the whole league, he ranked third in share of his team's air yards. But he was middle of the pack at getting open, and one of the five worst receivers in football at creating after the catch. Volume, not talent. And behind him? Nobody else on the roster cleared five hundred yards. Tyson isn't stuck behind a star. He's walking into an open door.",
    caption: "2025 Olave: 3rd in air-yards share, but 5th-worst after the catch. Volume, not talent.",
  },
  {
    id: "risk",
    audio: "risk",
    seconds: 24,
    vo: "Now the part that worries me. Don't be fooled by a better record down the stretch. The Saints offense was just as broken with Tyler Shough as it was without him. In his ten games, they ranked twenty-eighth in the league in efficiency and thirtieth in explosive plays, scoring about eighteen points a game. Tyson also carries an injury history. A hamstring nagged him most of last season, and he skipped the forty at the combine. That's the honest case against him.",
    caption: "The risk: bottom-5 Saints offense (28th, 30th), plus a hamstring history.",
  },
  {
    id: "verdict",
    audio: "verdict",
    seconds: 27,
    vo: "So let's tally it. For him: the biggest college workload in his class, my number-one rookie grade, one volume receiver as his only real competition, and a wide-open target tree. Against him: a bottom-five offense, a projection screaming receiver thirty-six with barely a one-in-twenty shot at a top-twelve season, and the usual rookie risk behind a veteran. Weigh it, and I still come out well ahead of my own board. I'm not taking Jordyn Tyson at thirty-six. I'm taking him as a mid-range starter with league-winning upside. That's my flag.",
    caption: "Add it up: I land well ahead of WR36. Mid-range starter, league-winning upside.",
  },
  {
    id: "cta",
    audio: "cta",
    seconds: 15,
    cta: true,
    vo: "That's my case. Do you side with me, or with my board? Drop a comment on who I should break down next, and follow so you don't miss it. The full board, every number I just cited, lives on my site. Link's in my bio.",
    caption: "Agree, or is my board right? Comment your next breakdown. Board in bio.",
  },
];

/** Estimated sum of beat seconds (retime to recorded VO). */
export const JORDYN_ESTIMATED_SECONDS = BEATS.reduce((s, b) => s + b.seconds, 0);
