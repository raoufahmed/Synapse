# SYNAPSE website

Bilingual (EN/AR) one-page site for the SYNAPSE student community, Merit University.
Plain HTML + CSS + ES modules. No build step, no dependencies.

## Run locally
ES modules do not load from `file://`, so use any static server from this folder:

    python3 -m http.server 8000      # then open http://localhost:8000
    # or: npx serve

## Structure
    index.html            markup (all text is bilingual: <span class="en"> / <span class="ar">)
    css/                  loaded in this order (order matters, do not reorder):
      variables.css         theme tokens: light / dark / Arabic font swap
      base.css              reset, typography, utilities, buttons
      layout.css            nav, hero + photo rail, about, section headings
      components.css        committees carousel + dialog, events grid/filters/gallery/lightbox/modal
      sections.css          events background, partner, footer, videos carousel
      responsive.css        breakpoints + reduced-motion (loaded last on purpose)
    js/main.js            entry point, initialises each module
    js/modules/           theme-lang, navigation, hero-rail, committees, events, lightbox, videos
    js/data/              ALL editable content: committees.js, events.js, videos.js, images.js
    js/utils/             dom helpers, safe localStorage, reduced-motion flag
    assets/images/        brand/, committees/, leaders/, events/<album>/

## Common edits
- Change text of a committee / event / video: edit `js/data/committees.js`, `events.js`, `videos.js`.
  Every text is `[English, Arabic]`.
- Add event photos: put the file in `assets/images/events/<album>/`, add one line to `js/data/images.js`
  (keys are `<prefix><number>` with no gaps: b = blood donation, c = Pink October, p = painkillers,
  r = research, s = statistics). Events pick up their photos automatically via `rng(prefix, cnt(prefix))`.
- Add a new album/event: add a folder, new keys with a new prefix letter in `images.js`, then a new entry
  in `EV` and `EV_META` in `events.js` (same index in both).
- Change a committee head: edit `leads` in `committees.js`; portraits live in `assets/images/leaders/`.
- Add a video: add an object to `VIDS` in `videos.js` (YouTube id + url).
- Colours/fonts: `css/variables.css`.

## Performance notes
- Images are real files (cacheable, lazy-loaded) instead of 7.8 MB of inline data: first load ships
  ~100 KB of code instead of 7.8 MB.
- Serve with HTTP/2 or HTTP/3 and long-cache headers for `assets/` (e.g. Cloudflare Pages, Netlify,
  GitHub Pages + Cloudflare). `modulepreload` hints in `index.html` flatten the module request chain.
- When you add/rename a JS file, add it to the `modulepreload` list in `index.html`.
- If you rename a theme/language storage key, update the inline script in `<head>` and `js/modules/theme-lang.js`.
