# QA report

Updated 10 October 2026. This report covers local production output. No Vercel deployment or public URL is claimed.

## Website

- `npm install` completed; npm audit reported 0 vulnerabilities.
- `npm run build` completed successfully with Vite 6.4.4 and emitted static files into `dist/`.
- Tested the local production website in real Chrome via Playwright at 1440 × 900 desktop, 768 × 1024 tablet and 390 × 844 mobile.
- Visited Romance, Security, Revolution and Commerce and verified their distinguishing copy and repeated time/room anchors. Tested Enter, arrow-key previous/next, chapter controls, pause/play, sound toggle, original reveal, replay and hard refresh.
- Emulated reduced motion and verified animation duration becomes 0.00001 seconds.
- No page or console errors, no HTTP responses ≥400, no external network asset calls and no horizontal overflow at desktop/tablet/mobile sizes.
- Initial Security screenshot revealed an overlay/caption collision; the tracking label was moved inside the reticle. Final original scene clears the header and chapter navigation.
- Screenshots are in `screenshots/`: desktop opening and four reconstructions, mobile opening and reveal, tablet Security, desktop reveal, a playing MP4 frame and sampled film frames at seconds 9/20/31/42/56.

## MP4

- Rendered with Remotion to `artifacts/this-footage-does-not-exist.mp4` (6.2 MB).
- `ffprobe` identified H.264 video at 1600 × 900, AAC audio, and a 60.011-second container duration.
- Opened in real Chrome; metadata loaded (`readyState` 4, 60.011 sec, 1600 × 900) and playback advanced 1.76 sec. Saved a browser capture of the playing file.
- Sampled and visually inspected the closing frame and final scene stills. Final reveal is silent in the score (the AAC stream otherwise carries the original synthesized tone bed).

## Remaining external / human gates

- Vercel CLI works through `npx`, but `npx vercel whoami` reported “Logged out.” No Vercel MCP, agent-browser, web-design-guidelines skill or Remotion agent skill is available. Preview and production deployment, deployment logs and unauthenticated public-URL access therefore remain unverified.
- GitHub search connector is present but has no repository creation operation; `gh` CLI is unavailable and no `git remote` is configured. Source is committed locally; no GitHub URL is claimed.
- Competition submission was not attempted. The [judging gate](https://conveneo.eu/artprize/help/judging) requires personal rights and authorship declarations. The artist decision sheet and AI Usage Notes remain drafts for the artist's review; no authorship choices or artist name were invented.
- The manuscript was not present in the workspace, so the artwork used only the conceptual constraints and directions supplied in the brief.
