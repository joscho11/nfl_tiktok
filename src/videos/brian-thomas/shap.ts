/**
 * SHAP feature contributions for Brian Thomas Jr.'s 2026 projection.
 * Source: BettingEdgeContinued/fantasy/seasonal_projections/models/wr_ppg_model.pkl
 * (shipped LightGBM Model A), `booster_.predict(pred_contrib=True)` on his
 * season_dataset_2014_2026 row. Units = half-PPR points-per-game; base = average
 * drafted WR. Contributions sum from base to projection: 4.89 + Σ = 10.49.
 */
export const SHAP = {
  base: 4.89,
  projection: 10.49,
  drivers: [
    { label: "2-year scoring avg (10.9 PPG)", feature: "ppg_2yr", impact: 1.49 },
    { label: "1st-round pedigree (#23)", feature: "draft_pick", impact: 0.79 },
    { label: "Age — only 23", feature: "age", impact: 0.72 },
    { label: "Down year still counts (114.8)", feature: "prior_half_ppr", impact: 0.49 },
    { label: "Full-time role (78% snaps)", feature: "prior_snap_share_pg", impact: 0.43 },
    { label: "Sophomore dip ignored", feature: "ppg_trend", impact: 0.37 },
    { label: "Team pace (fewer plays)", feature: "prior_team_plays", impact: -0.23 },
  ],
} as const;
