# Nishaanth K N · Portfolio

Personal portfolio of **Nishaanth K N**, AI Engineer, live at **[k2n.online](https://k2n.online)**.

A dark, motion-led site built around a WebGL particle ring that reacts to the visitor:
moving the pointer pushes the particles away, scrolling ripples and fades the ring, and
holding the pointer still makes it breathe more.

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Astro 7](https://astro.build) | Static HTML by default and almost no JavaScript shipped, so the page is fast and good for SEO |
| Language | TypeScript (strict) | Typed project and experience data, typed client scripts |
| 3D / motion | [Three.js](https://threejs.org) + custom GLSL shaders | GPU-driven particle torus with simplex-noise displacement |
| Styling | Scoped component CSS + global design tokens | No framework overhead; each section owns its layout |
| Fonts | Inter Tight (Google Fonts) | Thin display weights for the large headlines |
| Hosting | GitHub Pages via GitHub Actions | Builds on every push to `main`; custom domain from `public/CNAME` |

Three.js (~520 kB) is loaded **lazily** after the text has painted, and the animation pauses
when the tab is hidden. With `prefers-reduced-motion` turned on, it renders one still frame instead.

## Sections and layouts

Each section uses a different layout:

| Section | Layout |
| --- | --- |
| **Hero** | Full-height grid: oversized headline, divided info row, bracketed tags and CTA |
| **Marquee** | Endless strip of the tools I use, pausing on hover |
| **About** | Split: a sticky profile card (with a live Chennai clock) beside the story, animated stat counters and a skills bento grid |
| **Experience** | Vertical timeline whose gradient line fills, and dots light up, as you scroll |
| **Works** | Uneven bento grid of my agent and RAG projects (one large tile, one wide tile, then singles), with a glow that follows the pointer |
| **Contact** | Oversized headline on the left, numbered list of links on the right |

## Project structure

```text
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages
├── public/
│   ├── CNAME                       # k2n.online
│   └── favicon.svg
├── src/
│   ├── components/                 # one .astro file per section
│   │   ├── Backdrop.astro          # aurora glow, WebGL canvas, film grain
│   │   ├── Nav.astro               # fixed nav + mobile menu + active-section highlight
│   │   ├── Hero.astro
│   │   ├── Marquee.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Works.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── data/site.ts                # profile, projects, experience, skills: edit content here
│   ├── layouts/BaseLayout.astro    # <head>, SEO/meta tags, scroll-reveal observer
│   ├── pages/index.astro           # puts the sections together
│   ├── scripts/
│   │   ├── ring.ts                 # Three.js particle ring
│   │   └── noise.ts                # GLSL simplex noise
│   └── styles/global.css           # design tokens + shared utilities
└── astro.config.mjs
```

## Getting started

Requires **Node 22.23+** (Astro 7's minimum).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
npm run preview    # serve the production build locally
```

## Editing content

All content lives in [`src/data/site.ts`](src/data/site.ts):

- **Add a project:** add an entry to `projects`. `repo` must match the GitHub repository name
  (it builds the link). Projects appear in the bento grid in array order: the first gets the
  large tile and the second the wide one.
- **Categories** are `agents` and `rag`. They label each tile and feed the counters in About.
- **Experience, skills, marquee items and contact links** are defined in the same file.

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages.

One-time setup: in the repository, go to **Settings → Pages → Build and deployment** and set
**Source** to **GitHub Actions**. The custom domain comes from `public/CNAME`.

## License

Code is free to learn from. Please don't reuse the personal content (name, bio, experience) as-is.
