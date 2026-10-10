# ELEVEN SECONDS. ZERO FRAMES.

*Four histories of an event no camera ever saw.* An interactive cinematic artwork and 73-second film for the Human After All Prize 2026.

The [source repository](https://github.com/delysion/this-footage-does-not-exist) is private. The artist authorized release at the existing [Vercel production domain](https://this-footage-does-not-exist.vercel.app/); deployment and production verification are tracked in [the QA report](docs/QA-REPORT.md).

## Run

Requires Node.js 20+ and npm. No backend, login, analytics, external font, paid API or runtime AI model is used.

```sh
npm install
npm run dev
```

Build with `npm run build`. The static output is `dist/`. The seven original, AI-assisted master-scene images are in `assets/source/`; locally optimized web assets are in `public/art/`. `tools_optimize_images.py` regenerates them and requires Pillow; the supplied WebPs work without Python. The scene edit and camera movement are in `src/ui/SceneArtwork.tsx`, `src/ui/style.css` and `src/video/video.tsx`. Website sound is synthesized locally and opt-in. The film uses Remotion; run `python tools_generate_sound.py` and `npm run render` to regenerate [the MP4](artifacts/eleven-seconds-zero-frames.mp4). Contact-sheet and poster scripts use Playwright with an installed Chrome browser.

## Experience

The four cuts replay the same eleven seconds at 02:17:08–02:17:19. One monumental hall, red doorway, two figures, reaching gesture and damaged black shoe persist. Each institution changes the *room*: a memorial, forensic packaging, banners, then a luxury vitrine accumulate around the shoe. Changing chapters preserves the timecode. Requesting the original abruptly clears image and sound. A minimal clock measures eleven real seconds in blackness. The transformed room then returns, with no figures and all residues intact, before the final line.

Arrow keys change reconstructions, Space pauses or plays when the page has focus, and Escape returns to the opening. Visible controls provide the same actions. A reduced-motion setting stops the moving reconstruction but retains the artist's eleven-second final interval.

## Review and evidence

- [Before/after art audit](ART_AUDIT.md)
- [Official gallery comparison](COMPETITIVE_AUDIT.md)
- [Six-frame visual contact sheet](artifacts/six-frame-contact-sheet.png) and [poster](artifacts/poster.png)
- [Artist decision sheet](ARTIST_DECISIONS.md)
- [Truthful draft AI Usage Notes](docs/AI-USAGE-NOTES.md)
- [Competition description](docs/COMPETITION-DESCRIPTION.md)
- [QA report](docs/QA-REPORT.md) and [browser screenshots](screenshots/)

Codex implemented the code, generated and edited the fictional still imagery with AI assistance, composed the sound and film, and documented the process under the artist's detailed directions. The artist authorized public website release and made the eleven seconds of silence a specific final direction. The artist has **not yet reviewed and approved the updated MP4, images or audio mix**. That review and competition submission approval must not be represented as complete.
