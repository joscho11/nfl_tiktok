import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts, theme } from "../theme";

type Bar = { label: string; value: number; color: string; highlight?: boolean };

/**
 * Horizontal grow-in bars for comparing rates (e.g. model win% vs break-even).
 * `max` sets the 100%-width scale so bars are visually comparable across videos.
 */
export const BarCompare: React.FC<{
  bars: Bar[];
  max?: number;
  suffix?: string;
  startAt?: number;
}> = ({ bars, max = 100, suffix = "%", startAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 46, width: "100%" }}>
      {bars.map((b, i) => {
        const delay = startAt + i * 10;
        const grow = spring({ frame: frame - delay, fps, config: { damping: 200 } });
        const w = interpolate(grow, [0, 1], [0, (b.value / max) * 100]);
        const shown = interpolate(grow, [0, 1], [0, b.value], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 40,
                  color: b.highlight ? theme.text : theme.textDim,
                }}
              >
                {b.label}
              </span>
              <span
                style={{
                  fontFamily: fonts.display,
                  fontSize: 66,
                  color: b.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {shown.toFixed(1)}
                {suffix}
              </span>
            </div>
            <div
              style={{
                height: 40,
                width: "100%",
                background: theme.line,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${w}%`,
                  background: b.color,
                  borderRadius: 20,
                  boxShadow: b.highlight ? `0 0 40px ${b.color}` : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
