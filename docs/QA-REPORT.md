# ELEVEN SECONDS. ZERO FRAMES. — QA report

Tested 10 October 2026. This report describes actions performed on the current redesigned work, not tests presumed from code.

## Production website

- Vercel CLI resumed the paused project with the artist's authorization. Explicit Preview `dpl_HMU2n4r1J6ve61hqN3bY5QCewbkB` built and reached **READY**. The real Preview URL was opened in an authenticated in-app browser; all four chapters and the original-footage reveal rendered.
- Production deployment `dpl_AidXTLmsHM6ngs49Zu6Reif9UXb9` built successfully and was aliased to [the public URL](https://this-footage-does-not-exist.vercel.app/). A request without credentials returned **HTTP 200** and the correct title. The production URL was opened in the in-app browser and visually inspected.
- Pushing source commit `1e710ca` to the linked private GitHub repository triggered a further **READY** Production build. Afterward the canonical URL and all seven artwork images plus the poster returned unauthenticated HTTP 200.
- Automated Chrome/Playwright checks against the **actual unauthenticated production URL** passed at 1440×900 desktop, 768×1024 tablet and 390×844 mobile. The script entered the experience, visited all four chapters, checked artwork/claims, pause/play, sound toggle, arrow keys, Escape, source request, replay and hard refresh. The reduced-motion context held reconstruction motion still while retaining the eleven-second clock. No page exceptions, console errors, HTTP ≥400 responses or horizontal overflow were recorded.
- Timing was measured from the actual `SHOW ORIGINAL FOOTAGE` click to the first post-silence phase using `performance.now()` and a mutation observer: **11,009 ms** on production and **11,008 ms** locally. The implementation threshold is 11,000 ms; the additional 8–9 ms is browser-frame scheduling. At five seconds only the clock was visible. Web Audio gain is set to zero synchronously in the click handler.
- [Production screenshots](../screenshots-production/) include opening, Romance, Security, Revolution, Commerce, five seconds of silence and the conclusion on desktop/mobile, plus a tablet scene. Visual inspection confirms the same hall, red doorway, two figures and damaged shoe in the four versions; the final room retains the institutions' material additions but removes the figures. The mobile composition and text are readable at 390 px.

Run `node tools_browser_qa.mjs https://this-footage-does-not-exist.vercel.app/ screenshots-production` to repeat the production checks. The seven principal images, poster and sound file are all local assets; no external font, paid API, tracking or runtime AI call is used.

## Film and imagery

- `npm run render` completed. [Actual MP4](../artifacts/eleven-seconds-zero-frames.mp4): **73.003 seconds**, 1600×900, 24 fps, H.264 video plus AAC audio, 53.9 MB. `ffprobe` confirmed metadata. A browser video element reported `readyState=4`, `duration=73.003`, no media error and advancing playback with sound unmuted.
- Decoded and inspected a [12-frame film sheet](../artifacts/film-verification-contact-sheet.png) at 3, 11, 22, 33, 44, 50.2, 55, 60.5, 61.5, 66, 70 and 72.5 seconds. It covers opening, each institutional transformation, the eleven-second blank interval, return to the room, repeated shoe close-up and final words.
- Decoded MP4 audio has normalized RMS between **0.0056 and 0.0105** in sampled reconstruction windows, and **0.0** at 50.5, 55, 60.5, 61.5 and 70 seconds. Sound stops at the 50-second cut and remains absent through the blackout and aftermath. `tools_verify_media.py` reproduces this check.
- [Six-frame architectural contact sheet](../artifacts/six-frame-contact-sheet.png) and [poster](../artifacts/poster.png) were visually inspected. The source images were generated for the artwork and edited sequentially; see [asset provenance](ASSET-PROVENANCE.md).

## Remaining artistic decisions

The artist directed the redesign, exact silence, anchors, material consequences and provisional final sentence, but has **not yet viewed and approved this MP4, these generated images or the mix**. Their image choice, audio judgment, final public credit and approval of submission text remain open in [ARTIST_DECISIONS.md](../ARTIST_DECISIONS.md). The competition entry has not been submitted.

Vercel MCP, Vercel agent-browser and the requested Vercel/Remotion skills were unavailable. Vercel CLI, local Playwright Chrome, the Codex in-app browser and Remotion CLI were used and are named accurately here.
