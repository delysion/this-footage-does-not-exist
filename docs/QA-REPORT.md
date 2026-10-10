# QA report

Updated 10 October 2026. This report covers local output and an authenticated Vercel Preview. The production project is paused; no working public URL is claimed.

## Website

- `npm install` completed; npm audit reported 0 vulnerabilities.
- `npm run build` completed successfully with Vite 6.4.4 and emitted static files into `dist/`.
- Tested the local production website in real Chrome via Playwright at 1440 × 900 desktop, 768 × 1024 tablet and 390 × 844 mobile.
- Visited Romance, Security, Revolution and Commerce and verified their distinguishing copy and repeated time/room anchors. Tested Enter, arrow-key previous/next, chapter controls, pause/play, sound toggle, original reveal, replay and hard refresh.
- Emulated reduced motion and verified animation duration becomes 0.00001 seconds.
- No page or console errors, no HTTP responses ≥400, no external network asset calls and no horizontal overflow at desktop/tablet/mobile sizes.
- Initial Security screenshot revealed an overlay/caption collision; the tracking label was moved inside the reticle. Final original scene clears the header and chapter navigation.
- Screenshots are in `screenshots/`: desktop opening and four reconstructions, mobile opening and reveal, tablet Security, desktop reveal, a playing MP4 frame and sampled film frames at seconds 9/20/31/42/56.

## Vercel deployment

- Vercel CLI 63.1.2 authenticated as `delysion`; project `this-footage-does-not-exist` was created and connected to the private GitHub repository.
- The current [Preview deployment](https://this-footage-does-not-exist-3zj0zok5c-delysions-projects.vercel.app) (`dpl_CxZcjKwP9eBqJeQ172KK7vqUBVYU`) reports `Ready`, target `preview`. Its remote Vite/TypeScript build completed successfully with 0 npm audit vulnerabilities.
- Opened the actual Preview in the authenticated in-app browser. At desktop width, used keyboard Right to visit Romance, Security, Revolution and Commerce; opened the original absence, then replayed. Pause/play and sound toggle changed state correctly. Captured visual screenshots in the browser session of the opening, four scenes, final reveal and mobile views.
- At 390 × 844, checked opening, Romance, original reveal and controls. Raised mobile chapter/control type from 7–8 px to 10 px after seeing the first Preview, deployed the revision, and checked the new 10 px computed size. On the revised Preview, fonts loaded, no horizontal overflow or browser console errors occurred; hard refresh restored the opening.
- The Preview returns an SSO redirect to an unauthenticated HTTP client, as expected. Vercel injects its own feedback script into the authenticated Preview; the authored site has no analytics or tracking code. The production alias initially served the first deployment publicly because Vercel assigns a project's first CLI deployment to production. The project was immediately paused: an unauthenticated request to `https://this-footage-does-not-exist.vercel.app` returned HTTP 503 with `DEPLOYMENT_PAUSED`. The authenticated Preview continued to load after the pause.

## MP4

- Rendered with Remotion to `artifacts/this-footage-does-not-exist.mp4` (6.2 MB).
- `ffprobe` identified H.264 video at 1600 × 900, AAC audio, and a 60.011-second container duration.
- Opened in real Chrome; metadata loaded (`readyState` 4, 60.011 sec, 1600 × 900) and playback advanced 1.76 sec. Saved a browser capture of the playing file.
- Sampled and visually inspected the closing frame and final scene stills. Final reveal is silent in the score (the AAC stream otherwise carries the original synthesized tone bed).

## Remaining external / human gates

- The production project remains paused pending the artist's review and explicit publication approval. The current production deployment contains an older commit than the tested Preview; production must be updated, resumed and tested without authentication before claiming a public release.
- Vercel MCP, agent-browser and requested Vercel/Remotion skills were unavailable in this Codex environment. Vercel CLI and the authenticated in-app browser were used for the actual deployment and QA.
- Source and MP4 were pushed to the private [GitHub repository](https://github.com/delysion/this-footage-does-not-exist). The connected GitHub tool read `README.md` from its default branch, and `git ls-remote` confirmed the remote `main` commit matched the local commit. GitHub access requires an authorized account while the repository is private.
- Competition submission was not attempted. The [judging gate](https://conveneo.eu/artprize/help/judging) requires personal rights and authorship declarations. The artist decision sheet and AI Usage Notes remain drafts for the artist's review; no authorship choices or artist name were invented.
- The manuscript was not present in the workspace, so the artwork used only the conceptual constraints and directions supplied in the brief.
