/**
 * Build gate: scans every `*.data.ts` beat (vo + caption) for betting-promotion
 * language. The account funnels to my OWN product framed as analysis — never
 * "bet now", promo codes, guarantees, or sportsbook references. Exits non-zero on
 * any hit so it can block a render/publish.
 *
 *   npm run check:compliance
 */
import { discover } from "./_discover";

const BLOCKLIST: { re: RegExp; label: string }[] = [
  { re: /\bbet now\b/i, label: "call-to-bet" },
  { re: /\bplace (a |your )?bets?\b/i, label: "call-to-bet" },
  { re: /\b(promo|bonus) codes?\b/i, label: "promo code" },
  { re: /\brisk[-\s]?free\b/i, label: "risk-free claim" },
  { re: /\bguarantee(d|s)?\b/i, label: "guarantee" },
  { re: /\bcan'?t lose\b/i, label: "guarantee" },
  { re: /\block of the (day|week|night)\b/i, label: "hype pick" },
  { re: /\bsign[-\s]?up\b/i, label: "signup CTA" },
  { re: /\bdeposit\b/i, label: "deposit CTA" },
  {
    re: /\b(draftkings|fanduel|betmgm|caesars|pointsbet|bovada|espn bet|fanatics(?:\s+sportsbook)?|hard rock bet)\b/i,
    label: "sportsbook name",
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
    console.error("\nReframe as analysis/education. No betting-promotion language.\n");
    process.exit(1);
  }
  console.log("✓ compliance: no betting-promotion language found");
}

main();
