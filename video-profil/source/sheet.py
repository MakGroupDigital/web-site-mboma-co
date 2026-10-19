import sys, glob
from PIL import Image, ImageDraw
fs = sorted(glob.glob(sys.argv[1] + '/*.jpg'), key=lambda f: float(f.split('t_')[1][:-4]))
cols = 2; w, h = 960, 540
rows = (len(fs) + 1) // 2
sh = Image.new('RGB', (w * cols, h * rows), 'black')
for i, f in enumerate(fs):
    im = Image.open(f).resize((w, h)); d = ImageDraw.Draw(im); d.text((10, 10), f.split('t_')[1], fill='red')
    sh.paste(im, ((i % cols) * w, (i // cols) * h))
sh.save(sys.argv[2], quality=85)
