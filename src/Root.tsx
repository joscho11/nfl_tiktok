import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { ChannelIntro } from "./videos/channel-intro/ChannelIntro";
import { INTRO_DURATION_SECONDS, META as introMeta } from "./videos/channel-intro/intro.data";
import { ModelCredibility, CREDIBILITY_DURATION_SECONDS } from "./videos/model-credibility/ModelCredibility";
import { META as credibilityMeta } from "./videos/model-credibility/credibility.data";
import { BrianThomas } from "./videos/brian-thomas/BrianThomas";
import { BRIANTHOMAS_DURATION_SECONDS } from "./videos/brian-thomas/brianthomas.data";
import { LENGTH_TARGETS, type LengthMode } from "./videos/shared/types";
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
guardLength(introMeta.id, INTRO_DURATION_SECONDS, introMeta.lengthMode);
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
        id="ChannelIntro"
        component={ChannelIntro}
        durationInFrames={Math.round(INTRO_DURATION_SECONDS * FPS)}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="BrianThomas"
        component={BrianThomas}
        durationInFrames={Math.round(BRIANTHOMAS_DURATION_SECONDS * FPS)}
        fps={FPS}
        width={1080}
        height={1920}
      />
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
