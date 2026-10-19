// node render.js stills out_dir t1 t2 ...   |   node render.js range f0 f1 out.mp4
// MOBILE=1 renders the vertical 1080x1920 version (film_mobile.html)
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

(async () => {
  const [mode, ...args] = process.argv.slice(2);
  const tl = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json'), 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files', '--disable-web-security', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const mobile = process.env.MOBILE === '1';
  const page = await browser.newPage({ viewport: mobile ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 } });
  page.on('console', m => console.log('[page]', m.text()));
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto('file://' + path.join(__dirname, mobile ? 'film_mobile.html' : 'film.html'));
  console.log(await page.evaluate(tl => window.init(tl), tl));
  const fps = tl.fps;
  if (mode === 'stills') {
    const [dir, ...ts] = args;
    fs.mkdirSync(dir, { recursive: true });
    for (const t of ts) {
      const url = await page.evaluate(t => window.grab(t, 0.85), parseFloat(t));
      fs.writeFileSync(path.join(dir, `t_${String(t).padStart(6, '0')}.jpg`), Buffer.from(url.split(',')[1], 'base64'));
    }
  } else {
    const [f0, f1, out] = [parseInt(args[0]), parseInt(args[1]), args[2]];
    const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(fps), out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let f = f0; f < f1; f++) {
      const url = await page.evaluate(t => window.grab(t, 0.94), f / fps);
      const buf = Buffer.from(url.split(',')[1], 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if ((f - f0) % 150 === 0) console.log(`frames ${f0}-${f1}: ${f} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
