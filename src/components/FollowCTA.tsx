import React from "react";
import { SafeZone } from "./SafeZone";
import { Headline } from "./Headline";
import { fonts, theme } from "../theme";

/**
 * The STANDARD closing beat: follow-primary. On a cold-start account a follow
 * compounds across every future video and feeds distribution; a link click is
 * one-and-done. So `FOLLOW` is the single primary CTA; the dashboard is only a
 * passive `bioUrl` line beneath it (link lives permanently in bio).
 * For a dedicated dashboard push on a high-trust video, use FunnelCTA instead.
 */
export const FollowCTA: React.FC<{ line1: string; line2: string; bioUrl?: string }> = ({
  line1,
  line2,
  bioUrl,
}) => (
  <SafeZone>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Headline size={128}>{line1}</Headline>
      <div style={{ height: 16 }} />
      <Headline size={128} color={theme.edge} delay={8}>
        {line2}
      </Headline>
      <div style={{ height: 56 }} />
      <div
        style={{
          alignSelf: "flex-start",
          fontFamily: fonts.body,
          fontWeight: 900,
          fontSize: 52,
          color: theme.bg,
          background: theme.edge,
          padding: "24px 48px",
          borderRadius: 20,
        }}
      >
        ▶ FOLLOW
      </div>
      {bioUrl ? (
        <div
          style={{
            marginTop: 26,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 32,
            color: theme.textDim,
          }}
        >
          full breakdown → {bioUrl} · link in bio
        </div>
      ) : null}
    </div>
  </SafeZone>
);
