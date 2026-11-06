"""Builds public/favicon.ico (16, 32 and 48 px) from public/assets/app_icon_512.png.

Run from the repo root: python tools/icons/favicon.py  (needs Pillow: pip install Pillow)
"""
from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parents[2]
src = Image.open(root / "public/assets/app_icon_512.png").convert("RGBA")
src.save(root / "public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("wrote public/favicon.ico")
