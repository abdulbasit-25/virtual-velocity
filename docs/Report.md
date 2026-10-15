# Virtual Velocity — Performance Audit Report

## 1. Executive Summary

This project is a Next.js marketing site with a visually rich homepage and many animation-heavy sections. Based on the repository, the most likely reasons it feels slow are:

1. Oversized hero and section media, especially the local hero video and several uncompressed PNGs.
2. A heavy client-side animation stack (`gsap`, `framer-motion`, `lenis`, `three`, `matter-js`) that is activated on many pages.
3. Many large marketing images and repeated brand assets, including local PNGs and remote Cloudinary/Unsplash URLs.
4. Some sections render a lot of visual motion and DOM work before the user can actually interact with the content.

The leading explanation for slow image loading is not a single missing cache rule; it is the combination of very large source files and a design pattern that prioritizes visual richness over asset trimming. The clearest code-based evidence is:

- `public/vv-website-video.mp4` is 10,631,154 bytes (~10.1 MB) and is used as the primary hero video in `src/components/sections/GSAPHeroTimeline.tsx`.
- Several top-level images are large enough that they should be aggressively compressed or converted to responsive, size-aware variants: `public/whoweare.png` (2,513,607 bytes, 1920x1080), `public/Vv.png` (1,607,274 bytes, 1254x1254), `public/Profile.png` (1,421,447 bytes, 809x939), and `public/banner-2.png` (1,074,077 bytes, 1600x874).
- The design includes many duplicate assets, including both `.png` and `.webp` copies of the same banners and multiple logo files in both SVG and PNG formats.

Confirmed from code:

- The site uses Next.js 16 + React 19 + Tailwind with a significant motion/physics stack.
- The home page uses a full-screen background image and full-size video and then applies frequent animation updates.
- `next.config.ts` enables AVIF/WebP generation and long asset caching, but the project still ships very large original assets.

Problems that require runtime verification:

- Whether the home page is actually suffering from LCP or bandwidth issues in production.
- Whether the large video is the dominant LCP or an avoidable download penalty.
- Whether the motion stack causes main-thread blocking at the exact scroll points on mid-range devices.

The first things to fix should be:

1. Reduce hero and section image/video size and quality without changing layout.
2. Remove or reduce duplicate assets and unused variants.
3. Improve responsive image sizing and priority decisions for above-the-fold media.
4. Reduce unnecessary motion and long-running animation work in the initial viewport.
5. Audit the most expensive sections (home hero, services, branding case studies) before broader redesign work.

The improvements most likely to produce the greatest user-visible benefit are asset reduction and hero-media prioritization, followed by reducing the animation workload on the initial route.

## 2. Project Architecture and Technology Stack

The project is a Next.js application configured in `package.json` and `next.config.ts`:

- `next`: `16.3.3`
- `react`: `19.2.8`
- `react-dom`: `19.2.8`
- TypeScript enabled
- Tailwind CSS v4
- ESLint configured with `eslint-config-next`

Relevant files reviewed:

- `package.json`
- `next.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/...`
- `src/lib/supabaseServer.ts`
- `src/data/agencyData.ts`

Key frameworks and libraries:

- Frontend: Next.js, React, Tailwind CSS
- Motion/animation: `framer-motion`, `gsap`, `@gsap/react`, `lenis`
- 3D/physics: `three`, `matter-js`
- Data/API: `@supabase/supabase-js`
- UI primitives: radix, lucide-react

The app is structured as a mostly App Router project (`src/app`). The home page dynamically imports many below-the-fold sections with `next/dynamic` in `src/app/page.tsx`, which is good for code splitting. However, the main hero is still deliberately media-rich and animation-driven, and the page is not a typical lightweight landing page.

The architecture has both server-rendered HTML and client-side enhancement. The main issue is not that it is a bad framework choice; it is that the visual design is heavy enough that the default page can be expensive in real-world conditions.

## 3. Overall Performance Assessment

Overall assessment: The project is visually polished and likely performance-sensitive because the marketing site relies on motion and high-contrast images. The primary risk areas are:

- Large, high-resolution media in the first viewport.
- Heavy client animation and scroll libraries.
- Repeated branded assets and decorative graphics.
- Large remote media URLs for case-study and portfolio imagery.
- Background animation that keeps running and can add UI cost.

The app is not obviously backend-heavy from the repository alone. The actual performance issue is much more likely in the frontend asset and rendering layer than in the API or database.

## 4. Image Loading Investigation

### 4.1 Hero media is the biggest immediate risk

Evidence:

- `src/components/sections/GSAPHeroTimeline.tsx` defines a slider of two images and a hero video.
- The video is loaded with `<video src="/vv-website-video.mp4" autoPlay loop muted playsInline preload="metadata">`.
- The video file is 10,631,154 bytes in `public/vv-website-video.mp4`.
- The hero slider also triggers a `window.Image()` prefetch for `SLIDER_IMAGES` in `useEffect`, showing a design that aims to start downloads early.

This makes the initial home page far heavier than it needs to be. The page is likely doing more than necessary before the user sees the content, and the large video almost certainly adds to the perception that images and media are slow.

### 4.2 Local source files are too large for main-screen use

Measured local asset sizes from the repository include:

| File | Size | Dimensions | Notes |
|---|---:|---:|---|
| `public/whoweare.png` | 2,513,607 bytes | 1920x1080 | Large hero/section image |
| `public/Vv.png` | 1,607,274 bytes | 1254x1254 | Large logo/brand graphic |
| `public/Profile.png` | 1,421,447 bytes | 809x939 | Portrait image |
| `public/banner-2.png` | 1,074,077 bytes | 1600x874 | Banner image |
| `public/hero.jpeg` | 189,963 bytes | 1600x900 | Medium-sized but still heavy for a hero |
| `public/services/01  Digital Strategy.png` | 1,064,015 bytes | 1126x516 | Large service thumb |
| `public/services/05  Influencer & PR_.png` | 788,361 bytes | 1126x516 | Large service thumb |
| `public/services/06 SEO & Digital.png` | 777,139 bytes | 1126x516 | Large service thumb |

These files are not tiny. In a performance-sensitive marketing site, they should be optimized to smaller, deliberately sized responsive assets or be replaced with more efficient AVIF/WebP where relevant.

### 4.3 Duplicate and unnecessary assets increase transfer and maintenance cost

The project has both duplicate versions and multiple variants of the same concept, for example:

- `public/banner-2.png` and `public/banner-2.webp`
- `public/Banner 2.png` and `public/banner-2.png`
- `public/whoweare.png` and `public/whoweare.webp`
- A very large set of PNG brand logos under `public/VV LOGOS/...` and an SVG version under `public/All logo in SVG Format/...`

This means the site likely ships more bytes than necessary and prompts unnecessary storage, cache churn, and redundant downloads. It also makes prioritization harder because the code and design do not always clearly indicate which asset variant should be used.

### 4.4 Remote images are used in case-study and portfolio sections

Evidence in `src/data/agencyData.ts` shows remote image URLs from Unsplash and Cloudinary such as:

- `https://images.unsplash.com/...` with `q=75&w=800` and similar values
- `https://res.cloudinary.com/nudghwmz/.../Artboard_1.png`

This is not inherently wrong, but it means the site depends on external image hosts and may incur extra latency unless cache/CDN behavior is properly configured. The code also makes repeated references to large remote visuals in portfolio and case-study cards, which compounds download overhead.

### 4.5 Image delivery is not always tuned for actual viewport size

The project does use `next/image` and `next.config.ts` has responsive formats and device sizes configured, which is good. However, many sections still attach very large backgrounds and heavy assets to central, first-viewport elements. Examples:

- `GSAPHeroTimeline` uses `fill` + `sizes="100vw"` for a full-bleed hero with large background images.
- `ServicesClient` uses a `fill` background image with `priority` and a dark overlay.
- Several portfolio page thumbnails are remote, high-detail marketing images sized to a wide range of device sizes.

This is not a broken implementation, but it is a classic pattern where a rich design leads to large initial downloads.

### 4.6 Likely causes of image slowness in real life

From the code, the likely image slowdowns are a blend of:

- slow transfer because of large files
- large decode cost because the PNG/JPEG assets are high resolution
- large image requests happening early in the initial viewport
- repeated asset variants increasing cache fragmentation
- remote image hosts adding network variability

The app does not present clear evidence of a backend image transformation pipeline or strong signed-URL workflow; the core issue is the source media and request timing.

## 5. Frontend Performance Findings

### PERF-001 — Heavy animation stack on initial route

File(s): `package.json`, `src/app/page.tsx`, `src/components/providers/SmoothScrollEngine.tsx`, `src/components/sections/GSAPHeroTimeline.tsx`, `src/components/sections/BrandPhysicsBalls.tsx`

Evidence:

- `package.json` includes `framer-motion`, `gsap`, `lenis`, `three`, and `matter-js`.
- `SmoothScrollEngine` loads `lenis`, `gsap`, and `gsap/ScrollTrigger` after mount with `requestIdleCallback`.
- `BrandPhysicsBalls` dynamically imports `matter-js` only when a section is in view.
- The hero uses a GSAP-driven animation sequence and continuous ticker intervals.

Problem:

The site is visually rich, but the initial route is doing more than a typical landing page. Even with some lazy loading, the overall interaction layer is heavy, and the hero still uses expensive transforms, scroll-driven work, and multiple repeated timers.

User impact:

Slower responsiveness on mid- and low-end devices, especially during scroll and page load. Greater chance of main-thread competition with image decode and paint.

Recommended fix:

Keep the animation concept, but trim the number of active scroll effects, move more work behind user intent, and avoid combining multiple simultaneous animation systems in the first viewport.

### PERF-002 — Large hero and background media are prioritized too aggressively

File(s): `src/components/sections/GSAPHeroTimeline.tsx`, `src/app/page.tsx`, `src/app/services/ServicesClient.tsx`

Evidence:

- Hero background images use `fill`, `priority`, and `sizes="100vw"`.
- The full-screen hero includes a large video that auto-plays (`/vv-website-video.mp4`).
- The service hero also uses a large `background` fill image at `src="/banner-2.webp"` with `priority`.

Problem:

Priority is assigned to media that is visually important, but the file sizes are still large enough to matter. The site is effectively telling the browser to fetch and decode several costly assets immediately.

User impact:

Higher LCP and slower first paint, especially on mobile networks.

Recommended fix:

Ensure only the one true LCP image is marked high priority. Use responsive image variants and remove or reduce non-essential hero quality where the design can tolerate it.

### PERF-003 — A large number of decorative brand assets are loaded into the page experience

File(s): `src/components/sections/BrandPhysicsBalls.tsx`, `public/VV LOGOS/...`, `public/All logo in SVG Format/...`

Evidence:

- `BrandPhysicsBalls.tsx` creates a physics simulation with roughly 30 brand logos.
- The repo contains many duplicate and high-resolution PNG logo assets in several folders.

Problem:

A large number of visual elements are being rendered and animated for brand display. This increases CPU and memory costs, especially when combined with scrolling and GSAP activity.

User impact:

Heavier DOM and paint work, more CPU usage, and a worse experience on older devices.

Recommended fix:

Reduce number of elements, prefer SVG assets, and simplify the effect to a lighter CSS/DOM-based carousel or logo strip when the physics effect is not essential.

### PERF-004 — The home page is rich enough to create jank even when the page is otherwise valid

File(s): `src/app/page.tsx`, `src/components/layout/Navigation.tsx`, `src/app/globals.css`

Evidence:

- The page composes multiple full-layout sections: hero, about, manifesto, gallery, reels, physics brand section, stats, SEO text, testimonials, contact.
- CSS defines many marquee animations, transforms, and hover effects.
- Navigation uses motion and a custom magnetic effect, and the page includes fixed-position elements and overlays.

Problem:

This is beautiful but heavy. The site contains many concurrent design effects that can amplify jank because the same frame is being used for scroll, motion, transforms, and layout-driven visuals.

User impact:

Reduced smoothness during scroll and lower interaction responsiveness.

Recommended fix:

Reduce the number of simultaneous transforms and the frequency of expensive animations; consider lowering motion complexity on low-end devices and respecting `prefers-reduced-motion` more aggressively.

## 6. API and Backend Findings

There is no large, obvious backend or database bottleneck visible in the repository. The app does have a server-side Supabase client and review submission server actions, which are not likely to be the primary source of performance slowness:

- `src/lib/supabaseServer.ts`
- `src/app/actions/reviews.ts`

This part of the app is a lightweight form or content submission layer rather than a data-heavy API service. There is no evidence of heavy query loops, massive data fetches, or N+1 patterns in the inspected server logic.

Conclusion: API and backend performance are not the main root cause of slowness in this codebase. The issue is primarily in asset size and client-side rendering cost.

## 7. Database Performance Findings

No real database schema or query code was found in the inspected app beyond the Supabase client wrapper and a `from("reviews").insert(...)` / `from("reviews").select(...)` usage. The project is not shipping a large application backend with complex SQL queries or an ORM layer.

Therefore, there is no repository evidence of a database performance problem that would explain slow page loads. In this codebase, the largest performance issue is almost certainly the frontend media and animation layer, not DB work.

## 8. Network, Caching, and Infrastructure Findings

### Positive findings

`next.config.ts` includes useful defaults:

- `compress: true`
- `productionBrowserSourceMaps: false`
- `formats: ["image/avif", "image/webp"]`
- `minimumCacheTTL: 31536000`
- immutable static asset caching for image/video/font-like file extensions

These are solid configuration choices and should help static assets have a better cache profile.

### Gaps

- The app does not appear to use a CDN-specific strategy beyond standard image optimization and caching headers.
- The large hero video remains unoptimized as a single 10MB file.
- Static asset caching is configured, but the project still distributes huge source assets and duplicate versions, which reduces the practical benefit of cache rules.
- The site is highly media-heavy for a general marketing page and would benefit from a stronger image/asset strategy at the project level.

## 9. Build and Dependency Analysis

The repository is not currently installed in the working environment. Running the production build failed with:

- `npm run build` -> `next: not recognized as an internal or external command`

This indicates the local project dependencies are not installed for this environment, so I could not complete a real production-build analysis or measure bundle sizes. That is a limitation rather than a code issue; it simply means runtime build metrics remain unverified in this environment.

The dependency manifest itself shows a fairly heavy frontend toolchain, but not necessarily excessive for a modern Next.js app. The more relevant performance issue is the choice of media and animation complexity, not an obviously broken or outdated dependency stack.

## 10. Route-by-Route Performance Review

### `/` (Home page)

This is the most performance-sensitive route. It loads:

- fixed nav
- main hero video and large images
- GSAP-driven hero timeline
- multiple motion-heavy sections
- multiple gallery/list sections
- physics-driven brand display

This is the most likely route to feel slow.

### `/services`

`src/app/services/ServicesClient.tsx` contains a very large hero background image and GSAP-based reveal cards. This route is also heavy because it combines large visuals, scroll animation, and a large number of service cards.

### `/branding` and `/the-salt-line`

These routes use multiple Cloudinary image slides and large portfolio visuals. This is likely to hurt perceived speed on slower connections, especially on mobile. The issue is mostly image weight and number of large visuals, not necessarily route logic.

### `/about`, `/blog`, `/contact`, `/owned-media`

These routes are likely less critical than the home page, but they still include marketing media, social cards, and sometimes large remote thumbnails.

## 11. Prioritized Findings Register

| ID | Title | Severity | Confidence | Category | File / Component | Summary |
|---|---|---|---|---|---|---|
| PERF-001 | Hero media is oversized and loads early | High | Confirmed from code | Images | `src/components/sections/GSAPHeroTimeline.tsx` | Large hero video and full-bleed media are prioritized on first view. |
| PERF-002 | Animation stack is heavy for a landing page | High | Confirmed from code | Frontend | `package.json`, `src/components/providers/SmoothScrollEngine.tsx` | GSAP, Framer Motion, Lenis, Three, Matter.js create a large client-side cost. |
| PERF-003 | Duplicate and oversized brand assets increase payload and maintenance cost | High | Confirmed from code | Images / Build | `public/`, `public/VV LOGOS/...`, `public/All logo in SVG Format/...` | Many PNG and SVG duplicates are present. |
| PERF-004 | Large local PNGs are still used in core section layouts | High | Confirmed from code | Images | `public/whoweare.png`, `public/Vv.png`, `public/Profile.png`, `public/banner-2.png` | Very large source files are used in a layout built for first display. |
| PERF-005 | Remote images are used extensively without clear performance controls | Medium | Confirmed from code | Network | `src/data/agencyData.ts` | Unsplash and Cloudinary URLs add network and caching variability. |
| PERF-006 | Resource prioritization is not tightly tuned to the actual LCP element | Medium | Strongly suspected | Frontend | `src/app/page.tsx`, `src/components/sections/GSAPHeroTimeline.tsx` | Multiple large media items compete for priority and timeline. |
| PERF-007 | No runtime build metrics were available in this environment | Low | Confirmed limitation | Build / Measurement | `package.json`, environment | `next` dependencies are not installed in the working environment, so build metrics could not be measured here. |

## 12. Root-Cause Analysis: Why the Project Feels Slow

The project does not feel slow because of a single bug. It feels slow because the site is intentionally media-rich and motion-heavy, and it combines several costly patterns at once:

1. Huge hero media and large section graphics are served early.
2. The animation system is rich and frequently active in the initial viewport.
3. Many decorative and branding assets are large, duplicated, or delivered at high resolution.
4. Certain sections continue to do visual work even when the user is simply scrolling.
5. The project has a strong aesthetic tendency toward immersive, premium motion, but not enough strict controlling logic for mobile devices and bandwidth constraints.

In other words, the performance issue is primarily an asset and rendering design problem, not a backend or database issue.

## 13. Optimization Roadmap

### Phase 1 — Quick Wins

1. Reduce the hero video size and delivery strategy.
   - Why it matters: the hero video is the biggest obvious file in the repo.
   - Files involved: `src/components/sections/GSAPHeroTimeline.tsx`, `public/vv-website-video.mp4`
   - Effort: Small to Medium
   - Risk: design quality may need minor adjustment
   - Test: compare the hero load time and the first visible content on a throttled mobile profile

2. Trim oversized still images and convert to WebP/AVIF.
   - Why it matters: large PNGs are clearly being used in first screens.
   - Files involved: `public/whoweare.png`, `public/banner-2.png`, `public/Vv.png`, `public/services/*.png`
   - Effort: Small to Medium
   - Risk: low, if asset dimensions remain consistent
   - Test: verify fewer bytes, no visible quality regression

3. Remove duplicate assets and keep a single canonical export per design.
   - Why it matters: duplication wastes storage and cognitive overhead.
   - Files involved: `public/` and `public/VV LOGOS/...`
   - Effort: Small
   - Risk: low
   - Test: confirm no broken image references remain

4. Recheck `priority` use and keep only one true LCP image high-priority.
   - Why it matters: many large images are marked or effectively treated as first-view critical.
   - Files involved: `src/components/sections/GSAPHeroTimeline.tsx`, `src/app/services/ServicesClient.tsx`
   - Effort: Small
   - Risk: minimal
   - Test: verify only the dominant hero image is high priority

### Phase 2 — Structural Improvements

1. Reduce motion complexity on the home page.
   - Why it matters: the design uses multiple animation systems simultaneously.
   - Files involved: `src/app/page.tsx`, `src/components/providers/SmoothScrollEngine.tsx`, `src/components/sections/BrandPhysicsBalls.tsx`
   - Effort: Medium
   - Risk: some visual polish may be toned down
   - Test: verify smoother scroll and reduced CPU cost on mobile browser devtools

2. Replace heavier brand logo rendering with lightweight SVG or CSS-based display.
   - Why it matters: many brand logos are large and repeated.
   - Files involved: `src/components/sections/BrandPhysicsBalls.tsx`
   - Effort: Medium
   - Risk: moderate if the effect is central to the brand identity
   - Test: compare motion smoothness and asset bytes

3. Add a stricter media policy for marketing sections.
   - Why it matters: future growth will lead to more image weight if not constrained.
   - Files involved: design and asset management process, not just code
   - Effort: Small
   - Risk: low
   - Test: audited asset review before deployment

### Phase 3 — Advanced Optimization

1. Evaluate CDN and image transformation workflow for remote and local images.
   - Why it matters: a better image pipeline can reduce waste and improve real-world delivery.
   - File(s): `next.config.ts`, deployment platform
   - Effort: Medium to Large
   - Risk: infra changes and deployment complexity
   - Test: compare network and LCP metrics after adoption

2. Consider reducing the hero from a video-first experience to a static or compressed image-first approach.
   - Why it matters: video can be a severe user-perceived delay.
   - Files involved: `GSAPHeroTimeline.tsx`
   - Effort: Medium
   - Risk: brand experience change
   - Test: compare page responsiveness and perceived quality on mobile

3. Build a real performance budget for the website.
   - Why it matters: once the site scales, additional media will continue to degrade UX.
   - Effort: Small
   - Test: enforce page-level asset budgets in CI or pre-commit checks

## 14. Performance Measurement and Testing Plan

The environment here did not have project dependencies installed, so no actual production metrics could be gathered. The table below distinguishes what should be measured from what was actually verified.

| Metric | How to measure it | Tool / Command | Baseline value | Target / success criterion | Relevant finding IDs |
|---|---|---|---|---|---|
| Production build size | Install dependencies and run a production build | `npm install` then `npm run build` | Not measured in this environment | Smaller JS and CSS output than current build, with no unnecessary bundle growth | PERF-002 |
| Initial JS payload | Inspect Next.js build output or a browser bundle report | `next build` + bundle analysis | Not measured | Keep above-the-fold JS under a reasonable threshold for marketing pages | PERF-002 |
| Image file sizes | Inspect file metadata and generated assets | Python / file metadata script | Confirmed large local assets existed | Hero and section assets reduced to mobile-friendly sizes | PERF-001, PERF-003, PERF-004 |
| Request count | Browser Network tab or DevTools | Chrome Performance / Network panel | Not measured | Fewer than necessary network requests before first meaningful render | PERF-001, PERF-005 |
| LCP | Real browser measurement | Lighthouse / Web Vitals | Not measured | Improve the hero image/video load path and first content timing | PERF-001, PERF-002 |
| TTFB | Server response and first byte measurement | DevTools / Vercel logs | Not measured | Keep server response low and avoid heavy server-side process on first request | not a primary finding |
| API latency | Endpoint timing | Supabase or server logs | Not measured | No notable slowdown | API section |
| Motion smoothness | DevTools performance recording | Chrome Performance panel | Not measured | No sustained jank or main-thread blocking during scroll | PERF-002, PERF-004 |

## 15. Risks, Dependencies, and Limitations

- The local environment does not currently have the project dependencies installed. This prevented a real `next build` and a true production bundle analysis.
- No browser-based measurement or Lighthouse data was collected in this environment.
- The performance conclusions are therefore a mix of confirmed code-based findings and strong, evidence-backed hypotheses that should be confirmed in a live browser environment.
- The code is definitely media-heavy; the exact impact on a given device/network combination still requires runtime verification.
- Some recommendations rely on a subjective design tradeoff between premium motion and practical performance.

## 16. Recommended Implementation Order

1. Hero video and main hero assets
2. Oversized local PNGs and uploaded marketing images
3. Duplicate asset cleanup and asset policy enforcement
4. Motion stack simplification on the home page and services page
5. Portfolio banner and remote image trimming
6. Additional tracking and web-vitals checks once the site is running locally or in a deployment environment

This ordering is based on user impact, code-based confidence, and likely benefit.

## 17. Final Conclusion

The project is visually rich and likely attractive, but the code clearly shows that the site is shipping a lot of expensive media and animation work in a way that is likely to feel slow, particularly on mobile and low-power devices. The strongest, most actionable findings are:

- large hero video and large hero stills
- oversized section graphics and duplicated brand assets
- heavy animation and scroll libraries combined into a rich first viewport
- limited evidence of a backend bottleneck, which means the frontend creative layer is the likely primary cause of slowness

This is not a full rewrite problem; it is a disciplined asset and motion optimization problem. If the team reduces the hero media weight, trims duplicate assets, and simplifies the initial motion stack, the site should feel substantially faster without sacrificing the brand’s premium visual identity.

## Appendix: Key evidence files

- `package.json`
- `next.config.ts`
- `src/app/page.tsx`
- `src/components/sections/GSAPHeroTimeline.tsx`
- `src/components/sections/BrandPhysicsBalls.tsx`
- `src/components/providers/SmoothScrollEngine.tsx`
- `src/app/services/ServicesClient.tsx`
- `src/data/agencyData.ts`
- `src/lib/supabaseServer.ts`
- `src/app/actions/reviews.ts`
