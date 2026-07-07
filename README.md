# nfl_tiktok — Sports Analytics TikTok Studio

Data-driven sports-analytics TikToks as **pure motion graphics**, built with
[Remotion](https://remotion.dev). No footage (zero copyright risk) — animated charts +
captions timed to a voiceover. Content is analysis/education framed, funneling to the
[BettingEdge dashboard](https://joschobetting.streamlit.app/); it is **not** betting promotion.

## Quick start

```bash
npm install
npm start                                 # Remotion Studio (live preview in browser)
npm run render -- <CompositionId> out/x.mp4   # render an MP4 (1080x1920, 30fps)
npm run check                             # compliance + hook/length lint (run before publish)
```

Composition ids live in [`src/Root.tsx`](src/Root.tsx).

## Videos

| Id | What | Status |
|----|------|--------|
| `ChannelIntro` | **Video 1 — channel trailer.** Who Joseph is + what the channel is (holistic sports analytics, "the *why*" not just picks) + one proof point. | Built, VO recorded, final rendered. |
| `ModelCredibility` | **Video 2 — "beats the spread 64%"** model deep-dive. | Built; awaiting VO. |
| `FunnelCTAPreview` | Dev preview of the opt-in dashboard end card. | Utility. |

Each video = one `src/videos/<name>.data.ts` (the beats; the `vo` field is the teleprompter)
+ one `src/videos/<Name>.tsx` (the composition), registered in `Root.tsx`.

## Per-video workflow

1. Pick a topic. 2. Pull + **verify** every stat against real project code, cited in a
`.data.ts` comment. 3. Write the beats (hook first, CTA last). 4. Build the composition from
the shared components. 5. Record the VO. 6. Retime beats to the VO + final render. 7. Upload.

### Conventions (enforced by `npm run check`)

- **Beat 1 is the hook:** `{ hook: true }`, ≤ 12 words, surprising claim up front.
- **Standard close is follow-primary** (`FollowCTA`) — a follow compounds on a cold-start
  account; the dashboard rides along as a passive bio line. `FunnelCTA` (dashboard-primary)
  is opt-in, for high-trust videos only.
- **No betting-promotion language** — `scripts/check-compliance.ts` blocks promo codes,
  "bet now", guarantees, and sportsbook names (fails the build).
- **Length** must sit in its `lengthMode` window: `growth` 20–40s / `rewards` 60–90s.

## Voiceover

Record from the beat `vo` fields (see `VO_SCRIPT.md`), then drop the audio in
`public/audio/` (gitignored) and retime the beats to match.

> **Gotcha:** Remotion muxes a **silent** track from some `.m4a`/AAC files. Convert to WAV
> first and point `<Audio>` at the `.wav`:
> ```bash
> npx remotion ffmpeg -i public/audio/intro.m4a -c:a pcm_s16le public/audio/intro.wav
> ```
> To confirm audio survived a render, extract it (`-map 0:a`) and check — running
> `silencedetect` directly on a video+audio mp4 without `-map 0:a` falsely reports 0 gaps.

## Layout

```
src/
  theme.ts                 brand colors + fonts
  Root.tsx                 registers each video as a <Composition>
  videos/
    types.ts               Beat / VideoMeta / LengthMode + length targets
    funnel.ts              dashboard URL + follow/funnel closing beats
    <name>.data.ts         per-video beats + verified stats
    <Name>.tsx             per-video composition
  components/              reusable: Background, SafeZone, Headline, Caption,
                           CountUp, BarCompare, FollowCTA, FunnelCTA
scripts/                   check-compliance.ts, lint-hooks.ts (run via tsx)
brand/                     profile-pic / logo assets (JS monogram)
public/audio/              voiceover files (gitignored)
out/                       rendered MP4s + stills (gitignored)
```
