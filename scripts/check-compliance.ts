/**
 * Build gate: scans every `*.data.ts` beat (vo + caption) and enforces the
 * mechanically scannable items of the TikTok floor (see ../CONTENT_POLICY.md,
 * ruled 2026-07-13): item 1 (false-certainty language), item 2 (accuracy /
 * hit-rate / track-record claims — no public record exists yet), item 6
 * (gambling-promo language). Exits non-zero on any hit so it can block a
 * render/publish.
 *
 * Floor items 3–5 are MANUAL-AUDIT items, not scannable here: (3) takes are
 * Joseph's, never attributed to the validated model/board; (4) every stat
 * verified + sourced (per-stat table in the video's .data.ts header); (5) never
 * state the opposite of a published board finding. Audit them in script review.
 *
 * 2026-07-13 change: TikTok is now an opinion/takes surface (CONTENT_POLICY.md).
 * The old WEBSITE-side forbidden list was never part of this gate and is NOT
 * enforced on TikTok copy; it still binds all BettingEdgeContinued repo copy.
 * Kept here for website-side reference only:
 *   must-draft / lock (as a pick) / guaranteed / sleeper pick / steal / reach /
 *   target / avoid / buy / sell / fade / tier language / over-/under-/correctly-
 *   valued / accuracy or hit-rate claims / player-level or rookie-specific
 *   sub-group claims.
 * (On TikTok, take language from that list is now ALLOWED; certainty words and
 * record claims remain blocked below.)
 *
 *   npm run check:compliance
 */
import { discover } from "./_discover";

const BLOCKLIST: { re: RegExp; label: string }[] = [
  // ---- floor item 6: gambling-promo language ----
  { re: /\bbet now\b/i, label: "call-to-bet" },
  { re: /\bplace (a |your )?bets?\b/i, label: "call-to-bet" },
  { re: /\b(promo|bonus) codes?\b/i, label: "promo code" },
  { re: /\bsign[-\s]?up\b/i, label: "signup CTA" },
  { re: /\bdeposit\b/i, label: "deposit CTA" },
  {
    re: /\b(draftkings|fanduel|betmgm|caesars|pointsbet|bovada|espn bet|fanatics(?:\s+sportsbook)?|hard rock bet)\b/i,
    label: "sportsbook name",
  },
  // ---- floor item 1: false-certainty language ----
  { re: /\brisk[-\s]?free\b/i, label: "false certainty (risk-free)" },
  { re: /\bguarantee(d|s)?\b/i, label: "false certainty (guarantee)" },
  { re: /\bcan'?t lose\b/i, label: "false certainty (can't lose)" },
  { re: /\bcan'?t[-\s]miss\b/i, label: "false certainty (can't-miss)" },
  // generic "lock"/"locks" as a certainty noun; supersedes the old
  // "lock of the day" rule (still matched). "locked"/"unlock" don't match.
  { re: /\block(s)?\b/i, label: "false certainty (lock)" },
  // ---- floor item 2: record claims (no public record exists yet) ----
  {
    re: /\b(accuracy|hit[-\s]?rate|track[-\s]?record|win[-\s]?rate|winning percentage)\b/i,
    label: "record claim",
  },
];

async function main() {
  const violations: string[] = [];
  for (const v of await discover()) {
    for (const b of v.BEATS) {
      for (const field of ["vo", "caption"] as const) {
        const text = b?.[field];
        if (typeof text !== "string") continue;
        for (const rule of BLOCKLIST) {
          if (rule.re.test(text)) {
            violations.push(`${v.file} [${b.id}].${field} → ${rule.label}: "${text}"`);
          }
        }
      }
    }
  }

  if (violations.length) {
    console.error(`\n✗ compliance FAILED — ${violations.length} violation(s):`);
    for (const x of violations) console.error("   - " + x);
    console.error("\nTikTok floor violation — see CONTENT_POLICY.md (no false certainty, no record claims, no promo language).\n");
    process.exit(1);
  }
  console.log("✓ compliance: TikTok floor clean (certainty / record claims / promo)");
}

main();
