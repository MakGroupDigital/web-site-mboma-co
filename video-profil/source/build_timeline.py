"""Cut the two VO takes into lines, time-stretch slightly, lay them on a 110 s timeline.
Writes timeline.json (scene + word times) and vo_track.wav."""
import json, subprocess, os, tempfile
import numpy as np, scipy.io.wavfile as wf

HERE = os.path.dirname(os.path.abspath(__file__))
VO = os.path.join(HERE, 'vo')
SR = 44100
TEMPO = 1.04
TOTAL = 110.0
PRE, POST = 0.06, 0.22

words = {'M': json.load(open(f'{VO}/m_words.json'))['words'],
         'F': json.load(open(f'{VO}/f_words.json'))['words']}
src = {'M': f'{VO}/voix_homme_canalplus.mp3', 'F': f'{VO}/voix_femme_canalplus.mp3'}

# (id, voice, first word index text, src start, src end, gap before)
SEGS = [
    ('intro',     'M', 0.08, 7.14, 1.2),
    ('institution', 'F', 0.12, 8.62, 0.32),
    ('partenaire', 'M', 7.74, 18.68, 0.3),
    ('expertises', 'F', 9.20, 22.02, 0.3),
    ('methode',   'M', 19.24, 32.90, 0.3),
    ('terrain',   'F', 22.64, 41.80, 0.3),
    ('impact',    'M', 33.48, 46.78, 0.3),
    ('valeurs',   'F', 42.40, 53.08, 0.3),
    ('logo',      'M', 47.34, 50.94, 0.7),
    ('trace',     'F', 53.52, 56.24, 0.45),
]

track = np.zeros(int(TOTAL * SR) + SR, dtype=np.float32)
t = 0.0
out_segs, out_words = [], []
for i, (sid, v, a, b, gap) in enumerate(SEGS):
    t += gap
    ss, ee = a - PRE, b + POST
    tmp = os.path.join(tempfile.gettempdir(), f'mboma_seg_{i}.wav')
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{ss:.3f}', '-to', f'{ee:.3f}', '-i', src[v],
                    '-af', f'atempo={TEMPO},afade=t=in:d=0.03,afade=t=out:st={(ee-ss)/TEMPO-0.12:.3f}:d=0.12',
                    '-ac', '1', '-ar', str(SR), tmp], check=True)
    _, x = wf.read(tmp)
    x = x.astype(np.float32) / 32768
    i0 = int(t * SR)
    track[i0:i0 + len(x)] += x
    g0 = t + PRE / TEMPO  # global time of src time a
    seg_len = (b - a) / TEMPO
    out_segs.append({'id': sid, 'voice': v, 'start': round(g0, 3), 'end': round(g0 + seg_len, 3)})
    for w in words[v]:
        if w['type'] == 'word' and a - 0.01 <= w['start'] <= b + 0.01:
            out_words.append({'seg': sid, 'text': w['text'],
                              'start': round(g0 + (w['start'] - a) / TEMPO, 3),
                              'end': round(g0 + (w['end'] - a) / TEMPO, 3)})
    t = g0 + seg_len + POST / TEMPO

print('speech ends at', round(t, 2))
track = track[:int(TOTAL * SR)]
wf.write(os.path.join(HERE, 'vo_track.wav'), SR, (np.clip(track, -1, 1) * 32767).astype(np.int16))

# scene boundaries: each scene starts slightly before its line
scenes = []
for k, s in enumerate(out_segs):
    st = 0.0 if k == 0 else round(s['start'] - 0.35, 3)
    scenes.append({'id': s['id'], 'start': st})
# end card after "trace"
scenes.append({'id': 'endcard', 'start': round(out_segs[-1]['end'] + 0.9, 3)})
for k in range(len(scenes)):
    scenes[k]['end'] = scenes[k + 1]['start'] if k + 1 < len(scenes) else TOTAL

tl = {'total': TOTAL, 'fps': 30, 'segments': out_segs, 'scenes': scenes, 'words': out_words}
json.dump(tl, open(os.path.join(HERE, 'timeline.json'), 'w'), ensure_ascii=False, indent=1)

seg = {s['id']: s for s in out_segs}
sc = {s['id']: s for s in scenes}
cues = {
    'duration': TOTAL,
    'hits': [0.0] + [sc[k]['start'] for k in ('institution', 'expertises', 'terrain', 'impact', 'valeurs')] + [sc['logo']['start'] + 0.35],
    'whooshes': [s['start'] for s in scenes[1:]],
    'risers': [sc['logo']['start'] + 0.35],
    'arp_in': sc['institution']['start'],
    'drums_in': sc['partenaire']['start'],
    'drums_out': sc['logo']['start'] - 0.4,
    'final': sc['logo']['start'] + 0.35,
}
json.dump(cues, open(os.path.join(HERE, 'cues.json'), 'w'), indent=1)
for s in scenes: print(s)
