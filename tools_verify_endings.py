"""Verify the actual exports and decoded audio of both editorial endings."""
from pathlib import Path
import json
import math
import struct
import subprocess
import wave

root = Path(__file__).parent
binary = root / 'node_modules' / '@remotion' / 'compositor-win32-x64-msvc'

def audio_rms(pcm: bytes, start: float) -> float:
    pcm = pcm[int(start * 48000) * 2:int((start + 0.5) * 48000) * 2]
    samples = struct.unpack('<' + 'h' * (len(pcm) // 2), pcm)
    return round(math.sqrt(sum(value * value for value in samples) / len(samples)) / 32768, 7)

for name in ('ending-A-existing.mp4', 'ending-B-action.mp4'):
    video = root / 'artifacts' / name
    decoded = root / 'artifacts' / 'qa-audio.wav'
    subprocess.check_call([str(binary / 'ffmpeg.exe'), '-v', 'error', '-i', str(video), '-ac', '1', '-ar', '48000', '-y', str(decoded)])
    with wave.open(str(decoded), 'rb') as source:
        pcm = source.readframes(source.getnframes())
    decoded.unlink()
    meta = json.loads(subprocess.check_output([
        str(binary / 'ffprobe.exe'), '-v', 'error',
        '-show_entries', 'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate',
        '-of', 'json', str(video)
    ]))
    print(json.dumps({
        'file': name,
        'duration': float(meta['format']['duration']),
        'bytes': int(meta['format']['size']),
        'streams': meta['streams'],
        'audio_rms': {str(t): audio_rms(pcm, t) for t in (11, 33, 49, 50.5, 55, 60.5, 61.5, 67, 70)},
    }, indent=2))
