"""Make a portable source, film, screenshot and documentation archive."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).parent
out = root / "ELEVEN_SECONDS_ZERO_FRAMES_package.zip"
excluded_dirs = {".git", ".vercel", "node_modules", "dist", "out", "__pycache__"}

with ZipFile(out, "w", compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for file in sorted(root.rglob("*")):
        if not file.is_file():
            continue
        relative = file.relative_to(root)
        if any(part in excluded_dirs for part in relative.parts) or file.suffix == ".zip":
            continue
        archive.write(file, relative.as_posix())

print(f"{out} ({out.stat().st_size:,} bytes)")
