"""Convert the selected original frames to local WebP delivery assets."""
from pathlib import Path
from PIL import Image

root = Path(__file__).parent
for source in sorted((root / "assets" / "source").glob("*-v2.png")):
    out = root / "public" / "art" / f"{source.stem}.webp"
    with Image.open(source) as image:
        image.convert("RGB").save(out, "WEBP", quality=84, method=6)
    print(f"{out.name}: {out.stat().st_size:,} bytes")
