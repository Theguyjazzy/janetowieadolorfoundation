# DESIGN.md — Janet Owieadolor Foundation (JOF)

## 1. Visual & Material Tokens (Supreme Director System)

### Color System
- `--ground-limestone: #F4F2EC` — Primary page ground (calm chalk limestone)
- `--surface-sand: #EAE6DC` — Alternating tonal band surface (replaces card borders/shadows)
- `--surface-obsidian: #141210` — Deep Benin bronze-obsidian architectural band & footer
- `--surface-obsidian-elevated: #1E1B18` — Elevated dark panel surface inside obsidian bands
- `--ink-primary: #141210` — Primary body & display ink on light surfaces (>15:1 contrast)
- `--ink-secondary: #4B463F` — Secondary editorial metadata ink on light surfaces (>7:1 contrast)
- `--ink-on-dark: #F4F2EC` — Primary ink on bronze-obsidian bands
- `--ink-muted-dark: #BEB6A9` — Secondary ink on bronze-obsidian bands (>7.5:1 contrast)
- `--accent-coral: #9F2B1D` — Edo coral-crimson (primary interactive actions, active focus states)
- `--accent-coral-hover: #822115` — Pressed/hovered primary action fill
- `--accent-brass: #B5942E` — Ochre brass (strictly restrained crest highlight on dark bands)
- `--border-stone: rgba(20, 18, 16, 0.14)` — Structural editorial hairline for ruled broadsheet ledgers and sticky header boundary

### Typography System
- **Display Family:** `'Instrument Serif', Georgia, serif` (sentence case, weight 400, tracking `-0.025em`, leading `0.96`–`1.04`)
- **UI & Body Family:** `'Hanken Grotesk', system-ui, sans-serif` (weights 400, 500, 600, 700; `font-variant-numeric: tabular-nums` on all ₦ amounts and metrics)
- **Type Scale (5 disciplined steps):**
  - `--text-display`: `clamp(2.85rem, 6vw, 5.5rem)` — Page `h1` hero titles (max 2 lines)
  - `--text-section`: `clamp(2rem, 3.8vw, 3.35rem)` — Section headings (`h2`)
  - `--text-lead`: `clamp(1.2rem, 1.5vw, 1.45rem)` — Editorial lead statements & pullquotes
  - `--text-body`: `1.0625rem` (`17px`, leading `1.6`, max measure `62ch`)
  - `--text-meta`: `0.875rem` (`14px`, clean sentence case, never <13px, never tracked ALL-CAPS eyebrow spam)

### Spatial Rhythm & Geometry
- **Outer Margin:** `clamp(1.25rem, 5vw, 4.5rem)` — Equal left and right outer margins on every section and viewport.
- **Section Separation:** `clamp(5rem, 10vw, 9rem)` vertical breathing room; adjacent sections alternate tonal grounds (`#F4F2EC` ↔ `#EAE6DC` ↔ `#141210`) so boundaries read by tone, never by boxed wrappers.
- **Corner Radius:** Sharp architectural `2px` consistently across documentary photographs, buttons, form controls, and donation ledger chips. Zero drop shadows at rest.

## 2. Page & Section Architecture (Zero Repeated Layouts)

### Home (`/`)
1. **Header Bar (Single Plain Architectural Row):** JOF crest (`jof-logo.png`) + `JOF · Janet Owieadolor Foundation` wordmark left; 5 crisp links (`Mission`, `Programmes`, `Stories`, `Founders`, `Get Involved`) + 1 solid Coral-Crimson `Donate Now` button right. Mobile drawer menu on `<960px`.
2. **Hero — "Three Prints, One Sovereign Line" (`#F4F2EC`):**
   - Upper band: Single `h1` (`Restoring dignity to widows across Edo State.`), 1 supporting sentence directly beneath, 1 primary button (`Donate to an Outreach`) + 1 quiet link (`Explore Programmes`).
   - Lower band: 3 unevenly scaled documentary photographs anchored to the 12-column grid — small left print (`handing-fabric-1.jpg`, 4:5), dominant center-right print (`hero-janet-widows.jpg`, 16:10, signature shutter reveal), and offset upper-right print (`hero-2.jpg`, 1:1) — zero slideshow chrome, zero eyebrow pills.
3. **Mission & Lineage — "Architectural Diptych" (`#EAE6DC`):**
   - Left 5 cols: Mama Janet Owieadolor portrait (`janet-portrait.jpg`) with grounded Benin City caption.
   - Right 7 cols: Vision, Mission, founding narrative, and three structured horizontal pillars (`Direct Welfare`, `Free Medical Interventions`, `Economic & Family Support`) without icon-card boxes.
4. **Verified Impact & Interactive Naira Ledger — "Obsidian Chronicle" (`#141210`):**
   - Top tier: 4 tabular-numeral verified metrics (`500+`, `8+`, `100%`, `98.4%`) + `Multiple` Medical Teams.
   - Bottom tier (Signature Centerpiece): Left interactive **Naira Impact Allocator** (`₦5,000` / `₦15,000` / `₦50,000` / `₦100,000`) showing exact household impact + deep link to `/donate?amount=...`; Right synchronized **Field Documentary Reel** (`food-bags-distribution.jpg`, `medical-checkup.jpg`, `agricultural-market.jpg`, `crowd-tent-1.jpg`) with smooth scroll-scrubbed horizontal drift.
5. **Core Programmes — "Living Monograph Plate Index" (`#F4F2EC`):**
   - Left 5 cols: Interactive selector index for the 4 core programmes (`Super Woman Relief Outreach`, `Medical Check-ups & Optical Care`, `Agricultural & Livelihood Support`, `Family Support & Child Scholarships`) displaying description & deliverables.
   - Right 7 cols: Large 4:3 active documentary plate that executes a shutter wipe transition on programme selection, paired with direct `Empower a Widow` link.
6. **Stories of Transformation — "Staggered Broadsheet Dossier" (`#EAE6DC`):**
   - Live Convex `posts:list` hydration with instant 4-story baseline (`Adaeze O.`, `Ngozi A.`, `Chiamaka E.`, `Blessing U.`) arranged as 1 tall lead feature dispatch + 3 staggered uneven tiles linking to `/stories/:slug`.
7. **Voices of Dignity — "Portrait & Pullquote Stage" (`#F4F2EC`):**
   - Interactive beneficiary portrait switcher (`beneficiary-adaeze.jpg`, `beneficiary-ngozi.jpg`, `beneficiary-chiamaka.jpg`, `beneficiary-blessing.jpg`) beside `community-children.jpg` (98.4% independence proof) updating the large Instrument Serif quotation, state origin, and outcomes.
8. **Reach Out & Direct Line (`#EAE6DC`):**
   - Left: Benin City HQ (`22 Eromosele Street, Off College Road, Ekewan Road, B/C, Edo State`), Direct Line (`+234 803 333 1232`), Email (`info@janetowieadolorfoundation.com`), Direct WhatsApp button (`+234 703 324 4322`).
   - Right: Convex-connected `contact:submit` inquiry form with field-level validation.
9. **Monumental Sticky-Uncover Footer (`#141210`):**
   - 4 navigation/programme/newsletter (`newsletter:subscribe`) columns above full-width `Janet Owieadolor Foundation` architectural display band and JOF crest.

### Dedicated Routes (Shared Design System & Woven Veil Route Transition)
- `/stories` & `/stories/:slug`: Full Convex + baseline stories archive with category filters, full-length narrative reader, pullquotes, stat strips, gallery carousel + lightbox (`post.html?slug=...` compatibility).
- `/founders`: Mama Janet Owieadolor spotlight, 7-member Board of Trustees grid (`assets/founders/*.jpg`), Joy Oboite Coordinator letter, and 6 foundation initiatives.
- `/get-involved`: Volunteer (`volunteers:submit`), Corporate Partnership (`partners:submit`), and Advocate/Share social actions.
- `/donate`: Full Naira giving console (`One-Time` / `Monthly Support`, preset chips + custom amount, live impact translation, WhatsApp account-detail pledge dispatch, dormant Paystack `Coming Soon` button, and audited impact stats `5,000+`, `12+`, `₦180M+`).
