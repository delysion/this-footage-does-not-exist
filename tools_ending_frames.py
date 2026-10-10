"""Extract three key frames from each completed MP4 for artist comparison."""
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw

root = Path(__file__).parent
output = root / "artifacts" / "endings"
output.mkdir(parents=True, exist_ok=True)
ffmpeg = root / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"
versions = {
    "A": ("ending-A-existing.mp4", [("room", 61.7), ("shoe", 66.2), ("verdict", 71.0)]),
    "B": ("ending-B-action.mp4", [("room", 61.7), ("glass-contact", 67.4), ("withdrawal", 69.5)]),
}
for version, (video_name, frames) in versions.items():
    video = root / "artifacts" / video_name
    if not video.is_file():
        raise FileNotFoundError(video)
    sheet = Image.new("RGB", (600 * 3, 338 + 34), "#080706")
    draw = ImageDraw.Draw(sheet)
    for index, (name, second) in enumerate(frames):
        target = output / f"ending-{version}-{index + 1:02d}-{name}.png"
        subprocess.check_call([str(ffmpeg), "-v", "error", "-ss", str(second), "-i", str(video), "-frames:v", "1", "-y", str(target)])
        frame = Image.open(target).convert("RGB").resize((600, 338), Image.Resampling.LANCZOS)
        sheet.paste(frame, (index * 600, 0))
        draw.text((index * 600 + 14, 347), f"{version} / {name.upper()} / {second:.1f}s", fill="#dfd3c4")
    sheet.save(output / f"ending-{version}-three-frames.png")
    print(version, video.stat().st_size, output / f"ending-{version}-three-frames.png")
