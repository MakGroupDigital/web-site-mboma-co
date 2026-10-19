"""Synthesised corporate/cinematic score for the MboMa & Co. profile film.
Usage: python3 music.py cues.json out.wav
cues.json: {"duration":110, "hits":[t...], "whooshes":[t...], "risers":[t_end...],
            "drums_in":20, "drums_out":96, "arp_in":8, "final":101}
"""
import json, sys
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt

SR = 44100
cues = json.load(open(sys.argv[1]))
DUR = cues["duration"]
N = int(DUR * SR)
rng = np.random.default_rng(7)
BPM = 100
BEAT = 60 / BPM
BAR = 4 * BEAT

def midi(n):
    return 440 * 2 ** ((n - 69) / 12)

# Dm - Bb - F - C  (2 bars each)
CHORDS = [[50, 53, 57, 62], [46, 50, 53, 58], [53, 57, 60, 65], [48, 52, 55, 60]]
ROOTS = [38, 34, 41, 36]

def chord_at(t):
    return int(t // (2 * BAR)) % 4

def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e

def lp(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), 'low', output='sos')
    return sosfilt(sos, x)

def hp(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), 'high', output='sos')
    return sosfilt(sos, x)

def bp(x, lo, hi):
    sos = butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band', output='sos')
    return sosfilt(sos, x)

def place(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i >= len(buf) or i + len(sig) <= 0: return
    j = min(len(buf), i + len(sig))
    s0 = max(0, -i)
    buf[max(i, 0):j] += sig[s0:j - i] * gain

def curve(points):
    """piecewise linear automation over the whole timeline"""
    ts = np.arange(N) / SR
    xs, ys = zip(*points)
    return np.interp(ts, xs, ys)

L = np.zeros(N); R = np.zeros(N)
revL = np.zeros(N); revR = np.zeros(N)

# ---------- PAD ----------
pad = np.zeros(N); pad2 = np.zeros(N)
seg = 2 * BAR
t = 0.0
while t < DUR:
    c = CHORDS[chord_at(t + 0.01)]
    n = int(min(seg + 1.2, DUR - t) * SR)
    if n <= 0: break
    tt = np.arange(n) / SR
    s1 = np.zeros(n); s2 = np.zeros(n)
    for k, note in enumerate(c):
        f = midi(note + 12 * (k == 0))
        for det, tgt in ((-0.11, s1), (0.11, s2)):
            ph = 2 * np.pi * f * (1 + det / 100) * tt + rng.uniform(0, 6)
            # soft saw from 6 partials
            w = sum(np.sin(h * ph) / h for h in range(1, 7))
            tgt += w
    e = env_adsr(n, 0.9, 1.2)
    place(pad, s1 * e, t); place(pad2, s2 * e, t)
    t += seg
pad = lp(pad, 1400); pad2 = lp(pad2, 1400)
pad_auto = curve([(0, 0.0), (1.5, 0.55), (8, 0.6), (30, 0.5), (60, 0.55), (cues["final"] - 6, 0.6),
                  (cues["final"] - 0.3, 0.75), (cues["final"], 0.9), (DUR - 2, 0.5), (DUR, 0.0)])
L += pad * pad_auto * 0.05; R += pad2 * pad_auto * 0.05
revL += pad * pad_auto * 0.03; revR += pad2 * pad_auto * 0.03

# ---------- SUB / BASS (8th pulse with sidechain feel) ----------
bass = np.zeros(N)
step = BEAT / 2
t = 0.0
while t < DUR:
    r = ROOTS[chord_at(t + 0.01)]
    n = int(step * 0.95 * SR)
    tt = np.arange(n) / SR
    f = midi(r)
    s = np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(4 * np.pi * f * tt)
    e = (1 - np.exp(-tt / 0.012)) * np.exp(-tt / 0.22)
    place(bass, np.tanh(1.6 * s) * e, t)
    t += step
bass = lp(bass, 300)
bass_auto = curve([(0, 0), (cues["arp_in"] - 0.5, 0), (cues["arp_in"] + 3, 0.5), (cues["drums_in"], 0.75),
                   (cues["drums_out"], 0.75), (cues["drums_out"] + 0.5, 0.0), (cues["final"], 0.0),
                   (cues["final"] + 0.05, 0.7), (DUR - 3, 0.4), (DUR, 0)])
L += bass * bass_auto * 0.16; R += bass * bass_auto * 0.16

# ---------- ARP PLUCK (16ths) ----------
arpL = np.zeros(N); arpR = np.zeros(N)
step = BEAT / 4
pattern = [0, 2, 1, 3, 2, 1, 3, 2]
t = 0.0; i = 0
while t < DUR:
    c = CHORDS[chord_at(t + 0.01)]
    note = c[pattern[i % 8] % 4] + 12 + (12 if (i // 16) % 2 and pattern[i % 8] == 3 else 0)
    n = int(0.35 * SR)
    tt = np.arange(n) / SR
    f = midi(note)
    s = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt) + 0.12 * np.sin(2 * np.pi * 3 * f * tt))
    e = (1 - np.exp(-tt / 0.002)) * np.exp(-tt / 0.09)
    acc = 1.0 if i % 4 == 0 else 0.7
    pan = 0.5 + 0.35 * np.sin(i * 0.7)
    place(arpL, s * e * acc * (1 - pan) * 2, t); place(arpR, s * e * acc * pan * 2, t)
    t += step; i += 1
arp_auto = curve([(0, 0), (cues["arp_in"], 0), (cues["arp_in"] + 4, 0.8), (cues["drums_out"], 0.9),
                  (cues["drums_out"] + 1, 0.3), (cues["final"], 0.3), (cues["final"] + 0.05, 0.8),
                  (DUR - 4, 0.3), (DUR, 0)])
L += arpL * arp_auto * 0.035; R += arpR * arp_auto * 0.035
revL += arpL * arp_auto * 0.03; revR += arpR * arp_auto * 0.03

# ---------- DRUMS ----------
def kick():
    n = int(0.45 * SR); tt = np.arange(n) / SR
    f = 45 + 110 * np.exp(-tt / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.tanh(2.2 * np.sin(ph) * np.exp(-tt / 0.16))

def hat(open_=False):
    n = int((0.25 if open_ else 0.06) * SR)
    s = hp(rng.standard_normal(n), 7000)
    tt = np.arange(n) / SR
    return s * np.exp(-tt / (0.07 if open_ else 0.015))

def clap():
    n = int(0.3 * SR); tt = np.arange(n) / SR
    s = bp(rng.standard_normal(n), 900, 4000)
    e = np.exp(-tt / 0.08)
    for d in (0.0, 0.011, 0.022):
        e += 0.6 * np.exp(-np.maximum(tt - d, 0) / 0.006) * (tt >= d)
    return s * e * 0.5

drums = np.zeros(N); dr_rev = np.zeros(N)
K, H, HO, C = kick(), hat(), hat(True), clap()
din, dout = cues["drums_in"], cues["drums_out"]
t = din
b = 0
while t < dout:
    place(drums, K, t, 0.9)
    if b % 2 == 1 and t > din + 8 * BAR * 0.5:
        place(drums, C, t, 0.55); place(dr_rev, C, t, 0.4)
    place(drums, H, t + BEAT / 2, 0.22)
    if b % 4 == 3: place(drums, HO, t + BEAT / 2, 0.18)
    t += BEAT; b += 1
# side-chain pumping on pad and arp
pump = np.ones(N)
t = din
while t < dout:
    i0 = int(t * SR); n = int(BEAT * SR)
    tt = np.arange(n) / SR
    seg_ = 1 - 0.35 * np.exp(-tt / 0.12)
    pump[i0:i0 + n] = seg_[:max(0, min(n, N - i0))]
    t += BEAT
L *= pump; R *= pump
L += drums * 0.22; R += drums * 0.22
revL += dr_rev * 0.05; revR += dr_rev * 0.05

# ---------- IMPACTS / WHOOSH / RISERS ----------
def boom(big=False):
    n = int((3.5 if big else 2.2) * SR); tt = np.arange(n) / SR
    f = 32 + 70 * np.exp(-tt / 0.08)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-tt / (1.1 if big else 0.6))
    nz = lp(rng.standard_normal(n), 1800) * np.exp(-tt / 0.12) * 0.5
    return np.tanh(1.5 * (s + nz))

def whoosh(d=0.9):
    n = int(d * SR); tt = np.arange(n) / SR
    x = rng.standard_normal(n)
    # sweeping bandpass approximation: blend two filtered versions
    lo = lp(x, 900); hi = bp(x, 1500, 6000)
    m = tt / d
    s = lo * (1 - m) + hi * m
    e = np.sin(np.pi * np.clip(tt / d, 0, 1)) ** 2
    return s * e

def riser(d=3.0):
    n = int(d * SR); tt = np.arange(n) / SR
    x = rng.standard_normal(n)
    m = (tt / d) ** 2
    s = lp(x, 600) * (1 - m) + hp(x, 2500) * m
    tone = np.sin(2 * np.pi * np.cumsum(200 + 900 * m) / SR) * 0.25
    return (s * 0.8 + tone) * m

fx = np.zeros(N); fxr = np.zeros(N)
for t in cues["hits"]:
    big = abs(t - cues["final"]) < 0.01 or t < 0.5
    bm = boom(big)
    place(fx, bm, t, 0.75 if big else 0.42); place(fxr, bm, t, 0.25)
for t in cues["whooshes"]:
    w = whoosh(0.8)
    place(fx, w, t - 0.55, 0.12); place(fxr, w, t - 0.55, 0.08)
for t in cues["risers"]:
    r = riser(3.0)
    place(fx, r, t - 3.0, 0.10); place(fxr, r, t - 3.0, 0.06)
L += fx; R += fx
revL += fxr; revR += fxr

# ---------- REVERB ----------
def ir(seed):
    g = np.random.default_rng(seed)
    n = int(2.8 * SR); tt = np.arange(n) / SR
    x = g.standard_normal(n) * np.exp(-tt / 0.75)
    return lp(x, 5000) * 0.06
L += fftconvolve(revL, ir(1))[:N]
R += fftconvolve(revR, ir(2))[:N]

# ---------- MASTER ----------
master = curve([(0, 1), (DUR - 3.5, 1), (DUR, 0)])
L *= master; R *= master
out = np.stack([L, R], 1)
out = hp(out.T, 25).T
peak = np.max(np.abs(out))
out = np.tanh(out / peak * 1.3) / np.tanh(1.3) * 0.89
import scipy.io.wavfile as wf
wf.write(sys.argv[2], SR, (out * 32767).astype(np.int16))
print("ok", sys.argv[2], DUR)
