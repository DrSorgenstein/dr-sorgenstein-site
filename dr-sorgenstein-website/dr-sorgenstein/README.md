# Dr. Sorgenstein — website

A static, dependency-free site (plain HTML/CSS/JS — no build step, no framework).
Responsive from small phones through large desktop monitors, and standards-based
so it renders the same on Windows and macOS browsers (Chrome, Edge, Safari, Firefox).

## What's inside

```
index.html              the whole site (one page)
assets/css/style.css     all styling — design tokens at the top of the file
assets/js/main.js        mobile menu toggle + footer year, ~40 lines, no dependencies
assets/img/favicon.svg   "DS" monogram favicon
```

## How to publish it

This is a static site, so any static host works. A few easy options:

- **Netlify / Vercel** — drag the unzipped folder onto their dashboard, or connect it to
  a Git repo. Live in under a minute.
- **GitHub Pages** — push the contents to a repo and enable Pages on the `main` branch
  (root folder). Free, and pairs well if you already keep things on GitHub.
- **Any traditional web host** — upload the folder's contents to your host's `public_html`
  (or equivalent) via SFTP/File Manager. `index.html` must sit at the root of the folder
  you point your domain at.

No server, database, or build tooling is required — it's ready to deploy as-is.

## Responsive behavior

- Mobile-first CSS with fluid type (`clamp()`), so text and spacing scale smoothly
  instead of jumping at fixed breakpoints.
- Breakpoints: base (phones) → 700px (tablets) → 860px (large tablets/small laptops)
  → 980px (desktop nav switches from the hamburger menu to the full nav bar) →
  1400px (large desktop).
- Touch devices skip the hover-lift animation on buttons/cards (`@media (hover: none)`)
  so taps feel instant rather than laggy.
- Respects `prefers-reduced-motion` — the oscilloscope animation and smooth-scroll
  turn off automatically for anyone with that OS setting enabled.

## Updating content

- **Bio / case file:** edit the text inside `<div class="note-panel">` in `index.html`.
- **Career timeline:** the four-item list inside `<ol class="timeline">`.
- **Adding another platform** (YouTube Music, SoundCloud, Instagram, TikTok, Bandcamp,
  etc.): copy one `<li>` block inside `<ul class="link-list">` in the *Transmissions*
  section, swap the URL, label, and icon path. A matching card can also be added to the
  *Listen* section's `.jar-row` if you'd like it featured there too.
- **Colors/fonts:** every color and font is a CSS custom property at the top of
  `assets/css/style.css` (the `:root` block) — change a value there and it updates
  everywhere it's used.

## Notes

- No tracking/analytics script is included. Add one (e.g. Plausible, GA4) inside
  `<head>` in `index.html` if you want visit data.
- Social icons are custom line-drawn glyphs rather than the platforms' official logos,
  to keep the file free of third-party trademarked artwork.
- Only Spotify, Apple Music, and LinkedIn links were supplied at build time — the layout
  is set up so more platforms drop in as one more list item, no restructuring needed.
