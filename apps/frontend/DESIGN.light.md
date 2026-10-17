---
name: Developer Sandbox Light
colors:
  surface: "#faf9fd"
  surface-dim: "#dad9dd"
  surface-bright: "#faf9fd"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f4f3f7"
  surface-container: "#eeedf1"
  surface-container-high: "#e8e7eb"
  surface-container-highest: "#e3e2e6"
  on-surface: "#1a1b1f"
  on-surface-variant: "#3d4a3e"
  inverse-surface: "#2f3034"
  inverse-on-surface: "#f1f0f4"
  outline: "#6d7b6d"
  outline-variant: "#bccaba"
  surface-tint: "#006d33"
  primary: "#006d33"
  on-primary: "#ffffff"
  primary-container: "#47cf73"
  on-primary-container: "#00210b"
  inverse-primary: "#66ec8c"
  secondary: "#0061a4"
  on-secondary: "#ffffff"
  secondary-container: "#d1e4ff"
  on-secondary-container: "#001d35"
  tertiary: "#b5133f"
  on-tertiary: "#ffffff"
  tertiary-container: "#ffd9dc"
  on-tertiary-container: "#400011"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#410002"
  primary-fixed: "#77fd9b"
  primary-fixed-dim: "#59df81"
  on-primary-fixed: "#00210b"
  on-primary-fixed-variant: "#005224"
  secondary-fixed: "#d1e4ff"
  secondary-fixed-dim: "#9dcaff"
  on-secondary-fixed: "#001d35"
  on-secondary-fixed-variant: "#00497b"
  tertiary-fixed: "#ffd9dc"
  tertiary-fixed-dim: "#ffb2ba"
  on-tertiary-fixed: "#400011"
  on-tertiary-fixed-variant: "#910031"
  background: "#faf9fd"
  on-background: "#1a1b1f"
  surface-variant: "#e3e2e6"
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: "700"
    lineHeight: 34px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 18px
  code-editor:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system targets front-end developers, creative coders, and technical designers who need a frictionless, high-velocity workbench coupled with an inspiring social showcase. The identity prioritizes density, immediate feedback, and razor-sharp structural clarity.

The light variant is the daytime counterpart of Developer Sandbox Dark: the same panel-centric structure, spacing, radii and typography, translated into crisp paper-white surfaces with cool neutral grays. The emerald brand accent is preserved so both themes read as one product. The atmosphere stays quiet, utilitarian, and focused — user-generated code and live previews remain the visual heroes.

## Colors

The palette is anchored by clean, cool-neutral whites and light grays that keep long sessions comfortable without glare:

- **Canvas Background (`#F6F7F9`)**: Base viewport, outer frames, and canvas gutters.
- **Surface Panels (`#FFFFFF`)**: Elevated cards, editor gutter backgrounds, dropdown menus, and modal dialogs.
- **Surface Low / Muted (`#EEF0F3`)**: Editor tab bar tracks, unfocused panel areas, and sunken console outputs.
- **Borders & Dividers (`#D9DDE3`)**: Crisp structural bounding lines for panels, resizers, and segmented controls.
- **Text Hierarchy**: Primary (`#14161A`) for crisp readability, Secondary (`#4B5563`) for labels and active metadata, Muted (`#8A93A0`) for inactive tabs, placeholders, and line numbers.
- **Action Emerald (`#47CF73`)**: Reserved for high-value actions: "Run", "Save", "New Pen", and system health/success indicators. Text/icons on emerald fills use `#00210B`; emerald used as text or a thin line on light surfaces uses the deeper `#006D33` for AA contrast.
- **Syntactic & Functional Accents** (deepened from the dark theme for contrast on white):
  - HTML Tab: `#E5541B`
  - CSS Tab: `#0B7FD6`
  - JS Tab: `#D4A900`
  - Social Engagement (Likes / Hearts): `#E63758`

## Typography

Typography is identical to the dark theme and operates with a dual role:

- **Inter** handles high-level navigational chrome, dashboard exploration, card titles, and user metadata. It provides neutral, unadorned structural legibility at compact sizes.
- **JetBrains Mono** powers all technical contexts: the core editor surfaces, line counts, technical readouts, keyboard shortcut prompts, and metadata metrics (forks, views, revisions).

Scale is intentionally compact to preserve code viewport real estate. Tabular numerals and ligature rendering must remain active inside all `JetBrains Mono` implementations.

## Layout & Spacing

Layout in this design system is division-based and panel-centric.

- **Workspace Mode**: Employs a strict zero-margin boundary layout with flexible resizable panes (`grid` or split-view `flexbox`), governed by a minimal `4px` splitter gutter. Code editors and live preview viewports expand to 100% of their allocated split percentage.
- **Browse / Showcase Mode**: Uses a responsive fluid grid. Breakpoints trigger 1-column layouts on mobile (<768px), 2-column layouts on tablet (<1200px), and 3- to 4-column card layouts on desktop (>=1200px).
- **Internal Density**: Component padding adheres strictly to the `4px` base factor, leaning towards compact configurations (`space-xs` and `space-sm`) for toolbars, editor headers, and action bars, with wider breathing room (`space-lg`) reserved for public profiles and community feed headers.

## Elevation & Depth

Depth is defined primarily through subtle surface stepping and crisp 1px borders rather than heavy atmospheric shadows:

- **Level 0 (Base Canvas)**: Pure `#F6F7F9`, zero shadow. Houses structural gutter lines and window frames.
- **Level 1 (Editor Panes & Workspace Bars)**: `#EEF0F3` with a 1px solid `#D9DDE3` outer perimeter. Flat presentation.
- **Level 2 (Cards & Feed Surfaces)**: `#FFFFFF` encased with a 1px `#D9DDE3` border. Subtle directional elevation: `box-shadow: 0 4px 12px rgba(16, 24, 40, 0.08)`.
- **Level 3 (Dropdowns, Overlays & Dialogs)**: `#FFFFFF` with `box-shadow: 0 12px 32px rgba(16, 24, 40, 0.18)` alongside an accentuated border tint (`#C5CAD3`) to distinctly detach floating context menus from editor text.

## Shapes

The roundedness level is set to `2`.

- Standard inputs, buttons, and badges utilize `0.5rem` (`8px`) radii for a modern yet restrained appearance.
- Structural editor split panes and code window frames use `0.5rem` on exterior outer corners, while internal split divisions terminate at `0px` to maintain flush seam alignment.
- Avatars and status pills use full circular geometry (`9999px`).

## Components

### Buttons

- **Primary Action (Run / Save / New)**: Solid `#47CF73` fill with `#00210B` text, font weight 600, height 32px, `space-sm` horizontal padding, 8px radius. Hover state: brightness 94%. Active state: scale 0.98.
- **Secondary (Fork / View Mode)**: `#FFFFFF` surface, 1px `#D9DDE3` border, `#14161A` text. Hover: `#EEF0F3` background.
- **Ghost / Icon (Heart / Settings)**: Transparent surface, `#4B5563` icons. Hover: `#EEF0F3` surface with primary text color. Active like state changes icon to `#E63758` with a gentle pop scale transition.

### Editor Language Tabs

- Height 36px, muted surface `#EEF0F3`, uppercase 11px Inter label with 1px tracking.
- Active tab gains a solid top indicator bar (2px height) colored via language token:
  - HTML: `#E5541B`
  - CSS: `#0B7FD6`
  - JS: `#D4A900`
- Tab background shifts to `#FFFFFF` when active, seamlessly merging into the code canvas.

### Input Fields & Search

- Background: `#FFFFFF`, 1px solid border `#D9DDE3`, text `#14161A`, placeholder `#8A93A0`.
- Focus ring: 1px solid `#006D33` with a zero-offset outline glow (`box-shadow: 0 0 0 2px rgba(71, 207, 115, 0.3)`).
- Typography: `JetBrains Mono` 13px for code/filter inputs; `Inter` 13px for social query fields.

### Cards (Pens & Projects)

- Container: Surface `#FFFFFF`, 1px border `#D9DDE3`, 8px radius.
- Includes a 16:9 preview viewport with an embedded sandbox iframe or static render thumbnail, framed with an inset bottom border (`#D9DDE3`).
- Footer block: 40px height, flex row containing creator avatar (24px circle), pen title (`Inter` 13px, bold), like counter with `#E63758` SVG icon, and view counter (`JetBrains Mono` 11px).

### Console & Terminal Drawer

- Sunken panel in `#EEF0F3` with top border `#D9DDE3`.
- Console output lines formatted via `JetBrains Mono` 12px, standard output in `#4B5563`, errors in `#E63758`, warnings in `#B58900`, and system execution metrics in `#006D33`.
