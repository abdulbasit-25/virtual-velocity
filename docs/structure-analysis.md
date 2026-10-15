# Structure and Dependency Analysis

**Captured:** 2026-10-14  
**Method:** `npx knip`, a static import graph over `src/` resolving `@/` and
relative imports (including dynamic `import()`), route-entry reachability from
App Router convention files, `rg` searches for dependency/assets/data
references, and direct review of relevant scripts/configuration. This is a
source-level audit, not runtime proof. No application files were removed or
moved to produce this report.

## Baseline and constraints

- See [`cleanup-baseline.txt`](./cleanup-baseline.txt) for command outcomes.
- `npx tsc --noEmit` and `npm run build` pass on the current working tree.
- `npm run lint` already fails with 5 errors and 20 warnings; cleanup steps
  cannot claim a green full-validation gate until those existing diagnostics
  are addressed or explicitly accepted.
- At the first status check, `src/app/blog/BlogClient.tsx` was modified and
  `cleanup-restructure-prompt.md` was untracked. Both now appear in current
  `HEAD` (`87d0020` and `ebd71b1` respectively); no reset, amend, or checkout
  was performed.
- The request asked for a clean worktree and a new branch/commits, but the
  existing user changes were explicitly preserved and work is proceeding on
  `main` without commits. Do not commit or reset those changes.

## Route-reachable section components

| Component | Direct importer(s) | Reachability |
|---|---|---|
| `sections/About.tsx` | `app/page.tsx` | Route-reachable |
| `sections/AboutClientLogosSlider.tsx` | `app/about/AboutClient.tsx` | Route-reachable |
| `sections/BrandPhysicsBalls.tsx` | `app/page.tsx` | Route-reachable |
| `sections/Contact.tsx` | `app/contact/ContactClient.tsx`, `app/page.tsx` | Route-reachable |
| `sections/EditorialTestimonials.tsx` | `app/page.tsx` | Route-reachable |
| `sections/GSAPHeroTimeline.tsx` | `app/page.tsx` | Route-reachable |
| `sections/GSAPScrollGallery.tsx` | `app/page.tsx` | Route-reachable |
| `sections/HeroScrollDriver.tsx` | `sections/GSAPHeroTimeline.tsx` (dynamic import) | Route-reachable |
| `sections/InstaReelsGallery.tsx` | `app/page.tsx` | Route-reachable |
| `sections/LightStatsSection.tsx` | `app/page.tsx` | Route-reachable |
| `sections/SEOTextSection.tsx` | `app/page.tsx` | Route-reachable |
| `sections/ServicesClientLogosCarousel.tsx` | `app/services/ServicesClient.tsx` | Route-reachable |
| `sections/WhoWeAre.tsx` | `app/page.tsx` (dynamic import) | Route-reachable |

## Section components with no route-reachable importer

These have no direct importer in the scanned source graph. They are candidates
for quarantine only after reference checks; do not delete solely from this list.

| Component | Direct importer(s) | Notes |
|---|---|---|
| `sections/Capabilities.tsx` | None | Imports `CAPABILITIES`; no current route references it. |
| `sections/ClientPartners.tsx` | None | Contains logo carousel content; no current route references it. |
| `sections/CommunitiesShowcaseBars.tsx` | None | No current route references it. |
| `sections/GSAPRevolvingServices.tsx` | None | Uses plain images; no current route references it. |
| `sections/Hero.tsx` | None | Uses `HeroCanvas3D`, `Magnetic`, and `SplitTextReveal`; see transitive UI candidates. |
| `sections/InteractiveCTABanner.tsx` | None | Imports `CreativeCTA`; both are currently route-unreachable. |
| `sections/Marquee.tsx` | None | No current route references it. |
| `sections/Process.tsx` | None | Imports `PROCESS_STEPS`; no current route references it. |
| `sections/SelectedWork.tsx` | None | Imports `CursorParallaxImage`, `SplitTextReveal`, and `Magnetic`; no current route references it. |
| `sections/Services.tsx` | None | Imports `CAPABILITIES`; no current route references it. |
| `sections/Stats.tsx` | None | Imports `STATS`; no current route references it. |
| `sections/Testimonials.tsx` | None | Imports `TESTIMONIALS`; no current route references it. |

The similarly named pairs are not all duplicates: `About` and `WhoWeAre` are
both used on the homepage; `GSAPHeroTimeline` is used while `Hero` is not;
`EditorialTestimonials` is used while `Testimonials` is not; `LightStatsSection`
is used while `Stats` is not. Keep all route-reachable versions.

## UI component graph

| Component | Direct importer(s) | Reachability |
|---|---|---|
| `ui/button.tsx` | `sections/GSAPHeroTimeline.tsx` | Route-reachable |
| `ui/CustomCursor.tsx` | About, Blog, blog post, Branding, Contact, 404, Owned Media, Home, Privacy, Services, Terms, Salt Line route components | Route-reachable |
| `ui/Magnetic.tsx` | Navigation, Owned Media, Services, EditorialTestimonials, GSAPScrollGallery, Hero, SelectedWork, CreativeCTA | Route-reachable through current callers; some listed callers are orphans. |
| `ui/MoleculeBackground.tsx` | `sections/GSAPHeroTimeline.tsx` | Route-reachable |
| `ui/SplitTextReveal.tsx` | AboutClient, ContactClient, Hero, SelectedWork | Route-reachable through About/Contact; Hero/SelectedWork callers are orphans. |
| `ui/HeroCanvas3D.tsx` | `sections/Hero.tsx` | Transitive orphan; Hero has no route importer. |
| `ui/CursorParallaxImage.tsx` | `sections/SelectedWork.tsx` | Transitive orphan; SelectedWork has no route importer. |
| `ui/CreativeCTA.tsx` | `sections/InteractiveCTABanner.tsx` | Transitive orphan; parent section has no route importer. |
| `ui/accordion.tsx` | None | Orphan candidate. |
| `ui/avatar.tsx` | None | The current BlogClient implements a local `Avatar` component and does not import `ui/avatar.tsx`; Knip also flags it unused. |
| `ui/badge.tsx` | None | Orphan candidate. |
| `ui/card.tsx` | None | Orphan candidate. |
| `ui/dialog.tsx` | None | Orphan candidate. |
| `ui/GradientDivider.tsx` | None | Orphan candidate. |
| `ui/GSAPMagnetic.tsx` | None | Orphan candidate. |
| `ui/GSAPTextReveal.tsx` | None | Orphan candidate. |
| `ui/input.tsx` | None | Orphan candidate; also has a baseline lint error. |
| `ui/InteractiveBackground.tsx` | None | Orphan candidate. |
| `ui/LightParticlesCanvas.tsx` | None | Orphan candidate. |
| `ui/MarqueeTicker.tsx` | None | Orphan candidate. |
| `ui/ParticleBurst.tsx` | None | Orphan candidate. |
| `ui/resizable-navbar.tsx` | None | Orphan candidate. |
| `ui/SectionReveal.tsx` | None | Orphan candidate; imports `react-intersection-observer`. |
| `ui/separator.tsx` | None | Orphan candidate. |
| `ui/SoundToggle.tsx` | None | Orphan candidate. |
| `ui/tabs.tsx` | None | Orphan candidate. |
| `ui/TiltCard.tsx` | None | Orphan candidate. |

The graph confirms `HeroCanvas3D`, `CursorParallaxImage`, and `CreativeCTA` are
referenced only by currently orphaned section components. This is transitive
evidence, not permission to delete. Files with no importers may also be used by
external tooling or future work.

## Static analyzer findings and dependency verification

`npx knip` reports 39 unused files, 10 unused dependencies, 5 unused exports,
and 2 unused exported types. Its file list substantially overlaps the graph
above. Its output is a candidate list only; it does not replace path-string,
dynamic import, Next convention, CI, or public asset checks.

Unused dependency candidates from Knip:

| Package | Evidence / caveat |
|---|---|
| `@radix-ui/react-accordion` | Referenced by orphan `ui/accordion.tsx`; remove only if that UI component is quarantined and no other imports remain. |
| `@radix-ui/react-avatar` | Referenced by `ui/avatar.tsx` in at least one working-tree version; verify the current modified BlogClient before considering. |
| `@radix-ui/react-dialog` | Referenced by orphan `ui/dialog.tsx`; preserve until source candidate removal is validated. |
| `@radix-ui/react-dropdown-menu` | No live route import found; perform a whole-repo source/reference check before removal. |
| `@radix-ui/react-separator` | Referenced by orphan `ui/separator.tsx`; preserve pending quarantine validation. |
| `@radix-ui/react-tabs` | Referenced by orphan `ui/tabs.tsx`; preserve pending quarantine validation. |
| `@radix-ui/react-tooltip` | No live route import found; perform a whole-repo source/reference check before removal. |
| `@types/three` | `three` is imported by orphan `ui/HeroCanvas3D.tsx`; not removable until that source import is removed and type/build checks pass. |
| `react-intersection-observer` | Imported by orphan `ui/SectionReveal.tsx`; check for indirect/additional imports before removing. |
| `three` | Imported by orphan `ui/HeroCanvas3D.tsx`; route-unreachable transitively, but policy forbids removing while a source import remains. |

The following data exports have no route-reachable consumers in the current
graph: `PROCESS_STEPS`, `CAPABILITIES`, `TESTIMONIALS`, and `STATS` (and exported
type `Testimonial` may only support `TESTIMONIALS`). Orphan components import
some of these values, so they are not source-unreferenced today. `AGENCY_INFO`,
`FOUNDER`, `PROJECTS`, `SERVICES`, and `BLOG_POSTS` have active consumers.

## Public assets and dynamic references

- `/All logo in SVG Format/*.svg` is actively referenced by
  `BrandPhysicsBalls.tsx`, `AboutClientLogosSlider.tsx`, and a computed path in
  `ClientPartners.tsx`. Do not move that folder or its active files. The
  `_originals_backup` subfolder is not referenced by app code, but scripts/docs
  mention the folder; keep until references are classified.
- `/VV LOGOS/VV LOGOS/**` has no app image references found; the logo migration
  and verification scripts traverse or mention logo directories. Keep pending
  decision on whether those scripts and source exports must remain.
- `public/llms.txt`, `public/site.webmanifest`, `public/favicon.ico`, and
  `public/icon.png` are protected. The manifest references `/VV png.png`.
- Assets referenced from code include `/banner-2.webp`, `/Vv.webp`,
  `/Profile.webp`, `/VV png.png`, service `.webp` images, service preview
  external Unsplash URLs, logo SVGs, community/reel images, `/vv-website-video.mp4`,
  and case-study Cloudinary images.
- `Updated Pakistan studies HU-115-29 Jan 2026.docx` was moved out of `public/`
  into the current session's private files area, with SHA-256 verified after
  the move. It is personal/university material and is no longer served by the
  application.
- `public/` still contains large unreferenced or uncertain files, including
  `Virtual Velocity Profile (1).pdf` (12.11 MiB), `VV LOGOS.zip` (9.86 MiB),
  and export graphics such as `FB Cover VV-01.jpg.jpeg`, `Linkedin (2).png`,
  and `Wild Wings-02 (1).png`. The PDF and ZIP remain pending external-host
  and ownership decisions before relocation.
- Duplicate-looking image pairs should not be removed by visual similarity
  alone. `public/banner-2.webp`, `public/Vv.webp`, `public/Profile.webp`, and
  service `.webp` files are referenced; matching PNG/JPEG variants need a
  literal/dynamic-reference scan plus a visual/content check.
- Five default starter SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`,
  `window.svg`) have no current app references in the source search. Verify
  whether they are intentionally exposed before quarantine.

## Scripts and root documentation

- `scripts/daily-supabase-task.js` is called by the protected Supabase workflow;
  keep it.
- `scripts/fix-logos.js` requires `scripts/cdp-client.js`; keep both together
  unless the logo maintenance workflow is explicitly retired.
- `scripts/strip-logo-backgrounds.js`, `scripts/verify-logos.js`, and
  `scripts/optimize-public-assets.js` are not in package scripts or CI. They
  contain one-off path assumptions and are not referenced by checked root
  instructions beyond this cleanup brief. Candidate for quarantine after
  determining whether they are needed to reproduce asset transformations.
- `swarm/docker-stack.yml` has no references in package scripts, CI, README,
  AGENTS, or CLAUDE found by the targeted search; owner decision, keep.
- `urdu.html` has no functional code/CI reference found; quarantine candidate
  after checking whether it is intentionally distributed or externally used.
- The named docs (`seo.md`, `Report.md`, `PERFORMANCE_OPTIMIZATION_LOG.md`,
  `design.md`, `WEBSITE_DOCUMENTATION.txt`, and `portfolio.txt`) now reside in
  `docs/`; the cleanup brief's paths were updated. `README.md`, `AGENTS.md`,
  `CLAUDE.md`, and `cleanup-restructure-prompt.md` stay in the root.
- `.gitignore` already ignores `.next/`, `node_modules`, `.env*`, and
  `*.tsbuildinfo`; do not delete `.next/`.

## CSS and structure

- `src/app/globals.css` includes Lenis state selectors, reduced-motion fallback,
  color/font aliases, scrollbar helpers, animation keyframes, decorative
  background helpers, and typography utilities. Some are referenced from
  components and/or generated utility classes; no CSS was removed. A
  comprehensive selector-to-runtime-class check is needed before declaring
  any global rule unused.
- `tailwind.config.ts` scans `src/**/*` and `public/**/*.html` and declares
  custom breakpoints, colors, fonts, and typography. Keep until class usage and
  Tailwind v4 config behavior are checked in an isolated cleanup.
- `src/data/agencyData.ts` is a large mixed-domain module with types, founder,
  offices, projects, services, process steps, capabilities, testimonials, blog
  posts, and statistics. Splitting by domain is a structure-only refactor but
  needs stable re-exports and import/build checks.
- Suggested target folders can be adopted incrementally; no route path or
  visual changes should result. Verify import boundaries and diffs after each
  small move.

## Needs owner decision

1. Whether to move the unreferenced PDF and ZIP out of `public/`, and which
   external host or private retention location to use; both currently remain.
2. Whether logo exports/backup SVGs and one-off logo scripts are needed for
   future source edits.
3. Whether `urdu.html` and the Docker/Swarm stack are intentionally distributed
   or used outside this repo.
4. Whether to fix the five pre-existing lint errors before enforcing a fully
   green quarantine/delete gate.
5. Re-run dependency analysis immediately before any component quarantine if
   concurrent work changes route imports or component use.
