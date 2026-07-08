import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { Beat, VideoMeta } from "../src/videos/shared/types";

export type DiscoveredVideo = { file: string; META?: VideoMeta; BEATS: Beat[] };

/** Recursively collect every `*.data.ts` under src/videos (each video has its own subfolder). */
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".data.ts")) out.push(full);
  }
  return out;
}

/**
 * Filesystem-driven so EVERY `*.data.ts` gets linted — even one someone forgot
 * to register in Root. That's the point of a build gate: nothing slips through.
 */
export async function discover(): Promise<DiscoveredVideo[]> {
  const files = walk(join(process.cwd(), "src", "videos"));
  const out: DiscoveredVideo[] = [];
  for (const f of files.sort()) {
    const mod = await import(pathToFileURL(f).href);
    out.push({ file: f.split(/[\\/]/).slice(-2).join("/"), META: mod.META, BEATS: mod.BEATS ?? [] });
  }
  return out;
}
