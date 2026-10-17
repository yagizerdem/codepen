---
name: Developer Sandbox Dark
colors:
  surface: "#121316"
  surface-dim: "#121316"
  surface-bright: "#38393c"
  surface-container-lowest: "#0d0e11"
  surface-container-low: "#1b1b1f"
  surface-container: "#1f1f23"
  surface-container-high: "#292a2d"
  surface-container-highest: "#343538"
  on-surface: "#e3e2e6"
  on-surface-variant: "#bccaba"
  inverse-surface: "#e3e2e6"
  inverse-on-surface: "#2f3034"
  outline: "#879486"
  outline-variant: "#3d4a3e"
  surface-tint: "#59df81"
  primary: "#66ec8c"
  on-primary: "#003917"
  primary-container: "#47cf73"
  on-primary-container: "#005425"
  inverse-primary: "#006d33"
  secondary: "#9dcaff"
  on-secondary: "#003257"
  secondary-container: "#2295ee"
  on-secondary-container: "#002b4c"
  tertiary: "#ffc3c9"
  on-tertiary: "#670021"
  tertiary-container: "#ff9aa7"
  on-tertiary-container: "#930032"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
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
  background: "#121316"
  on-background: "#e3e2e6"
  surface-variant: "#343538"
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

The visual style blends dark IDE minimalism with functional modular panels. High-contrast surfaces separate active code editing contexts from social discovery elements, while restrained vivid emerald accents signal positive execution, primary creation triggers, and compilation state. The atmosphere is quiet, utilitarian, and focused—ensuring user-generated code and live previews remain the visual heroes.

## Colors

The palette is anchored by deep, non-distracting charcoal and obsidian tones designed to reduce eye strain during prolonged sessions:

- **Canvas Background (`#131417`)**: Base viewport, outer frames, and canvas gutters.
- **Surface Panels (`#1E1F26`)**: Elevated cards, editor gutter backgrounds, dropdown menus, and modal dialogs.
- **Surface Low / Muted (`#18191E`)**: Editor tab bar tracks, unfocused panel areas, and sunken console outputs.
- **Borders & Dividers (`#2C303A`)**: Crisp structural bounding lines for panels, resizers, and segmented controls.
- **Text Hierarchy**: Primary (`#FFFFFF`) for crisp readability, Secondary (`#9CA3AF`) for labels and active metadata, Muted (`#6B7280`) for inactive tabs, placeholders, and line numbers.
- **Action Emerald (`#47CF73`)**: Reserved for high-value actions: "Run", "Save", "New Pen", and system health/success indicators.
- **Syntactic & Functional Accents**:
  - HTML Tab: `#FF6B35`
  - CSS Tab: `#2B9AF3`
  - JS Tab: `#F7DF1E`
  - Social Engagement (Likes / Hearts): `#FF5376`

## Typography

Typography operates with a dual role:

- **Inter** handles high-level navigational chrome, dashboard exploration, card titles, and user metadata. It provides neutral, unadorned structural legibility at compact sizes.
- **JetBrains Mono** powers all technical contexts: the core editor surfaces, line counts, technical readouts, keyboard shortcut prompts, and metadata metrics (forks, views, revisions).

Scale is intentionally compact to preserve code viewport real estate. Tabular numerals and ligature rendering must remain active inside all `JetBrains Mono` implementations.

## Layout & Spacing

Layout in this design system is division-based and panel-centric.

- **Workspace Mode**: Employs a strict zero-margin boundary layout with flexible resizable panes (`grid` or split-view `flexbox`), governed by a minimal `4px` splitter gutter. Code editors and live preview viewports expand to 100% of their allocated split percentage.
- **Browse / Showcase Mode**: Uses a responsive fluid grid. Breakpoints trigger 1-column layouts on mobile (<768px), 2-column layouts on tablet (<1200px), and 3- to 4-column card layouts on desktop (>=1200px).
- **Internal Density**: Component padding adheres strictly to the `4px` base factor, leaning towards compact configurations (`space-xs` and `space-sm`) for toolbars, editor headers, and action bars, with wider breathing room (`space-lg`) reserved for public profiles and community feed headers.

## Elevation & Depth

Depth is defined primarily through low-contrast surface stepping and crisp 1px borders rather than heavy atmospheric shadows:

- **Level 0 (Base Canvas)**: Pure `#131417`, zero shadow. Houses structural gutter lines and window frames.
- **Level 1 (Editor Panes & Workspace Bars)**: `#18191E` with a 1px solid `#2C303A` outer perimeter. Flat presentation.
- **Level 2 (Cards & Feed Surfaces)**: `#1E1F26` encased with a 1px `#2C303A` border. Subtle directional elevation: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35)`.
- **Level 3 (Dropdowns, Overlays & Dialogs)**: `#1E1F26` with `box-shadow: 0 12px 32px rgba(0, 0, 0, 0.65)` alongside an accentuated border tint (`#3B404D`) to distinctly detach floating context menus from editor text.

## Shapes

The roundedness level is set to `2`.

- Standard inputs, buttons, and badges utilize `0.5rem` (`8px`) radii for a modern yet restrained appearance.
- Structural editor split panes and code window frames use `0.5rem` on exterior outer corners, while internal split divisions terminate at `0px` to maintain flush seam alignment.
- Avatars and status pills use full circular geometry (`9999px`).

## Components

### Buttons

- **Primary Action (Run / Save / New)**: Solid `#47CF73` fill with `#131417` text, font weight 600, height 32px, `space-sm` horizontal padding, 8px radius. Hover state: brightness 108%. Active state: scale 0.98.
- **Secondary (Fork / View Mode)**: `#1E1F26` surface, 1px `#2C303A` border, `#FFFFFF` text. Hover: `#2C303A` background.
- **Ghost / Icon (Heart / Settings)**: Transparent surface, `#9CA3AF` icons. Hover: `#18191E` surface with primary text color. Active like state changes icon to `#FF5376` with a gentle pop scale transition.

### Editor Language Tabs

- Height 36px, muted surface `#18191E`, uppercase 11px Inter label with 1px tracking.
- Active tab gains a solid top indicator bar (2px height) colored via language token:
  - HTML: `#FF6B35`
  - CSS: `#2B9AF3`
  - JS: `#F7DF1E`
- Tab background shifts to `#1E1F26` when active, seamlessly merging into the code canvas.

### Input Fields & Search

- Background: `#18191E`, 1px solid border `#2C303A`, text `#FFFFFF`, placeholder `#6B7280`.
- Focus ring: 1px solid `#47CF73` with a zero-offset outline glow (`box-shadow: 0 0 0 2px rgba(71, 207, 115, 0.2)`).
- Typography: `JetBrains Mono` 13px for code/filter inputs; `Inter` 13px for social query fields.

### Cards (Pens & Projects)

- Container: Surface `#1E1F26`, 1px border `#2C303A`, 8px radius.
- Includes a 16:9 preview viewport with an embedded sandbox iframe or static render thumbnail, framed with an inset bottom border (`#2C303A`).
- Footer block: 40px height, flex row containing creator avatar (24px circle), pen title (`Inter` 13px, bold), like counter with `#FF5376` SVG icon, and view counter (`JetBrains Mono` 11px).

### Console & Terminal Drawer

- Sunken panel in `#131417` with top border `#2C303A`.
- Console output lines formatted via `JetBrains Mono` 12px, standard output in `#9CA3AF`, errors in `#FF5376`, warnings in `#F7DF1E`, and system execution metrics in `#47CF73`.
