#!/usr/bin/env python3
import re

path = "index.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Replacement blocks
hero_block = '''<div class="hero-image">
        <img src="images/hero.jpg" alt="Koi Circle restaurant" loading="eager">
      </div>'''

story_block = '''<div class="photo-story">

        <div class="story-photo story-photo-large">
          <img src="images/interior.jpg" alt="Koi Circle main view" loading="lazy">
        </div>

        <div class="story-photo">
          <img src="images/dish-1.jpg" alt="Koi Circle food" loading="lazy">
        </div>

        <div class="story-photo">
          <img src="images/dish-2.jpg" alt="Koi Circle atmosphere" loading="lazy">
        </div>

        <div class="story-photo story-photo-wide">
          <img src="images/gallery.jpg" alt="The Koi moment" loading="lazy">
        </div>

      </div>'''

# Replace hero image block
html = re.sub(
    r'<div class="hero-image">\s*<div class="image-placeholder">.*?</div>\s*</div>',
    hero_block,
    html,
    count=1,
    flags=re.DOTALL
)

# Replace photo-story block
html = re.sub(
    r'<div class="photo-story">.*?</div>\s*</section>',
    story_block + "\n\n    </section>",
    html,
    count=1,
    flags=re.DOTALL
)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)

print("Done. Hero + 4 story photos wired in.")
