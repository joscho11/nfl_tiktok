import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts, theme } from "../theme";

/** Big display headline with an impact spring-in. Use for hooks / section titles. */
export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  delay?: number;
}> = ({ children, size = 120, color = theme.text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, mass: 0.6 } });
  const scale = interpolate(s, [0, 1], [0.7, 1]);
  const opacity = interpolate(frame - delay, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        lineHeight: 0.94,
        color,
        letterSpacing: 1.5,
        transform: `scale(${scale})`,
        transformOrigin: "left center",
        opacity,
      }}
    >
      {children}
    </div>
  );
};
