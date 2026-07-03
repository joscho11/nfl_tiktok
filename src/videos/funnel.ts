import type { Beat } from "./types";

/** My own product — the BettingEdge dashboard (from BettingEdgeContinued/CLAUDE.md). NOT a sportsbook. */
export const DASHBOARD_URL = "joschobetting.streamlit.app";

/**
 * STANDARD closing beat = follow-primary (see FollowCTA). On a cold-start account
 * a follow compounds; a link click doesn't. So every video defaults to this, with
 * the dashboard as a passive bio line. Use `funnelCtaBeat()` below only as an
 * OPT-IN on high-trust videos once the account has traction.
 */
export const followCtaBeat = (): Beat => ({
  id: "cta",
  seconds: 4,
  cta: true,
  vo: "I'll post the model's highest-confidence picks every week — follow so you don't miss them.",
  caption: "Top picks every week. Follow.",
});

/**
 * OPT-IN closing beat: analysis-framed funnel straight to my dashboard (FunnelCTA
 * visual). Reserve for videos where trust is already established — not the default,
 * because it trades the compounding follow for a one-and-done click. Deliberately
 * no "bet now" / odds-as-advice.
 */
export const funnelCtaBeat = (url: string = DASHBOARD_URL): Beat => ({
  id: "funnel-cta",
  seconds: 4,
  cta: true,
  vo: "The full model breakdown and this week's numbers are on my dashboard — link in bio.",
  caption: `Full breakdown → ${url}`,
});
