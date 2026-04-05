# EUCO Website — CRA → Next.js Migration Guide

## Overview

This document explains every architectural change made in migrating the EUCO website from Create React App (CRA) to Next.js 15 App Router. It covers file structure, performance wins, SEO improvements, the data strategy, and step-by-step instructions for completing the migration of stub pages.

---

## 1. Why Next.js?

| Problem in CRA | Next.js Solution | Impact |
|---|---|---|
| 271 MB of raw JPG/PNG served to browsers | `next/image` auto-converts to WebP/AVIF at correct sizes | ~95% smaller images |
| Google Sheets CSV fetched client-side on every page load | Server-side fetch at build time with ISR | Zero loading spinners |
| Three.js in bundle but never used | Removed entirely | ~500 KB less JS |
| No SSR — blank page until JS loads | Pre-rendered HTML from server | Instant first paint |
| Manual `<title>` / `<meta>` tags on each page | Next.js Metadata API | Consistent SEO |
| react-router-dom (client routing) | File-system routing | Automatic code splitting |
| react-burger-menu (25KB gzipped) | Simple Tailwind mobile menu | Smaller bundle |

**Expected result:** Home page payload drops from ~60–80 MB to ~1–2 MB. LCP under 1 second.

---

## 2. File Structure Mapping

```
CRA                                    Next.js App Router
──────────────────────────────────     ──────────────────────────────────
src/index.js + App.js                → app/layout.jsx (root layout)
  ↳ <BrowserRouter>                    (removed — file-system routing)
  ↳ <ScrollToTop>                      (removed — automatic in Next.js)

src/components/PageLayout.js         → app/(main)/layout.jsx
  ↳ <Header /> + <Outlet /> + <Footer>  ↳ <Header /> + {children} + <Footer>

src/components/EducationLayout.js    → app/education/layout.jsx
  ↳ <EducationFooter />                ↳ inline footer JSX

src/pages/Home.js                    → app/(main)/page.jsx
src/pages/About.js                   → app/(main)/about/page.jsx
src/pages/Conductors.js              → app/(main)/about/conductors/page.jsx
src/pages/Opera.js                   → app/(main)/about/opera/page.jsx
src/pages/OurStory.js                → app/(main)/about/our-story/page.jsx
src/pages/ConcertoCompetition.js     → app/(main)/about/concerto-competition/page.jsx
src/pages/Auditions.js               → app/(main)/about/auditions/page.jsx
src/pages/Concerts.js                → app/(main)/concerts/page.jsx
src/pages/UpcomingConcerts.js        → app/(main)/concerts/upcoming/page.jsx
src/pages/PastConcerts.js            → app/(main)/concerts/past/page.jsx
src/pages/Outreach.js                → app/(main)/concerts/outreach/page.jsx
src/pages/ContactUs.js               → app/(main)/contact-us/page.jsx
src/pages/ContactUsDirectly.js       → app/(main)/contact-us/direct/page.jsx
src/pages/FAQ.js                     → app/(main)/contact-us/faq/page.jsx
src/pages/SupportUs.js               → app/(main)/support-us/page.jsx
src/pages/Donate.js                  → app/(main)/support-us/donate/page.jsx
src/pages/OurPartners.js             → app/(main)/support-us/sponsors/page.jsx
src/pages/education/EducationHub.js  → app/education/page.jsx
src/pages/education/ComposersPage.js → app/education/composers/page.jsx
src/pages/education/ArticlesPage.js  → app/education/articles/page.jsx
src/pages/education/ProgrammeNotes.js→ app/education/programme-notes/page.jsx
src/pages/education/LearnPage.js     → app/education/learn/page.jsx

src/hooks/useGoogleSheet.js          → lib/data.js (server-side fetch)
src/data/*                           → lib/data/* (unchanged, just moved)
src/logos/*                          → public/logos/* (served as static files)
public/*                             → public/* (same, but processed by next/image)
src/App.css + src/index.css          → app/globals.css (combined)
```

The `(main)` folder uses Next.js **route groups** — the parentheses mean it's invisible in the URL. `/about` maps to `app/(main)/about/page.jsx`.

---

## 3. Image Optimisation (The Biggest Win)

### Before (CRA)
```jsx
// GalleryTeaser.js — loads 4 images at ~12 MB each = 48 MB
<img src="/images/FullOrchestra.jpg" alt="..." className="w-full h-64 object-cover" />
```

### After (Next.js)
```jsx
// Same visual result, but ~50-100 KB per image as WebP
import Image from 'next/image';

<Image
  src="/images/FullOrchestra.jpg"
  alt="..."
  fill                              // fills parent container
  sizes="(max-width: 768px) 50vw, 25vw"  // tells browser what size to request
  className="object-cover"
  loading="lazy"                    // defers off-screen images
/>
```

**What happens automatically:**
1. At build time, Next.js generates WebP and AVIF versions at multiple widths
2. A `srcset` attribute is added so browsers pick the right size
3. Below-the-fold images are lazy-loaded (only above-the-fold hero uses `priority`)
4. A blur placeholder is shown while the image loads

**You do NOT need to manually convert images to WebP.** Keep the original JPGs in `/public`. Next.js handles everything.

### For the hero image (above the fold):
```jsx
<Image src="/backgrounds/hero-photo.jpg" alt="..." fill priority quality={75} />
```
The `priority` flag tells Next.js to preload this image — critical for LCP.

---

## 4. Data Strategy: Google Sheets → Server-Side Fetch

### The Speed Problem
In the CRA version, `useGoogleSheet` runs in the browser:
1. User visits page → sees loading spinner
2. Browser fetches CSV from Google (~500ms–2s)
3. CSV is parsed client-side
4. UI finally renders

### The Solution: Build-Time Fetching with ISR
In Next.js, data is fetched on the **server** at build time:

```js
// lib/data.js — runs on the server, NOT in the browser
export async function getConcerts() {
  const res = await fetch(CSV_URL, { next: { revalidate: 3600 } }); // cache 1 hour
  // ... parse and return
}
```

```jsx
// app/(main)/concerts/upcoming/page.jsx — Server Component
export default async function UpcomingConcertsPage() {
  const { upcoming } = await getConcerts(); // ← runs at build time
  return <ConcertList concerts={upcoming} />;
}
```

**Result:** Users see pre-rendered HTML with all concert data already embedded. Zero loading spinners. Google Sheets is only hit once per hour (not per page view).

### Non-Technical Editing Workflow
1. Committee member opens the same Google Sheet
2. Edits a concert title, date, or image URL
3. Within ~1 hour, the website automatically reflects the change
4. For immediate updates: click "Redeploy" on Vercel dashboard

### Future Upgrade Path
If you outgrow Google Sheets, swap in any of these with no page changes:
- **Notion Database** — better UI, same pattern (fetch Notion API in lib/data.js)
- **Airtable** — designed for non-technical editors
- **JSON files in GitHub** — edit via GitHub UI, triggers rebuild on commit
- **Sanity / Contentful CMS** — full headless CMS with visual editor

The pattern is identical: change the URL and parser in `lib/data.js`, pages don't change.

---

## 5. SEO Architecture

### Metadata API (replaces manual tags)
Every page exports a `metadata` object:

```jsx
// Before (CRA) — manual tags in JSX, easily forgotten
<title>Conductors | EUCO</title>
<meta name="description" content="..." />
<meta property="og:title" content="..." />

// After (Next.js) — type-safe, automatically handles og/twitter/canonical
export const metadata = {
  title: 'Conductors & Guest Artists',     // rendered as "Conductors & Guest Artists | EUCO"
  description: 'Meet the professional...',
  alternates: { canonical: '/about/conductors' },
};
```

The root `layout.jsx` defines the template: `%s | EUCO`. Each page only sets the page-specific part.

### Geo SEO
Added in `app/layout.jsx`:
```jsx
other: {
  'geo.region': 'GB-SCT',
  'geo.placename': 'Edinburgh',
  'geo.position': '55.9533;-3.1883',
  'ICBM': '55.9533, -3.1883',
},
```

And in structured data for concert events:
```json
"location": {
  "@type": "MusicVenue",
  "address": {
    "addressLocality": "Edinburgh",
    "addressRegion": "Scotland",
    "addressCountry": "GB"
  }
}
```

### Structured Data
- **Organization schema** — injected once in root layout (not repeated per page)
- **MusicEvent schema** — injected on upcoming concerts page for each concert
- **ContactPage schema** — on the contact page
- **Service schema** — on the outreach page (for "Community Music Outreach")

---

## 6. Client vs Server Components

Next.js App Router defaults to **Server Components**. Only add `'use client'` when you need browser APIs:

| Needs `'use client'` | Why |
|---|---|
| Header.jsx | `useState` for menu, `useEffect` for scroll |
| HeroSection.jsx | `useEffect` for scroll opacity |
| SignupForm.jsx | `useState` for form, emailjs browser SDK |
| ConcertList.jsx | `useState` for modal, framer-motion |
| PastConcertList.jsx | `useState` for modal, framer-motion |
| FAQ accordion | `useState` for open/close |

| Stay as Server Component | Why |
|---|---|
| Footer.jsx | Pure rendering, no interactivity |
| Section.jsx | Pure rendering |
| All `page.jsx` files | Data fetching, metadata export |
| All `layout.jsx` files | Structural wrappers |

---

## 7. Dependencies Removed

| Package | Size | Why Removed |
|---|---|---|
| `three` / `@react-three/fiber` / `@react-three/drei` | ~500 KB | Never imported in any component |
| `react-router-dom` | ~30 KB | Replaced by file-system routing |
| `react-burger-menu` | ~25 KB | Replaced by Tailwind mobile menu |
| `react-scroll` | ~8 KB | Only used on education hub (replaced with native scroll) |
| `react-scripts` (CRA) | entire build toolchain | Replaced by Next.js |
| `react-mailchimp-subscribe` | ~5 KB | Already using emailjs instead |
| `web-vitals` | ~3 KB | Next.js has built-in analytics |

---

## 8. How to Complete the Migration

### Stub pages
Each stub page in `app/` contains a TODO comment. To migrate a page:

1. Open the original CRA file (e.g., `src/pages/FAQ.js`)
2. Open the corresponding stub (e.g., `app/(main)/contact-us/faq/page.jsx`)
3. Apply these transformations:

```
react-router-dom Link     →  next/link Link
process.env.PUBLIC_URL    →  remove (Next.js serves /public at /)
<img src="..." />         →  <Image src="..." width={} height={} />
useGoogleSheet()          →  getConcerts() / getPartners() in server component
ReactComponent SVG import →  <Image src="/logos/name.svg" /> or inline SVG
manual <title>/<meta>     →  export const metadata = { ... }
React.lazy / Suspense     →  remove (Next.js splits automatically)
```

### Moving assets
Copy from the CRA `/public` folder to the Next.js `/public` folder:
```bash
cp -r old-project/public/backgrounds new-project/public/
cp -r old-project/public/conductors new-project/public/
cp -r old-project/public/composerheads new-project/public/
cp -r old-project/public/gallery new-project/public/
cp -r old-project/public/images new-project/public/
cp -r old-project/public/videos new-project/public/
cp -r old-project/public/favicon new-project/public/
```

Copy SVG logos from `src/logos/` to `public/logos/`:
```bash
cp old-project/src/logos/*.svg new-project/public/logos/
```

### SVG optimisation
Run SVGO on the large SVGs before deploying:
```bash
npx svgo public/logos/euco-logo.svg    # 587KB → ~20KB
npx svgo public/logos/SCO3.svg         # 402KB → ~15KB
npx svgo public/logos/UoE-logo.svg     # 179KB → ~10KB
```

### Duplicate image cleanup
These images exist in both `/public/images/` and `/public/gallery/March25/`:
- Bruch.jpg, Cello.jpg, FullOrchestra.jpg, ImkeClarinet.jpg, Phillip.jpg, PhillipClose.jpg

Keep one copy and update references. This saves ~70 MB.

---

## 9. Deployment

### Vercel (recommended — free for hobby projects)
```bash
npm install -g vercel
vercel
```

Vercel handles:
- Image optimisation CDN (serves WebP/AVIF globally)
- ISR (revalidates Google Sheets data automatically)
- Edge caching
- HTTPS/SSL
- Preview deployments for branches

### Auto-rebuild when Google Sheet changes
Set up a Vercel Deploy Hook:
1. Vercel dashboard → Settings → Git → Deploy Hooks
2. Create a hook (gives you a URL)
3. Use Google Apps Script to call that URL when the sheet is edited:

```javascript
// In Google Sheets → Extensions → Apps Script
function onEdit(e) {
  UrlFetchApp.fetch('https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID');
}
```

This gives you **instant updates** when the sheet is edited (no waiting for the 1-hour ISR cycle).

---

## 10. Video Optimisation

The `opera-background.webm` (17 MB) should be compressed:
```bash
ffmpeg -i opera-background.webm -c:v libvpx-vp9 -b:v 1M -an -t 15 opera-bg-compressed.webm
```
Target ~2 MB. On the Opera page, wrap it in an intersection observer so it only loads when visible.

---

## Summary of Performance Wins

| Metric | Before (CRA) | After (Next.js) |
|---|---|---|
| Home page payload | ~60–80 MB | ~1–2 MB |
| JS bundle size | ~800 KB (incl. Three.js) | ~200 KB |
| First Contentful Paint | 3–5 seconds | < 1 second |
| Largest Contentful Paint | 5–10 seconds | < 2 seconds |
| Google Sheets loading | Visible spinner (500ms–2s) | Instant (pre-rendered) |
| Image format | Raw JPG (10–14 MB each) | WebP/AVIF (50–100 KB each) |
| Code splitting | Manual React.lazy | Automatic per-route |
