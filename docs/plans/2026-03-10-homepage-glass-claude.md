# Homepage Claude Glass Hero Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the built-in homepage with a single-screen Claude-style glass hero that keeps the existing header/footer, exposes only `Control Panel` and `DISCORD`, and reserves a centered cat-image slot for a future asset.

**Architecture:** Keep the existing `home_page_content` override flow and only change the built-in default homepage branch. Simplify the JSX in `Home` to one hero section and replace the current blue liquid-glass CSS with a warm neutral glass system plus a reusable cat placeholder. The current worktree already has uncommitted homepage edits, so implementation must inspect and reconcile those changes instead of resetting the files.

**Tech Stack:** React 18, React Router, Semi UI, Tailwind utility classes, shared CSS in `web/src/index.css`, Bun for frontend verification.

---

### Task 1: Capture the Current Homepage State

**Files:**
- Modify: [web/src/pages/Home/index.jsx](/C:/Users/hgiga/NEWAPI/new-api/web/src/pages/Home/index.jsx)
- Modify: [web/src/index.css](/C:/Users/hgiga/NEWAPI/new-api/web/src/index.css)

**Step 1: Inspect the current dirty diff**

Run:

```bash
git diff -- web/src/pages/Home/index.jsx web/src/index.css
```

Expected: a non-empty diff showing existing in-progress homepage work.

**Step 2: Note the constraints before editing**

Write down these constraints in your working notes:

```text
- Keep NoticeModal behavior.
- Keep custom home_page_content override behavior.
- Do not touch header/footer components.
- Do not discard the existing dirty homepage diff without review.
```

**Step 3: Commit the planning docs only**

Run:

```bash
git add -f docs/plans/2026-03-10-homepage-glass-claude-design.md docs/plans/2026-03-10-homepage-glass-claude.md
git commit -m "docs: add homepage glass redesign plan"
```

Expected: only the two plan files are committed; homepage implementation files stay unstaged.

### Task 2: Simplify the Home JSX to One Hero

**Files:**
- Modify: [web/src/pages/Home/index.jsx](/C:/Users/hgiga/NEWAPI/new-api/web/src/pages/Home/index.jsx)

**Step 1: Remove the unused homepage sections from the default branch**

Delete the JSX and supporting data for:

```jsx
CAPABILITY_CARDS
HERO_PILLS
QUICK_START_STEPS
available model grid section
quick-start side panel
bottom CTA section
```

Expected result: the default homepage branch renders one hero section only.

**Step 2: Add the new hero content structure**

Build a single centered hero with:

```jsx
<section className='home-claude-hero'>
  <div className='home-claude-atmosphere' />
  <div className='home-claude-cat-wrap'>{/* placeholder or image */}</div>
  <div className='home-claude-island'>
    <span className='home-claude-eyebrow'>...</span>
    <h1>...</h1>
    <p>...</p>
    <div className='home-claude-actions'>
      <Link to='/console'>...</Link>
      <Button onClick={openDiscord}>DISCORD</Button>
    </div>
  </div>
</section>
```

Expected result: the JSX expresses the final layout directly and no longer mixes in dashboard-like homepage sections.

**Step 3: Add a future-proof cat asset constant**

Add a constant similar to:

```jsx
const HERO_CAT_IMAGE = '';
```

Then branch the cat visual:

```jsx
{HERO_CAT_IMAGE ? <img ... /> : <div aria-hidden='true'>...</div>}
```

Expected result: no broken image is rendered when no asset exists.

**Step 4: Keep the existing custom homepage override intact**

Verify the final conditional structure still behaves like:

```jsx
if (shouldShowDefaultHome) { /* built-in hero */ }
if (shouldShowCustomHome) { /* configured homepage content */ }
```

Expected result: admins can still override the homepage through settings.

**Step 5: Commit the JSX simplification**

Run:

```bash
git add web/src/pages/Home/index.jsx
git commit -m "feat: simplify homepage to single hero"
```

### Task 3: Replace the Homepage CSS System

**Files:**
- Modify: [web/src/index.css](/C:/Users/hgiga/NEWAPI/new-api/web/src/index.css)

**Step 1: Remove the unused homepage style blocks**

Delete or stop using the classes tied to the removed sections, especially:

```css
.home-bento-card
.home-model-card
.home-step-item
.home-metric-card
.home-cta-panel
```

Expected result: the stylesheet only contains styles needed by the new hero.

**Step 2: Add the new warm neutral glass styles**

Create a focused style set for:

```css
.home-claude-shell
.home-claude-hero
.home-claude-atmosphere
.home-claude-island
.home-claude-eyebrow
.home-claude-title
.home-claude-subtitle
.home-claude-actions
.home-claude-cat-wrap
.home-claude-cat-placeholder
```

Expected result: the hero reads as warm, soft, and Claude-like rather than blue liquid glass.

**Step 3: Style the buttons and dark mode intentionally**

Add styles for:

```css
.home-claude-btn-primary
.home-claude-btn-secondary
html.dark .home-claude-*
```

Expected result: the primary button feels solid and warm; the secondary button stays glassy; both remain legible in light and dark themes.

**Step 4: Add reduced-motion protection**

Ensure any decorative animation is wrapped by:

```css
@media (prefers-reduced-motion: reduce) { ... }
```

Expected result: ambient motion turns off when reduced motion is requested.

**Step 5: Commit the CSS rewrite**

Run:

```bash
git add web/src/index.css
git commit -m "feat: restyle homepage hero for glass layout"
```

### Task 4: Verify the Homepage End to End

**Files:**
- Verify: [web/src/pages/Home/index.jsx](/C:/Users/hgiga/NEWAPI/new-api/web/src/pages/Home/index.jsx)
- Verify: [web/src/index.css](/C:/Users/hgiga/NEWAPI/new-api/web/src/index.css)

**Step 1: Check formatting on the touched files**

Run from `web/`:

```bash
bunx prettier --check src/pages/Home/index.jsx src/index.css
```

Expected: both files pass Prettier checks.

**Step 2: Build the frontend**

Run from `web/`:

```bash
bun run build
```

Expected: Vite build completes successfully.

**Step 3: Manually verify the hero**

Check these conditions:

```text
- 375px: buttons stack cleanly and remain fully visible
- 768px: island and cat placeholder maintain separation
- 1024px and 1440px: island stays centered and footer follows below
- Control Panel opens /console
- DISCORD opens the invite link in a new tab
- Custom home_page_content still replaces the built-in hero
- No horizontal scrollbars appear
```

Expected: the single-screen hero works in both default and override paths.

**Step 4: Commit the verified result**

Run:

```bash
git add web/src/pages/Home/index.jsx web/src/index.css
git commit -m "feat: add claude-inspired homepage hero"
```

### Task 5: Final Review Before Merge

**Files:**
- Verify: [docs/plans/2026-03-10-homepage-glass-claude-design.md](/C:/Users/hgiga/NEWAPI/new-api/docs/plans/2026-03-10-homepage-glass-claude-design.md)
- Verify: [docs/plans/2026-03-10-homepage-glass-claude.md](/C:/Users/hgiga/NEWAPI/new-api/docs/plans/2026-03-10-homepage-glass-claude.md)

**Step 1: Confirm no protected branding changed**

Run:

```bash
git diff -- README.md web/src/pages/Home/index.jsx web/src/index.css
```

Expected: no protected `new-api` or `QuantumNous` identifiers were removed or renamed.

**Step 2: Summarize residual risk**

Record this note:

```text
Primary residual risk: the final cat image may require minor object-position or max-width tuning after the real asset is added.
```

**Step 3: Prepare for code review**

Run:

```bash
git status --short
```

Expected: only intended homepage files and plan docs are modified or committed.
