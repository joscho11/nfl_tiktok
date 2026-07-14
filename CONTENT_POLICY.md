# TikTok Content Policy — the two-surface split

**Ruled by Joseph, 2026-07-13.** This file is the source of truth for all TikTok copy in
this repo. It supersedes the TikTok-side application of the website content fence
(`betting-domain-reference` / the board's forbidden-language list). That fence remains
FULLY in force on the website surface — nothing loosens there.

## The two surfaces

| Surface | Where | Law |
|---|---|---|
| **WEBSITE** | `BettingEdgeContinued` repo: the Draft Board tab, READMEs, GUIDEs, PREREGISTRATION, Film Room copy + `video_breakdowns/*.md`, the content sourcing sheets — all repo copy | The existing content law, unchanged: disagreements described never verdicts, aggregate-only validation, full forbidden list, licensed labels verbatim |
| **TIKTOK** | `nfl_tiktok` repo: every `SCRIPT.md`, `*.data.ts` beat (`vo` + `caption`), rendered video, posted caption on @joscho_analytics | An OPINION/TAKES channel in my voice. Player-level takes, narratives, and draft opinions are allowed and are the point. This floor below is the only law. |

The website stays the no-spin reference layer; every TikTok CTA points at it. **Film Room
breakdown files live in the WEBSITE repo and follow website law**, even when they describe
a TikTok take video.

## The TikTok floor (not negotiable)

1. **No false-certainty language:** "guaranteed," "lock," "risk-free," "can't-miss."
2. **No accuracy / hit-rate / track-record claims** — no public record exists yet.
3. **Takes are MINE** ("I think / my read / I'm planting a flag"), **never attributed to
   the validated model or board.** The board's numbers may be *cited* (exactly); my
   opinion may never be dressed as the model's output.
4. **Every stat is real, verified, and sourced.** Wrong takes are fine; wrong facts are
   not. Board numbers, when cited, stay exact.
5. **Never state the opposite of a published board finding.** Omitting a finding is fine;
   denying it is not.
6. **No gambling-promo language:** sportsbook names, "bet now," bonus codes, deposit/
   signup CTAs.
7. **First-person singular voice** (I/my/me).

## What is now allowed on TikTok

Everything else on the old forbidden list, as my editorial voice: value / sleeper /
steal / buy / fade / target / reach / draft-him verdicts / tier talk / rookie opinions /
"the market is wrong" framings / player-level calls.

## The take-vs-model attribution rule (floor items 3 + 5, worked example)

**Stevenson (video 03).** The shipped board has his Gap at **+1** (projections RB27 vs
price RB28 — essentially no disagreement) and the pre-registered H7 test found elite
efficiency is **not predictive of market error**. Therefore:

- ALLOWED: "I think the committee fear is overpriced. That's my read, and I'm planting
  a flag on it." (Mine, clearly owned.)
- ALLOWED: "The board's range gives him a 212-point ceiling." (Citing a published board
  number, exactly.)
- FORBIDDEN: "My model says he's mispriced" / "the board flags him as a value" / "the
  numbers prove the market is wrong about him." (Attributes my take to the model; and
  for Stevenson specifically, the model says no such thing.)
- FORBIDDEN: "Efficiency like this predicts breakouts." (States the opposite of the
  published H7 null. Not mentioning H7 is fine; contradicting it is not.)

## Data discipline still binds (this policy loosens language, not research law)

A take may be sourced ONLY from (a) already-published board columns cited exactly, or
(b) locally verified descriptive facts. **No new signal-vs-outcome analysis may be
computed ad hoc to arm a take** — the research fences (one-shot tests, sealed seasons,
no unregistered joins) bind the data layer regardless of content surface. A stat that
would need fresh research or an outside pull goes on the script's
"wanted — needs Joseph's sourcing" list instead of being invented or approximated.

## Enforcement

- **Mechanical** (`npm run check` → `scripts/check-compliance.ts`, BLOCKS): floor items
  1, 2, 6 — certainty words, record-claim phrasing, promo terms.
- **Manual audit, every script session** (not mechanically scannable): floor items 3–5 —
  attribution clean, per-stat verification table (file + row for every number) in the
  video's `.data.ts` header, no board-finding contradiction.
- Item 7 (voice) is checked in script review.
