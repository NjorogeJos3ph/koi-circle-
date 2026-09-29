#!/usr/bin/env python3
import re

path = "index.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# ---------- 1. Fix "Get Directions" button ----------
html = html.replace(
    '''<a
              href="#"
              class="button button-primary"
              id="directionsButton"
            >
              Get Directions
            </a>''',
    '''<a
              href="https://www.google.com/maps/search/?api=1&query=Koi+Circle+Kenyatta+Road+Juja"
              target="_blank"
              rel="noopener"
              class="button button-primary"
              id="directionsButton"
            >
              Get Directions
            </a>''',
    1
)

# ---------- 2. Add Phone, WhatsApp, Instagram to visit-details ----------
old_details = '''<div class="visit-detail">

              <span>HOURS</span>

              <strong>
                Tue — Sun<br>
                8:30 AM — 6:30 PM
              </strong>

            </div>

          </div>'''

new_details = '''<div class="visit-detail">

              <span>HOURS</span>

              <strong>
                Tue — Sun<br>
                8:30 AM — 6:30 PM<br>
                <em>Closed Monday</em>
              </strong>

            </div>


            <div class="visit-detail">

              <span>PHONE</span>

              <strong>
                <a href="tel:+254702050665">0702 050 665</a>
              </strong>

            </div>


            <div class="visit-detail">

              <span>WHATSAPP</span>

              <strong>
                <a href="https://wa.me/254702050665" target="_blank" rel="noopener">Chat with us</a>
              </strong>

            </div>


            <div class="visit-detail">

              <span>INSTAGRAM</span>

              <strong>
                <a href="https://instagram.com/_thekoicircle" target="_blank" rel="noopener">@_thekoicircle</a>
              </strong>

            </div>

          </div>'''

html = html.replace(old_details, new_details, 1)

# ---------- 3. Add WhatsApp order button next to "View Menu" ----------
old_actions = '''<a
              href="#menu"
              class="button button-secondary"
            >
              View Menu
            </a>'''

new_actions = '''<a
              href="https://wa.me/254702050665?text=Hi%20Koi%20Circle%2C%20I'd%20like%20to%20place%20an%20order"
              target="_blank"
              rel="noopener"
              class="button button-secondary"
            >
              Order on WhatsApp
            </a>'''

html = html.replace(old_actions, new_actions, 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)

print("Done. Directions fixed. Phone, WhatsApp, Instagram added. WhatsApp order button added.")
