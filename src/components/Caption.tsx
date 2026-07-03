import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts, theme } from "../theme";

/** Burned-in TikTok caption, bottom-third, above the safe strip. Pops in per beat. */
export const Caption: React.FC<{ text: string; accent?: string }> = ({
  text,
  accent = theme.edge,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 8], [24, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 340 }}>
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          maxWidth: 900,
          textAlign: "center",
          background: "rgba(11,14,19,0.72)",
          border: `2px solid ${accent}`,
          borderRadius: 22,
          padding: "20px 34px",
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontWeight: 800,
            fontSize: 46,
            lineHeight: 1.15,
            color: theme.text,
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
