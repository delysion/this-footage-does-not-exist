# ELEVEN SECONDS. ZERO FRAMES.

*Four histories of an event no camera ever saw.* An interactive cinematic artwork with two reviewable film endings for the Human After All Prize 2026.

The [source repository](https://github.com/delysion/this-footage-does-not-exist) is private. The public artwork is at [eleven-seconds-zero-frames.vercel.app](https://eleven-seconds-zero-frames.vercel.app/); deployment and production verification are tracked in [the QA report](docs/QA-REPORT.md).

## Run

Requires Node.js 20+ and npm. No backend, login, analytics, external font, paid API or runtime AI model is used.

```sh
npm install
npm run dev
```

Build with `npm run build`. The static output is `dist/`. Eight original AI-assisted source images are in `assets/source/`; locally optimized web assets are in `public/art/`. `tools_optimize_images.py` regenerates them and requires Pillow; the supplied WebPs work without Python. The four institutional edits are in `src/ui/GestureShot.tsx`; the later action at the glass is in `src/ui/AftermathAction.tsx`. Website sound is synthesized locally and opt-in. Remotion offers both compositions: `npm run render` writes [ending B](artifacts/ending-B-action.mp4), while `npm run render:a` writes [ending A](artifacts/ending-A-existing.mp4). Contact-sheet and poster scripts use Playwright with an installed Chrome browser.

## Experience

The four cuts replay the same eleven seconds at 02:17:08–02:17:19. One monumental hall, red doorway, two figures, reaching gesture and damaged black shoe persist. The same pair of hands performs a reach and withdrawal; each institution recuts it as a held memory, a tracked suspect, a multiplied emblem or a repeatable commodity. Each also changes the *room*: a memorial, forensic packaging, banners, then a luxury vitrine accumulate around the shoe. Changing chapters preserves the timecode. Requesting the original abruptly clears image and sound. A minimal clock measures eleven real seconds in blackness. In the website and ending B, the altered room then returns at a later time. A hand reaches for the shoe, stops at the vitrine glass and withdraws. There is no final slogan. Ending A retains the previous room, shoe and written verdict for comparison. [Narrative provenance](docs/NARRATIVE-PROVENANCE.md) distinguishes the unrecorded interval from the later room.

Arrow keys change reconstructions, Space pauses or plays when the page has focus, and Escape returns to the opening. Visible controls provide the same actions. A reduced-motion setting holds each image still while preserving automatic chapter progression and the artist's eleven-second final interval.

## Review and evidence

- [Before/after art audit](ART_AUDIT.md)
- [Official gallery comparison](COMPETITIVE_AUDIT.md)
- [Six-frame visual contact sheet](artifacts/six-frame-contact-sheet.png) and [poster](artifacts/poster.png)
- [Four-edit gesture sheet from browser captures](artifacts/gesture-edit-contact-sheet.png) and [film frame verification sheet](artifacts/film-verification-contact-sheet.png)
- [Ending A film](artifacts/ending-A-existing.mp4) and [ending B film](artifacts/ending-B-action.mp4), with three extracted key frames each under `artifacts/endings/`
- [Artist decision sheet](ARTIST_DECISIONS.md)
- [Truthful draft AI Usage Notes](docs/AI-USAGE-NOTES.md)
- [Competition description](docs/COMPETITION-DESCRIPTION.md)
- [QA report](docs/QA-REPORT.md) and [latest production browser screenshots](screenshots-production-gesture/)

Codex implemented the code, generated and edited the fictional still imagery with AI assistance, composed the sound and film, and documented the process under the artist's detailed directions. The artist authorized public website release and made the eleven seconds of silence a specific final direction. The artist has **not yet reviewed and approved the updated MP4, images or audio mix**. That review and competition submission approval must not be represented as complete.
