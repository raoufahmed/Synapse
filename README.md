# SYNAPSE Website (Separated Structure)

All HTML, CSS, JavaScript, content data, and images have been separated from the single-file bundle so you can easily edit and upload the project to GitHub Pages.

## Folder Structure

```text
├── index.html                          # Main HTML structure
├── css/
│   └── styles.css                      # All styling, themes (dark/light), RTL/LTR & responsive rules
├── js/
│   ├── data.js                         # Easy-to-edit content (committees, events, photos, YouTube videos)
│   └── main.js                         # Interactive logic (3D carousels, lightbox, filters, toggles)
├── assets/
│   ├── logo.webp                       # SYNAPSE logo
│   ├── committees/                     # Committee cover images (committee-01.jpg .. committee-09.jpg)
│   └── events/
│       ├── blood-donation/             # b0.webp .. b102.webp (103 photos)
│       ├── hospital-awareness/         # p0.webp .. p26.webp (27 photos)
│       ├── research-achievement/       # r0.webp .. r8.webp (9 photos)
│       └── medical-statistics/         # s0.webp (1 photo)
├── .nojekyll                           # Disables Jekyll processing on GitHub Pages
└── README.md                           # This guide
```

## How to Edit Content

1. **Add or edit Videos & Reels:** Open `js/data.js`, scroll to `VIDEOS`, and copy/edit any object with the YouTube `id`, `url`, `color`, `tag`, `title`, and `desc`.
2. **Add photos to an existing Event:** Drop the new `.webp` image into the event's folder inside `assets/events/` (for example `b103.webp` in `assets/events/blood-donation/`) and increment the count in `photoRange(...)` inside `js/data.js`.
3. **Add a new Event:** Add a new folder inside `assets/events/` and add a new object to the `EVENTS` array in `js/data.js`.
4. **Update Committee info or cover photos:** Replace the image in `assets/committees/` or edit the text in `COMMITTEES` inside `js/data.js`.
5. **Change colors, fonts, or layout:** Edit `css/styles.css`.

## How to Upload to GitHub

1. Extract this ZIP archive.
2. Upload **all contents inside the extracted folder** (`index.html`, `css/`, `js/`, `assets/`, `.nojekyll`, `README.md`) to the root of your GitHub repository.
3. In your repository **Settings → Pages**, set the source to **Deploy from a branch** (`main` / `/(root)`).
