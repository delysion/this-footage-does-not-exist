"""Generate the original, rights-clear electronic score used by the short film."""
import math
import wave
from pathlib import Path

RATE = 48000
DURATION = 60
FREQS = [0, 110.0, 55.0, 73.42, 164.81, 0]
SEGMENTS = [(0, 6), (6, 17), (17, 28), (28, 39), (39, 50), (50, 60)]

out = Path(__file__).parent / "public" / "tone-bed.wav"
with wave.open(str(out), "wb") as audio:
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(RATE)
    for n in range(RATE * DURATION):
        sec = n / RATE
        amp = 0.0
        for (start, end), hz in zip(SEGMENTS, FREQS):
            if start <= sec < end and hz:
                local = sec - start
                envelope = min(1.0, local / 1.8, (end - sec) / 2.0)
                pulse = 0.55 + 0.45 * math.sin(local * 0.42) ** 2
                amp = 0.032 * envelope * pulse * math.sin(2 * math.pi * hz * sec)
                amp += 0.004 * envelope * math.sin(2 * math.pi * (hz * 1.5) * sec)
                break
        audio.writeframesraw(int(max(-1, min(1, amp)) * 32767).to_bytes(2, "little", signed=True))
print(out)
