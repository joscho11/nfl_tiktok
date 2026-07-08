# final/ — production-ready release cuts

The finished, upload-ready videos live here with clean, ordered names. This is the
folder to grab an MP4 from when posting to TikTok — nothing else, no drafts or stills.

| File | Composition | Notes |
|------|-------------|-------|
| `01-channel-intro.mp4` | `ChannelIntro` | Channel trailer (v2, credibility-forward, ~50s) |
| `02-brian-thomas-jr.mp4` | `BrianThomas` | Player deep-dive (~102s) |

**Workflow:** render working copies + stills to `out/` (scratch), then copy the final cut
here with the next `NN-<slug>.mp4` name. The MP4s are git-ignored (large binaries stay
local, one source of truth is the composition); this README is tracked so the convention
lives in the repo.

Re-render any cut from its composition, e.g.:

```bash
npx remotion render ChannelIntro out/ChannelIntro.mp4
cp out/ChannelIntro.mp4 final/01-channel-intro.mp4
```
