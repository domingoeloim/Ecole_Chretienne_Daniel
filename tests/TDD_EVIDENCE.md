# Multipage site TDD evidence

Journeys were derived from the requested bilingual, multipage school website;
no separate plan file was supplied.

## User journeys

1. A family can move from the home page to school and cycle information, news,
   gallery, and contact pages.
2. A visitor can read a bilingual, source-attributed school update without
   mistaking unverified details or copied social media for verified content.
3. A family can find the available public contact route and request admission
   information without an unsupported online form or parent portal.

## RED / GREEN

- RED command: `node --test tests/site.test.mjs`
- RED evidence: the new page-metadata/shared-script and Facebook-attribution
  checks failed before implementation; the run also exposed an incorrect
  capture-group index in the link-check test, which was corrected before the
  final GREEN run.
- GREEN command: `node --test tests/site.test.mjs`
- GREEN result: 11 tests passed, 0 failed.
- Additional syntax check: `node --check site.js` passed.
- Browser verification: language preference persisted from the school page to
  news and article pages; keyboard operation of the mobile menu and disclosure,
  reduced-motion rendering, and responsive overflow were checked in Chromium.

## Test guarantees

| # | Guarantee | Test |
|---|---|---|
| 1 | Nine distinct page routes exist and each has a title, main landmark, current-page marker and language control. | `site.test.mjs` |
| 2 | Local page, script, stylesheet, image and fragment references resolve; primary navigation reaches the main pages. | `site.test.mjs` |
| 3 | Every translated element has French and English copy; page titles and meta descriptions are page-specific. | `site.test.mjs` |
| 4 | Language preference is restored across route loads; browser check confirmed English survives navigation to news and its article. | `site.test.mjs` and browser verification |
| 5 | Facebook event details are attributed, unsupported location claims are excluded, and media is not embedded. | `site.test.mjs` |
| 6 | Gallery uses original illustrations; no unverified phone/email, enrollment form or parent portal is introduced. | `site.test.mjs` |
| 7 | Motto drawing remains available with reduced motion and script tolerates pages without that drawing. | `site.test.mjs` and browser verification |

## Coverage and known gaps

The static-site project has no package manifest, unit-test framework, or
coverage setup. Coverage percentages were not measured. The Node tests verify
content contracts and local references; browser checks cover route rendering,
language persistence, keyboard controls, reduced motion and layout at
390x844 and 1440x900. Automated screen-reader and assistive-technology testing
was not performed.

Rendered and accessibility observations are recorded in
[ui-evidence.json](./design-evidence/ui-evidence.json), with screenshots in the
same directory.

## Merge evidence

The workspace is not a Git repository; no checkpoint commits were created.
