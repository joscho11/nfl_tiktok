import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { ModelCredibility, CREDIBILITY_DURATION_SECONDS } from "./videos/ModelCredibility";
import { META as credibilityMeta } from "./videos/credibility.data";
import { LENGTH_TARGETS, type LengthMode } from "./videos/types";
import { Background } from "./components/Background";
import { FunnelCTA } from "./components/FunnelCTA";

const FPS = 30;

/**
 * Length-mode guard: a video's runtime must sit inside its mode's target window.
 * Warns (doesn't fail) at bundle time so a `growth` video that bloats past ~35s,
 * or a `rewards` video under 60s, is caught before rendering.
 */
const guardLength = (label: string, seconds: number, mode: LengthMode) => {
  const t = LENGTH_TARGETS[mode];
  if (seconds < t.min || seconds > t.max) {
    console.warn(
      `[length] "${label}" is ${seconds.toFixed(1)}s — outside ${mode} target ${t.min}-${t.max}s`,
    );
  }
};
guardLength(credibilityMeta.id, CREDIBILITY_DURATION_SECONDS, credibilityMeta.lengthMode);

/** Dev-only preview so the shared FunnelCTA end card can be eyeballed in isolation. */
const FunnelCTAPreview: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <FunnelCTA />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ModelCredibility"
        component={ModelCredibility}
        durationInFrames={Math.round(CREDIBILITY_DURATION_SECONDS * FPS)}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="FunnelCTAPreview"
        component={FunnelCTAPreview}
        durationInFrames={4 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
