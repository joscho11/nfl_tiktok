import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fonts, theme } from "../theme";

/** A number that counts up from `from` to `to` over `durationInFrames`. */
export const CountUp: React.FC<{
  from?: number;
  to: number;
  decimals?: number;
  suffix?: string;
  durationInFrames?: number;
  color?: string;
  fontSize?: number;
}> = ({
  from = 0,
  to,
  decimals = 0,
  suffix = "",
  durationInFrames = 30,
  color = theme.text,
  fontSize = 260,
}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
  });
  return (
    <span
      style={{
        fontFamily: fonts.display,
        fontSize,
        lineHeight: 0.9,
        color,
        letterSpacing: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
};
