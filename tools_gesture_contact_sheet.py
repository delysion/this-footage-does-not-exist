"""Combine actual browser captures of the four edits for visual review."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).parent
source = root / "screenshots-gesture-late"
names = ("romance", "security", "revolution", "commerce")
width, height, label_height = 800, 500, 42
sheet = Image.new("RGB", (width * 2, (height + label_height) * 2), "#090806")
draw = ImageDraw.Draw(sheet)
for index, name in enumerate(names):
    shot = Image.open(source / f"{name}.png").convert("RGB")
    shot.thumbnail((width, height), Image.Resampling.LANCZOS)
    x = index % 2 * width
    y = index // 2 * (height + label_height)
    sheet.paste(shot, (x, y))
    draw.text((x + 20, y + height + 11), name.upper(), fill="#ddd0bb")
target = root / "artifacts" / "gesture-edit-contact-sheet.png"
sheet.save(target)
print(target)
