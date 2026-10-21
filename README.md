# Virtual Velocity — Global Digital Marketing & Growth Engineering Agency

> **Accelerating enterprise brand velocity through performance-driven digital marketing, technical SEO architectures, full-funnel media buying, and immersive interactive design.**

---

## ⚡ Overview

**Virtual Velocity** is a premier transatlantic digital agency operating seamlessly across dual operational hubs in **Wilmington, Delaware (USA)** and **Lahore (Pakistan)**. 

Led by Founder & Creative Director **Tauseef Alam** (12+ years digital media leadership, overseeing proprietary media communities with 1,000,000+ members including *Rawalpindians*, *Islamabad Insider*, and *Sirf Chai*), Virtual Velocity delivers high-performance digital marketing, technical search engine optimization, paid advertising, and award-winning creative campaigns.

---

## 🛠 Tech Stack & Architecture

This platform is engineered using modern web technologies:

* **Framework:** [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
* **Library:** [React 19](https://react.dev/)
* **Language:** [TypeScript 5](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with CSS-first theme tokens, fluid typography clamps, and a custom responsive breakpoint (`xs: 375px`)
* **Motion & Animation:**
  * [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/) and `@gsap/react`
  * [Framer Motion 12](https://www.framer.com/motion/)
* **Smooth Scrolling:** [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Interactive 3D / WebGL:** HTML5 Canvas WebGL wireframe dynamics
* **SEO & Accessibility:**
  * Validated JSON-LD Schema (`Organization`, `Person`)
  * Full `@media (prefers-reduced-motion: reduce)` system-wide compliance
  * Dynamic Open Graph & Twitter card previews
  * XML Sitemaps (`/sitemap.xml`) & Search Engine Directives (`/robots.txt`)

---

## 📱 Responsive Multi-Breakpoint Matrix

The platform is engineered to deliver an intentional, tailored experience across all screen sizes:

| Breakpoint | Target Category | Layout Behavior |
| :--- | :--- | :--- |
| **320px – 480px** | Small & Compact Mobile | Full-width single-column layout, touch targets $\ge 48\text{px}$, swipeable snap carousels, slide-out drawer menu with body scroll locking. |
| **768px – 1024px** | Tablets & Foldables | 2-column balanced service grid, hybrid navigation, fluid typography scaling. |
| **1024px – 1440px** | Laptops & Desktops | 3D cylindrical revolving service carousel, inline navigation, interactive magnetic cursor. |
| **1440px – 1920px+**| Large & Ultra-Wide Screens | Centered max-width boundaries (`1700px`), optimized reading widths (`70ch`). |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

* **Node.js:** `v20.9.0` or higher (Recommended: `v22.x LTS`)
* **Package Manager:** `npm` (v9+), `pnpm` (v8+), or `yarn`

Check your current version:
```bash
node -v
npm -v
```

---


### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Maliksaad69/virtual-velocity.git
   cd virtual-velocity
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

### Running Locally

To start the local development server with Turbopack fast-refresh:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your web browser.

---

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This compiles TypeScript, optimizes static pages, bundles assets, and outputs a ready-to-deploy build in `.next/`.

To test the production build locally:

```bash
npm run start
```

### Environment configuration

Copy `.env.example` to `.env.local` before deployment and configure values for the target environment:

* `NEXT_PUBLIC_SITE_URL` sets the canonical production origin. Set it to the final public URL before building.
* `NEXT_PUBLIC_CONTACT_ENDPOINT` must point to an endpoint that accepts the contact form's JSON payload. Leave it blank only when the form is intentionally unavailable; the form then reports that it cannot submit.
* `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) and `SUPABASE_SERVICE_ROLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) configure optional review storage. Never expose a service-role key with a `NEXT_PUBLIC_` prefix.

The app does not configure analytics. Review submission and contact delivery should be tested in the production environment after their endpoints and credentials are configured.

---

### Code Quality & Linting

Run ESLint to verify adherence to code style and lint rules:

```bash
npm run lint
```

---

## 💬 Website Chat Assistant

The site-wide Virtual Velocity chat assistant is deterministic and rule-based. It does not call an LLM, send chat messages to a server, or require an API key. Visitors can use the contact page or the published email and phone links to reach the team.

To update the assistant:

* Edit the verified services, contact details, locations, process notes, and case studies in `src/data/chatKnowledge.ts`.
* Update intent matching and fixed English/Urdu replies in `src/lib/chat/reply.ts`.
* The conversation is kept in the current browser tab's `sessionStorage`; feedback stores only aggregate counts in `localStorage`.

Chat leads are not collected or submitted in the widget. The contact page currently has no configured submission endpoint, so the assistant links visitors to `/contact` rather than claiming that a chat lead was delivered.

---

## 📂 Project Structure

```text
├── public/                     # Static media, SVG brand logos, favicon, manifests
│   ├── VV png.png              # Virtual Velocity primary brand logo
│   ├── hero.jpeg               # High-resolution hero background
│   ├── icon.png                # App icon and metadata image
│   └── site.webmanifest        # PWA & browser manifest
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page (Agency history, Founder bio, Live clocks)
│   │   │   ├── page.tsx
│   │   │   └── AboutClient.tsx
│   │   ├── blog/               # Digital Journal & Articles
│   │   │   ├── page.tsx
│   │   │   ├── BlogClient.tsx
│   │   │   └── [slug]/         # Dynamic SSG blog post reader
│   │   ├── careers/            # Careers page & application intake
│   │   ├── contact/            # High-converting project inquiry portal
│   │   ├── privacy-policy/     # GDPR & CCPA privacy disclosure
│   │   ├── terms-of-use/       # Legal agreements & intellectual property
│   │   ├── globals.css         # Global CSS tokens, keyframes, fluid clamp sizes
│   │   ├── layout.tsx          # Root layout with JSON-LD schema & fonts
│   │   ├── not-found.tsx       # Custom branded 404 error page
│   │   ├── page.tsx            # Home page composition
│   │   ├── robots.txt          # Crawler directives
│   │   └── sitemap.xml         # Dynamic static sitemap
│   ├── components/
│   │   ├── layout/             # Universal Navigation & Footer components
│   │   ├── providers/          # SmoothScrollProvider (Lenis & GSAP ticker sync)
│   │   ├── sections/           # Modular page sections (Hero, About, Services, etc.)
│   │   │   └── home/           # Shared homepage presentation and motion primitives
│   │   └── ui/                 # Reusable UI primitives (Cursor, CTAs, Audio, Parallax)
│   └── data/
│       └── agencyData.ts       # Central source of truth (Founder, Services, Case Studies)
├── next.config.ts              # Next.js image domain configuration
├── tailwind.config.ts          # Custom breakpoints, typography, and color palette
├── tsconfig.json               # TypeScript strict configuration
└── package.json                # Project dependencies and operational scripts
```

---

## 🌐 Operational Hubs & Contact

* **United States Operations:** Wilmington, Delaware, USA
* **Pakistan Operations:** Lahore, Punjab, Pakistan
* **Inquiries & Proposals:** [hello@virtualvelocity.agency](mailto:hello@virtualvelocity.agency)
* **Founder & Creative Director:** Tauseef Alam

---

## 📄 License

Proprietary © 2026 Virtual Velocity. All rights reserved.
