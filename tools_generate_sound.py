"""Generate the original four-part score. The absent source interval is silent."""
import math
import wave
from pathlib import Path

RATE = 48000
DURATION = 60
SEGMENTS = [(6, 17), (17, 28), (28, 39), (39, 50)]

out = Path(__file__).parent / "public" / "tone-bed.wav"
with wave.open(str(out), "wb") as audio:
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(RATE)
    for n in range(RATE * DURATION):
        sec = n / RATE
        amp = 0.0
        for cut, (start, end) in enumerate(SEGMENTS):
            if start <= sec < end:
                local = sec - start
                envelope = min(1.0, local / 1.2, (end - sec) / 1.1)
                if cut == 0:  # uncertain, breathing interval
                    swell = 0.62 + 0.38 * math.sin(local * 0.48) ** 2
                    amp = swell * (0.024 * math.sin(2 * math.pi * 110 * sec)
                                   + 0.009 * math.sin(2 * math.pi * 164.81 * sec))
                elif cut == 1:  # the institution imposes an artificial pulse
                    pulse_phase = local % 0.72
                    beep = max(0.0, 1.0 - abs(pulse_phase - 0.07) / 0.07)
                    amp = 0.023 * math.sin(2 * math.pi * 55 * sec)
                    amp += 0.014 * beep * math.sin(2 * math.pi * 880 * sec)
                elif cut == 2:  # a crowd suggested by accumulating low beats
                    beat = max(0.0, math.sin(2 * math.pi * (1.1 + local * 0.025) * local)) ** 7
                    amp = 0.022 * math.sin(2 * math.pi * 73.42 * sec)
                    amp += 0.018 * beat * math.sin(2 * math.pi * 146.84 * sec)
                else:  # unnaturally immaculate product sonority
                    amp = 0.016 * math.sin(2 * math.pi * 164.81 * sec)
                    amp += 0.008 * math.sin(2 * math.pi * 329.62 * sec)
                    amp += 0.002 * math.sin(2 * math.pi * 659.25 * sec)
                amp *= envelope
                break
        audio.writeframesraw(int(max(-1, min(1, amp)) * 32767).to_bytes(2, "little", signed=True))
print(out)
