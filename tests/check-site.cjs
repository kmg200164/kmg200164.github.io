// Static checks for index.html. No dependencies: node tests/check-site.cjs
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const fail = [];

// 1. Every local file the page points to exists.
for (const [, ref] of html.matchAll(/(?:src|href)="([^"#:?]+)"/g)) {
  if (!fs.existsSync(path.join(root, ref))) fail.push(`missing file: ${ref}`);
}

// 2. Korean and English stay paired.
const ko = (html.match(/<span lang="ko">/g) || []).length;
const en = (html.match(/<span lang="en">/g) || []).length;
if (ko !== en) fail.push(`ko/en span count differs: ko ${ko}, en ${en}`);

// 3. Every zoomable image has alt text and captions in both languages.
for (const [tag] of html.matchAll(/<a class="image-trigger"[^>]*>\s*<img[^>]*>/g)) {
  for (const key of ['alt="', 'data-caption-ko="', 'data-caption-en="']) {
    if (!tag.includes(key)) fail.push(`image without ${key.slice(0, -2)}: ${tag.match(/src="([^"]+)"/)[1]}`);
  }
}

// 4. Inline images stay light enough for phones (full size can open in the viewer).
for (const [, src] of html.matchAll(/<img src="(assets\/img\/[^"]+)"/g)) {
  if (!fs.existsSync(path.join(root, src))) continue; // reported above
  const kb = fs.statSync(path.join(root, src)).size / 1024;
  if (kb > 400) fail.push(`inline image over 400 KB: ${src} (${kb.toFixed(0)} KB)`);
}

// 5. The layout credit required by CC BY 3.0 stays.
assert(fs.existsSync(path.join(root, 'assets/STORY-LICENSE.txt')), 'assets/STORY-LICENSE.txt missing');
if (!html.includes('html5up.net/story')) fail.push('footer credit to Story by HTML5 UP missing');

// 6. No contact details on the public page.
if (/mailto:|tel:|@gmail\.com/i.test(html)) fail.push('email or phone found on the page');

if (fail.length) { console.error(fail.join('\n')); process.exit(1); }
console.log('site checks passed');
