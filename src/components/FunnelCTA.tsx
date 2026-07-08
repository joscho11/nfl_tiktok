import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SafeZone } from "./SafeZone";
import { Headline } from "./Headline";
import { fonts, theme } from "../theme";
import { DASHBOARD_URL } from "../videos/shared/funnel";

/**
 * Reusable end card. Drives to my own dashboard, framed as analysis ("see the
 * numbers") — never "bet now". Use as the visual for the funnel closing beat.
 */
export const FunnelCTA: React.FC<{ url?: string; headline?: string; kicker?: string }> = ({
  url = DASHBOARD_URL,
  headline = "SEE EVERY NUMBER BEHIND THE MODEL",
  kicker = "FULL BREAKDOWN",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const pillY = interpolate(s, [0, 1], [30, 0]);

  return (
    <SafeZone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: theme.edge,
            marginBottom: 24,
          }}
        >
          {kicker}
        </div>
        <Headline size={104}>{headline}</Headline>
        <div style={{ height: 60 }} />
        <div
          style={{
            opacity: s,
            transform: `translateY(${pillY}px)`,
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 800,
              fontSize: 44,
              color: theme.bg,
              background: theme.edge,
              padding: "22px 44px",
              borderRadius: 18,
            }}
          >
            ▶ {url}
          </div>
          <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 34, color: theme.textDim }}>
            link in bio
          </div>
        </div>
      </div>
    </SafeZone>
  );
};
