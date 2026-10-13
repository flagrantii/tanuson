# Design system: tanuson.com

_One page. Everything added to the site later is checked against this._

## World
A printed engineering journal.
Fits because: it is one engineer's site, read by people deciding whether to hire or work with him. It should read like a careful working notebook, with the work set out as plates and folios.

| Native: allowed, and used | Foreign: never on this site |
|---|---|
| warm paper ground, ink type | gradient blobs, glows, glass or blur cards |
| hairline rules, ink-ruled plate grids | drop shadows and hover-lift on cards |
| mono folio marks (`§ 01 · practice`) | emoji, icon cards, stat bars |
| serif display with an italic accent clause | cool greys, a second accent colour |
| hatch for missing art | stock 3D (torus knot with stars and sparkles) |
| 3D figures drawn as pen-plotter strokes | realistic AI images |

## Colour
All in `app/globals.css` `:root`; `tailwind.config.ts` only points at them.

| token | value | use |
|---|---|---|
| `--cream` | `#f3efe6` | paper, the page ground |
| `--ink` | `#17150f` | headings, rules, filled buttons |
| `--accent` | `#0000f2` | the one accent: italic clauses, section numbers, live links, figure details |
| `--muted` | `#6b665b` | labels and meta; 5.0:1 on paper, the lightest grey that stays AA |
| `--copy` | `#3d3930` | body copy |
| `--hair` | `rgba(0,0,0,.14)` | section rules |

Changing `--accent` re-tints the type and the WebGL figures. Keep it a plain hex: `figures.ts` parses it with `THREE.Color`.

## Type
Instrument Serif 400 and italic (display), Newsreader 300/400 (body), JetBrains Mono 300/400/500 (labels), latin only.
- Hero: `clamp(52px, 8.6vw, 124px)`, tracking −0.035em.
- H2: `clamp(34px, 4.6vw, 64px)`. Body: 16–21px.
- Floor: **nothing under 15px.** Labels use `text-label`: 15px mono at weight 300, −0.01em, so they stay quiet through weight rather than size.

## Shape and spacing
Square corners; pills only for filter chips and tags. 1px rules: ink for plate grids, `--hair` between sections. Gutter: `--gutter`. Focus: 1px ink outline, 3px offset.

## Signature object
One fixed WebGL stage draws every figure (knot, helix, lattice, orbit, coil, contour field) into its slot, as plotter strokes in ink with accent details. Each draws itself in once.
- three loads only on routes with slots, after first paint. DPR ≤ 2.
- The loop runs only while a slot is on screen and the tab is visible.
- Reduced motion: one finished still frame, redrawn on scroll.
- No WebGL: the slot stays empty (or hatched).

## Page
Home: masthead → hero (headline, knot over the contour field) → statement → practice and now → selected work plates → closing → footer. 404: `app/not-found.tsx`, in theme.

## Motion
`--ease` `cubic-bezier(.22,1,.36,1)`; `--ease-line` `(.16,1,.3,1)` for line reveals. Fade-up .55s, line rise .95s, word split .7s, rule draw .9s, page enter 320ms.
- Content is hidden only under `html.js` (set before first paint, dropped after 4s if the reveal code never starts). Without JS every word shows.
- Pointer lean (`Magnetic`): hovering fine pointers only.
- Everything respects `prefers-reduced-motion`.

## Facts fence
- **Source of truth:** `Data/*.ts` (timeline, projects, certificates, education).
- **Not allowed:** invented metrics, testimonials, logos, years, clients or awards.

## Checks before merge
At 1440×900 and 390×844: screenshots; `shots.mjs --audit` clean; AA contrast; visible focus; `npx impeccable detect` with these deliberate ignores (`.impeccable/config.json`):
- `italic-serif-display`: the italic accent clause in Instrument Serif is the journal's voice, a printed headline with an italic aside. It has been the site's headline style since the editorial redesign.
- `cream-palette`: the cream is the paper this world is printed on, chosen for the journal, not reached for by default.
- `oversized-h1`: the ~124px hero is the site's approved scale and the owner's own quality bar. The rule began firing only when the h1 gained the space between its two lines (39 → 40 characters).
- Advisory `home audit WARN`: the home page ends on the coil figure, so its loop is legitimately running at the bottom of the page.
