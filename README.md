# nfl_tiktok — Sports Analytics TikTok Studio

Data-driven sports-analytics TikToks as **pure motion graphics** (and footage-with-charts),
built with [Remotion](https://remotion.dev). Content is analysis/education framed, powered by
the [BettingEdge](https://joschobetting.streamlit.app/) model and funneling to that dashboard;
it is **not** betting promotion. Channel: [@joscho_analytics](https://www.tiktok.com/@joscho_analytics).

## Quick start

```bash
npm install
npm start                                     # Remotion Studio (live preview in browser)
npm run render -- <CompositionId> out/x.mp4   # render an MP4 (1080x1920, 30fps) to scratch
npm run check                                 # compliance + hook/length lint (warnings, run before publish)
```

Composition ids live in [`src/Root.tsx`](src/Root.tsx). Finished cuts go in [`final/`](final/).

## Videos

| Id | What | Status |
|----|------|--------|
| `ChannelIntro` | **Channel trailer (v2, credibility-forward).** ML-engineer credibility + what the channel is (sports analytics, the *why* not just picks) + proof. Grab-first hook. | **Posted** ([id 7660007652818259231](https://www.tiktok.com/@joscho_analytics/video/7660007652818259231)). |
| `BrianThomas` | **Player deep-dive — "the market is wrong about Brian Thomas Jr."** Full-screen footage with charts floating over it (QB split, TD regression, SHAP). | **Posted** (id 7659945800209927454). |
| `ModelCredibility` | "Beats the spread 64%" model deep-dive. | Built; on the shelf. |
| `FunnelCTAPreview` | Dev preview of the opt-in dashboard end card. | Utility. |

Each video is its own folder under `src/videos/<slug>/`: a `<slug>.data.ts` (beats — the `vo`
field doubles as the teleprompter), the `<Name>.tsx` composition, and for VO-driven videos a
`SCRIPT.md` (readable script) + `captions.json` (word-timed captions). Registered in `Root.tsx`.

## Per-video workflow

1. Pick a topic. 2. Pull + **verify** every stat against real project code, cited in a
`.data.ts` comment. 3. Write the beats (hook first, CTA last) into `SCRIPT.md` + `.data.ts`.
4. Build the composition from the shared components. 5. Record the VO. 6. Process the audio +
sync captions + final render (below). 7. Copy the cut to `final/` and upload.

### Conventions (checked by `npm run check`)

- **Beat 1 is the hook** (`{ hook: true }`); the last beat is the follow CTA (`{ cta: true }`).
  The hook-word-count and length-window checks are **warnings** (a channel trailer runs longer
  than a punchy clip by design), not build failures.
- **Standard close is follow-primary** (`FollowCTA`) — a follow compounds on a cold-start
  account; the dashboard rides along as a passive bio line. `FunnelCTA` is opt-in.
- **No betting-promotion language** — `scripts/check-compliance.ts` blocks promo codes,
  "bet now", guarantees, and sportsbook names (this one *fails* the build).

## Voiceover, captions & audio

Record the VO from the beat `vo` fields / `SCRIPT.md`. VO can be **one file or per-beat
chunks** (e.g. `public/channel-intro/{hook,who,proof,why,cta}.m4a`). The audio pipeline
(kept as a scratch script; see the channel-intro build) does, per clip:

1. **Decode** the `.m4a` to WAV (Remotion muxes a *silent* track from some AAC files — always
   go through WAV: `npx remotion ffmpeg -i in.m4a -c:a pcm_s16le out.wav`).
2. **Trim** leading/trailing silence conservatively (never clip a word).
3. **Normalize** loudness to ~**-20 dBFS RMS with a -1 dBFS peak limiter** so every beat is
   equally loud (quiet phone recordings come out soft otherwise).
4. **Whisper** (`faster-whisper`) word-timestamps → chunk into short lines → `captions.json`,
   so the burned-in captions are **word-for-word to what was actually said**.

The composition plays each beat's `<Audio>` and renders `captions.json` via a `WordCaptions`
component (see `channel-intro/ChannelIntro.tsx` and `brian-thomas/BrianThomas.tsx`).

> **Verify audio survived a render** by extracting it (`-map 0:a`) and measuring it — running
> `silencedetect` on a video+audio mp4 *without* `-map 0:a` falsely reports 0 gaps. (Remotion's
> ffmpeg build lacks `volumedetect`; measure RMS/peak in Python or use `silencedetect`.)

## Layout

```
src/
  theme.ts                 brand colors + fonts
  Root.tsx                 registers each video as a <Composition>
  components/              reusable: Background, SafeZone, Headline, Caption,
                           CountUp, BarCompare, FollowCTA, FunnelCTA
  videos/
    shared/                types.ts (Beat / VideoMeta / LengthMode), funnel.ts (URLs + CTAs)
    channel-intro/         ChannelIntro.tsx, intro.data.ts, SCRIPT.md, captions.json
    brian-thomas/          BrianThomas.tsx, brianthomas.data.ts, shap.ts, SCRIPT.md, captions.json
    model-credibility/     ModelCredibility.tsx, credibility.data.ts
scripts/                   check-compliance.ts, lint-hooks.ts (run via tsx)
brand/                     profile-pic / logo assets (JS monogram)
public/<video>/            voiceover + footage per video (gitignored)
final/                     production-ready release cuts, clean names (gitignored MP4s; README tracked)
out/                       scratch renders + stills (gitignored)
```
