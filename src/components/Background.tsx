import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/** Dark base with a subtle drifting field-yard-line motif. Repeatable across all videos. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.15) % 120;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 15%, ${theme.bgGlow} 0%, ${theme.bg} 60%)`,
      }}
    >
      {/* faint yard lines */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: i * 120 + drift - 120,
              height: 2,
              background: theme.text,
            }}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
