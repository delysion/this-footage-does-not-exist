"""Assemble previously decoded film QA frames into one inspection image."""
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).parent / "artifacts"
ffmpeg = Path(__file__).parent / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"
video = root / "eleven-seconds-zero-frames.mp4"
times = ["3", "11", "22", "33", "44", "50_2", "55", "60_5", "61_5", "66", "70", "72_5"]
thumb_w, thumb_h = 400, 225
out = Image.new("RGB", (thumb_w * 4, (thumb_h + 26) * 3), "#0b0908")
draw = ImageDraw.Draw(out)
for n, stamp in enumerate(times):
    decoded = root / f"verify-{stamp}.png"
    subprocess.check_call([str(ffmpeg), '-v', 'error', '-ss', stamp.replace('_', '.'), '-i', str(video), '-frames:v', '1', '-y', str(decoded)])
    frame = Image.open(decoded).convert("RGB")
    frame = frame.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
    x, y = (n % 4) * thumb_w, (n // 4) * (thumb_h + 26)
    out.paste(frame, (x, y))
    decoded.unlink()
    draw.text((x + 8, y + thumb_h + 5), stamp.replace("_", ".") + " sec", fill="#e9dfd1")
target = root / "film-verification-contact-sheet.png"
out.save(target)
print(target)
