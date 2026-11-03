"""Curate images extracted from _source/profile.pdf into public/images.

Each entry: output slug -> source filename (in _source/images).
Writes <slug>-<w>.avif and <slug>-<w>.webp at two widths (full + 640),
plus a JSON manifest (content/image-manifest.json) with intrinsic sizes.

Run:  python scripts/process-images.py
"""
import json
import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_source", "images")
OUT = os.path.join(ROOT, "public", "images")

CURATED = {
    # Roads
    "hugary-mountain-road": "p43_01_1033x629_a47f7f79.jpeg",
    "hugary-road-aerial": "p43_00_838x510_3dfbcfe5.jpeg",
    "al-sawaida-komal-road": "p42_01_896x493_4e3ba9b5.jpeg",
    "al-sawaida-komal-road-aerial": "p42_00_838x501_215cea6b.jpeg",
    "thoaab-road-aerial": "p44_02_750x439_e849b6eb.jpeg",
    "al-barh-road-aerial": "p44_03_746x451_6d23be1b.jpeg",
    "alssolaif-road-aerial": "p45_03_824x497_467f5744.jpeg",
    "artil-city-internal-streets": "p45_02_847x339_dc7fc382.jpeg",
    "hassan-dam-road-al-hisn": "p41_00_1160x653_02c014a5.jpeg",
    "hassan-dam-road-al-hisn-2": "p41_01_1164x655_8a2c1d06.jpeg",
    # Dams
    "hassan-dam-main-dyke": "p47_01_842x527_08770253.jpeg",
    "hassan-dam-dyke-sd3": "p47_02_748x422_06849016.jpeg",
    "hassan-dam-gates-admin": "p47_00_834x520_2823f82d.jpeg",
    "hassan-dam-cementing-soil": "p26_00_1080x607_c9bb411c.jpeg",
    "al-sokaa-dam-aerial": "p48_01_748x465_86adda07.jpeg",
    "al-ghayl-dam-aerial": "p48_02_748x443_29c0567e.jpeg",
    "al-damom-dam-aerial": "p49_02_748x470_ae6826b0.jpeg",
    "al-lafag-dam-aerial": "p49_03_792x485_bdac8239.jpeg",
    # Buildings
    "fcom-hq-aden": "p51_01_745x446_efa77076.jpeg",
    "fcom-hq-aden-2": "p51_02_748x487_d312604d.jpeg",
    "fcom-hq-aden-3": "p52_02_750x464_ebcbbcb6.jpeg",
    "fcom-hq-aden-interior": "p52_01_748x493_59095079.jpeg",
    "steel-structure-al-alam": "p53_04_748x439_aca97f7c.jpeg",
    "steel-structure-al-alam-2": "p53_03_747x451_45a65b57.jpeg",
    # Plants & fleet
    "stationary-crusher-300": "p33_01_717x403_0300ed74.jpeg",
    "stationary-crusher-300-b": "p09_01_717x403_95192fb5.jpeg",
    "stationary-crusher-250": "p34_00_748x419_214cfb15.jpeg",
    "mobile-crusher": "p34_02_751x420_b3cdd2d4.jpeg",
    "mobile-screen": "p34_01_930x545_e368ae86.jpeg",
    "asphalt-plant-180": "p35_02_748x420_bc48beac.jpeg",
    "asphalt-plant-180-b": "p35_03_750x419_d2c649d2.jpeg",
    "concrete-plant-120-turkish": "p36_03_749x420_b83dc678.jpeg",
    "concrete-plant-90-italian": "p36_00_750x419_7893eac3.jpeg",
    "concrete-fleet": "p36_04_1232x705_c6a15a0e.jpeg",
    "concrete-batching-site": "p09_00_1280x960_e2e53871.jpeg",
    "graders-fleet": "p37_01_752x420_6e4ea34b.jpeg",
    "rollers-fleet": "p37_00_751x421_d6ba0430.jpeg",
    "heavy-equipment-yard": "p37_02_1109x625_c51c5bcd.jpeg",
    "excavators-fleet": "p38_01_749x418_c1269ad5.jpeg",
    "loaders-fleet": "p38_02_748x419_c327d0d6.jpeg",
    "transport-trucks-fleet": "p38_03_748x419_10cceeee.jpeg",
    "grader-road-works": "p28_00_1080x511_489f9014.jpeg",
    "grader-earthworks": "p08_00_1080x511_de43fda6.jpeg",
    "site-team": "p13_00_1008x454_8508a1b3.jpeg",
    "building-site-crane": "p14_00_1280x645_2b32c6ca.jpeg",
    "tower-crane": "p12_00_746x560_a76fab1b.jpeg",
    "concrete-pour": "p17_00_1024x768_eec926cb.jpeg",
    "graders-lineup": "p16_00_748x417_23dfdedc.jpeg",
}

FULL_MAX = 1280
SMALL = 640


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    for slug, fn in CURATED.items():
        im = Image.open(os.path.join(SRC, fn)).convert("RGB")
        w, h = im.size
        widths = sorted({min(w, FULL_MAX), min(w, SMALL)})
        for tw in widths:
            th = round(h * tw / w)
            r = im if tw == w else im.resize((tw, th), Image.LANCZOS)
            r.save(os.path.join(OUT, f"{slug}-{tw}.webp"), "WEBP", quality=72, method=6)
            r.save(os.path.join(OUT, f"{slug}-{tw}.avif"), "AVIF", quality=55)
        full = widths[-1]
        manifest[slug] = {
            "width": full,
            "height": round(h * full / w),
            "sizes": widths,
            "source": fn,
        }
    with open(os.path.join(ROOT, "content", "image-manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"{len(manifest)} images written to {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
