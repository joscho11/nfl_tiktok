import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { SafeZone } from "../components/SafeZone";
import { Caption } from "../components/Caption";
import { Headline } from "../components/Headline";
import { CountUp } from "../components/CountUp";
import { BarCompare } from "../components/BarCompare";
import { FollowCTA } from "../components/FollowCTA";
import { fonts, theme } from "../theme";
import { BEATS, STATS } from "./credibility.data";
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

// ---- Per-beat scenes -------------------------------------------------------

const HookScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>NFL BETTING MODEL</Kicker>
      <Headline size={150}>BEATS THE SPREAD</Headline>
      <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 20 }}>
        <CountUp to={STATS.highAts} decimals={1} suffix="%" durationInFrames={40} color={theme.edge} />
      </div>
      <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 44, color: theme.textDim }}>
        on its top picks
      </div>
    </div>
  </SafeZone>
);

const AboutScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>WHO'S BEHIND THIS</Kicker>
      <Headline size={112}>I BUILD MODELS FOR A LIVING</Headline>
      <div style={{ height: 36 }} />
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 46,
          lineHeight: 1.25,
          color: theme.textDim,
          maxWidth: 840,
        }}
      >
        So I built one for the NFL. Every call comes from the data —{" "}
        <span style={{ color: theme.text }}>never a hot take.</span>
      </div>
    </div>
  </SafeZone>
);

const BarScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker color={theme.warn}>THE BAR YOU HAVE TO CLEAR</Kicker>
      <Headline size={92} delay={2}>TO PROFIT, YOU NEED</Headline>
      <div style={{ height: 40 }} />
      <BarCompare
        startAt={10}
        bars={[
          { label: "Break-even (−110)", value: STATS.breakEven, color: theme.warn, highlight: true },
        ]}
      />
    </div>
  </SafeZone>
);

const GapScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>MODEL vs THE LINE</Kicker>
      <div style={{ height: 20 }} />
      <BarCompare
        startAt={4}
        bars={[
          { label: "My model — HIGH picks", value: STATS.highAts, color: theme.edge, highlight: true },
          { label: "Break-even to profit", value: STATS.breakEven, color: theme.warn },
        ]}
      />
    </div>
  </SafeZone>
);

const ProofRow: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const x = interpolate(s, [0, 1], [-40, 0]);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 24,
        marginBottom: 34,
      }}
    >
      <div style={{ fontFamily: fonts.display, fontSize: 60, color: theme.edge }}>✓</div>
      <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 46, color: theme.text }}>
        {label}
      </div>
    </div>
  );
};

const HonestScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Kicker>WHY YOU CAN TRUST IT</Kicker>
      <Headline size={96}>NOT CHERRY-PICKED</Headline>
      <div style={{ height: 50 }} />
      <ProofRow label="Out-of-sample — tested on unseen games" delay={14} />
      <ProofRow label={`${STATS.seasonsFrom}–${STATS.seasonsTo}, walk-forward validated`} delay={30} />
      <ProofRow label="Graded vs the line you'd actually bet" delay={46} />
    </div>
  </SafeZone>
);

const FloorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SafeZone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Kicker>THE SAMPLE IS REAL</Kicker>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <CountUp to={STATS.highN} durationInFrames={30} color={theme.text} fontSize={230} />
          <span style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 54, color: theme.textDim }}>
            picks
          </span>
        </div>
        <div style={{ height: 30 }} />
        <div style={{ opacity }}>
          <span style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 44, color: theme.textDim }}>
            Even the pessimistic 95% floor:{" "}
          </span>
          <span style={{ fontFamily: fonts.display, fontSize: 96, color: theme.gold }}>
            {STATS.wilsonLo}%
          </span>
        </div>
      </div>
    </SafeZone>
  );
};

// Follow-primary standard close; dashboard is a passive bio line (see FollowCTA).
const CtaScene: React.FC = () => (
  <FollowCTA line1="THE MODEL'S BEST PICKS." line2="EVERY WEEK." bioUrl={DASHBOARD_URL} />
);

const SCENES: Record<string, React.FC> = {
  hook: HookScene,
  about: AboutScene,
  bar: BarScene,
  gap: GapScene,
  honest: HonestScene,
  floor: FloorScene,
  cta: CtaScene,
};

// ---- Composition -----------------------------------------------------------

export const ModelCredibility: React.FC = () => {
  const { fps } = useVideoConfig();
  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
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

export const CREDIBILITY_DURATION_SECONDS = BEATS.reduce((s, b) => s + b.seconds, 0);
