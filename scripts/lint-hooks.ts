/**
 * Warns (doesn't fail) on structural weaknesses per video:
 *   - beat 1 not flagged { hook: true }, or hook longer than HOOK_MAX_WORDS
 *   - last beat not flagged { cta: true } (the funnel closing beat)
 *   - total runtime outside its length-mode target window
 *
 *   npm run lint:hooks
 */
import { discover } from "./_discover";
import { HOOK_MAX_WORDS, LENGTH_TARGETS, totalSeconds, wordCount, type LengthMode } from "../src/videos/shared/types";

async function main() {
  let warnings = 0;
  const warn = (m: string) => {
    warnings++;
    console.warn("⚠ " + m);
  };

  for (const v of await discover()) {
    if (!v.BEATS.length) continue;
    const first = v.BEATS[0];
    const last = v.BEATS[v.BEATS.length - 1];

    if (!first.hook) warn(`${v.file}: beat 1 ("${first.id}") is not flagged { hook: true }`);
    const wc = wordCount(first.vo);
    if (wc > HOOK_MAX_WORDS) {
      warn(`${v.file}: hook is ${wc} words (>${HOOK_MAX_WORDS}) — tighten: "${first.vo}"`);
    }

    if (!last.cta) warn(`${v.file}: last beat ("${last.id}") is not flagged { cta: true } (funnel closing beat)`);

    const mode: LengthMode = v.META?.lengthMode ?? "growth";
    const t = LENGTH_TARGETS[mode];
    const len = totalSeconds(v.BEATS);
    if (len < t.min || len > t.max) {
      warn(`${v.file}: ${len.toFixed(1)}s outside ${mode} target ${t.min}-${t.max}s`);
    }
  }

  console.log(warnings ? `\n${warnings} warning(s).` : "✓ hooks / cta / length: all good");
}

main();
