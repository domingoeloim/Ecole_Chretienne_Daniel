import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const routes = [
  "index.html",
  "ecole.html",
  "maternelle.html",
  "primaire.html",
  "vie-scolaire.html",
  "actualites/index.html",
  "actualites/culte-rentree-scolaire.html",
  "galerie.html",
  "contact.html",
];
const pages = new Map(
  routes.map((route) => [
    route,
    existsSync(path.join(root, route)) ? readFileSync(path.join(root, route), "utf8") : "",
  ]),
);

test("the school website has nine separate page routes", () => {
  for (const route of routes) {
    assert.notEqual(pages.get(route), "", `missing page: ${route}`);
  }
});

test("every page has its own title, main landmark, and active navigation", () => {
  for (const [route, html] of pages) {
    assert.match(html, /<title\b[^>]*data-fr="[^"]+"[^>]*data-en="[^"]+"/, `${route} needs a bilingual title`);
    assert.match(html, /<main\b[^>]+id="main-content"/, `${route} needs a main landmark`);
    assert.match(html, /<h1\b/, `${route} needs a page heading`);
    assert.match(html, /aria-current="page"/, `${route} needs to identify the current page`);
    assert.match(html, /data-language-toggle/, `${route} needs the language control`);
  }
});

test("all local page, stylesheet, script, image, and fragment links resolve", () => {
  for (const [route, html] of pages) {
    assert.notEqual(html, "", `cannot validate links on missing page: ${route}`);
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
    for (const [, , href] of html.matchAll(/\bhref=(["'])(.*?)\1/g)) {
      if (!href || href.startsWith("https://") || href.startsWith("http://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        continue;
      }

      const [localPath, fragment] = href.split("#", 2);
      if (!localPath) {
        assert.ok(ids.has(fragment), `${route} has an unresolved fragment: #${fragment}`);
        continue;
      }

      const target = path.resolve(root, path.dirname(route), localPath);
      assert.ok(existsSync(target), `${route} has an unresolved local link: ${href}`);
      if (fragment && target.endsWith(".html")) {
        const targetHtml = readFileSync(target, "utf8");
        const targetIds = new Set([...targetHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
        assert.ok(targetIds.has(fragment), `${route} links to a missing fragment: ${href}`);
      }
    }

    for (const [, , src] of html.matchAll(/\bsrc=(["'])(.*?)\1/g)) {
      if (src.startsWith("https://") || src.startsWith("http://")) {
        assert.fail(`${route} must not hotlink unapproved media: ${src}`);
      }
      assert.ok(existsSync(path.resolve(root, path.dirname(route), src)), `${route} has a missing asset: ${src}`);
    }
  }
});

test("the shared navigation reaches all main school pages from every route", () => {
  const navigationRoutes = [
    "index.html",
    "ecole.html",
    "maternelle.html",
    "primaire.html",
    "vie-scolaire.html",
    "actualites/index.html",
    "galerie.html",
    "contact.html",
  ];

  for (const [route, html] of pages) {
    const navigation = html.match(/<nav\b[\s\S]*?<\/nav>/i)?.[0] ?? "";
    assert.ok(navigation, `${route} needs primary navigation`);
    const hrefs = [...navigation.matchAll(/\bhref=(["'])(.*?)\1/g)].map((match) => match[2]);
    const resolved = new Set(hrefs.map((href) =>
      path.relative(root, path.resolve(root, path.dirname(route), href.split("#")[0])),
    ));
    for (const target of navigationRoutes) {
      assert.ok(resolved.has(target), `${route} navigation does not reach ${target}`);
    }
  }
});

test("every translated string has both French and English copy", () => {
  for (const [route, html] of pages) {
    assert.notEqual(html, "", `cannot validate translations on missing page: ${route}`);
    const tags = html.match(/<[a-z][^>]*>/gi) ?? [];
    const translated = tags.filter((tag) => /\bdata-fr=/.test(tag));
    assert.ok(translated.length > 10, `${route} is missing bilingual content`);
    for (const tag of translated) {
      assert.match(tag, /\bdata-en="[^"]+"/, `${route} has an untranslated element: ${tag}`);
    }
  }
});

test("page-specific titles and descriptions are localized by the shared script", () => {
  const script = readFileSync(path.join(root, "site.js"), "utf8");

  for (const [route, html] of pages) {
    assert.match(html, /<meta name="description"[^>]*data-fr-content="[^"]+"[^>]*data-en-content="[^"]+"/, `${route} needs localized metadata`);
  }
  assert.match(script, /querySelector\(["']title["']\)/);
  assert.match(script, /meta\[name=["']description["']\]/);
  assert.match(script, /data-\$\{language\}-content/);
  assert.match(script, /if\s*\(\s*mottoDrawing\s*\)/, "the motto animation must tolerate pages without a drawing");
});

test("the selected language persists across routes and storage failures are announced", () => {
  const script = readFileSync(path.join(root, "site.js"), "utf8");

  assert.match(script, /localStorage\.getItem/);
  assert.match(script, /localStorage\.setItem/);
  assert.match(script, /announceLanguagePreference/);
});

test("Facebook news accurately attributes the observed school event", () => {
  const listing = pages.get("actualites/index.html");
  const article = pages.get("actualites/culte-rentree-scolaire.html");

  assert.match(listing, /culte-rentree-scolaire\.html/);
  assert.match(article, /2026/);
  assert.match(article, /03 octobre|3 octobre|3 October|October 3/i);
  assert.match(article, /12 octobre|12 October/i);
  assert.match(article, /web\.facebook\.com\/educationchretienne/);
  assert.match(article, /selon (la|une) publication|as reported by/i);
  assert.doesNotMatch(article, /célébré à Fifadji|held in Fifadji/i);
  assert.doesNotMatch(article, /<video\b|fbcdn\.net|scontent\./i);
});

test("the school gallery uses original artwork and the supplied logo only", () => {
  const gallery = pages.get("galerie.html");
  assert.match(gallery, /illustration originale|original illustration/i);
  assert.match(gallery, /autorisation|permission/i);
  assert.match(gallery, /assets\/images\.jpg/);
  assert.doesNotMatch(gallery, /https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp|mp4)(?:\?[^"']*)?/i);
});

test("unverified contacts and excluded features are not invented", () => {
  for (const [route, html] of pages) {
    assert.doesNotMatch(html, /\+33\b|Guebwiller|Alsace|etablissement\.org/i, `${route} must not use unrelated school details`);
    assert.doesNotMatch(html, /\bhref=["']tel:|\bhref=["']mailto:/i, `${route} must not invent contact links`);
    assert.doesNotMatch(html, /<form\b|Espace parents|Parent portal|préinscription|pre-registration/i, `${route} must not add excluded features`);
  }
});

test("the school motto signature and reduced-motion behavior remain available", () => {
  const school = pages.get("ecole.html");
  const script = readFileSync(path.join(root, "site.js"), "utf8");
  const css = readFileSync(path.join(root, "styles.css"), "utf8");

  assert.match(school, /id="motto-heart"/);
  assert.match(script, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
