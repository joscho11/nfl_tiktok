import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { Beat, VideoMeta } from "../src/videos/types";

export type DiscoveredVideo = { file: string; META?: VideoMeta; BEATS: Beat[] };

/**
 * Filesystem-driven so EVERY `*.data.ts` gets linted — even a file someone forgot
 * to register in Root. That's the point of a build gate: nothing slips through.
 */
export async function discover(): Promise<DiscoveredVideo[]> {
  const dir = join(process.cwd(), "src", "videos");
  const files = readdirSync(dir).filter((f) => f.endsWith(".data.ts"));
  const out: DiscoveredVideo[] = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(dir, f)).href);
    out.push({ file: f, META: mod.META, BEATS: mod.BEATS ?? [] });
  }
  return out;
}
