"""Generate the branded Open Graph image (public/og.jpg, 1200x630).

Uses the Hugary mountain road photo, a charcoal overlay, the triangle motif,
a drawn FCOM mark and condensed type. Run: python scripts/make-og.py
"""
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1200, 630
TEAL = (0, 121, 158)
TEAL_BRIGHT = (92, 198, 230)
INK = (31, 35, 38)
SAFETY = (242, 107, 29)

photo = Image.open(os.path.join(ROOT, "_source", "images", "p43_01_1033x629_a47f7f79.jpeg")).convert("RGB")
scale = max(W / photo.width, H / photo.height)
photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
x0 = (photo.width - W) // 2
img = photo.crop((x0, 0, x0 + W, H))

# Left-to-right charcoal gradient overlay
overlay = Image.new("RGBA", (W, H))
od = ImageDraw.Draw(overlay)
for x in range(W):
    a = int(240 - 170 * (x / W))
    od.line([(x, 0), (x, H)], fill=INK + (a,))
# Blueprint grid + ruler ticks, blended via the overlay layer
for gx in range(0, W, 64):
    od.line([(gx, 0), (gx, H)], fill=(255, 255, 255, 16))
for gy in range(0, H, 64):
    od.line([(0, gy), (W, gy)], fill=(255, 255, 255, 16))
for tx in range(0, W, 16):
    od.line([(tx, 0), (tx, 10 if tx % 64 == 0 else 5)], fill=(255, 255, 255, 110))
img = Image.alpha_composite(img.convert("RGBA"), overlay)

d = ImageDraw.Draw(img)

# Logo mark (scaled from public/logo.svg viewBox 0 0 120 72)
s, ox, oy = 1.6, 72, 64
P = lambda x, y: (ox + x * s, oy + y * s)
white = (255, 255, 255)
d.rectangle([P(18, 14), P(42, 46)], outline=white, width=2)
for i in range(9):
    yy = 17.2 + i * 3.2
    d.line([P(18, yy), P(42, yy)], fill=white, width=1)
d.arc([P(22, 8), P(38, 20)], 180, 360, fill=white, width=2)
d.rectangle([P(20, 46), P(94, 52)], outline=white, width=2)
d.polygon([P(44, 10), P(86, 44), P(44, 44)], fill=TEAL)
d.polygon([P(50.5, 23.5), P(50.5, 38), P(68.3, 38)], fill=INK)
d.rectangle([P(6, 61), P(102, 66)], fill=TEAL)

bahn = os.path.join(os.environ.get("WINDIR", "C:/Windows"), "Fonts", "bahnschrift.ttf")


def font(size, weight="Bold Condensed"):
    f = ImageFont.truetype(bahn, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


d.text((72 + 180, 78), "First Canadian", font=font(46), fill=TEAL_BRIGHT)
d.text((72 + 180, 128), "O.M-LTD", font=font(26, "SemiBold"), fill=(197, 204, 210))

d.text((72, 250), "BUILDING THE INFRASTRUCTURE", font=font(66), fill=white)
d.text((72, 322), "THAT HOLDS COMMUNITIES TOGETHER", font=font(66), fill=white)
d.text((72, 394), "SINCE 1988.", font=font(66), fill=TEAL_BRIGHT)
d.rectangle([72, 478, 132, 484], fill=SAFETY)

d.text((72, 516), "Dams  ·  Mountain roads  ·  Buildings", font=font(30, "SemiBold"), fill=(230, 233, 235))
d.text((72, 560), "UAE  ·  CANADA  ·  KSA  ·  YEMEN", font=font(26), fill=TEAL_BRIGHT)

img.convert("RGB").save(os.path.join(ROOT, "public", "og.jpg"), quality=84, optimize=True, progressive=True)
print("public/og.jpg written")
