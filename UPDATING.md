# Updating the site

This site is updated over time, not built for one event. Any agent or person can follow this.

## Where things are
- `index.html`: all text. Each work is one `<article class="project">` inside `#work`. About, education and awards are in `#about`.
- `assets/img/`: images (WebP).
- `assets/style.css`, `assets/main.js`: layout, language switch, image viewer.

## Add or replace a work
1. Copy an existing `<article>` and change its `id`, text and images. Order = what KMG wants seen first.
2. Write every visible text twice: `<span lang="ko">…</span><span lang="en">…</span>`.
3. Each zoomable image needs `alt`, `data-caption-ko` and `data-caption-en`.
4. Image files: WebP. Inline image under 400 KB. A larger original can be the link target (`href`) so it opens in the viewer.
5. Prefer real, current screens and finished pieces over process shots or decoration.
6. Remove works KMG has retired. Do not keep stale numbers like "01 / 03".

## Values that change
Write a version number or count only next to a dated capture ("v0.10.5 · captured 2026.11.16"). Elsewhere link to the latest release instead.

## Never put on the page without KMG saying so
- Email, phone or address.
- AML RADAR team material, REWALK details, other unfinished or team-private work.

## Keep
The footer credit to Story by HTML5 UP and `assets/STORY-LICENSE.txt` (CC BY 3.0).

## Check before merging
- `node tests/check-site.cjs`, `node tests/test-language.cjs`, `node tests/test-dialog.cjs` (CI runs these on every PR).
- Look at the page at 375 px and 1440 px wide, in Korean and English (`?lang=en`).
- Merging to `main` publishes the site. Only KMG approves that.
- After a change, update `projects/portfolio-site.md` in the second-brain vault.
