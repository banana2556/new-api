# Homepage Claude Glass Design

**Date:** 2026-03-10
**Scope:** [web/src/pages/Home/index.jsx](/C:/Users/hgiga/NEWAPI/new-api/web/src/pages/Home/index.jsx) and [web/src/index.css](/C:/Users/hgiga/NEWAPI/new-api/web/src/index.css)

## Goal

Replace the current default homepage with a single-screen Claude-inspired glass hero while keeping the existing global header, footer, routing, notice modal behavior, and admin-configurable custom homepage override.

## Confirmed Product Decisions

- Keep the existing site header and footer from `PageLayout`.
- Remove the lower homepage sections from the default homepage:
  capability cards, model list, quick-start side panel, and bottom CTA block.
- Use a warm neutral palette closer to Claude instead of the current blue liquid-glass look.
- Build a centered glass "button island" with exactly two primary actions:
  `Control Panel` and `DISCORD`.
- Reserve a centered cat-image visual slot behind or around the button island.
- Do not require a real cat image yet. The layout must look intentional with a placeholder.
- Keep `home_page_content` behavior intact. If admins configure custom homepage content, it still overrides the built-in homepage.

## Non-Goals

- Do not change the header bar component, footer component, or site navigation rules.
- Do not change backend APIs or homepage-content storage behavior.
- Do not add a new image-upload workflow.
- Do not introduce unrelated homepage marketing sections.

## Information Architecture

The default homepage becomes one hero section between the fixed header and the existing footer.

The hero contains four visual layers:

1. A warm neutral gradient background.
2. Soft atmospheric blur shapes for depth.
3. A cat-image placeholder layer positioned in the lower center of the hero.
4. A centered glass content island containing:
   - a small eyebrow label,
   - a short Claude-style headline,
   - a short subtitle,
   - the two action buttons.

Desktop layout stays vertically centered. Mobile layout stacks the text and actions above the cat placeholder so buttons remain clear and easy to tap.

## Copy Direction

The copy should feel restrained and editorial rather than feature-heavy.

- Eyebrow: short and quiet, such as `Unified AI workspace`.
- Headline: one or two lines, concise, not a feature checklist.
- Subtitle: one sentence describing the value of the gateway without listing everything it does.
- Buttons:
  - `Control Panel` links to `/console`
  - `DISCORD` opens `https://discord.gg/z7RrQCz2Gx` in a new tab with `noopener,noreferrer`

## Cat Placeholder Strategy

The hero must ship without the real cat asset.

- Define a single constant for the future cat image source.
- If the constant is empty, render a styled placeholder silhouette/card instead of a broken image.
- The placeholder must still support the intended composition:
  the cat sits visually behind the glass action island so the later real image can appear to "hold" the buttons.
- Replacing the future asset should not require layout rewrites.

## Interaction and Motion

- Hover states should be subtle: shadow, border, and opacity only.
- Avoid large scale transforms on the CTA buttons.
- Keep any ambient motion very light.
- Respect `prefers-reduced-motion` by disabling decorative animation.

## Accessibility and Responsive Rules

- Minimum touch target size: 44px for both buttons.
- Visible focus styles on interactive elements.
- No horizontal scrolling at common widths.
- Verify desktop and mobile layouts at 375px, 768px, 1024px, and 1440px.
- Ensure the placeholder visual is decorative unless a real image later requires meaningful alt text.

## Implementation Notes

- The current worktree already contains uncommitted homepage changes in [web/src/pages/Home/index.jsx](/C:/Users/hgiga/NEWAPI/new-api/web/src/pages/Home/index.jsx) and [web/src/index.css](/C:/Users/hgiga/NEWAPI/new-api/web/src/index.css).
- Implementation must inspect and build on those changes rather than discarding them blindly.
- Because `docs/plans` is ignored by `.gitignore`, the design and plan documents must be added with `git add -f` if they are committed.

## Verification

- Frontend build succeeds from `web/`.
- The default homepage shows the new single-screen hero.
- Custom homepage content still overrides the default homepage.
- `Control Panel` and `DISCORD` actions work.
- The hero remains visually complete without a real cat image.
