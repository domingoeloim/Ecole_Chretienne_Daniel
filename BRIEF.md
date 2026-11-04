# Creative brief

## Approval

The user approved this direction and authorized development in the conversation.

## Interview answers

- **Ambiance:** « Chaleureux, lumineux, sérieux et accueillant »
- **Parcours:** « École et devise → maternelle/primaire → vie scolaire →
  actualités → galerie → contact via Téléphone »
- **Courbe d’émotion:** « Une expérience calme et rassurante, avec un moment
  fort autour de la devise »
- **Moment mémorable:** « Un trait en forme de cœur se dessine doucement
  jusqu'à la section de la devise »
- **Style:** « Editorial sobre et premium »
- **Structure:** « Chapitres distincts, navigation classique et défilement
  doux »
- **Visuels:** « le logo c'est images.jpg dans le dossier »
- **Actualités:** « Décider plus tard »

## Product and audience

This is the bilingual public website of École Chrétienne Daniel in Fifadji,
Cotonou. It is for families who want to understand the school's identity,
discover its maternelle and primaire cycles, and contact the school. The
audience is an implementation assumption based on the school's public-facing
purpose.

## Purpose and next action

By the end, visitors should be able to identify the school, its location, its
two cycles, and its motto. The intended primary action is to contact the school
by telephone. No number was supplied, so the site must not create a `tel:` link
or invent a number. The contact section will flag the number as unconfirmed and
provide the official Facebook page as the available alternative.

## Art direction

Use the approved bright, restrained editorial direction: generous paper-white
space, crisp dark-blue text, and the school's blue, green, yellow, and red as
controlled accents. The supplied logo is the only approved image. Until the
school supplies authorized photographs, use original abstract/vector
illustration only, clearly separate from documentary school imagery. Do not use
stock photos, generate images of pupils, or imply that an illustration depicts
the actual school.

No external image-generation service will be used. The Scroll-craft preflight
found no `KIE_AI_API_KEY`; generated imagery is not required for this build.

## Journey and feeling curve

| Beat | Feeling | On-screen cause |
|---|---|---|
| 1. Welcome | Calm | A text-led title page identifies the school, location, and motto. |
| 2. Identity | Intimacy | The motto receives its own generous chapter; a bespoke heart line draws into view. |
| 3. Cycles | Clarity | Maternelle and primaire appear as two simple, factual editorial columns. |
| 4. School life | Confidence | The school-provided approximate figures are presented with their qualifier. |
| 5. News | Curiosity | A useful link leads to the official Facebook page while the publishing workflow remains undecided. |
| 6. Gallery | Anticipation | A clear empty state explains that authorized school images are not yet supplied. |
| 7. Contact | Resolve | Fifadji is identified, the missing telephone number is disclosed, and the available Facebook route is offered. |

## Peak and signature

- **Peak:** the school motto fills a distinct blue chapter; after a quiet
  entrance, a fine heart-shaped line draws around the motto and settles.
- **Signature move:** that heart-line drawing is custom to this page, triggered
  once as the motto enters view. It is not a generic scroll cue.
- **Tell-someone sentence:** “It’s the school site where a heart line draws
  itself around the school’s motto.”

## Page grammar and Scroll-craft score

**Grammar:** chaptered editorial. Sections have separate, stable backgrounds
and readable anchors; the navigation is conventional and in normal document
flow. There is no continuous world, full-bleed video, pinned crossfade, or
magnetic CTA.

| Beat | Device | Reason |
|---|---|---|
| Welcome | Flow | A calm, unpinned title page keeps the school and motto immediately readable. |
| Identity | Reveal + bespoke heart line | A restrained reveal gives the motto the one memorable motion. |
| Cycles | In-view reveal | The two school cycles enter once, without hiding content on later scrolls. |
| School life | Count | Only confirmed approximate figures are counted; static numbers remain available without JavaScript. |
| News | Flow | The current external source is linked directly; no feed or CMS is fabricated. |
| Gallery | Parallax | A small abstract, clearly non-documentary drawing adds depth without pretending to be a school photograph. |
| Contact | In-view reveal | The final information and links appear as a quiet colophon. |

The fingerprint registry was empty when this first build began; the chosen
grammar, ordinary non-fixed navigation, text-led hero, seven-chapter rhythm,
colophon close, and heart-line signature are recorded in the registry after
visual verification.

## Open content dependencies

- Telephone number: required before enabling a call link.
- Any real school photographs: require delivery and appropriate publication
  authorization.
- Teacher news publishing: intentionally undecided; this site links to
  Facebook without pretending a CMS has been configured.
- Full street address, hours, fees, admissions requirements, and biblical
  reference: not supplied and therefore omitted.
