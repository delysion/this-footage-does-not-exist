# ELEVEN SECONDS. ZERO FRAMES.

*Four histories of an event no camera ever saw.* An interactive cinematic artwork and 60-second film for the Human After All Prize 2026.

The [source repository](https://github.com/delysion/this-footage-does-not-exist) is private. The existing [Vercel production domain](https://this-footage-does-not-exist.vercel.app/) is paused pending the artist's explicit publication approval. The latest attempted Preview was blocked by that project-wide pause; the revised site has been built and tested locally.

## Run

Requires Node.js 20+ and npm. No backend, login, analytics, external font, paid API or runtime AI model is used.

```sh
npm install
npm run dev
```

Build with `npm run build`. The static output is `dist/`. All principal artwork is authored SVG/CSS in `src/ui/SceneArtwork.tsx` and `src/ui/style.css`. Sound is synthesized locally and opt-in on the website. The authored film uses Remotion; run `python tools_generate_sound.py` and `npm run render` to regenerate [the MP4](artifacts/eleven-seconds-zero-frames.mp4).

## Experience

The four cuts replay the same eleven seconds at 02:17:08–02:17:19. A red doorway, two figures, their reaching gesture and a damaged black shoe stay in the same spatial relationship. Changing chapters preserves the timecode. The images clear completely when the original is requested; the soundtrack stops, the retrieval fails and the screen remains empty before the final two lines.

Arrow keys change reconstructions, Space pauses or plays when the page has focus, and Escape returns to the opening. Visible controls provide the same actions. A reduced-motion setting stops the moving interval and shows the final finding immediately.

## Review and evidence

- [Before/after art audit](ART_AUDIT.md)
- [Artist decision sheet](ARTIST_DECISIONS.md)
- [Truthful draft AI Usage Notes](docs/AI-USAGE-NOTES.md)
- [Competition description](docs/COMPETITION-DESCRIPTION.md)
- [QA report](docs/QA-REPORT.md) and [browser screenshots](screenshots/)

Codex implemented the code, vector scenes, sound and film under the artist's detailed creative directions. The artist has **not yet recorded final visual/audio review or approved public publication**. Those steps must not be represented as complete in a competition entry.
