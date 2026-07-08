import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Loop,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Headline } from "../../components/Headline";
import { CountUp } from "../../components/CountUp";
import { FollowCTA } from "../../components/FollowCTA";
import { fonts, theme } from "../../theme";
import { BEATS, STATS, LEAD_IN_SECONDS, INTER_BEAT_GAP } from "./brianthomas.data";
import { SHAP } from "./shap";
import { DASHBOARD_URL } from "../shared/funnel";
import captionsJson from "./captions.json";

const FPS = 30;
const CAPTIONS = captionsJson as Record<string, { text: string; start: number }[]>;

/** Word-for-word subtitles: exact script text at Whisper-aligned times, active line only. */
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
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 320 }}>
      <div style={{ transform: `scale(${pop})`, opacity: op, maxWidth: 940, textAlign: "center", background: "rgba(6,8,12,0.74)", border: `2px solid ${theme.edge}`, borderRadius: 18, padding: "18px 30px" }}>
        <span style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 50, lineHeight: 1.15, color: theme.text }}>{active.text}</span>
      </div>
    </AbsoluteFill>
  );
};

// ---- shared bits -----------------------------------------------------------

const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = theme.edge }) => (
  <div style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 32, letterSpacing: 3, textTransform: "uppercase", color, marginBottom: 20 }}>
    {children}
  </div>
);

/** Translucent dark card so charts read over the footage. Sits in the vertical middle. */
const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 10], [30, 0], { extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 380, paddingLeft: 70, paddingRight: 70 }}>
      <div style={{ opacity: o, transform: `translateY(${y}px)`, width: "100%", background: "rgba(9,12,17,0.82)", border: `1px solid ${theme.line}`, borderRadius: 28, padding: "44px 46px" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** A labeled horizontal bar that grows in. `frac` is 0..1 of full width. */
const Bar: React.FC<{ label: string; value: string; frac: number; color: string; delay?: number; dim?: boolean }> = ({ label, value, frac, color, delay = 0, dim }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ width: "100%", marginBottom: 26, opacity: dim ? 0.85 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
        <span style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.text }}>{label}</span>
        <span style={{ fontFamily: fonts.display, fontSize: 52, color }}>{value}</span>
      </div>
      <div style={{ height: 30, width: "100%", background: theme.line, borderRadius: 15, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${g * frac * 100}%`, background: color, borderRadius: 15 }} />
      </div>
    </div>
  );
};

// ---- per-beat scenes -------------------------------------------------------

const HookScene: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 460, paddingLeft: 80, paddingRight: 80 }}>
    <Kicker>Player Deep Dive</Kicker>
    <Headline size={132}>BRIAN THOMAS JR.</Headline>
    <div style={{ fontFamily: fonts.body, fontWeight: 800, fontSize: 40, color: theme.textDim, marginTop: 8 }}>WR · Jacksonville</div>
  </AbsoluteFill>
);

const PanicScene: React.FC = () => (
  <Panel>
    <Kicker color={theme.warn}>Sleeper ADP</Kicker>
    <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
      <span style={{ fontFamily: fonts.display, fontSize: 120, color: theme.textDim }}>WR{STATS.adpRankRookie}</span>
      <span style={{ fontFamily: fonts.display, fontSize: 90, color: theme.textDim }}>→</span>
      <span style={{ fontFamily: fonts.display, fontSize: 150, color: theme.warn }}>WR{STATS.adpRank}</span>
    </div>
    <div style={{ marginTop: 26, alignSelf: "flex-start", fontFamily: fonts.body, fontWeight: 900, fontSize: 46, color: theme.bg, background: theme.edge, padding: "16px 34px", borderRadius: 16 }}>
      MY MODEL: WR{STATS.ourRank}
    </div>
  </Panel>
);

const DisconnectScene: React.FC = () => (
  <Panel>
    <Kicker>Points vs. Usage</Kicker>
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fonts.display, fontSize: 110, color: theme.warn }}>▼52%</div>
        <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.textDim }}>fantasy points</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fonts.display, fontSize: 110, color: theme.edge }}>~SAME</div>
        <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.textDim }}>target share ({STATS.tgtShareRookie}%→{STATS.tgtShareSoph}%)</div>
      </div>
    </div>
  </Panel>
);

const TdScene: React.FC = () => (
  <Panel>
    <Kicker>Touchdowns</Kicker>
    <div style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
      <CountUp to={STATS.rookieTds} durationInFrames={20} color={theme.text} fontSize={150} />
      <span style={{ fontFamily: fonts.display, fontSize: 90, color: theme.textDim }}>→</span>
      <CountUp to={STATS.sophTds} durationInFrames={20} color={theme.warn} fontSize={150} />
    </div>
    <div style={{ marginTop: 12, fontFamily: fonts.body, fontWeight: 700, fontSize: 40, color: theme.textDim }}>
      on the <span style={{ color: theme.text }}>same air yards</span> — TD rate is pure variance
    </div>
  </Panel>
);

const QbSplitScene: React.FC = () => (
  <Panel>
    <Kicker>Split by Quarterback (yds / game)</Kicker>
    <Bar label="With Mac Jones" value={`${STATS.jonesYpg}`} frac={STATS.jonesYpg / 80} color={theme.edge} delay={4} />
    <Bar label="With Trevor Lawrence" value={`${STATS.lawrenceYpg}`} frac={STATS.lawrenceYpg / 80} color={theme.textDim} delay={12} dim />
    <div style={{ marginTop: 6, fontFamily: fonts.body, fontWeight: 700, fontSize: 32, color: theme.gold, lineHeight: 1.3 }}>
      Jones's best-ever WR1 · Lawrence has fed a deep WR1 before (Ridley {STATS.lawrenceRidleyYds})
    </div>
  </Panel>
);

const ShapScene: React.FC = () => {
  const maxAbs = Math.max(...SHAP.drivers.map((d) => Math.abs(d.impact)));
  return (
    <Panel>
      <Kicker>Why the model buys — pts/game drivers</Kicker>
      <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.textDim, marginBottom: 22 }}>
        avg WR <span style={{ color: theme.text, fontFamily: fonts.display, fontSize: 44 }}>{SHAP.base}</span> → Brian Thomas <span style={{ color: theme.edge, fontFamily: fonts.display, fontSize: 44 }}>{SHAP.projection}</span>
      </div>
      {SHAP.drivers.slice(0, 5).map((d, i) => {
        const pos = d.impact >= 0;
        return (
          <div key={d.feature} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <div style={{ flex: 1, fontFamily: fonts.body, fontWeight: 700, fontSize: 30, color: theme.text, textAlign: "right" }}>{d.label}</div>
            <div style={{ width: 300, height: 26, background: theme.line, borderRadius: 13, overflow: "hidden" }}>
              <Bar300 frac={Math.abs(d.impact) / maxAbs} color={pos ? theme.edge : theme.warn} delay={6 + i * 5} />
            </div>
            <div style={{ width: 90, fontFamily: fonts.display, fontSize: 40, color: pos ? theme.edge : theme.warn }}>{pos ? "+" : ""}{d.impact}</div>
          </div>
        );
      })}
    </Panel>
  );
};
const Bar300: React.FC<{ frac: number; color: string; delay: number }> = ({ frac, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return <div style={{ height: "100%", width: `${g * frac * 100}%`, background: color, borderRadius: 13 }} />;
};

const VerdictScene: React.FC = () => (
  <Panel>
    <Kicker>The Edge</Kicker>
    <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
      <span style={{ fontFamily: fonts.display, fontSize: 96, color: theme.warn }}>WR{STATS.adpRank}</span>
      <span style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.textDim }}>price</span>
      <span style={{ fontFamily: fonts.display, fontSize: 72, color: theme.textDim }}>→</span>
      <span style={{ fontFamily: fonts.display, fontSize: 96, color: theme.edge }}>WR{STATS.ourRank}</span>
      <span style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.textDim }}>projection</span>
    </div>
    <div style={{ marginTop: 20, fontFamily: fonts.body, fontWeight: 800, fontSize: 42, color: theme.text }}>
      6th-round dart · <span style={{ color: theme.gold }}>2nd-round ceiling</span>
    </div>
  </Panel>
);

const CtaScene: React.FC = () => <FollowCTA line1="MORE CALLS THE" line2="MARKET GETS WRONG." bioUrl={DASHBOARD_URL} />;

const SCENES: Record<string, React.FC> = {
  hook: HookScene,
  panic: PanicScene,
  disconnect: DisconnectScene,
  tdregression: TdScene,
  qbsplit: QbSplitScene,
  shap: ShapScene,
  verdict: VerdictScene,
  cta: CtaScene,
};

// ---- composition -----------------------------------------------------------

// clip1_clean.mp4 is the pre-cut clean window [3s,57s] of the recording (the raw
// capture had a Copilot sidebar popup in the first ~2.5s and a click-circle near ~60s).
const CLEAN_CLIP_FRAMES = Math.round(54 * FPS);

export const BrianThomas: React.FC = () => {
  let cursor = LEAD_IN_SECONDS; // footage-only lead-in before the first word
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/* full-screen footage, muted, looped, cover-cropped */}
      <AbsoluteFill>
        <Loop durationInFrames={CLEAN_CLIP_FRAMES}>
          <OffthreadVideo
            src={staticFile("brian-thomas/clip1_clean.mp4")}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Loop>
      </AbsoluteFill>
      {/* scrim for legibility */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(6,8,12,0.45) 0%, rgba(6,8,12,0.2) 30%, rgba(6,8,12,0.75) 78%, rgba(6,8,12,0.92) 100%)" }} />

      {BEATS.map((beat) => {
        const from = Math.round(cursor * FPS);
        // hold the scene + caption through a short breath after the audio for natural pacing
        const dur = Math.round((beat.seconds + INTER_BEAT_GAP) * FPS);
        cursor += beat.seconds + INTER_BEAT_GAP;
        const Scene = SCENES[beat.id] ?? (() => null);
        return (
          <Sequence key={beat.id} from={from} durationInFrames={dur}>
            <Audio src={staticFile(`brian-thomas/${beat.audio}.wav`)} />
            <Scene />
            <WordCaptions beatId={beat.id} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
