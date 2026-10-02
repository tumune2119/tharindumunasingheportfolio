# Forest & Mint — Design Spec

A portable, Figma-ready spec extracted from the live codebase
(`tumune2119/tharindumunasingheportfolio@31722cc`, `main`), for recreating
frames in an actual Figma file. Pair this with `figma-tokens.json` in this
same folder — import that file with the **Tokens Studio for Figma** plugin
(Tokens Studio → Import → JSON) to get every color, spacing, radius, shadow
and type style below as real Figma variables/styles instead of typing them
in by hand.

A living, browsable version of this same system (with component previews
you can click through) also exists as a Claude design-system artifact —
ask for that link if you don't have it.

## Color

| Token | Light | Dark | Usage |
|---|---|---|---|
| `primary` | `#2d6a4f` | `#52b788` | Brand actions, links, active nav, focus rings |
| `primary-variant` | `#1b4332` | `#74c69d` | Hover/active fill for primary buttons |
| `secondary` | `#95d5b2` | `#40916c` | Hero aura gradient, inner stop |
| `secondary-variant` | `#b7e4c7` | `#2d6a4f` | Hero aura gradient, outer stop |
| `background` | `#ffffff` | `#1a1a2e` | Page canvas |
| `surface` | `#f0faf4` | `#222236` | Inputs, nav pill, chip backgrounds |
| `card` | `#ffffff` | `#2a2a40` | Elevated container background |
| `foreground` | `#1b1b1b` | `#e8e8e8` | Primary text |
| `muted-foreground` | `#4a4a4a` | `#b0b0b0` | Secondary text |
| `primary-foreground` | `#ffffff` | `#ffffff` | Text on a primary-filled surface |
| `accent` | `#d4a373` | `#e9c46a` | Rare decorative highlight |
| `success` | `#40916c` | `#74c69d` | Success state |
| `warning` | `#e9c46a` | `#f4a261` | Warning state |
| `error` | `#e76f51` | `#e76f51` | Error state |
| `info` | `#457b9d` | `#6fb3d9` | Informational state |

Light values live as the default; dark values apply under system
preference or an explicit user toggle (explicit choice always wins).

## Typography

Typeface: **Inter**, one family for the whole site. Set up as 11 Figma text
styles, named to match:

| Style | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| `display` | 64px | 72px | -1.5px | 700 |
| `h1` | 48px | 56px | -1px | 700 |
| `h2` | 36px | 44px | -0.5px | 600 |
| `h3` | 28px | 36px | 0 | 600 |
| `h4` | 22px | 30px | 0 | 500 |
| `h5` | 18px | 26px | 0.15px | 500 |
| `body-lg` | 18px | 28px | 0 | 400 |
| `body` | 16px | 24px | 0 | 400 |
| `body-sm` | 14px | 20px | 0.1px | 400 |
| `caption` | 12px | 16px | 0.4px | 400 |
| `overline` | 11px | 16px | 1.5px | 500, **uppercase** |

## Spacing

Used as gap between flex/grid children, not as per-element margin.

| Token | Value | Usage |
|---|---|---|
| `space-2` | 8px | Tight inline gaps (icon-to-label) |
| `space-3` | 12px | Form field stacking, button row gap |
| `space-4` | 16px | Default section/card gap on mobile |
| `space-6` | 24px | Section gap at tablet+, desktop card padding |
| `space-8` | 32px | Card padding desktop (md:p-8) |
| `space-10` | 40px | Largest inter-section gap, desktop |

## Radius

| Token | Value | Usage |
|---|---|---|
| `radius-md` | 12px | Nested elements — thumbnails, chips |
| `radius-lg` | 16px | **Signature radius** — every top-level card |
| `radius-full` | 9999px | Buttons, pills, tags, toggle tracks |

## Shadow

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,.05)` | Resting primary button |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)` | Hover, primary button |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)` | Hover, compact preview card |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)` | Hover, main project card |

## Motion

One curve, one band: `ease-in-out`, 500–700ms, for every ordinary
interaction (hover, focus, color transitions). Note this as a Figma
prototyping default (Ease In and Out, ~550ms) rather than per-component —
the whole point is that nothing on the site picks its own timing.

## Components

Build each as a Figma component with these exact properties; see the
browsable design-system artifact's component previews for a visual
reference while building.

### Button
- Shape: fully round (`radius-full`), horizontal padding 24px, vertical padding 12px.
- Variants: **Primary** (`primary` fill, `primary-foreground` text, `shadow-sm` resting / `shadow-md` + `primary-variant` fill on hover), **Outline** (transparent fill, 1px `primary` border, `primary` text, `surface` fill on hover).
- States: default, hover (scale 103%), pressed (scale 97%), disabled (60% opacity).
- Text style: `body`, weight 500.

### Tag
- Shape: fully round pill, 4px vertical / 12px horizontal padding.
- Fill: `primary` at 10% opacity. Border: `primary` at 20% opacity, 1px. Text: `primary`, `caption` style.

### Card (base pattern)
- Shape: `radius-lg` corners, 1px border at `foreground` 10% opacity, `card` fill.
- Padding: 16px (mobile) / 32px (desktop).
- This is the base every other component/section nests inside.

### ProjectCard
- Layout: horizontal split, image ~40% width / content 60%, alternates side per row.
- Image: `surface` fill behind it (letterboxing for non-matching aspect ratios).
- Content: `h3` title, `body` tagline in `muted-foreground`, up to 4 `Tag` chips, "Learn more →" in `primary` `body-sm` medium weight.
- Hover: image scales 105%, card shadow → `shadow-xl`.

### Navbar
- Shape: fully round pill container, `card` fill, 1px `foreground`-10% border, 6px padding.
- Link: `body-sm` medium weight, `muted-foreground` text, 8px/16px padding, fully round.
- Active link: `primary` fill, `primary-foreground` text.
- Hover (inactive): `surface` fill, `foreground` text.

### ThemeToggle
- Shape: 56×30px fully round track, `surface` fill (off) / `primary` fill (on).
- Thumb: 24×24px circle, `card` fill, sun icon (off) / moon icon (on), slides from left:2px to left:28px.

### FormField
- Label: `body-sm`, 500 weight, `foreground`.
- Input: `radius-md` corners, 1px `foreground`-10% border, `surface` fill, 12px/16px padding, `body` text.
- Focus: border → `primary`, 2px `primary`-30%-opacity outer glow.
- Submit button: the Button component, Primary variant, label swaps to "Sending…" + disabled while in flight.

### Icons
- 24×24 viewBox, 2px stroke, round caps/joins, `currentColor`.
- Set: Mail, Phone, MapPin, LinkedIn (filled), GitHub (filled), ExternalLink, ArrowLeft.

## Not synced

This is a manual extraction from the codebase at the commit noted above,
not an automated sync — if the live site's tokens or components change,
this file (and `figma-tokens.json`) need a manual refresh to match.
