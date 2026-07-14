/**
 * Video 03 — "The most efficient back in football is priced like a backup" (TAKE).
 * REWRITTEN 2026-07-13 under CONTENT_POLICY.md (TikTok = opinion/takes surface).
 * The take is JOSEPH'S, never the model's: the board's Stevenson gap is +1 and H7
 * (efficiency -> market error) is null — the model does NOT call him mispriced, and
 * no line here may say or imply it does. The +1 gap is deliberately NOT cited.
 * Floor items enforced: no certainty words, no record claims, no promo language,
 * every stat exact + sourced below, first-person singular.
 *
 * PER-STAT VERIFICATION TABLE (all verified 2026-07-13 against the frozen shipped
 * artifacts in BettingEdgeContinued/fantasy/seasonal_projections/, read-only;
 * hashes unchanged: phase4_band 5727a65f…, talent_index e36b284e…):
 *   1. RYOE/att 1.361, 98th pctile, #1 of 45 qualified RBs
 *        talent_index_2026.csv, player_id 00-0036875: raw_value 1.361486,
 *        pct_among_2025_qualifiers 98.0, qualifier_flag True (45 of 54 RYOE/att
 *        rows qualified). NOT 51 — that was a stale session-record count.
 *   2. "Ahead of Derrick Henry" / spacing claim ("beat #2 by more than #2 beat #5")
 *        same file: #2 James Cook 1.174304, #3 Derrick Henry 1.118735,
 *        #5 De'Von Achane 1.029729. Gap #1-#2 = 0.187 > gap #2-#5 = 0.145.
 *   3. Price RB28 / ~pick 74 — board_adp_live_2026.csv (refreshed_at 2026-07-13):
 *        adp_half_ppr 73.7, adp_pos_rank 28. LIVE — RE-PULL day of final render.
 *   4. "Henderson three rounds earlier" — same overlay: TreVeyon Henderson (RB, NE,
 *        board row confirmed) adp 41.3 (RB19) = round 4 vs Stevenson 73.7 = round 7
 *        (12-team rounds: 41 -> R4, 74 -> R7). LIVE — re-pull with #3.
 *   5. 212-point ceiling — phase4_band_2026.csv p90 = 212.0 (the band is MY
 *        validated contribution; the point estimate under it is the market's).
 *   6. "≈ an RB12 season" — rank_equiv_reference.csv, RB finish_rank 12 mean_pts
 *        212.5 (the board's own display-units table; nearest to 212.0).
 *   7. "The market paid a third-round pick for him in 2023" —
 *        season_dataset_2014_2026.csv, player 00-0036875, season 2023:
 *        adp_half_ppr 31.8 (~pick 32 = round 3, 12-team). 2026: 73.7 (~round 7).
 *
 * WANTED — NEEDS JOSEPH'S SOURCING (not locally verifiable; NOT used in this cut):
 *   - Historical outcomes of past elite-RYOE backs ("backs like this usually…") —
 *     FENCED: an unregistered efficiency-vs-outcome join (CONTENT_POLICY.md data-
 *     discipline section); needs Joseph's ruling/source, never computed ad hoc.
 *   - Henderson's 2025 NFL draft capital (round/pick) — not in the local artifacts.
 *   - Stevenson 2025 attempts/snap share (the "130 attempts" figure is session
 *     record, not on any artifact).
 *   - Stevenson's actual fantasy finishes by season (no actual-points column
 *     surfaced in the season dataset's ADP block).
 *
 * CAPTIONS ARE PLACEHOLDERS — re-sync verbatim to Joseph's recorded VO (Whisper)
 * before final render. `seconds` are estimates pending measured clips.
 * Composition + Root.tsx registration (with guardLength) happen NEXT session after
 * Joseph ratifies.
 */
import type { Beat, VideoMeta } from "../shared/types";
import { DASHBOARD_URL } from "../shared/funnel";

export const META: VideoMeta = {
  id: "RhamondreStevenson",
  title: "The most efficient back in football is priced like a backup",
  angleType: "player-take",
  lengthMode: "growth",
  ctaUrl: `${DASHBOARD_URL}/draft-board`,
};

export const STATS = {
  // talent_index_2026.csv (frozen)
  ryoePerAtt: 1.361,
  effPctile: 98,
  effRank: 1,
  qualifiedRbs: 45,
  ryoeNo2Cook: 1.174,
  ryoeNo3Henry: 1.119,
  ryoeNo5Achane: 1.03,
  // live overlay 2026-07-13 — RE-PULL before render
  adpPosRank: 28,
  adpOverall: 73.7,
  hendersonAdp: 41.3,
  hendersonPosRank: 19,
  adpAsOf: "2026-07-13",
  // phase4_band_2026.csv (frozen) + rank_equiv_reference.csv
  ceilingP90: 212,
  ceilingEquiv: "RB12",
  // season_dataset_2014_2026.csv (frozen market history)
  adp2023: 31.8,
} as const;

export const BEATS: (Beat & { audio: string })[] = [
  {
    id: "hook",
    audio: "hook",
    seconds: 7,
    hook: true,
    vo: "Last season, Rhamondre Stevenson gained more rushing yards over expected per carry than any qualified running back in football. Number one — out of forty-five. Ahead of Derrick Henry.",
    caption: "RYOE per carry: #1 of 45 qualified RBs (2025)",
  },
  {
    id: "fear",
    audio: "fear",
    seconds: 6,
    vo: "So why is he going twenty-eighth at the position, pick seventy-four? One word: Henderson. The market's priced the committee fear all the way in — TreVeyon Henderson goes three rounds earlier.",
    caption: "The fear: the committee. Henderson 3 rounds earlier. Stevenson RB28.",
  },
  {
    id: "flag",
    audio: "flag",
    seconds: 5,
    vo: "My read? That fear is overpriced. This is my talent pick of draft season, and I'm planting the flag right here.",
    caption: "My read: the fear is overpriced. Flag planted.",
  },
  {
    id: "case",
    audio: "case",
    seconds: 10,
    vo: "My case. One — it wasn't close: he beat the number-two back by more than number two beat number five. Two — my calibrated range, which already prices him as a committee back, still tops out at two hundred twelve points. That's an RB-twelve season if he hits the ceiling. Three — the market itself paid a third-round pick for this exact player in twenty twenty-three. Now he costs a seventh.",
    caption: "Beat #2 by more than #2 beat #5 · 212-pt ceiling ≈ RB12 · a 3rd-rounder in 2023",
  },
  {
    id: "stake",
    audio: "stake",
    seconds: 5.5,
    vo: "Honest part: I'll get some of these wrong — that's what takes are. The committee risk is real, and if the split goes sideways this ages badly. But elite per-carry talent at a discount price? I'm standing on it.",
    caption: "I'll get some wrong. Not backing off this one.",
  },
  {
    id: "cta",
    audio: "cta",
    seconds: 6.5,
    cta: true,
    vo: "That's my take. The raw numbers with none of my spin — the ranges, the percentages, every caveat — are free on my board: joschoanalytics dot streamlit dot app, slash draft board. Link in bio. Follow for the next flag.",
    caption: "No-spin numbers: joschoanalytics.streamlit.app/draft-board",
  },
];

/** Estimated total ~40s (growth). Retime to measured clips after VO. */
export const RHAMONDRE_ESTIMATED_SECONDS = BEATS.reduce((s, b) => s + b.seconds, 0);
