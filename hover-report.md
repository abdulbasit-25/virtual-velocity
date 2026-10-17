# Hover Effects Report

## Summary

- Total hover problems audited: 9
- Problems fixed: 9 (high: 0, medium: 4, low: 5)
- Unfixed: 0

## Problems

### [MEDIUM — FIXED] Community avatar orb grows into neighboring columns
- **Where:** `src/components/sections/CommunitiesShowcaseBars.tsx:292`
- **Status:** **FIXED**
- **Change:** Reduced `group-hover:scale-120` to `group-hover:scale-105`; kept the existing border and shadow emphasis.

### [MEDIUM — FIXED] Rating stars scale far beyond the normal hit area
- **Where:** `src/components/sections/EditorialTestimonials.tsx:407`
- **Status:** **FIXED**
- **Change:** Reduced `hover:scale-125` to `hover:scale-105` and set `transition-transform duration-200`.

### [MEDIUM — FIXED] Footer tooltip can be clipped and has no viewport collision handling
- **Where:** `src/components/layout/Footer.tsx:82–256`; footer container at line 407
- **Status:** **FIXED**
- **Change:** Portaled the tooltip to `document.body`, positioned it from the trigger’s bounding rectangle, clamped it to 8px viewport margins, flipped between top and bottom when space is insufficient, and recalculated on scroll and resize. Added a 120ms close delay and made the tooltip hoverable. Hover, focus, blur, Escape, and the 160ms animation remain supported; no library was added.

### [MEDIUM — FIXED] Expandable Services rows are mouse/click-only non-semantic elements
- **Where:** `src/components/sections/Services.tsx:42–75`
- **Status:** **FIXED**
- **Change:** Replaced the clickable `div` with a button, added matching `aria-expanded`, and added a brand-color focus-visible ring. Kept mouse-enter as an enhancement and preserved the row layout and heading semantics.

### [LOW — FIXED] Hover-only CSS is not guarded for hover-capable devices
- **Where:** `src/app/globals.css:247–251`; `urdu.html:151–155`
- **Status:** **FIXED**
- **Change:** Wrapped marquee-pause and project-card hover rules in `@media (hover: hover)`. Left the scrollbar-thumb hover rule unchanged.

### [LOW — FIXED] Some Framer Motion hover movement ignores reduced-motion preference
- **Where:** `src/components/sections/Capabilities.tsx:3,10,40`; `src/components/sections/ClientPartners.tsx:3,129`
- **Status:** **FIXED**
- **Change:** Added Framer Motion `useReducedMotion()` and pass `undefined` to the affected `whileHover` props when reduced motion is requested.

### [LOW — FIXED] Bespoke testimonial controls lack explicit focus-visible counterparts
- **Where:** `src/components/sections/Testimonials.tsx:59,69,79,148`; `src/components/sections/GSAPRevolvingServices.tsx:231,239`
- **Status:** **FIXED**
- **Change:** Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2` to all affected controls.

### [LOW — FIXED] Disabled carousel arrows still receive hover styling
- **Where:** `src/app/services/ServicesClient.tsx:619,631`
- **Status:** **FIXED**
- **Change:** Restricted the hover background to enabled buttons and added `disabled:cursor-not-allowed`, retaining disabled opacity.

### [LOW — FIXED] Several image hover zooms take 700ms
- **Where:** `src/app/about/AboutClient.tsx:371`; `src/app/services/ServicesClient.tsx:477`; `src/components/sections/GSAPScrollGallery.tsx:65`; `src/components/sections/InstaReelsGallery.tsx:121`; `src/components/ui/CursorParallaxImage.tsx:136`
- **Status:** **FIXED**
- **Change:** Changed only these image hover zoom transitions from `duration-700` to `duration-500`.

## Consistency Notes

- Keep interactive-control scaling at or below 1.05 unless there is enough space to avoid overlaps.
- Use focus-visible rings on custom interactive controls, consistent with the shared button styles.
- Framer Motion hover movement should respect reduced-motion preferences.
- The Footer tooltip now handles clipping and viewport edges in code; verify its placement on narrow screens and near both horizontal edges in a browser.
