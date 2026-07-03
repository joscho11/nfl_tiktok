import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Keeps content inside TikTok's safe area: the right-side action rail and the
 * bottom caption/username strip cover the edges, so we pad content inward.
 */
export const SafeZone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      paddingTop: 220,
      paddingBottom: 320,
      paddingLeft: 90,
      paddingRight: 130,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </AbsoluteFill>
);
