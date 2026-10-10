# Production log

## 2026-10-10 · Milestone 1 — workspace/tool audit
- Workspace contained only an initialized, empty Git repository; no manuscript attachment was present.
- Vercel MCP, agent-browser, and the requested Vercel / Remotion skills are unavailable. Vercel CLI is not installed globally but can run through `npx`; Node/npm and Git are available, while system FFmpeg is not on PATH.
- Prize manifesto, judging checks and submission form reviewed. Submission requires a verified participant email, rights/authorship declarations and explicit human authorship notes; no entry submitted.

## 2026-10-10 · Milestone 2 — first playable website
- Started a React + Vite + TypeScript single-page installation with four linked reconstructions sharing a red doorway, two figures, fallen shoe and the fixed 02:17:08–02:17:19 gap.
- Added keyboard/visible controls, a silence-first Web Audio tone palette, pause control, original-footage absence, replay and reduced-motion handling.
- Visual artwork is authored SVG and CSS in the project; no external generated images or runtime generation calls.
- Pending: dependency install/build, browser QA, production video composition/render, Vercel preview/production, screenshots, GitHub remote, ZIP, and artist review of human authorship choices.

## 2026-10-10 · Milestone 3 — local QA and artistic review
- `npm install` completed (0 vulnerabilities); local Vite production build succeeds.
- Desktop/mobile Playwright pass completed at 1440×900 and 390×844; scene navigation, keyboard arrows, pause/play, sound toggle, reveal, replay, hard refresh and reduced-motion behavior verified. No page/console errors, HTTP failures, external asset calls or horizontal overflow. Screenshots saved under `screenshots/`.
- Reviewed the published six judging pillars, submission gate, and visible public gallery examples. A single-agent adversarial review is documented; it identified open-gap imagery as a nearby existing motif and distinguishes this work through its repeated common record and four institutional claims.
- First MP4 render completed and was inspected; corrected two title/reveal graphics found in its frames before starting the final render.
- Vercel CLI can run through `npx`, but `whoami` is logged out. No Vercel MCP, agent-browser or specified skills are available. GitHub connector has no repository-creation action and the local repository has no remote.
- Still pending: final MP4 verification, ZIP/local commit, artist's recorded review, Vercel authentication, Preview and Production deployment.

## 2026-10-10 · Milestone 4 — final local package
- Final MP4 rendered with Remotion after correcting the reveal; 60.011 seconds, H.264 1600×900 with an AAC score. Confirmed browser playback advanced and inspected sampled frames.
- Final website rebuilt and rerun through Chrome QA at desktop/tablet/mobile. No errors, external requests or overflow. Reduced motion and all controls passed.
- Competition description, draft AI Usage Notes, artist decision sheet, six-pillar adversarial review and evidence-based QA report are saved under `docs/`.
- Created `THIS_FOOTAGE_DOES_NOT_EXIST_package.zip` with project source, local assets, MP4, screenshots and documentation; committed source as a local Git repository.
- Remaining gates: artist review; Vercel login for Preview; separate authorization for public Production deployment. No entry submitted.

## 2026-10-10 · Milestone 5 — GitHub source control
- Created the private GitHub repository `delysion/this-footage-does-not-exist` using the account's stored Git credential. Set local branch to `main`, added `origin`, and pushed the full committed project.
- Verified GitHub's repository metadata through the connected GitHub tool and confirmed that `refs/heads/main` on the remote equals local commit `f4285abe2deda397c5c8708eaea39acb9016d41f`.
- The repository is private pending a deliberate decision to release the source publicly. Vercel authentication, deployment, public URL verification, and artist review remain pending.

## 2026-10-10 · Milestone 6 — authenticated Vercel Preview
- Signed in to Vercel CLI as `delysion`, created project `this-footage-does-not-exist`, and connected the private GitHub repository.
- Vercel assigned the first CLI deployment to production automatically. Its alias was briefly publicly reachable before the project was paused. Verified the production alias now returns HTTP 503 `DEPLOYMENT_PAUSED`; Preview deployments remain available through Vercel authentication.
- Created and inspected the explicit Preview deployment `dpl_CxZcjKwP9eBqJeQ172KK7vqUBVYU`, which passed its remote build. Tested its actual URL in the authenticated browser at desktop and 390 px mobile sizes, including all four reconstructions, keyboard navigation, reveal, replay, pause, sound, refresh, fonts, overflow and console errors.
- Revised the opening to state `EVENT 011 — 11 SECONDS MISSING`, corrected a footer that said frames instead of seconds, and increased mobile control type to 10 px. Built locally, pushed the revision to GitHub and verified it on the second Preview.
- Pending: artist's documented editorial review and explicit public-release approval; update production to the tested revision, resume the project, then test its unauthenticated public URL.

## 2026-10-10 · Milestone 7 — new-title audit
- The artist directed a substantial revision under the new public title `ELEVEN SECONDS. ZERO FRAMES.` while preserving the existing codebase and Vercel domain.
- Opened the production URL in a real browser and confirmed its intentional `503 DEPLOYMENT_PAUSED` state. Audited the authenticated Preview at 1440 × 900 and 390 × 844, captured opening/four-scene/final screenshots, inspected sound and motion code, and wrote `ART_AUDIT.md` before editing the implementation.
- Five priority weaknesses: near-static timing, weak common anchor/gesture (especially Revolution), caption-driven institutional identity, premature explanatory reveal, and inconsistent old-title/publication state.

## 2026-10-10 · Milestone 8 — revised artwork and local QA
- Replaced the scene-specific loops with one shared eleven-second reaching action in `SceneArtwork.tsx`. The red door, two figures, damaged black shoe and timestamp recur across Romance, Security, Revolution and Commerce. Direct chapter changes preserve the current timecode.
- Updated the public title/subtitle, typographic treatments, sound synthesis and staged zero-frame absence. Revolution's crowd was moved around the shared figures after screenshot review.
- Local Vite build passed. Automated Chromium checks at 1440×900, 768×1024 and 390×844 passed for chapters, pause/play, sound, keyboard navigation, reveal, replay, hard refresh, reduced motion, no overflow and no page/console/HTTP errors. Screenshots and OG preview image saved.
- Attempted revised Vercel Preview `dpl_vitFbLuxehWoDHVCEVrFBxCiioNo`; Vercel marked it Blocked because the project is paused. Resuming would expose the existing production alias, so no unapproved change to public access was made.

## 2026-10-10 · Milestone 9 — film and submission draft
- Reworked Remotion to reuse the website's actual shared SVG action. Rendered `artifacts/eleven-seconds-zero-frames.mp4` (60.011s, 1600×900 H.264/AAC, 7.8MB) and inspected sampled frames. Opened the MP4 in a browser; playback advanced with no media error.
- Updated README, competition description, AI Usage Notes, artist decision sheet, six-pillar adversarial review and QA report. The artist's latest title, subtitle, anchor and ending instructions are recorded as genuine human directions; final review and publication authorization remain pending.

## 2026-10-10 · Milestone 10 — source and handoff
- Decoded the rendered MP4 audio: normalized RMS was 0.008342 in a reconstruction and 0.0 in the final absence. Final local production build and full Chromium QA passed.
- Built and inspected `ELEVEN_SECONDS_ZERO_FRAMES_package.zip`, containing source, local assets, film, screenshots and documentation without `node_modules` or build output.
- Pushed the revised project to the existing private GitHub repository and verified the remote `main` ref matched the local commit. Vercel's automatic Production deployment remains Blocked while the project is paused; the public alias still returns 503.
- Asked the artist for explicit authorization to reactivate the Vercel project and for specific final editorial input. Neither approval nor a completed artist review has been recorded yet.

## 2026-10-10 · Milestone 11 — artist-directed final cut
- The artist authorized reactivation and public release of the existing Vercel project. They made a specific editorial decision: a hard audiovisual cut on `SHOW ORIGINAL FOOTAGE`, eleven real seconds of black and a minimal `00:00` to `00:11` clock, then `ORIGINAL FRAMES RECOVERED: 0`, followed by `FOUR HISTORIES. ZERO FRAMES.` No narration, glitch, music or explanatory text in the ending. The artist confirmed the common red doorway, ambiguous figures and damaged shoe. Final approval of the new MP4, images and mix remains pending their own viewing.
- Implemented the revised website and Remotion finale. Local production build and real Chromium QA passed at desktop/tablet/mobile; the zero line appeared 11,118 ms after the test's pre-click timestamp. A frame at five seconds showed only the clock. Reduced motion, controls and hard refresh passed without console, asset or overflow errors.
- Re-rendered and played the new 66.005-second H.264/AAC MP4. Inspected extracted frames across the silent interval and ending. Decoded audio measured zero RMS during the final interval, with sound present before the cut.
- Committed and pushed the revised film/source as `b9faf1e` on GitHub `main`.
- Attempted the authorized Vercel resume. Vercel CLI returned `action_required / confirmation_required`: the owner must run and confirm `vercel project resume this-footage-does-not-exist` in an interactive terminal. Asked the artist to perform that service-side confirmation. Production still returned `503 DEPLOYMENT_PAUSED` when checked; Preview and Production verification remain pending.
- Tightened the browser timing check to measure from the actual click event with `performance.now()` and a DOM observer. The revised Chromium pass measured **11,003 ms** to the zero-frame line, passed every control at desktop/tablet/mobile and reported no console/network errors. Rebuilt the delivery ZIP with the new 66-second film and 66 project files.
- Moved audio gain termination into the original-footage click handler for an immediate sound cut. Production build and full Chromium QA passed again; the repeated measured interval was **11,006 ms** with no browser errors.
