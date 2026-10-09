# THIS FOOTAGE DOES NOT EXIST

An interactive cinematic artwork. Eleven seconds were never recorded. Four institutions made the gap mean four incompatible things.

## Run

Requires Node.js 20+ and npm. No backend, account, tracking, or runtime AI service is used.

```sh
npm install
npm run dev
```

Production build: `npm run build`. The single-page experience is static and can be served from Vercel or any static host. All illustrations, styles and sound are local. System fonts provide fallbacks; there are no external runtime asset calls.

## Film

The authored Remotion composition is 60 seconds at 24 fps. [Download the rendered MP4](artifacts/this-footage-does-not-exist.mp4). Generate the original synthetic score with `python tools_generate_sound.py`, then render with `npm run render`. Rendering requires local Chrome and Remotion's FFmpeg binary. The distributed `public/tone-bed.wav` is the generated 60-second original score.

## Artistic structure

The doorway, two indistinct bodies, fallen shoe and precise 02:17:08–02:17:19 interval recur in each interpretation. The romance version treats the figures as intimate; security assigns hostile intent; revolution places them before a crowd; commerce prices a private memory. The original request clears the image and leaves a trace of the doorway in darkness.

## Authorship review

Codex generated the initial source, copy, vector composition, sound code and editorial sequence from the artist's brief. Before entry, the artist still needs to review and record specific choices about the final imagery, edit timing, sound, language and competition description. See [docs/ARTIST-DECISIONS.md](docs/ARTIST-DECISIONS.md) and [docs/AI-USAGE-NOTES.md](docs/AI-USAGE-NOTES.md). Do not use the notes as a claim that the artist has made choices not yet recorded.
