#!/usr/bin/env python3
import re

path = "index.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# ---------- 1. THREE EXPERIENCE CARD PHOTOS ----------
# THE SPACE (first card) -> interior.jpg
html = html.replace(
    '''<div class="experience-image">
            <div class="image-placeholder">
              <span>THE SPACE</span>
            </div>
          </div>''',
    '''<div class="experience-image">
            <img src="images/interior.jpg" alt="Inside Koi Circle" loading="lazy">
          </div>''',
    1
)

# THE TABLE (second card) -> dish-1.jpg
html = html.replace(
    '''<div class="experience-image">
            <div class="image-placeholder">
              <span>THE TABLE</span>
            </div>
          </div>''',
    '''<div class="experience-image">
            <img src="images/dish-1.jpg" alt="Food at Koi Circle" loading="lazy">
          </div>''',
    1
)

# THE PEOPLE (third card) -> gallery.jpg
html = html.replace(
    '''<div class="experience-image">
            <div class="image-placeholder">
              <span>THE PEOPLE</span>
            </div>
          </div>''',
    '''<div class="experience-image">
            <img src="images/gallery.jpg" alt="The Koi moment" loading="lazy">
          </div>''',
    1
)

# ---------- 2. FIND KOI -> GOOGLE MAP ----------
map_block = '''<div class="visit-image">
          <iframe
            src="https://www.google.com/maps?q=Koi+Circle+Kenyatta+Road+Juja&output=embed"
            width="100%"
            height="400"
            style="border:0; border-radius:12px;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Koi Circle location map"
          ></iframe>
        </div>'''

html = re.sub(
    r'<div class="visit-image">\s*<div class="image-placeholder">.*?</div>\s*</div>',
    map_block,
    html,
    count=1,
    flags=re.DOTALL
)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)

print("Done. 3 experience photos + 1 Google Map wired in.")
