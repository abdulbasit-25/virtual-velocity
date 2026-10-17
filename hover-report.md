# Hover Effects Report

## Summary

- **Total hover effects found:** 469 source occurrences: 431 Tailwind `hover:`/`group-hover:` declarations, 28 mouse/pointer handler lines, 6 Framer Motion hover lines, and 4 authored CSS hover selectors. These are declarations and triggers, not 469 distinct controls.
- **Problems found:** 9 (high: 0, medium: 4, low: 5).
- **Related focus styling:** 108 `focus-visible:` utility declarations were found. Some interactive hover controls still lack an explicit matching focus-visible style.
- No `peer-hover:` utilities or hover-open Radix, Headless UI, Tippy, or Floating UI popovers were found. Tailwind hover utilities are used extensively; the hand-authored CSS hover selectors are listed separately.

## Hover Effects by Component

Lines below identify every source line matching a hover utility. Where several lines are grouped, their controls share the described effect family. `focus-visible` is included where it shares those class strings.

### App routes

| File | Line | Element | Effect | Trigger | Transition |
|------|------|---------|--------|---------|------------|
| `src/app/about/AboutClient.tsx` | 250, 253, 258, 261, 327, 329, 371, 428, 431, 484, 515, 519 | CTAs, cards, image, category chips | Button fill/border/text changes; card lift and shadow; image zoom; icon shift; card accent reveal | `hover`, `group-hover` | 200–700ms; image zoom is 700ms |
| `src/app/blog/[slug]/page.tsx` | 67, 114, 116, 128, 130 | Back link and adjacent-post cards | Link surface/color; card border/background; label text color | `hover`, `group-hover` | `transition-colors` or `transition-all` (default duration) |
| `src/app/blog/BlogClient.tsx` | 84, 87, 120, 123, 135, 147, 165, 292, 295, 326, 368 | Featured/article cards, filters, clear control, CTA | Shadow, lift, border/background/text, glow, icon movement; focus-within outlines cards | `hover`, `group-hover`, `focus-within` | 200–500ms; defaults where no duration is specified |
| `src/app/branding/BrandingClient.tsx` | 300, 303, 308, 311 | Two CTAs and arrow icons | Button lift/color/border and diagonal arrow movement | `hover`, `group-hover` | 300ms |
| `src/app/contact/ContactClient.tsx` | 163 | Contact navigation link | Text color | `hover` | `transition-colors` (default duration) |
| `src/app/not-found.tsx` | 32, 39 | Recovery links/buttons | Background, border, and text color | `hover` | 300ms |
| `src/app/owned-media/OwnedMediaClient.tsx` | 36, 38, 40, 41, 45, 47, 49, 50, 54, 56, 58, 59, 63, 65, 67, 68, 72, 74, 76, 77, 81, 83, 85, 86, 90, 92, 94, 95, 353, 408, 474, 629, 632, 637, 640, 651, 655, 661, 715, 814, 818, 824, 880, 883, 891, 894 | Theme-tokenized cards, links, image tiles, and download/action icons | Border/text/ring/glow/shadow changes; image zoom; accent reveal; icon shift | `group-hover`, `hover` | 300–500ms for most; defaults where unspecified |
| `src/app/services/ServicesClient.tsx` | 254, 258, 263, 350, 376, 383, 396, 431, 443, 447, 477, 489, 565, 619, 631, 655, 661, 693, 699 | CTAs, service cards, process stages, carousel controls | Button/card colors; card text/image zoom; icon movement; disabled stage controls also have a hover background | `hover`, `group-hover` | 300ms/default; image zoom is 700ms |

### Chat and layout

| File | Line | Element | Effect | Trigger | Transition |
|------|------|---------|--------|---------|------------|
| `src/components/chat/ChatPanel.tsx` | 205, 214, 280, 291, 308 | Restart/close/stop/send controls and privacy link | Background/brightness and underline changes; focus rings on controls | `hover`, `focus-visible` | Color/brightness default; `transition-colors` |
| `src/components/chat/ChatWidget.tsx` | 104, 118, 137 | Teaser dismiss, chat launcher | Background/scale feedback; focus ring | `hover`, `focus-visible` | Launcher transform; transition is defined on the control |
| `src/components/chat/MessageBubble.tsx` | 28, 108 | Copy and feedback controls | Background, text, and shadow; disabled feedback controls explicitly neutralize hover background | `hover`, `focus-visible` | `transition-colors` |
| `src/components/chat/QuickReplies.tsx` | 30 | Suggested-question buttons | Border/background change | `hover`, `focus-visible` | `transition-colors` |
| `src/components/layout/Footer.tsx` | 68, 248, 254, 258, 261, 270, 273, 349, 353, 373, 401, 475, 550, 561, 587, 590 | Footer links, social/action controls, back-to-top | Link/icon colors and movement; glow/shimmer; button scale/background | `hover`, `group-hover`, `focus-visible` | 160–700ms; back-to-top is 300ms |
| `src/components/layout/Navigation.tsx` | 35, 37, 40, 42, 47, 49, 55, 57, 60, 62, 67, 69, 164, 172, 179, 246, 261, 278, 283, 285, 398, 405, 419, 437 | Logo, navigation links, CTA, drawer links | Brand color, glow/scale/rotation, shine sweep, icon rotation/translation, drawer-link reveal | `hover`, `group-hover`; nav also uses mouse/focus handlers | 150–700ms; several transitions use defaults |

### Sections and page content

| File | Line | Element | Effect | Trigger | Transition |
|------|------|---------|--------|---------|------------|
| `src/components/sections/About.tsx` | 117, 119, 129 | Information cards and links | Card lift/shadow, glow reveal, link color/underline; focus-within outline | `hover`, `group-hover`, `focus-visible` | 300–500ms |
| `src/components/sections/AboutClientLogosSlider.tsx` | 58, 63, 71, 112, 115 | Logo tiles/images and marquees | Pause marquee; tile border/shadow; image ungrays and brightens | `hover`, `group-hover` | 300ms or default |
| `src/components/sections/BrandPhysicsBalls.tsx` | 484, 487, 551 | CTA, CTA icon, physics logo balls | CTA colors; icon rotation; logo circles scale/border/shadow | `hover`, `group-hover`, `group-active` | 300–500ms |
| `src/components/sections/Capabilities.tsx` | 39, 44, 54, 63, 65 | Capability cards and their contents | Card border and content colors; “ACTIVE” label reveal; Framer Motion card lift | `hover`, `group-hover`, `whileHover` | CSS 300–500ms; motion duration not specified on hover |
| `src/components/sections/ClientPartners.tsx` | 321 | Carousel control | Border color | `hover` | `transition-colors` |
| `src/components/sections/CommunitiesShowcaseBars.tsx` | 287, 292 | Community bars and floating avatar orbs | Bar lift/scale/shadow; orb scale and upward movement | `hover`, `group-hover` | 300ms |
| `src/components/sections/Contact.tsx` | 369, 415, 490, 561, 564, 642, 727, 729, 736, 744, 777 | Contact form choices, links, submit/back buttons | Border/background/text; arrow/send icon translation | `hover`, `group-hover`, `focus-visible` | Usually default or 300ms |
| `src/components/sections/EditorialTestimonials.tsx` | 206, 311, 323, 332, 358, 407, 506 | Testimonial controls, rating stars, expandable review/action | Button color, star scale, card border; focus-visible styles on some controls | `hover`, `focus-visible`; mouse enter/leave also pauses carousel and previews rating | Default or transition-defined; star transform uses default transition duration |
| `src/components/sections/GSAPHeroTimeline.tsx` | 251, 262, 330 | Timeline dots, CTA, video sound button | Background/text change; sound button scales | `hover`; ticker pause is mouse-event-driven | Sound button 300ms; other controls mostly default |
| `src/components/sections/GSAPRevolvingServices.tsx` | 218, 229, 237, 272, 360 | Filter, arrow, carousel-card, and dot controls | Border/text/background/opacity changes | `hover` | Color transition/default |
| `src/components/sections/GSAPScrollGallery.tsx` | 48, 65, 91, 113, 157, 160 | Work cards/images, action icons, filters | Image zoom; icon rotation/background; pill color; card focus ring | `group-hover`, `hover`, `focus-visible` | Image zoom 700ms; icon 300ms |
| `src/components/sections/Hero.tsx` | 109, 113 | Hero CTA and child icon/link | Link color and icon movement | `hover`, `group-hover` | Defined on the CTA |
| `src/components/sections/home/primitives.tsx` | 80, 85, 104, 117, 124, 128 | Shared home cards and CTA buttons | Card lift/border/shadow/accent line; CTA shimmer, color and icon rotation | `hover`, `group-hover`, `focus-visible` | 200–300ms; shimmer animation is 3s and speeds up on hover |
| `src/components/sections/InstaReelsGallery.tsx` | 121, 126, 142, 187 | Reel/image tiles, play icons, section heading | Image zoom, overlay/play affordance, focus outline | `group-hover`, `focus-visible` | Image 700ms; play icon 300ms |
| `src/components/sections/InteractiveCTABanner.tsx` | 100, 154 | CTA surface and child icon | Background and icon movement | `hover`, `group-hover` | Defined on the CTA |
| `src/components/sections/LightStatsSection.tsx` | 58 | Stat/card content | Color/visual emphasis | `hover` | See component transition utilities |
| `src/components/sections/Marquee.tsx` | 30, 44 | Scrolling marquee rows | Hover pauses motion via shared `.hover-marquee` rule | `hover` | Pause is immediate |
| `src/components/sections/Process.tsx` | 131, 138, 146, 187, 194, 202, 235 | Process-stage controls and cards | Border/background, stage emphasis, icon/label changes | `hover`, `group-hover` | Default or transition-defined |
| `src/components/sections/SelectedWork.tsx` | 143, 177, 276, 287, 332, 347 | Project cards, CTA, service tags | Card/action emphasis and Framer Motion tag scale/shadow | `group-hover`, `whileHover` | CSS transition-defined; motion transition inherited/configured |
| `src/components/sections/SEOTextSection.tsx` | 64, 73, 110 | Links and interactive content | Color/underline emphasis; focus-visible outlines | `hover`, `focus-visible` | Defined on elements |
| `src/components/sections/Services.tsx` | 38, 48, 51, 61 | Expandable service rows | Number/title shift/color and indicator color; row activation also occurs on mouse enter | `hover`, `group-hover`, `onMouseEnter` | 300–500ms |
| `src/components/sections/ServicesClientLogosCarousel.tsx` | 97, 104, 128, 153 | Carousel controls and logos | Border/color/scale or image emphasis | `hover`, `group-hover` | Defined on elements |
| `src/components/sections/Stats.tsx` | 32, 34 | Stat cards and metric | Border and metric color | `hover`, `group-hover` | 500ms |
| `src/components/sections/Testimonials.tsx` | 57, 67, 77, 146 | Carousel play/pause, arrows, dot navigation | Border/background/text and inactive-dot color | `hover`; carousel pause is mouse-event-driven | 300ms |

### Shared UI and authored CSS

| File | Line | Element | Effect | Trigger | Transition |
|------|------|---------|--------|---------|------------|
| `src/components/ui/accordion.tsx` | 30 | Accordion trigger | Text color; open-state icon rotation is state-driven | `hover` and accordion state | `transition-all` default |
| `src/components/ui/badge.tsx` | 11, 13, 15 | Badge variants | Background color | `hover` | Default |
| `src/components/ui/button.tsx` | 7, 12, 14, 16, 18, 20, 21, 23, 25 | Shared button variants | Background/border/text/underline/shadow; shared focus-visible ring and active scale | `hover`, `focus-visible`, `active` | Shared `transition-all` |
| `src/components/ui/CreativeCTA.tsx` | 24, 35, 38, 41, 47, 50, 54, 58 | Creative CTA variants | Shine animation, border/glow reveal, icon rotation, badge background | `hover`, `group-hover` | Usually 300ms; shimmer animation is defined separately |
| `src/components/ui/CursorParallaxImage.tsx` | 136, 138 | Work images and overlay | Image zoom and gradient overlay reveal; parent clips to rounded bounds | `group-hover` | 500–700ms |
| `src/components/ui/dialog.tsx` | 43 | Dialog close button | Opacity/background/text color; focus ring | `hover`, `focus` | Opacity transition |
| `src/components/ui/resizable-navbar.tsx` | 94, 198 | Navigation links and mobile menu control | Text/background change; active nav indicator is mouse-enter/leave-driven | `hover`, mouse events | Color transition/default |
| `src/components/ui/SoundToggle.tsx` | 54 | Sound toggle | Color/visual feedback | `hover` | See component class |
| `src/app/globals.css` | 169, 247–248 | Scrollbar thumb and marquees | Scrollbar thumb darkens; marquee animation pauses | Authored `:hover` selectors | Scrollbar default; marquee pause is immediate |
| `urdu.html` | 151 | Standalone project cards | Card background changes | Authored `.project-card:hover` | 200ms background transition |

### Pointer-, motion-, tooltip-, and cursor-driven effects

| File | Line | Element | Effect | Trigger | Transition |
|------|------|---------|--------|---------|------------|
| `src/components/layout/Footer.tsx` | 79–146; uses at 395, 454, 491, 582 | Social/action/back-to-top tooltips | Tooltip opens on hover or keyboard focus; closes on blur, Escape, or mouse leave; manually positioned top/bottom/left | Mouse enter/leave and focus/blur | Framer Motion 160ms |
| `src/components/sections/BrandPhysicsBalls.tsx` | 539–540 | Floating brand balls | Shows a single tooltip tracking the ball; code clamps horizontal placement and flips below when above-space is insufficient | Pointer enter/leave | Position updated with physics loop |
| `src/components/layout/Navigation.tsx` | 190, 201 | Desktop primary navigation | Shared hover pill follows link; focus also selects it | Mouse enter/leave and focus/blur | Framer Motion spring; link color 150ms |
| `src/components/ui/resizable-navbar.tsx` | 88–89 | Desktop navigation indicator | Active/hovered link indicator | Mouse enter/leave | See motion transition |
| `src/app/services/ServicesClient.tsx` | 552 | Process-stage tabs | Hover selects stage; click also selects it | Mouse enter and click | Stage transition is separately animated |
| `src/components/sections/Services.tsx` | 36, 42–44 | Expandable service row | Mouse enter changes active service; click toggles the same row | Mouse enter and click | Row uses 500ms color transition |
| `src/components/sections/EditorialTestimonials.tsx` | 170–171 | Testimonial carousel section | Pauses auto-advance while pointer is over the section | Mouse enter/leave | Timer pause/resume |
| `src/components/sections/EditorialTestimonials.tsx` | 405–406 | Rating stars | Previews rating on hover; click commits it | Mouse enter/leave and click | Star fill uses React state; no separate hover transform transition |
| `src/components/sections/Testimonials.tsx` | 38–39 | Testimonial carousel section | Pauses auto-advance while pointer is over the section | Mouse enter/leave | Timer pause/resume |
| `src/components/sections/GSAPHeroTimeline.tsx` | 211–212 | Hero rotating ticker | Pauses ticker while hovered | Mouse enter/leave | Ticker movement 700ms |
| `src/components/ui/CursorParallaxImage.tsx` | 107–108 | Work image | Pointer-driven tilt; reset on leave; disabled on mobile/when configured | Mouse move/leave | Framer spring |
| `src/components/ui/Magnetic.tsx` | 56–57 | Wrapped links/buttons | Pointer magnet translation; returns to origin on leave; disabled on touch, narrow screens, and reduced-motion preference | Mouse move/leave | Framer spring |
| `src/components/ui/GSAPMagnetic.tsx` | 65–66 | Wrapped controls | Pointer-driven magnetic translation and reset | Mouse move/leave | GSAP-defined |
| `src/components/ui/TiltCard.tsx` | 85–86 | Cards | Pointer-driven 3D tilt and scale; reset on leave | Mouse move/leave | GSAP 300ms; reset scale 500ms |
| `src/components/ui/MoleculeBackground.tsx` | 91, 97 | Ambient background | Global pointer position changes background response; resets on window leave | Window mouse move/leave | See animation loop |
| `src/components/sections/Capabilities.tsx` | 38 | Capability card | Lifts 8px on hover | Framer Motion `whileHover` | Motion default |
| `src/components/sections/ClientPartners.tsx` | 131–133 | Partner logo tile | Scales 1.12 and lifts 4px; raises z-index while hovered; disabled on mobile | Framer Motion hover | Spring, stiffness 320/damping 18 |
| `src/components/sections/SelectedWork.tsx` | 165 | Service tag | Scales 1.05 and gains shadow | Framer Motion `whileHover` | Motion default/inherited |
| `src/app/owned-media/OwnedMediaClient.tsx` | 378 | Owned-media card | Lifts 10px and scales 1.04; omitted when reduced motion is requested | Framer Motion `whileHover` | Motion default |
| `src/components/ui/CustomCursor.tsx` | 6; mounted on home, about, blog index/detail, branding, contact, not-found, owned-media, privacy, services, salt-line, and terms routes | Custom cursor | Tracks pointer and changes appearance over elements marked with cursor data attributes | Pointer tracking / custom cursor attributes | See component implementation |

## Problems

### [MEDIUM] Community avatar orb grows into neighboring columns
- **Where:** `src/components/sections/CommunitiesShowcaseBars.tsx:292`
- **What's wrong:** `group-hover:scale-120` grows the floating orb by 20% while the seven-column grid uses narrow gaps and the surrounding bars explicitly allow overflow. The enlarged orb can visually collide with adjacent columns.
- **Suggested fix:** Reduce `group-hover:scale-120` to `group-hover:scale-105` and use the existing shadow/border change for emphasis.

### [MEDIUM] Rating stars scale far beyond the normal hit area
- **Where:** `src/components/sections/EditorialTestimonials.tsx:407`
- **What's wrong:** `hover:scale-125` expands each 24px star control and its padding by 25%; adjacent star buttons are only separated by a small gap, so hovered stars can overlap.
- **Suggested fix:** Replace `hover:scale-125` with `hover:scale-105` (or remove scaling and use a color/fill transition).

### [MEDIUM] Footer tooltip can be clipped and has no viewport collision handling
- **Where:** `src/components/layout/Footer.tsx:79–146` and footer container at `src/components/layout/Footer.tsx:305`
- **What's wrong:** Tooltip placement is manually fixed to top/bottom/left, while the ancestor footer has `overflow-hidden`. A tooltip that extends beyond the footer bounds can be clipped; there is no flip/shift collision handling. Also, the tooltip wrapper closes on `onMouseLeave` and the floating tip has `pointer-events-none`, so moving the pointer from the trigger toward the label dismisses it across the gap.
- **Suggested fix:** Render tooltips in a portal with a collision-aware primitive (for example Radix/Floating UI), or remove/adjust the clipping ancestor and clamp/flip the tooltip against the viewport.

### [MEDIUM] Expandable Services rows are mouse/click-only non-semantic elements
- **Where:** `src/components/sections/Services.tsx:36,42–44`
- **What's wrong:** A `div` handles `onClick` and `onMouseEnter` to expand the service, but it is not keyboard-focusable and does not respond to Enter/Space. Touch users can tap it, but keyboard users cannot reach the action.
- **Suggested fix:** Use a `<button>` for the row trigger (or add `button` semantics, `tabIndex={0}`, and Enter/Space handling); retain the mouse-enter behavior only as an enhancement.

### [LOW] Hover-only CSS is not guarded for hover-capable devices
- **Where:** `src/app/globals.css:247–248`; `urdu.html:151`
- **What's wrong:** These authored `:hover` selectors are outside `@media (hover: hover)`. On touch browsers, the marquee pause or project-card background can remain in a tapped hover state.
- **Suggested fix:** Wrap these rules in `@media (hover: hover) { ... }`; use an explicit focus/pressed state only where the same behavior is meaningful to keyboard/touch users.

### [LOW] Some Framer Motion hover movement ignores reduced-motion preference
- **Where:** `src/components/sections/Capabilities.tsx:38`; `src/components/sections/ClientPartners.tsx:133`
- **What's wrong:** The 8px card lift and 1.12 logo scale are Framer Motion hover animations without a reduced-motion check. CSS `prefers-reduced-motion` rules do not automatically disable Framer Motion transitions.
- **Suggested fix:** Use `useReducedMotion()` and omit/neutralize `whileHover` for reduced-motion users, as already done for the Owned Media card at `src/app/owned-media/OwnedMediaClient.tsx:378`.

### [LOW] Bespoke testimonial controls lack explicit focus-visible counterparts
- **Where:** `src/components/sections/Testimonials.tsx:57,67,77,146`; `src/components/sections/GSAPRevolvingServices.tsx:229,237`
- **What's wrong:** These semantic buttons have hover color changes but no explicit focus-visible ring in their class strings, unlike controls in the shared Button component. Keyboard focus indication is inconsistent.
- **Suggested fix:** Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2` (or the local brand-equivalent) to each button.

### [LOW] Disabled carousel arrows still receive hover styling
- **Where:** `src/app/services/ServicesClient.tsx:619,631`
- **What's wrong:** The previous/next buttons become disabled at the ends of the stage list, but still have `hover:bg-white`; the disabled state can therefore react visually to pointer hover.
- **Suggested fix:** Add `disabled:hover:bg-white/70` (to preserve the base color) or use `enabled:hover:bg-white`.

### [LOW] Several image hover zooms take 700ms
- **Where:** `src/app/about/AboutClient.tsx:371`; `src/app/services/ServicesClient.tsx:477`; `src/components/sections/GSAPScrollGallery.tsx:65`; `src/components/sections/InstaReelsGallery.tsx:121`; `src/components/ui/CursorParallaxImage.tsx:136`
- **What's wrong:** The zoom transition is 700ms, exceeding the requested 500ms threshold and feeling slower than the 300ms interaction timing used by nearby controls. The clipping in `CursorParallaxImage` is deliberate image framing, not reported as a defect.
- **Suggested fix:** Change `duration-700` to `duration-300` or `duration-500` for the hover transition.

## Consistency Notes

- The shared Button component (`src/components/ui/button.tsx:7–25`) establishes a focus-visible ring and 0.98 active scale, but bespoke buttons vary in focus indication. Reuse the shared focus ring pattern for custom controls.
- Decorative card hover movement ranges from 0.5px to 10px, while logo/image scaling ranges from 1.04 to 1.12 and up to 1.25 for rating stars. Keep interactive control scale at or below 1.05; reserve larger scaling for isolated decorative media with collision space.
- Most color transitions use default timing or 300ms, but image zooms use 700ms. Standardize hover response to roughly 150–300ms, with up to 500ms for large media.
- `Magnetic` and `CursorParallaxImage` account for mobile or reduced motion; `TiltCard`, `GSAPMagnetic`, and several Framer Motion hover effects do not show the same safeguards in their implementations.
- The Footer tooltip is the custom hover/focus tooltip in this scan. It correctly supports keyboard focus and Escape and does not rely on `title=`, but lacks collision handling. Chat action `title` attributes have accompanying accessible labels; other `title=` occurrences in headings/section components are content props rather than browser tooltips.
- No hover styles changing layout dimensions (width, height, padding, or font weight) and no duplicate conflicting `hover:` declarations on the same element were identified in the scanned source.
