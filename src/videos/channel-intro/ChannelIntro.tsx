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
import { Background } from "../../components/Background";
import { SafeZone } from "../../components/SafeZone";
import { Headline } from "../../components/Headline";
import { CountUp } from "../../components/CountUp";
import { FollowCTA } from "../../components/FollowCTA";
import { fonts, theme } from "../../theme";
import { BEATS, STATS, LEAD_IN_SECONDS, INTER_BEAT_GAP } from "./intro.data";
import { DASHBOARD_URL } from "../shared/funnel";
import captionsJson from "./captions.json";

const CAPTIONS = captionsJson as Record<string, { text: string; start: number }[]>;

/** Word-for-word subtitles: exact spoken words at Whisper-aligned times, active line only. */
const WordCaptions: React.FC<{ beatId: string }> = ({ beatId }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const lines = CAPTIONS[beatId] ?? [];
  let active: { text: string; start: number } | undefined;
  for (const l of lines) {
    if (l.start <= t + 0.03) active = l;
    else break;
  }
  if (!active) return null;
  const since = t - active.start;
  const pop = interpolate(since, [0, 0.12], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = interpolate(since, [0, 0.09], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 250 }}>
      <div style={{ transform: `scale(${pop})`, opacity: op, maxWidth: 940, textAlign: "center", background: "rgba(6,8,12,0.74)", border: `2px solid ${theme.edge}`, borderRadius: 18, padding: "16px 28px" }}>
        <span style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 48, lineHeight: 1.15, color: theme.text }}>{active.text}</span>
      </div>
    </AbsoluteFill>
  );
};

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

/** Pills that pop in one-by-one (credentials, or site features). */
const ChipRow: React.FC<{ items: string[]; startAt?: number }> = ({ items, startAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
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
              fontSize: 34,
              color: theme.text,
              border: `2px solid ${theme.line}`,
              borderRadius: 999,
              padding: "12px 26px",
            }}
          >
            {it}
          </div>
        );
      })}
    </div>
  );
};

// ---- Per-beat scenes (kept in the vertical middle; captions ride the bottom) ----

const HookScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 120 }}>
      <Headline size={118}>MY MODEL BEATS VEGAS</Headline>
      <div style={{ height: 30 }} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <CountUp to={STATS.atsPct} decimals={1} suffix="%" durationInFrames={44} color={theme.edge} fontSize={230} />
        <span style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 52, color: theme.text }}>
          OF THE TIME
        </span>
      </div>
      <div style={{ marginTop: 10, fontFamily: fonts.body, fontWeight: 700, fontSize: 36, color: theme.textDim }}>
        on its most confident calls · out-of-sample
      </div>
    </div>
  </SafeZone>
);

const WhoScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 120 }}>
      <Kicker>WHO'S BEHIND IT</Kicker>
      <ChipRow items={["M.S. DATA SCIENCE", "B.S. COMPUTER SCIENCE", "STATS MINOR"]} startAt={4} />
      <div style={{ height: 42 }} />
      <Headline size={128} delay={12}>SPORTS × DATA</Headline>
      <div
        style={{ marginTop: 22, fontFamily: fonts.body, fontWeight: 700, fontSize: 40, color: theme.textDim }}
      >
        Combining the two things I love.
      </div>
    </div>
  </SafeZone>
);

const ProofScene: React.FC = () => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 120 }}>
      <Kicker>NOTHING TO HIDE</Kicker>
      <Headline size={116}>LIVE & OPEN-SOURCE</Headline>
      <div style={{ height: 44 }} />
      <ChipRow items={["SPREADS", "FANTASY", "DFS"]} startAt={8} />
      <div style={{ marginTop: 34, fontFamily: fonts.body, fontWeight: 700, fontSize: 42, color: theme.textDim }}>
        Updated every week on my site.
      </div>
      <div style={{ marginTop: 12, fontFamily: fonts.body, fontWeight: 800, fontSize: 38, color: theme.edge }}>
        ▶ full model public on my GitHub
      </div>
    </div>
  </SafeZone>
);

const WhyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sub = interpolate(frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SafeZone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 120 }}>
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
            fontSize: 44,
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
  who: WhoScene,
  proof: ProofScene,
  why: WhyScene,
  cta: CtaScene,
};

// ---- Composition -----------------------------------------------------------

export const ChannelIntro: React.FC = () => {
  const { fps } = useVideoConfig();
  let cursor = LEAD_IN_SECONDS; // brief graphics-only lead-in before the first word
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <Background />
      {BEATS.map((beat) => {
        const from = Math.round(cursor * fps);
        // hold the scene + caption through a short breath after the audio for natural pacing
        const dur = Math.round((beat.seconds + INTER_BEAT_GAP) * fps);
        cursor += beat.seconds + INTER_BEAT_GAP;
        const Scene = SCENES[beat.id] ?? (() => null);
        return (
          <Sequence key={beat.id} from={from} durationInFrames={dur}>
            <Audio src={staticFile(`channel-intro/${beat.audio}.wav`)} />
            <Scene />
            <WordCaptions beatId={beat.id} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
