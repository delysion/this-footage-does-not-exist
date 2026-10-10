"""Inspect the rendered MP4's streams and decoded sound around the hard cut."""
import json
import math
import struct
import subprocess
import wave
from pathlib import Path

root = Path(__file__).parent
ffdir = root / 'node_modules' / '@remotion' / 'compositor-win32-x64-msvc'
video = root / 'artifacts' / 'eleven-seconds-zero-frames.mp4'
meta = json.loads(subprocess.check_output([str(ffdir / 'ffprobe.exe'), '-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate', '-of', 'json', str(video)]))
decoded = root / 'artifacts' / 'qa-audio.wav'
subprocess.check_call([str(ffdir / 'ffmpeg.exe'), '-v', 'error', '-i', str(video), '-ac', '1', '-ar', '48000', '-y', str(decoded)])
with wave.open(str(decoded), 'rb') as source:
    pcm = source.readframes(source.getnframes())
decoded.unlink()
rate = 48000
def rms(second):
    chunk = pcm[int(second * rate) * 2:int((second + .5) * rate) * 2]
    samples = struct.unpack('<' + 'h' * (len(chunk) // 2), chunk)
    return round(math.sqrt(sum(s * s for s in samples) / len(samples)) / 32768, 7)
report = {'duration': float(meta['format']['duration']), 'bytes': int(meta['format']['size']), 'streams': meta['streams'], 'audio_rms': {str(t): rms(t) for t in (11, 22, 33, 44, 49, 50.5, 55, 60.5, 61.5, 70)}}
print(json.dumps(report, indent=2))
