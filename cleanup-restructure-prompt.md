# Prompt: Analyze, restructure and safely clean the virtual-velocity repo

You are a senior Next.js engineer. Repo: `virtual-velocity` (Next.js 16, App Router, Turbopack, TypeScript, Tailwind, GSAP, Framer Motion, Lenis, Matter.js, Three.js, Supabase). Goal: a clean, properly structured, fast project. **Delete only what is provably unused. Nothing that is imported, referenced, or required by Next.js/CI may be touched.** Zero behavior or visual change.

## 0. Safety protocol (mandatory)

1. `git status` must be clean. Create branch `chore/cleanup-structure`. Commit after every phase so any step can be reverted.
2. Take a baseline: run `npx tsc --noEmit`, `npm run lint`, `npm run build`. Save route list and First Load JS sizes from the build output to `docs/cleanup-baseline.txt`.
3. **Quarantine before delete.** Never `rm` first. Move candidates with `git mv` into `.cleanup-quarantine/` (preserving paths), run tsc + lint + build, and only if all pass delete the quarantine in a final commit. If anything fails, restore the file and mark it KEEP.
4. A file is deletable only if ALL are true: (a) no static import, (b) no `next/dynamic`/`import()`/`require()` reference (including template strings), (c) no string reference to its name/path anywhere in `src/`, `public/`, `scripts/`, `.github/`, `*.config.*`, `package.json`, `*.md` that is functionally used, (d) not a Next.js convention file, (e) not in the protected list below.
5. If unsure, KEEP and list it under "Needs owner decision". Never guess.

## 1. Protected list (never delete or move without updating every reference)

- Next.js conventions: `src/app/**/{page,layout,not-found,error,loading,route,template,default}.tsx|ts`, `robots.ts`, `sitemap.ts`, `icon.png`, `apple-icon.png`, `favicon.ico`, `opengraph-image.*`, `manifest.*`, `globals.css`
- Config: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`
- Agent/context files: `AGENTS.md`, `CLAUDE.md`, `skills-lock.json`
- CI and its dependencies: `.github/workflows/supabase-daily-cron.yml` and `scripts/daily-supabase-task.js` (and anything the workflow calls)
- Server code: `src/app/actions/reviews.ts`, `src/lib/supabaseServer.ts`, `src/lib/utils.ts`, `src/lib/gsapClient.ts`
- Data and providers: `src/data/agencyData.ts`, `src/components/providers/*`, `src/components/layout/*`
- Public files the site needs: `public/llms.txt`, `public/site.webmanifest`, `public/favicon.ico`, `public/icon.png`, `public/robots*` (if any), and every asset referenced by code (see section 3)

## 2. Analyze (produce `docs/structure-analysis.md` before changing anything)

Build a real dependency graph, not a guess:

- Run `npx knip` (or `ts-prune` + `depcheck` + `madge --extensions ts,tsx --orphans src`) and combine results.
- For every file in `src/components/sections/*` and `src/components/ui/*`, report: imported by (list), imported nowhere (orphan), or imported only by other orphans (transitively dead). Resolve `next/dynamic` and `@/` alias imports.
- Pay special attention to these suspected duplicates/orphans from the file tree (verify each, do not assume):
  - sections: `About.tsx` vs `WhoWeAre.tsx`, `Hero.tsx` vs `GSAPHeroTimeline.tsx`/`HeroScrollDriver.tsx`, `Testimonials.tsx` vs `EditorialTestimonials.tsx`, `Marquee.tsx`, `Stats.tsx` vs `LightStatsSection.tsx`, `Capabilities.tsx`, `Process.tsx`, `SelectedWork.tsx`, `InteractiveCTABanner.tsx`, `GSAPRevolvingServices.tsx`, `CommunitiesShowcaseBars.tsx`, `AboutClientLogosSlider.tsx`, `ServicesClientLogosCarousel.tsx`
  - ui: shadcn leftovers (`accordion, avatar, badge, button, card, dialog, input, separator, tabs`), `Magnetic` vs `GSAPMagnetic`, `MarqueeTicker`, `GSAPTextReveal` vs `SplitTextReveal`, `SectionReveal`, `TiltCard`, `HeroCanvas3D`, `InteractiveBackground`, `LightParticlesCanvas`, `MoleculeBackground`, `ParticleBurst`, `SoundToggle`, `CreativeCTA`, `GradientDivider`, `resizable-navbar`
- Report unused exports inside used files and unused dependencies (`three`, `matter-js`, `lenis`, etc.). A dependency is removable only if no file in `src/`, `scripts/`, or any config imports it.
- Report unused CSS: custom classes/keyframes in `globals.css` and Tailwind config not referenced anywhere.
- Report unused data: exports of `agencyData.ts` that nothing imports.

## 3. Public assets audit (largest win for speed and privacy)

1. Collect every asset path referenced in `src/**`, `agencyData.ts`, `globals.css`, `layout.tsx` metadata, `site.webmanifest`, `scripts/*`. Handle names with spaces/encoded characters (`%20`) and template-built paths (e.g. logo lists generated from folders; if a folder is read dynamically, KEEP the whole folder).
2. Anything in `public/` not referenced anywhere is a candidate. Expected candidates to verify (do not delete blindly):
   - `Updated Pakistan studies HU-115-29 Jan 2026.docx`: unrelated personal/university file served publicly. **Remove from `public/` (move it outside the repo, do not delete the only copy).**
   - Default create-next-app files: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
   - Large downloads: `Virtual Velocity Profile (1).pdf` (~12 MB), `VV LOGOS.zip` (~10 MB). Unless the site links to them, move them out of `public/` (host elsewhere).
   - Duplicate formats of the same image: `Banner 2.png` / `banner-2.png` / `banner-2.webp`, `Profile.png`/`.webp`, `Vv.png`/`.webp`/`VV png.png`, `whoweare.jpeg`/`.png`/`.webp`, `services/*.png` vs `*.webp`. Keep only the format actually referenced.
   - Likely social/export leftovers: `FB Cover VV-01.jpg.jpeg`, `Linkedin (2).png`, `Wild Wings-02 (1).png`
   - Logo duplicates: `public/VV LOGOS/VV LOGOS/**` (PNG set), `public/All logo in SVG Format/_originals_backup/**`, `Untitled-1.svg`. Keep only the set the code uses.
3. For images that remain: confirm they are served through `next/image` or are appropriately sized; flag any file over 300 KB that is above-the-fold. Do not re-encode or rename referenced files in this task unless you update all references and the build passes.

## 4. Root and scripts cleanup

- Move documentation into `docs/`: `seo.md`, `Report.md`, `PERFORMANCE_OPTIMIZATION_LOG.md`, `design.md`, `WEBSITE_DOCUMENTATION.txt`, `portfolio.txt` (use `git mv`). Keep `README.md`, `AGENTS.md`, `CLAUDE.md` in root. If `CLAUDE.md`/`AGENTS.md` reference moved files, update the paths.
- `urdu.html`: check if anything references it; if not, quarantine it.
- `swarm/docker-stack.yml`: keep unless nothing references Docker/Swarm in README, CI, or package scripts; if unused, list under "Needs owner decision" (do not delete).
- `scripts/`: keep `daily-supabase-task.js` (CI) and `cdp-client.js` if referenced. For `fix-logos.js`, `strip-logo-backgrounds.js`, `verify-logos.js`, `optimize-public-assets.js`: keep only if referenced in `package.json` scripts or docs; one-off migration scripts that nothing references go to quarantine. Add a short `scripts/README.md` for what remains.
- `.next/`: confirm it is in `.gitignore` (it is build output, never commit). Do not delete it as part of the cleanup commit; just ensure it is ignored. Also ensure `node_modules`, `.env*`, `*.tsbuildinfo` are ignored.
- Next.js `src/app` has both `favicon.ico`/`icon.png`/`apple-icon.png` and copies in `public/`. Keep the `src/app` versions (convention files); remove `public/favicon.ico` and `public/icon.png` only if nothing links to them directly (check `site.webmanifest` first).
  - Note: the SEO audit flagged `/apple-icon.png` as missing from `public/`, but `src/app/apple-icon.png` already generates it. Do not add a duplicate; make sure the metadata reference does not conflict with the convention file.

## 5. Restructure (only after cleanup builds green)

Target a predictable, feature-grouped layout. Move with `git mv`, update imports (use the `@/` alias), keep route paths identical.

```
src/
  app/                      # routes only: page.tsx, layout.tsx, metadata, route handlers
    (marketing)/...         # optional route group only if it does not change URLs
    actions/
  components/
    layout/                 # Navigation, Footer
    providers/              # SmoothScroll*
    sections/
      home/                 # sections used only by the homepage
      about/
      services/
      contact/
      shared/               # used by 2+ pages
    ui/                     # primitives (button, input, etc.) and generic motion/effects
  features/                 # optional: blog/, owned-media/ page clients + their components
  data/
    agency.ts               # split agencyData.ts by domain: services.ts, blog.ts, offices.ts, clients.ts (re-export via index.ts)
  lib/                      # utils.ts, gsapClient.ts, supabaseServer.ts, site.ts (site constants)
  types/                    # shared TS types
public/
  images/{brand,communities,reels,services,logos}/   # lowercase-kebab-case, no spaces
  downloads/                # only if truly needed
docs/
```

Rules:
- Rename files with spaces/uppercase in `public/` to lowercase-kebab-case **only** if you update every reference (code, data, CSS, manifest) and verify with a grep that no old path remains. Batch this as its own commit.
- Keep one export style per folder (named exports for components, default only for route files).
- Colocate each `*Client.tsx` with its `page.tsx` (already done). Do not change `"use client"` boundaries in this task.
- Split `agencyData.ts` by domain with an `index.ts` re-export so existing imports keep working, then migrate imports gradually.
- Add path aliases only if missing in `tsconfig.json`.

## 6. Speed pass (no visual change)

- Remove unused dependencies from `package.json` (and the lockfile via `npm uninstall`), only those proven unused in section 2.
- Heavy libs (`three`, `matter-js`): ensure they are imported only in the components that need them and loaded with `next/dynamic` (`ssr: false` where it is a canvas) below the fold. If their only consumers were orphans that you removed, uninstall them.
- Confirm `next.config.ts` `images` and `optimizePackageImports` still match what remains.
- Re-run the build and compare First Load JS per route against `docs/cleanup-baseline.txt`.

## 7. Verification (all must pass before finishing)

- `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass with no new warnings.
- `npm run start` (production) and load every route: `/`, `/about`, `/services`, `/branding`, `/the-salt-line`, `/owned-media`, `/contact`, `/blog`, each `/blog/[slug]`, `/privacy-policy`, `/terms-of-use`, a 404 URL, `/robots.txt`, `/sitemap.xml`, `/llms.txt`. No console errors, no 404s for assets (check the network tab or run a script that fetches every `src`/`url()` found in the HTML).
- Search the repo for every deleted/moved path to confirm zero dangling references.
- The visual output of each route is unchanged (spot check hero, logos carousel, communities, reels gallery, case-study pages).

## 8. Deliverables

1. Commits per phase on `chore/cleanup-structure`.
2. `docs/structure-analysis.md`: dependency findings, orphan list with evidence (why each is unused), duplicates found.
3. `docs/cleanup-report.md`: table of every file deleted/moved (path, size, reason, how verified), dependencies removed, MB saved in `public/`, before/after build sizes.
4. A "Needs owner decision" list (e.g. `swarm/docker-stack.yml`, `urdu.html`, large PDF/ZIP, social image exports, anything ambiguous).
5. Final summary: what changed, what was intentionally kept, and the exact commands to revert any step.
