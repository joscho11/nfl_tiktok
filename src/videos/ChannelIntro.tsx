import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { SafeZone } from "../components/SafeZone";
import { Caption } from "../components/Caption";
import { Headline } from "../components/Headline";
import { CountUp } from "../components/CountUp";
import { FollowCTA } from "../components/FollowCTA";
import { fonts, theme } from "../theme";
import { BEATS, STATS } from "./intro.data";
import { DASHBOARD_URL } from "./funnel";

const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = theme.edge,
}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 800,
      fontSize: 34,
      letterSpacing: 3,
      textTransform: "uppercase",
      color,
      marginBottom: 24,
    }}
  >
    {children}
  </div>
);

/** Pills that pop in one-by-one (sports covered, or site features). */
const ChipRow: React.FC<{ items: string[]; startAt?: number }> = ({ items, startAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
      {items.map((it, i) => {
        const s = spring({ frame: frame - startAt - i * 6, fps, config: { damping: 200 } });
        return (
          <div
            key={it}
            style={{
              opacity: s,
              transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 38,
              color: theme.text,
              border: `2px solid ${theme.line}`,
              borderRadius: 999,
              padding: "14px 30px",
            }}
          >
            {it}
          </div>
        );
      })}
    </div>
  );
};

// ---- Per-beat scenes -------------------------------------------------------

const HookScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>WELCOME</Kicker>
      <Headline size={128}>THE REAL NUMBERS</Headline>
      <div style={{ height: 10 }} />
      <Headline size={128} color={theme.edge} delay={6}>
        NOT HOT TAKES
      </Headline>
    </div>
  </SafeZone>
);

const IntroScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>WHO'S BEHIND IT</Kicker>
      <Headline size={150}>I'M JOSEPH</Headline>
      <div style={{ height: 44 }} />
      <ChipRow items={["FOOTBALL", "BASKETBALL", "SOCCER"]} startAt={12} />
      <div
        style={{ marginTop: 26, fontFamily: fonts.body, fontWeight: 700, fontSize: 40, color: theme.textDim }}
      >
        if there's data in it, we break it down
      </div>
    </div>
  </SafeZone>
);

const ProofScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>ALREADY LIVE</Kicker>
      <div style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 52, color: theme.text, marginBottom: 28 }}>
        A site modeling the NFL season
      </div>
      <ChipRow items={["FANTASY", "DFS", "SPREAD MODEL"]} startAt={6} />
      <div style={{ height: 56 }} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <CountUp to={STATS.atsPct} suffix="%" durationInFrames={40} color={theme.edge} fontSize={210} />
        <span style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 46, color: theme.text }}>
          ATS
        </span>
      </div>
      <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 38, color: theme.textDim }}>
        on top picks · out-of-sample {STATS.seasonsFrom}–{String(STATS.seasonsTo).slice(2)}
      </div>
    </div>
  </SafeZone>
);

const WhyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sub = interpolate(frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SafeZone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>THE POINT</Kicker>
        <Headline size={120}>IT'S ABOUT</Headline>
        <Headline size={168} color={theme.edge} delay={6}>
          THE WHY
        </Headline>
        <div
          style={{
            marginTop: 40,
            opacity: sub,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 46,
            lineHeight: 1.25,
            color: theme.textDim,
            maxWidth: 840,
          }}
        >
          The analytics behind every call — <span style={{ color: theme.text }}>not just picks.</span>
        </div>
      </div>
    </SafeZone>
  );
};

const CtaScene: React.FC = () => (
  <FollowCTA line1="DEEP DIVES" line2="START NOW." bioUrl={DASHBOARD_URL} />
);

const SCENES: Record<string, React.FC> = {
  hook: HookScene,
  intro: IntroScene,
  proof: ProofScene,
  why: WhyScene,
  cta: CtaScene,
};

// ---- Composition -----------------------------------------------------------

export const ChannelIntro: React.FC = () => {
  const { fps } = useVideoConfig();
  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/* WAV, not the source m4a: Remotion muxes a silent track from some AAC files. */}
      <Audio src={staticFile("audio/intro.wav")} />
      <Background />
      {BEATS.map((beat) => {
        const from = Math.round(cursor * fps);
        const dur = Math.round(beat.seconds * fps);
        cursor += beat.seconds;
        const Scene = SCENES[beat.id] ?? (() => null);
        return (
          <Sequence key={beat.id} from={from} durationInFrames={dur}>
            <Scene />
            <Caption text={beat.caption} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
