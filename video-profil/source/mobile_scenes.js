// ===================== MOBILE (1080x1920) LAYOUT =====================
// safe zones: keep key content between y≈250 and y≈1700
function chapter(t, sc, num, label) {
  const a = io(t, sc.start + .25, sc.end, .5, .3);
  if (a <= 0) return;
  const k = eExpo(P(t, sc.start + .25, .8));
  ctx.save(); ctx.globalAlpha = a;
  bar(70, 166, 4, 44, C.orange);
  txt(num, 92, 202, { f: 'A', size: 40, color: C.orange });
  const nw = measure(num, { f: 'A', size: 40 });
  line(92 + nw + 14, 186, 92 + nw + 14 + 46 * k, 186, C.light, 2, .6);
  rise(label, 92 + nw + 74, 198, t, sc.start + .35, { size: 22, w: 700, ls: 5, color: C.cream, d: .6 });
  ctx.restore();
}
function bug(t) {
  const a = io(t, 2.2, TL.scenes.find(s => s.id === 'logo').start, .8, .4) * .75;
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  const x = 846, y = 188;
  drawPaw(x, y, 32, C.lime, 1);
  ctx.strokeStyle = C.lime; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.stroke();
  line(x + 32, y - 15, x + 32, y + 15, C.orange, 1.5);
  txt('MboMa & Co.', x + 42, y + 7, { size: 19, w: 600, color: C.cream, ls: 1 });
  ctx.restore();
}
const LT_Y = 1520;
function lowerThird(t, t0, t1, title, sub, y = LT_Y) {
  const a = io(t, t0, t1, .4, .3); if (a <= 0) return;
  const k = eExpo(P(t, t0, .7));
  ctx.save(); ctx.globalAlpha = a;
  const w = Math.max(measure(title, { f: 'A', size: 50, ls: 1 }), measure(sub || '', { size: 22, w: 600, ls: 3 })) + 80;
  ctx.fillStyle = 'rgba(8,24,14,0.86)'; ctx.fillRect(60, y, w * k, 140);
  bar(60, y, 8, 140, C.orange);
  if (k > .3) {
    rise(title, 94, y + 66, t, t0 + .15, { f: 'A', size: 50, color: C.cream, ls: 1 });
    if (sub) rise(sub, 96, y + 110, t, t0 + .3, { size: 22, w: 600, ls: 3, color: C.lime });
  }
  ctx.restore();
}
// multi-line rise helper: lines = [[text, opts], ...]
function riseLines(lines, x, y0, lh, t, t0, base = {}, stag = .1) {
  lines.forEach((l, i) => {
    const [s, o] = Array.isArray(l) ? l : [l, {}];
    rise(s, x, y0 + i * lh, t, t0 + i * stag, { ...base, ...o });
  });
}

const S = {};

// 1 — INTRO
S.intro = (t, sc) => {
  const sa = io(t, 0, 3.4, .6, .9);
  ctx.save();
  for (let i = 0; i < 60; i++) {
    const y = hash(i) * H, len = 160 + hash(i + 3) * 420, sp = 700 + hash(i + 7) * 2000;
    const x = W - ((t * sp + hash(i + 11) * 3000) % (W + len + 400));
    ctx.globalAlpha = sa * (.08 + .25 * hash(i + 2));
    const g = ctx.createLinearGradient(x, 0, x + len, 0);
    const col = i % 6 === 0 ? C.orange : C.lime;
    g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(x, y, len, 1.5 + hash(i + 4) * 2.5);
  }
  ctx.restore();
  const tAf = WT('intro', "l'afrique");
  const k = P(t, tAf - .9, 2.2);
  const mx = 560, my = 1260, mh = 860;
  drawAfrica(t, mx, my, mh, k);
  const pairs = [['kin', 'dkr'], ['kin', 'nbo'], ['kin', 'jnb'], ['kin', 'los'], ['kin', 'cai'], ['dla', 'abj'], ['nbo', 'add'], ['kin', 'lub'], ['kgl', 'kin'], ['cas', 'dkr']];
  pairs.forEach(([a, b], i) => {
    const t0 = tAf + .9 + i * .28;
    const [x1, y1] = proj(...CITIES[a], mx, my, mh), [x2, y2] = proj(...CITIES[b], mx, my, mh);
    ctx.save(); ctx.globalAlpha = io(t, t0, sc.end + 1, .3, .3) * .85;
    arcLink(x1, y1, x2, y2, eIO(P(t, t0, 1.1)), i % 3 === 0 ? C.orange : C.lime, 2);
    ctx.restore();
  });
  Object.values(CITIES).forEach((c, i) => {
    const [x, y] = proj(...c, mx, my, mh);
    cityPin(x, y, t + i * .2, eOut(P(t, tAf + .8 + i * .07, .4)) * .9, i === 0 ? C.orange : C.lime, i === 0 ? 7 : 4.5);
  });
  const t1 = WT('intro', 'dans');
  const out1 = WT('intro', 'elle') - .25;
  riseWords("Dans un monde qui s'accélère,", 80, 400, t, t1 - .1, { size: 36, w: 500, color: C.light, ls: 1, out: out1 });
  rise("L'AFRIQUE", 80, 530, t, tAf - .05, { f: 'A', size: 120, color: C.cream, out: out1 });
  rise("N'A PLUS LE TEMPS", 80, 650, t, WT('intro', 'plus') - .1, { f: 'A', size: 104, color: C.cream, out: out1 });
  rise("D'ATTENDRE.", 80, 765, t, WT('intro', "d'attendre") - .1, { f: 'A', size: 104, color: C.orange, out: out1 });
  const tb = WT('intro', 'besoin');
  rise("ELLE A BESOIN DE", 84, 370, t, tb - .15, { size: 30, w: 700, ls: 8, color: C.light });
  const items = [['STRUCTURE.', WT('intro', 'structure'), C.cream], ['VISION.', WT('intro', 'vision'), C.lime], ['IMPACT.', WT('intro', "d'impact"), C.orange]];
  items.forEach(([w, ti, col], i) => {
    const s = 1 + .25 * (1 - eOut(P(t, ti, .5)));
    ctx.save(); ctx.translate(80, 510 + i * 150); ctx.scale(s, s);
    rise(w, 0, 0, t, ti - .05, { f: 'A', size: 150, color: col, d: .45 });
    ctx.restore();
  });
};

// 2 — INSTITUTION
S.institution = (t, sc) => {
  const t0 = sc.start;
  const CY = 640;
  ctx.save(); ctx.translate(W / 2, CY); ctx.rotate(t * .05);
  for (let i = 0; i < 36; i++) {
    ctx.rotate(Math.PI * 2 / 36);
    ctx.globalAlpha = .035 * io(t, t0, sc.end); ctx.fillStyle = i % 2 ? C.lime : C.cream;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1500, -40); ctx.lineTo(1500, 40); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  for (let i = 0; i < 4; i++) {
    const ph = ((t - t0) * .35 + i / 4) % 1;
    ctx.save(); ctx.globalAlpha = (1 - ph) * .18 * io(t, t0 + .4, sc.end); ctx.strokeStyle = C.lime; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(W / 2, CY, 170 + ph * 800, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  const k = P(t, t0 + .05, 1.5);
  const tSub = WT('institution', 'institution');
  const mv = eIO(P(t, tSub - .4, .9));
  const ey = lerp(CY, 470, mv), R = lerp(200, 130, mv);
  emblem(W / 2, ey, R, k, 1);
  const sk = eExpo(P(t, t0 + .7, .7));
  const sy = ey + R + 40;
  bar(W / 2 - 160 * sk, sy, 320 * sk, 4, C.orange);
  const wm = WT('institution', 'mboma');
  const wk = eExpo(P(t, wm, .9));
  const fs = lerp(110, 80, mv), fs2 = fs * .8;
  const w1 = measure('MboMa', { size: fs, w: 600 }), w2 = measure(' & Co.', { size: fs2, w: 500 });
  const x0 = W / 2 - (w1 + w2) / 2;
  ctx.save(); ctx.globalAlpha = wk;
  txt('MboMa', x0, sy + fs + 20 + (1 - wk) * 40, { size: fs, w: 600, color: C.lime });
  txt(' & Co.', x0 + w1, sy + fs + 20 + (1 - wk) * 40, { size: fs2, w: 500, color: C.cream });
  ctx.restore();
  rise('INSTITUTION', W / 2, 1000, t, tSub, { f: 'A', size: 130, color: C.cream, align: 'center', ls: 2 });
  rise('PANAFRICAINE', W / 2, 1130, t, WT('institution', 'panafricaine') - .1, { f: 'A', size: 130, color: C.lime, align: 'center', ls: 2 });
  riseWords('de pilotage & de gouvernance', W / 2, 1220, t, WT('institution', 'pilotage') - .1, { size: 40, w: 500, color: C.light, align: 'center', stag: .05 });
  riseWords('de projets complexes', W / 2, 1275, t, WT('institution', 'projets') - .1, { size: 40, w: 500, color: C.light, align: 'center', stag: .05 });
  const ti = WT('institution', "l'interface");
  rise("À l'interface des nations", W / 2, 1420, t, ti - .3, { f: 'B', size: 52, color: C.cream, align: 'center' });
  rise("… et du futur.", W / 2, 1495, t, WT('institution', 'du') - .1, { f: 'B', size: 52, color: C.orange, align: 'center' });
  const lk = eExpo(P(t, ti, 1.2));
  line(W / 2 - 300 * lk, 1545, W / 2 + 300 * lk, 1545, C.green, 2, .9);
};

// 3 — PARTENAIRE
S.partenaire = (t, sc) => {
  chapter(t, sc, '01', "L'INSTITUTION");
  const t0 = sc.start;
  const tCab = WT('partenaire', 'cabinet');
  const tPar = WT('partenaire', 'partenaire');
  const tCoh = WT('partenaire', 'cohérence');
  const out1 = tCoh - .6;
  const img = IMG.founder;
  const pa = io(t, t0 + .2, out1 + .5, .7, .5);
  const pw = 500, ph = 640, px = (W - pw) / 2, py = 290;
  if (img && pa > 0) {
    const k = eExpo(P(t, t0 + .2, 1));
    const oy = (1 - k) * 80 - eIn(P(t, out1, .5)) * 60;
    ctx.save(); ctx.globalAlpha = pa;
    rr(px, py + oy, pw, ph, 18); ctx.clip();
    const z = 1 + .08 * P(t, t0, sc.end - t0);
    const sw = 300 / z, sh = 422 / z * (ph / pw) / (422 / 300) * (422 / 300), sx = 345 + (300 - sw) / 2;
    const shh = Math.min(422, sw * ph / pw), syy = 6 + (422 - shh) * .3;
    ctx.drawImage(img, sx, syy, sw, shh, px, py + oy, pw, ph);
    const g = ctx.createLinearGradient(0, py + ph * .55, 0, py + ph);
    g.addColorStop(0, 'rgba(8,26,15,0)'); g.addColorStop(1, 'rgba(8,26,15,0.95)');
    ctx.fillStyle = g; ctx.fillRect(px, py + oy, pw, ph);
    ctx.restore();
    ctx.save(); ctx.globalAlpha = pa * .35;
    ctx.strokeStyle = C.lime; ctx.lineWidth = 3; rr(px - 14, py - 14 + oy, pw + 28, ph + 28, 24); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.globalAlpha = pa;
    rise('Charmant Nyungu K.', px + 34, py + ph - 70 + oy, t, t0 + .9, { size: 34, w: 700, color: C.cream });
    rise('PRÉSIDENT & FONDATEUR', px + 36, py + ph - 30 + oy, t, t0 + 1.05, { size: 18, w: 700, ls: 5, color: C.orange });
    ctx.restore();
  }
  const X = 80;
  rise('NOUS NE SOMMES PAS UN', X, 1050, t, WT('partenaire', 'nous') - .1, { size: 28, w: 700, ls: 6, color: C.light, out: out1 });
  rise('cabinet de conseil traditionnel.', X, 1125, t, tCab - .15, { f: 'B', size: 54, color: C.cream, out: out1, alpha: lerp(1, .45, P(t, tCab + .9, .4)) });
  const sw = measure('cabinet de conseil traditionnel', { f: 'B', size: 54 });
  const sk = eIO(P(t, WT('partenaire', 'traditionnel'), .55));
  if (t < out1 + .4) bar(X - 6, 1106, (sw + 12) * sk, 6, C.orange, 1 - P(t, out1, .4));
  const up = eIO(P(t, out1, .8)) * 830;
  rise('UN PARTENAIRE', X, 1270 - up, t, tPar - .1, { f: 'A', size: 104, color: C.lime });
  rise('INSTITUTIONNEL', X, 1380 - up, t, WT('partenaire', 'institutionnel') - .1, { f: 'A', size: 104, color: C.lime });
  rise('DE LONG TERME.', X, 1490 - up, t, WT('partenaire', 'long') - .1, { f: 'A', size: 104, color: C.cream });
  const pillars = [['VISION', 'POLITIQUE', WT('partenaire', 'vision'), 'eye'], ['STRUCTURE', 'FINANCIÈRE', WT('partenaire', 'structure'), 'bank'], ['DÉPLOIEMENT', 'TECHNIQUE', WT('partenaire', 'déploiement'), 'gear']];
  const cy = 790, cw = 920, ch = 220, gap = 36;
  rise('COHÉRENCE', X, cy - 20, t, tCoh - .1, { size: 22, w: 800, ls: 10, color: C.orange });
  const lk = eIO(P(t, tCoh, 3.6));
  line(X - 30, cy + 10, X - 30, cy + 10 + (ch * 3 + gap * 2) * lk, C.orange, 3, .7);
  pillars.forEach(([a, b, ti, ic], i) => {
    const k = eBack(P(t, ti - .15, .6)); if (k <= 0) return;
    const x = X + (1 - k) * 80, y = cy + 10 + i * (ch + gap);
    ctx.save(); ctx.globalAlpha = clamp(k);
    ctx.fillStyle = 'rgba(14,40,24,0.92)'; rr(x, y, cw, ch, 16); ctx.fill();
    ctx.strokeStyle = 'rgba(175,193,139,0.25)'; ctx.lineWidth = 1.5; ctx.stroke();
    bar(x, y, 6, ch, i === 1 ? C.orange : C.lime);
    icon(ic, x + 110, y + ch / 2, 80, i === 1 ? C.orange : C.lime, t);
    txt(a, x + 210, y + 118, { f: 'A', size: 72, color: C.cream });
    txt(b, x + 212, y + 168, { size: 26, w: 700, ls: 5, color: C.light });
    txt('0' + (i + 1), x + cw - 36, y + 80, { f: 'A', size: 52, color: 'rgba(175,193,139,0.3)', align: 'right' });
    ctx.restore();
  });
};

// 4 — EXPERTISES
S.expertises = (t, sc) => {
  chapter(t, sc, '02', 'EXPERTISES');
  rise('CONCEVOIR LE CADRE.', 80, 360, t, WT('expertises', 'nos') - .2, { f: 'A', size: 64, color: C.light });
  rise("GARANTIR L'IMPACT.", 80, 440, t, WT('expertises', 'expertises'), { f: 'A', size: 64, color: C.orange });
  const times = EXP.map(e => WT('expertises', e[3]) - .25);
  let cur = -1; times.forEach((ti, i) => { if (t >= ti) cur = i; });
  EXP.forEach((e, i) => {
    const x = 80 + i * 188, y = 1660;
    const on = t >= times[i];
    const a = eOut(P(t, sc.start + .5 + i * .08, .5));
    ctx.save(); ctx.globalAlpha = a;
    bar(x, y, 170, 4, 'rgba(175,193,139,0.25)');
    if (on) bar(x, y, 170 * eIO(clamp((t - times[i]) / ((times[i + 1] || sc.end) - times[i]))), 4, i === cur ? C.orange : C.lime);
    txt('0' + (i + 1), x, y - 18, { f: 'A', size: 34, color: on ? C.cream : 'rgba(245,242,233,0.35)' });
    ctx.restore();
  });
  EXP.forEach((e, i) => {
    const ti = times[i], tn = times[i + 1] || sc.end;
    if (t < ti - .1 || t > tn + .1) return;
    const outT = i < 4 ? tn - .3 : sc.end - .35;
    const va = io(t, ti, tn + .05, .45, .3);
    ctx.save(); ctx.globalAlpha = va;
    const sl = (1 - eExpo(P(t, ti, .7))) * 120 - eIn(P(t, tn - .3, .35)) * 120;
    ctx.translate(sl, 0);
    expVisual(i, t - ti, t, 170, 520);
    ctx.restore();
    txt('0' + (i + 1), W - 70, 1420, { f: 'A', size: 300, color: 'rgba(139,195,74,0.09)', align: 'right' });
    rise(e[0], 84, 1230, t, ti, { f: 'A', size: 96, color: C.cream, out: outT });
    rise(e[1], 84, 1335, t, ti + .08, { f: 'A', size: e[1].length > 16 ? 66 : 96, color: i % 2 ? C.orange : C.lime, out: outT });
    const words = e[2].split(' '); const half = Math.ceil(words.length / 2);
    rise(words.slice(0, half).join(' '), 86, 1420, t, ti + .25, { size: 32, w: 500, color: C.light, out: outT });
    rise(words.slice(half).join(' '), 86, 1468, t, ti + .32, { size: 32, w: 500, color: C.light, out: outT });
  });
};

// 5 — MÉTHODE
S.methode = (t, sc) => {
  chapter(t, sc, '03', 'NOTRE MÉTHODE');
  const tMb = WT('methode', 'mboma');
  const out = tMb - .6;
  rise('NOTRE MÉTHODE', 80, 380, t, WT('methode', 'notre') - .1, { f: 'A', size: 100, color: C.cream, out });
  rise('EST CLAIRE.', 80, 485, t, WT('methode', 'claire') - .1, { f: 'A', size: 100, color: C.lime, out });
  const steps = [['COMPRENDRE', 'LE TERRAIN', WT('methode', 'comprendre'), 'search'], ['AUDITER', 'DIAGNOSTIC', WT('methode', 'auditer'), 'check'], ['CONCEVOIR', 'LE CADRE', WT('methode', 'concevoir'), 'blueprint'], ['DÉPLOYER', "À L'ÉCHELLE", WT('methode', 'déployer'), 'rocket']];
  const lx = 180, ys = [680, 920, 1160, 1400];
  const fa = 1 - eIn(P(t, out, .5));
  if (fa > 0) {
    ctx.save(); ctx.globalAlpha = fa;
    bar(lx - 1, ys[0], 2, ys[3] - ys[0], 'rgba(175,193,139,0.2)');
    steps.forEach(([a, b, ti, ic], i) => {
      if (i > 0) { const k = eIO(P(t, steps[i - 1][2], ti - steps[i - 1][2])); bar(lx - 2, ys[i - 1], 4, (ys[i] - ys[i - 1]) * k, C.orange); }
      const k = eBack(P(t, ti - .2, .55)); if (k <= 0) return;
      ctx.save(); ctx.translate(lx, ys[i]); ctx.scale(k, k);
      ctx.fillStyle = C.bg1; ctx.beginPath(); ctx.arc(0, 0, 86, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = i === 3 ? C.orange : C.lime; ctx.lineWidth = 4; ctx.stroke();
      icon(ic, 0, 0, 68, i === 3 ? C.orange : C.lime, t);
      ctx.restore();
      txt('ÉTAPE 0' + (i + 1), lx + 130, ys[i] - 40, { size: 20, w: 800, ls: 5, color: C.orange, alpha: clamp(k) });
      rise(a, lx + 128, ys[i] + 30, t, ti - .1, { f: 'A', size: 76, color: C.cream });
      rise(b, lx + 132, ys[i] + 74, t, ti, { size: 24, w: 700, ls: 4, color: C.light });
    });
    ctx.restore();
  }
  const tLab = WT('methode', 'laboratoire');
  const tY = WT('methode', 'ybs');
  rise('ARCHITECTURE DE MARQUE', W / 2, 360, t, tMb - .2, { size: 24, w: 800, ls: 10, color: C.orange, align: 'center' });
  rise('Une synergie structurelle', W / 2, 440, t, tMb, { f: 'B', size: 52, color: C.cream, align: 'center' });
  rise('intelligente.', W / 2, 505, t, tMb + .1, { f: 'B', size: 52, color: C.cream, align: 'center' });
  const boxes = [
    { y: 600, t0: tMb, name: 'MboMa & Co.', role: 'MAISON MÈRE', verb: 'STRUCTURE & DIRIGE', tv: WT('methode', 'structure'), col: C.lime, paw: true },
    { y: 1110, t0: tLab - .2, name: 'YBS-Innovate', role: 'LABORATOIRE R&D', verb: 'CONÇOIT & FABRIQUE', tv: WT('methode', 'conçoit'), col: C.orange, paw: false },
  ];
  const bx = 80, bw = 920, bh = 400;
  boxes.forEach((b, i) => {
    const k = eExpo(P(t, b.t0, .8)); if (k <= 0) return;
    const y = b.y + (1 - k) * 80;
    ctx.save(); ctx.globalAlpha = clamp(k);
    ctx.fillStyle = 'rgba(12,34,20,0.9)'; rr(bx, y, bw, bh, 18); ctx.fill();
    ctx.strokeStyle = b.col; ctx.lineWidth = 2; ctx.globalAlpha *= .6; ctx.stroke(); ctx.globalAlpha = clamp(k);
    if (b.paw) emblem(bx + 100, y + 100, 52, 1, 1); else {
      const cx = bx + 100, cy = y + 100;
      ctx.strokeStyle = C.orange; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 10, cy - 28); ctx.lineTo(cx - 10, cy - 5); ctx.lineTo(cx - 28, cy + 28); ctx.lineTo(cx + 28, cy + 28); ctx.lineTo(cx + 10, cy - 5); ctx.lineTo(cx + 10, cy - 28); ctx.stroke();
      ctx.fillStyle = C.orange; ctx.globalAlpha *= .7; ctx.beginPath(); ctx.moveTo(cx - 20, cy + 16); ctx.lineTo(cx + 20, cy + 16); ctx.lineTo(cx + 28, cy + 28); ctx.lineTo(cx - 28, cy + 28); ctx.fill(); ctx.globalAlpha = clamp(k);
    }
    txt(b.name, bx + 190, y + 100, { size: 56, w: 700, color: C.cream });
    txt(b.role, bx + 192, y + 140, { size: 20, w: 800, ls: 5, color: b.col });
    bar(bx + 40, y + 200, bw - 80, 1, 'rgba(175,193,139,0.25)');
    rise(b.verb, bx + 40, y + 305, t, b.tv - .1, { f: 'A', size: 84, color: b.col });
    rise(i ? 'R&D · innovation · exécution numérique' : 'Vision · stratégie · portefeuille de projets', bx + 42, y + 360, t, b.tv + .1, { size: 28, w: 500, color: C.light });
    ctx.restore();
  });
  const lk = eIO(P(t, tY - .3, .6));
  if (lk > 0) {
    const x = W / 2, y1 = 1000, len = 110; line(x, y1, x, y1 + len * lk, C.light, 2, .5);
    for (let k = 0; k < 4; k++) { const u = (t * .7 + k / 4) % 1; if (u < lk) { ctx.fillStyle = k % 2 ? C.orange : C.lime; ctx.beginPath(); ctx.arc(x, y1 + len * u, 6, 0, Math.PI * 2); ctx.fill(); } }
  }
};

// 6 — TERRAIN
S.terrain = (t, sc) => {
  chapter(t, sc, '04', 'SUR LE TERRAIN');
  const ts = [WT('terrain', 'systèmes') - .3, WT('terrain', 'super') - .3, WT('terrain', 'digitalisation') - .3, WT('terrain', 'vidéosurveillance') - .3, WT('terrain', 'clara') - .3, sc.end];
  if (t < ts[0] + .3) {
    const out = ts[0] - .35;
    const mx = 560, my = 1290, mh = 760;
    ctx.save(); ctx.globalAlpha = 1 - eIn(P(t, out, .4));
    drawAfrica(t, mx, my, mh, P(t, sc.start, 1.2), { alpha: .7 });
    const [kx, ky] = proj(...CITIES.kin, mx, my, mh);
    cityPin(kx, ky, t, 1, C.orange, 8);
    ['lub', 'dla', 'lbv', 'lad', 'kgl'].forEach((c, i) => { const [x, y] = proj(...CITIES[c], mx, my, mh); arcLink(kx, ky, x, y, eIO(P(t, sc.start + .6 + i * .2, .8)), C.lime, 2, .3); cityPin(x, y, t + i, eOut(P(t, sc.start + 1.2 + i * .2, .3)), C.lime, 5); });
    ctx.restore();
    rise('SUR LE', 80, 420, t, WT('terrain', 'sur') - .1, { f: 'A', size: 130, color: C.cream, out });
    rise('TERRAIN.', 80, 550, t, WT('terrain', 'terrain') - .1, { f: 'A', size: 130, color: C.cream, out });
    rise('Aux côtés des', 84, 640, t, WT('terrain', 'accompagnons') - .2, { f: 'B', size: 46, color: C.light, out });
    rise('ÉTATS', 84, 750, t, WT('terrain', 'états') - .1, { f: 'A', size: 96, color: C.lime, out });
    rise('& ENTREPRISES', 84 + measure('ÉTATS ', { f: 'A', size: 96 }), 750, t, WT('terrain', 'entreprises') - .1, { f: 'A', size: 96, color: C.orange, out });
  }
  const panels = [footID, footApp, footDiaspora, footCCTV, footClara];
  const labels = [['IDENTIFICATION', 'SÉCURISÉE · BIOMÉTRIE'], ['SUPER-APP CHANTIERS', 'SUIVI TERRAIN EN TEMPS RÉEL'], ['PLATEFORMES DIASPORA', 'ENTREPRENEURIAT · IMMOBILIER'], ['VIDÉO-SURVEILLANCE IA', 'DÉTECTION · RECONNAISSANCE'], null];
  for (let i = 0; i < 5; i++) {
    const a = ts[i], b = ts[i + 1];
    if (t < a - .05 || t > b + .4) continue;
    const kin = eExpo(P(t, a, .55)), kout = eIn(P(t, b - .05, .4));
    ctx.save();
    ctx.translate((1 - kin) * W * .7 - kout * W * .7, 0);
    ctx.globalAlpha = clamp(kin * 1.5) * (1 - kout);
    panels[i](t - a, t, b - a);
    ctx.restore();
    if (labels[i]) lowerThird(t, a + .35, b - .05, labels[i][0], labels[i][1]);
  }
};
function footID(lt, t) {
  ctx.fillStyle = '#081710'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 560); ctx.rotate(-.05 + lt * .01); ctx.scale(1.25, 1.25);
  ctx.fillStyle = '#F2EFE6'; rr(-330, -210, 660, 420, 22); ctx.fill();
  ctx.fillStyle = C.green; rr(-330, -210, 660, 80, [22, 22, 0, 0]); ctx.fill();
  txt("CARTE D'IDENTIFICATION SÉCURISÉE", -300, -158, { size: 22, w: 800, ls: 2, color: '#fff' });
  ctx.fillStyle = '#C9D3B8'; rr(-300, -100, 190, 240, 10); ctx.fill();
  icon('user', -205, 20, 150, C.green, t);
  for (let l = 0; l < 5; l++) bar(-80, -80 + l * 46, 300 - l * 30, 14, l ? '#B9B6AC' : '#5c5c5c');
  ctx.fillStyle = C.orange; rr(220, 70, 70, 54, 8); ctx.fill();
  for (let qx = 0; qx < 9; qx++) for (let qy = 0; qy < 9; qy++) if (hash(qx * 13 + qy * 7) > .5) bar(130 + qx * 9, 60 + qy * 9, 8, 8, '#2d2d2d');
  ctx.restore();
  const fx = 540, fy = 1130;
  ctx.save();
  ctx.strokeStyle = 'rgba(139,195,74,0.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fx, fy, 230, 0, Math.PI * 2); ctx.stroke();
  for (let r = 20; r < 180; r += 16) {
    ctx.strokeStyle = C.lime; ctx.lineWidth = 4; ctx.globalAlpha = .85;
    ctx.beginPath(); ctx.ellipse(fx, fy + 10, r * .75, r, 0, Math.PI * (1.05 + hash(r) * .2), Math.PI * (2.95 - hash(r + 1) * .3)); ctx.stroke();
  }
  const sy = fy - 190 + ((lt * 1.2) % 1) * 380;
  ctx.globalAlpha = 1; ctx.fillStyle = C.orange; ctx.shadowColor = C.orange; ctx.shadowBlur = 25; ctx.fillRect(fx - 220, sy, 440, 4);
  ctx.restore();
  hud(fx - 260, fy - 260, 520, 520);
  const ok = lt > 1.4;
  txt(ok ? 'IDENTITÉ VÉRIFIÉE ✓' : 'ANALYSE BIOMÉTRIQUE…', fx, fy + 330, { size: 32, w: 800, ls: 3, color: ok ? C.lime : C.cream, align: 'center' });
  txt('MATCH ' + Math.min(99.7, (lt * 70)).toFixed(1) + '%', fx, fy - 290, { size: 24, w: 700, ls: 4, color: C.light, align: 'center' });
  scanlines(.05);
}
function footApp(lt, t) {
  ctx.fillStyle = '#0B2215'; ctx.fillRect(0, 0, W, H);
  // construction line art, behind and to the right of the phone
  ctx.save(); ctx.translate(-30, 600); ctx.scale(.62, .62);
  ctx.strokeStyle = C.light; ctx.lineWidth = 4; ctx.globalAlpha = .8;
  const gy = 780;
  line(900, gy, 1800, gy, C.light, 4);
  ctx.beginPath(); ctx.moveTo(1180, gy); ctx.lineTo(1180, 260); ctx.lineTo(1690, 260); ctx.moveTo(1100, 260); ctx.lineTo(1180, 260); ctx.moveTo(1180, 300); ctx.lineTo(1690, 260); ctx.moveTo(1180, 220); ctx.lineTo(1180, 260); ctx.stroke();
  for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.moveTo(1166, gy - k * 37); ctx.lineTo(1194, gy - k * 37 - 37); ctx.stroke(); }
  const hx = 1300 + 280 * (.5 + .5 * Math.sin(lt * 1.2));
  ctx.beginPath(); ctx.moveTo(hx, 262); ctx.lineTo(hx, 470); ctx.stroke();
  ctx.fillStyle = C.orange; ctx.fillRect(hx - 40, 470, 80, 30);
  const floors = Math.floor(2 + lt * 2.2);
  for (let f = 0; f < Math.min(floors, 8); f++) { ctx.strokeRect(1380, gy - (f + 1) * 48, 300, 48); for (let wnd = 0; wnd < 5; wnd++) bar(1398 + wnd * 58, gy - (f + 1) * 48 + 14, 34, 20, f === floors - 1 ? C.orange : 'rgba(139,195,74,0.4)'); }
  ctx.restore();
  // KPI chips top-right
  [['24', 'chantiers suivis'], ['100 %', 'rapports en direct']].forEach(([v, l], k) => {
    const kk = eExpo(clamp((lt - .3 - k * .2) / .6)); if (kk <= 0) return;
    const x = 600 + (1 - kk) * 120, y = 320 + k * 160;
    ctx.save(); ctx.globalAlpha = kk;
    ctx.fillStyle = 'rgba(16,44,26,0.92)'; rr(x, y, 410, 130, 16); ctx.fill(); bar(x, y, 6, 130, k ? C.orange : C.lime);
    txt(v, x + 30, y + 72, { f: 'A', size: 60, color: k ? C.orange : C.lime });
    txt(l, x + 30, y + 110, { size: 22, w: 600, color: C.light });
    ctx.restore();
  });
  phone(70, 300, 480, 1000, (x, y, w, h) => {
    ctx.fillStyle = '#F4F2EC'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = C.green; ctx.fillRect(x, y, w, 150);
    txt('Mes chantiers', x + 30, y + 110, { size: 34, w: 800, color: '#fff' });
    ctx.fillStyle = '#DDE5CF'; ctx.fillRect(x + 20, y + 170, w - 40, 280);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + 20, y + 350); ctx.bezierCurveTo(x + 150, y + 260, x + 250, y + 400, x + w - 20, y + 230); ctx.stroke();
    [[.25, .45], [.6, .3], [.8, .7], [.4, .8]].forEach(([u, v], k) => { cityPin(x + 20 + u * (w - 40), y + 170 + v * 280, t + k, 1, k === 1 ? C.orange : C.green, 8); });
    const items = [['Route Nationale 1', .82], ['Pont de la Lukaya', .64], ['Logements sociaux', .41], ['Réseau électrique', .9]];
    const scroll = Math.min(lt * 30, 60);
    items.forEach(([n, p], k) => {
      const yy = y + 480 + k * 110 - scroll;
      ctx.fillStyle = '#fff'; rr(x + 20, yy, w - 40, 94, 14); ctx.fill();
      txt(n, x + 40, yy + 38, { size: 22, w: 700, color: '#2b2b2b' });
      bar(x + 40, yy + 60, w - 120, 10, '#E3E3DA');
      bar(x + 40, yy + 60, (w - 120) * p * eOut(clamp(lt / 1.2)), 10, k === 1 ? C.orange : C.green);
      txt(Math.round(p * 100 * eOut(clamp(lt / 1.2))) + '%', x + w - 40, yy + 38, { size: 20, w: 800, color: C.green, align: 'right' });
    });
  });
}
function footDiaspora(lt, t) {
  ctx.fillStyle = '#081A10'; ctx.fillRect(0, 0, W, H);
  const gx = 540, gy = 780, R = 380;
  ctx.save();
  const g = ctx.createRadialGradient(gx - 100, gy - 120, 50, gx, gy, R); g.addColorStop(0, '#1F4A2D'); g.addColorStop(1, '#0B2214');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2); ctx.fill();
  ctx.clip();
  ctx.strokeStyle = 'rgba(175,193,139,0.18)'; ctx.lineWidth = 1.5;
  for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(gx, gy + k * R / 4, R * Math.sqrt(1 - (k / 4) ** 2), 8, 0, 0, Math.PI * 2); ctx.stroke(); }
  for (let k = 0; k < 8; k++) { const ph = (k / 8 * Math.PI + lt * .15) % Math.PI; ctx.beginPath(); ctx.ellipse(gx, gy, R * Math.abs(Math.cos(ph)), R, 0, 0, Math.PI * 2); ctx.stroke(); }
  AFR_DOTS.forEach(([lon, lat], i) => { if (i % 2) return; const x = gx + (lon - 15 - lt * 2) * 6.8, y = gy - (lat - 5) * 6.8; ctx.fillStyle = C.green; ctx.globalAlpha = .8; ctx.beginPath(); ctx.arc(x, y, 2.8, 0, Math.PI * 2); ctx.fill(); });
  ctx.restore();
  ctx.strokeStyle = C.lime; ctx.globalAlpha = .4; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
  const kin = [gx + (15.3 - 15 - lt * 2) * 6.8, gy - (-4.3 - 5) * 6.8];
  const cities = [[gx + (2.3 - 15 - lt * 2) * 6.8, gy - (48.8 - 5) * 6.8, 'Paris'], [gx + (4.4 - 15 - lt * 2) * 6.8 + 20, gy - (50.8 - 5) * 6.8 - 30, 'Bruxelles'], [gx - 330, gy - 230, 'Montréal'], [gx + 280, gy - 270, 'Londres']];
  cities.forEach(([x, y, n], k) => { arcLink(x, y, kin[0], kin[1], eIO(clamp((lt - k * .25) / .9)), k % 2 ? C.orange : C.lime, 2.5, .3); cityPin(x, y, t + k, 1, C.lime, 5); txt(n, x + 12, y - 10, { size: 20, w: 700, color: C.light }); });
  cityPin(kin[0], kin[1], t, 1, C.orange, 8);
  const cards = [['Entrepreneuriat', "Création & suivi d'entreprises", C.lime], ['Immobilier', 'Gestion de biens à distance', C.orange], ['Services', 'Démarches 100 % digitalisées', C.light]];
  cards.forEach(([a, b, col], k) => {
    const kk = eExpo(clamp((lt - .3 - k * .25) / .6)); if (kk <= 0) return;
    const x = 80 + (1 - kk) * 200, y = 1200 + k * 104;
    ctx.save(); ctx.globalAlpha = kk;
    ctx.fillStyle = 'rgba(16,44,26,0.92)'; rr(x, y, 920, 90, 14); ctx.fill();
    bar(x, y, 8, 90, col);
    txt(a, x + 36, y + 58, { size: 34, w: 800, color: C.cream });
    txt(b, x + 884, y + 56, { size: 22, w: 500, color: C.light, align: 'right' });
    ctx.restore();
  });
}
function footCCTV(lt, t) {
  ctx.fillStyle = '#0a0f0b'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.strokeStyle = 'rgba(175,193,139,0.18)'; ctx.lineWidth = 2;
  const vx = W / 2, vy = 640;
  for (let k = -10; k <= 10; k++) { ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(vx + k * 200, H); ctx.stroke(); }
  for (let k = 0; k < 16; k++) { const z = ((k + lt * 1.2) % 16) / 16; const y = vy + Math.pow(z, 2.2) * (H - vy); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.fillStyle = '#0f1d13';
  for (let k = 0; k < 6; k++) { const bh = 160 + hash(k) * 260; ctx.fillRect(k * 190 - 20, vy - bh, 170, bh); }
  ctx.restore();
  const ppl = [[.22, .35, 1], [.6, .6, -1], [.78, .42, 1], [.38, .8, -1]];
  ppl.forEach(([x0, z, dir], k) => {
    const x = W * x0 + dir * lt * 40, y = vy + Math.pow(z, 2.2) * (H - vy - 300) + 60, s = .6 + z * 1.2;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = '#4e5a50'; ctx.beginPath(); ctx.arc(0, -150, 22, 0, Math.PI * 2); ctx.fill(); rr(-30, -125, 60, 110, 20); ctx.fill();
    const sw = Math.sin(lt * 8 + k) * 10; ctx.fillRect(-22 + sw * .5, -20, 16, 60); ctx.fillRect(6 - sw * .5, -20, 16, 60);
    ctx.restore();
    const bw = 110 * s, bh = 230 * s;
    const det = eOut(clamp((lt - .2 - k * .2) / .3));
    if (det > 0) {
      ctx.save(); ctx.globalAlpha = det; ctx.strokeStyle = k === 1 ? C.orange : C.lime; ctx.lineWidth = 3;
      ctx.strokeRect(x - bw / 2, y - bh + 30 * s, bw, bh);
      ctx.fillStyle = k === 1 ? C.orange : C.lime; ctx.fillRect(x - bw / 2, y - bh + 30 * s - 30, Math.max(bw, 170), 30);
      txt((k === 1 ? 'ID #A-27 ' : 'PERSONNE ') + (94 + k).toFixed(0) + '%', x - bw / 2 + 8, y - bh + 30 * s - 8, { size: 18, w: 800, color: '#0a1a10' });
      ctx.restore();
    }
  });
  scanlines(.12);
  hud(40, 260, W - 80, H - 520, C.light);
  ctx.fillStyle = '#e53935'; if (Math.floor(t * 2) % 2 === 0) { ctx.beginPath(); ctx.arc(100, 330, 12, 0, Math.PI * 2); ctx.fill(); }
  txt('REC', 125, 340, { size: 28, w: 800, color: C.cream });
  txt('CAM 04 · IA ACTIVE', W - 90, 340, { size: 24, w: 700, ls: 3, color: C.lime, align: 'right' });
  const sec = 37 + Math.floor(lt);
  txt('2025-11-14  21:42:' + String(sec).padStart(2, '0'), W - 90, 380, { size: 22, w: 600, ls: 2, color: C.light, align: 'right' });
}
function footClara(lt, t) {
  ctx.fillStyle = '#071510'; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = 820;
  for (let k = 0; k < 4; k++) {
    const u = ((lt * (.5 + lt * .2)) * .5 + k / 4) % 1;
    ctx.save(); ctx.globalAlpha = (1 - u) * .25; ctx.strokeStyle = C.lime; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 160 + u * 500, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  for (let k = 0; k < 3; k++) { ctx.save(); ctx.strokeStyle = k === 1 ? C.orange : C.lime; ctx.globalAlpha = .5; ctx.lineWidth = 2; ctx.translate(cx, cy); ctx.rotate(lt * (k + 1) * .4 * (k % 2 ? -1 : 1)); ctx.setLineDash([20, 14]); ctx.beginPath(); ctx.arc(0, 0, 130 + k * 44, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
  const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120); g.addColorStop(0, 'rgba(139,195,74,0.9)'); g.addColorStop(1, 'rgba(139,195,74,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill();
  txt('CLARA', cx, cy + 8, { f: 'A', size: 84, color: C.cream, align: 'center', glow: C.lime });
  txt('AI', cx, cy + 66, { f: 'A', size: 44, color: C.orange, align: 'center' });
  // CVs fall from the top into Clara, then split: retained (left-bottom) / rejected (right-bottom)
  for (let k = 0; k < 36; k++) {
    const u = (lt * (.55 + lt * .25) + hash(k)) % 1;
    const lane = Math.floor(hash(k + 3) * 5);
    let x, y; const good = hash(k + 7) > .55;
    if (u < .5) { const v = u / .5; x = lerp(140 + lane * 200, cx, eIn(v)); y = lerp(220, cy - 150, eIn(v)); }
    else { const v = (u - .5) / .5; x = lerp(cx, good ? 200 + lane * 30 : 880 - lane * 30, eOut(v)); y = lerp(cy + 150, 1500, eOut(v)); }
    ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI) * .95; ctx.translate(x, y);
    ctx.fillStyle = '#F2EFE6'; rr(-40, -52, 80, 104, 6); ctx.fill();
    ctx.fillStyle = C.green; ctx.beginPath(); ctx.arc(0, -26, 12, 0, Math.PI * 2); ctx.fill();
    for (let l = 0; l < 3; l++) bar(-28, -4 + l * 14, 56 - l * 10, 6, '#b5b2a8');
    if (u > .5) { ctx.fillStyle = good ? C.lime : C.orange; ctx.beginPath(); ctx.arc(30, -42, 11, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  txt('PROFILS RETENUS', 80, 1600, { size: 22, w: 800, ls: 4, color: C.lime });
  txt('ANALYSE SÉMANTIQUE', cx, 1100, { size: 24, w: 700, ls: 6, color: C.light, align: 'center' });
  txt('PRÉDICTIVE · NEURONALE', cx, 1140, { size: 24, w: 700, ls: 6, color: C.light, align: 'center' });
  const tm = WT('terrain', 'million') - (TL._terrainClaraStart);
  const n = Math.round(1000000 * eOut(clamp((lt - (tm - 1.6)) / 1.7)));
  const s = n.toLocaleString('fr-FR').replace(/ | /g, ' ');
  ctx.save(); ctx.fillStyle = 'rgba(7,21,16,0.75)'; ctx.globalAlpha = eOut(clamp((lt - (tm - 1.8)) / .3)); rr(90, 1240, 900, 260, 20); ctx.fill(); ctx.restore();
  txt(s, cx, 1390, { f: 'A', size: 150, color: C.cream, align: 'center', alpha: eOut(clamp((lt - (tm - 1.8)) / .3)) });
  rise('CV PAR MINUTE', cx, 1460, t, WT('terrain', 'cv') - .15, { size: 34, w: 800, ls: 10, color: C.orange, align: 'center' });
}

// 7 — IMPACT
S.impact = (t, sc) => {
  chapter(t, sc, '05', 'IMPACT 2025');
  const t25 = WT('impact', '2025');
  const k = eExpo(P(t, t25 - .2, 1));
  ctx.save(); ctx.globalAlpha = .14 * k * (1 - eIn(P(t, sc.end - .4, .4)));
  txt('2025', W / 2, 1150 + (1 - k) * 100, { f: 'A', size: 480, stroke: C.lime, lw: 3, align: 'center' });
  ctx.restore();
  rise('EN 2025', 80, 380, t, t25 - .15, { f: 'A', size: 80, color: C.orange });
  const stats = [
    { v: 26, suf: '', a: 'PROJETS', b: 'STRUCTURANTS', t: WT('impact', 'vingt-six') },
    { v: 12, suf: '', a: 'PAYS', b: 'PARTENAIRES', t: WT('impact', 'douze') },
    { v: 150, suf: '+', a: 'SOLUTIONS', b: 'TECHNOLOGIQUES', t: WT('impact', 'plus') },
    { v: 85, suf: '%', a: "D'EXPERTISE", b: 'LOCALE', t: WT('impact', 'quatre-vingt-cinq') },
  ];
  stats.forEach((s, i) => {
    const x = 80 + (i % 2) * 470, y = 440 + Math.floor(i / 2) * 290;
    const kk = eExpo(P(t, s.t - .25, .7)); if (kk <= 0) return;
    const oy = (1 - kk) * 40;
    ctx.save(); ctx.globalAlpha = clamp(kk);
    ctx.fillStyle = 'rgba(12,34,20,0.88)'; rr(x, y + oy, 450, 265, 16); ctx.fill();
    bar(x, y + oy, 6, 265, i % 2 ? C.orange : C.lime);
    const n = Math.round(s.v * eOut(P(t, s.t - .2, 1.1)));
    txt(n + s.suf, x + 40, y + 150 + oy, { f: 'A', size: 130, color: i % 2 ? C.orange : C.lime });
    txt(s.a, x + 40, y + 200 + oy, { size: 24, w: 800, ls: 4, color: C.cream });
    txt(s.b, x + 40, y + 232 + oy, { size: 24, w: 500, ls: 4, color: C.light });
    ctx.restore();
  });
  const t90 = WT('impact', 'quatre-vingt-dix');
  const rc = IMG.report;
  const ra = io(t, t25 - .1, t90 + .1, .6, .45);
  if (rc && ra > 0) {
    const kk = eExpo(P(t, t25 - .1, 1));
    ctx.save(); ctx.globalAlpha = ra; ctx.translate(540, 1340 + (1 - kk) * 120); ctx.rotate(.05 - .03 * P(t, t25, 9));
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20;
    const hh = 560, ww = hh * rc.width / rc.height;
    ctx.drawImage(rc, -ww / 2, -hh / 2, ww, hh);
    ctx.restore();
    rise('RAPPORT ANNUEL 2025', 540, 1680, t, t25 + .3, { size: 24, w: 800, ls: 6, color: C.light, align: 'center', out: t90 - .3 });
  }
  const gk = eOut(P(t, t90 - .1, 1.3));
  if (t > t90 - .2) {
    const gx = 540, gy = 1290, R = 210;
    const a = io(t, t90 - .2, sc.end, .4, .35);
    ctx.save(); ctx.globalAlpha = a;
    ctx.lineWidth = 32; ctx.strokeStyle = 'rgba(175,193,139,0.15)'; ctx.beginPath(); ctx.arc(gx, gy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = C.lime; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(gx, gy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * .9 * gk); ctx.stroke();
    txt(Math.round(90 * gk) + '%', gx, gy + 50, { f: 'A', size: 150, color: C.cream, align: 'center' });
    ctx.restore();
    rise('DE NOS PARTENAIRES', gx, gy + R + 90, t, WT('impact', 'partenaires', 0) - .1, { size: 26, w: 800, ls: 5, color: C.light, align: 'center' });
    rise('RENOUVELLENT LEUR CONFIANCE', gx, gy + R + 135, t, WT('impact', 'renouvellent') - .1, { size: 26, w: 800, ls: 5, color: C.orange, align: 'center' });
  }
};

// 8 — VALEURS
S.valeurs = (t, sc) => {
  chapter(t, sc, '06', 'NOS VALEURS');
  const tN = WT('valeurs', 'nous');
  const tSv = WT('valeurs', 'souveraineté'), tAf = WT('valeurs', 'africaine');
  const vals = [['RIGUEUR.', WT('valeurs', 'rigueur'), C.cream, 170], ['INTÉGRITÉ.', WT('valeurs', 'intégrité'), C.lime, 170], ['SOUVERAINETÉ', tSv, C.orange, 140], ['AFRICAINE.', tAf, C.orange, 140]];
  const out = tN - .25;
  vals.forEach(([w, ti, col, fs], i) => {
    if (t > out + .6) return;
    const k = eOut(P(t, ti - .08, .35));
    if (k <= 0) return;
    const sh = (1 - P(t, ti, .25)) * 10 * Math.sin(t * 90);
    const s = lerp(1.6, 1, k);
    const o = eIn(P(t, out, .45));
    ctx.save(); ctx.globalAlpha = k * (1 - o); ctx.translate(W / 2 + sh, 640 + i * 175 - o * 120); ctx.scale(s, s);
    txt(w, 0, 0, { f: 'A', size: fs, color: col, align: 'center' });
    ctx.restore();
  });
  const tH = WT('valeurs', "l'humain");
  const hk = eBack(P(t, tH - .3, .7));
  const ta = WT('valeurs', 'afrique');
  const mv = eIO(P(t, ta - .4, .9));
  if (hk > 0) {
    const hx = W / 2, hy = lerp(780, 520, mv);
    const sc_ = lerp(1, .75, mv);
    ctx.save(); ctx.globalAlpha = clamp(hk) * (1 - eIn(P(t, sc.end - .35, .35)));
    for (let k = 0; k < 10; k++) {
      const a = k / 10 * Math.PI * 2 + t * .5, r = (200 + (k % 2) * 50) * sc_;
      const x = hx + Math.cos(a) * r * hk, y = hy + Math.sin(a) * r * .7 * hk;
      line(hx, hy, x, y, C.green, 1.5, .4);
      ctx.fillStyle = k % 3 ? C.lime : C.orange; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = C.bg1; ctx.beginPath(); ctx.arc(hx, hy, 120 * hk * sc_, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = C.lime; ctx.lineWidth = 4; ctx.stroke();
    icon('user', hx, hy + 10, 140 * hk * sc_, C.cream, t);
    ctx.restore();
    rise("L'HUMAIN", W / 2, 1130, t, tH - .1, { f: 'A', size: 120, color: C.cream, align: 'center', out: ta - .5 });
    rise('au cœur de la', W / 2, 1210, t, WT('valeurs', 'cœur') - .1, { f: 'B', size: 50, color: C.light, align: 'center', out: ta - .45 });
    rise('transformation numérique', W / 2, 1275, t, WT('valeurs', 'transformation') - .1, { f: 'B', size: 50, color: C.light, align: 'center', out: ta - .45 });
  }
  if (mv > 0) {
    const tx = W / 2, o = sc.end - .35;
    rise('UNE AFRIQUE', tx, 860, t, ta - .1, { f: 'A', size: 96, color: C.cream, align: 'center', out: o });
    rise('STRUCTURÉE', tx, 950, t, WT('valeurs', 'structurée') - .1, { size: 40, w: 800, ls: 8, color: C.lime, align: 'center', out: o });
    rise('& COMPÉTITIVE', tx, 1010, t, WT('valeurs', 'compétitive') - .1, { size: 40, w: 800, ls: 8, color: C.lime, align: 'center', out: o });
    rise("À L'HORIZON", tx, 1150, t, WT('valeurs', "l'horizon") - .1, { size: 30, w: 800, ls: 10, color: C.light, align: 'center', out: o });
    const yk = eOut(P(t, WT('valeurs', '2050') - .5, 1.0));
    if (yk > 0) {
      const yr = Math.round(lerp(2025, 2050, yk));
      ctx.save(); ctx.globalAlpha = 1 - eIn(P(t, sc.end - .35, .35));
      txt(String(yr), tx, 1400, { f: 'A', size: 260, color: C.orange, align: 'center', glow: 'rgba(232,144,42,0.5)', glowB: 40 });
      ctx.restore();
    }
  }
};

// 9 — LOGO
S.logo = (t, sc) => {
  const t0 = sc.start + .35;
  const fl = Math.max(0, 1 - Math.abs(t - t0) / .25);
  ctx.save(); ctx.translate(W / 2, 720); ctx.rotate(t * .08);
  for (let i = 0; i < 24; i++) { ctx.rotate(Math.PI / 12); ctx.globalAlpha = .05 + .05 * Math.sin(i); ctx.fillStyle = i % 2 ? C.lime : C.orange; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1600, -30); ctx.lineTo(1600, 30); ctx.fill(); }
  ctx.restore();
  const k = P(t, t0 - .25, 1.2);
  emblem(W / 2, 720, 200, k, 1);
  const wk = eExpo(P(t, WT('logo', 'mboma') - .1, .8));
  ctx.save(); ctx.globalAlpha = wk;
  const w1 = measure('MboMa', { size: 120, w: 600 }), w2 = measure(' & Co.', { size: 96, w: 500 });
  const x0 = W / 2 - (w1 + w2) / 2;
  txt('MboMa', x0, 1090 + (1 - wk) * 40, { size: 120, w: 600, color: C.lime });
  txt(' & Co.', x0 + w1, 1090 + (1 - wk) * 40, { size: 96, w: 500, color: C.cream });
  ctx.restore();
  rise('ÉLEVER LES STANDARDS.', W / 2, 1250, t, WT('logo', 'élevez') - .1, { f: 'A', size: 88, color: C.cream, align: 'center' });
  rise("CRÉER L'IMPACT.", W / 2, 1350, t, WT('logo', 'créez') - .1, { f: 'A', size: 88, color: C.orange, align: 'center' });
  ctx.save(); ctx.globalAlpha = fl; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.restore();
};

// 10 — TRACE + END CARD
S.trace = (t, sc) => drawTrace(t, sc.start, false);
S.endcard = (t, sc) => drawTrace(t, TL.scenes.find(s => s.id === 'trace').start, true);
function drawTrace(t, t0, end) {
  // paw prints walking up the screen
  const n = 12;
  for (let i = 0; i < n; i++) {
    const ti = t0 + .2 + i * .24;
    const a = eOut(P(t, ti, .3)) * (1 - .6 * P(t, ti + 1.5, 2.5));
    if (a <= 0) continue;
    const x = 540 + (i % 2 ? 70 : -70) + Math.sin(i * .6) * 60, y = 1720 - i * 125;
    drawPaw(x, y, 66, i % 4 === 3 ? C.orange : C.lime, a * .28, (i % 2 ? .12 : -.12));
  }
  const te = TL.scenes.find(s => s.id === 'endcard').start;
  const fadeQ = end ? eIn(P(t, te - .1, .5)) : 0;
  ctx.save(); ctx.globalAlpha = 1 - fadeQ;
  rise('Nous ne faisons', W / 2, 820, t, WT('trace', 'nous') - .1, { f: 'B', size: 82, color: C.cream, align: 'center' });
  rise('pas du bruit.', W / 2, 920, t, WT('trace', 'pas') - .1, { f: 'B', size: 82, color: C.cream, align: 'center' });
  rise('Nous laissons', W / 2, 1080, t, WT('trace', 'nous', 1) - .1, { f: 'B', size: 82, color: C.orange, align: 'center' });
  rise('une trace.', W / 2, 1180, t, WT('trace', 'une') - .1, { f: 'B', size: 82, color: C.orange, align: 'center' });
  ctx.restore();
  if (end) {
    const k = P(t, te + .1, 1.1);
    emblem(W / 2, 640, 160, k, 1);
    bar(W / 2 - 160 * eExpo(k), 850, 320 * eExpo(k), 4, C.orange);
    ctx.save(); ctx.globalAlpha = eExpo(P(t, te + .4, .8));
    const w1 = measure('MboMa', { size: 110, w: 600 }), w2 = measure(' & Co.', { size: 88, w: 500 });
    const x0 = W / 2 - (w1 + w2) / 2;
    txt('MboMa', x0, 990, { size: 110, w: 600, color: C.lime });
    txt(' & Co.', x0 + w1, 990, { size: 88, w: 500, color: C.cream });
    ctx.restore();
    rise('ÉLEVER LES STANDARDS.', W / 2, 1090, t, te + .6, { size: 30, w: 800, ls: 8, color: C.light, align: 'center' });
    rise("CRÉER L'IMPACT.", W / 2, 1140, t, te + .7, { size: 30, w: 800, ls: 8, color: C.orange, align: 'center' });
    rise('www.mboma.org', W / 2, 1270, t, te + .8, { size: 56, w: 700, color: C.cream, align: 'center' });
    rise('BRAZZAVILLE  ·  KINSHASA  ·  PARIS', W / 2, 1350, t, te + 1, { size: 24, w: 700, ls: 6, color: C.orange, align: 'center' });
  }
}
