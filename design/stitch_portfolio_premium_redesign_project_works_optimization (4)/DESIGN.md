# Design System Strategy: The Technical Manuscript

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Whitepaper"**
This design system moves away from the "app-like" density of traditional SaaS tools and toward the authoritative, spacious aesthetic of a modern engineering whitepaper. It is designed to feel like a living document—precise, academic, and intellectually rigorous.

To break the "standard template" feel, this system leans into **Intentional Asymmetry**. We favor large, disciplined gutters on one side of the layout to allow for marginalia or "technical callouts." The experience should feel curated and intentional, where every pixel serves a structural or informative purpose. High-tech is signaled not through neon or clutter, but through extreme typographic precision and "Cyber Lime" accents that act as digital highlighters on a sophisticated off-white canvas.

---

## 2. Colors: Tonal Rigor & The No-Line Rule
The palette is rooted in `surface` (#faf8ff), a cool, clinical off-white that prevents eye fatigue while maintaining a "high-tech" sterile quality.

### The "No-Line" Rule
**Traditional 1px borders are strictly prohibited for layout sectioning.** 
Structural integrity is achieved through "Tonal Shifts." To separate a sidebar from a main content area, do not draw a line. Instead, shift the background from `surface` to `surface-container-low` (#f2f3ff).

### Surface Hierarchy & Nesting
Treat the UI as a series of technical layers. Use the following hierarchy to create depth:
*   **Base:** `surface` (#faf8ff)
*   **Sectioning:** `surface-container-low` (#f2f3ff) for secondary zones.
*   **Active Elements:** `surface-container-lowest` (#ffffff) for the "brightest" focus areas, such as a code editor or a primary manuscript view.
*   **Nesting:** When a component sits inside a container, use `surface-container` (#eaedff) to define its "slot" in the engineering grid.

### Signature Accents
*   **Cyber Lime (`tertiary` #465a00):** Use sparingly as a "highlighter" for data points, active status indicators, or critical technical metadata.
*   **Electric Blue (`primary` #0046c9):** Reserved for primary actions and navigation. Use the `primary-container` (#005bff) for subtle gradients in hero sections to provide "visual soul."

---

## 3. Typography: The Editorial Scale
We pair **Space Grotesk** (a high-tech, geometric sans) with **Public Sans** (a neutral, legible workhorse) to create a "Technical Journal" hierarchy.

*   **Display & Headlines (Space Grotesk):** These should feel architectural. Use `display-lg` (3.5rem) with tighter letter-spacing for a "masthead" feel. Headlines use `headline-md` (1.75rem) to introduce new technical chapters.
*   **Body (Public Sans):** All long-form reading uses `body-lg` (1rem). The line height must be generous (1.6x) to mimic academic journals. 
*   **Labels & Metadata (Space Grotesk):** Use `label-md` (0.75rem) in all-caps for technical labels, timestamps, or versioning. This creates a "blueprinted" look against the softer body text.

---

## 4. Elevation & Depth: Tonal Layering
In a "Digital Whitepaper," shadows are rare; layering is everything.

*   **The Layering Principle:** Depth is achieved by stacking. A card in `surface-container-lowest` (#ffffff) sitting on a `surface-container-low` (#f2f3ff) background provides all the "lift" required.
*   **Ambient Shadows:** If an element must float (like a context menu), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(19, 27, 46, 0.06)`. The shadow color is derived from `on-surface` (#131b2e), ensuring it feels like a natural obstruction of light rather than a "drop shadow."
*   **Glassmorphism:** For top navigation bars or floating action panels, use `surface` at 80% opacity with a `backdrop-blur: 12px`. This maintains the "high-tech" feel by allowing content to ghost underneath as the user scrolls.
*   **Ghost Borders:** If accessibility requires a border, use `outline-variant` (#c3c5d9) at **15% opacity**. This creates a "trace line" rather than a hard boundary.

---

## 5. Components: Precision Primitives

### Buttons
*   **Primary:** Solid `primary` (#0046c9) with `on-primary` (#ffffff) text. Use the `sm` (0.125rem) radius for a sharper, more engineered feel.
*   **Tertiary (The "Highlighter"):** A `tertiary-fixed` (#c3f400) background with `on-tertiary-fixed` (#161e00) text. Use this for "Run Analysis" or "Execute" buttons.

### Cards & Lists
*   **Strict Rule:** No dividers. Use 32px or 48px of vertical whitespace from the spacing scale to separate entries. 
*   **Interaction:** On hover, a list item should shift its background color to `surface-container-high` (#e2e7ff).

### Input Fields
*   **Style:** Minimalist. No background fill—only a 1px "Ghost Border" at the bottom of the field. When focused, the border transitions to a 2px `primary` blue.
*   **Labels:** Always use `label-md` (Space Grotesk) positioned strictly above the input, never as a placeholder.

### Technical Callouts (New Component)
*   Used for engineering notes. A `surface-container-highest` (#dae2fd) box with a 4px left-accent border of `tertiary` (Cyber Lime). This breaks the "no-line" rule intentionally to draw the eye to critical data.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Whitespace:** Treat "empty" space as a functional component. It represents clarity and focus.
*   **Use Mono-spacing for Numbers:** Where possible, use monospaced fonts for data tables to maintain the "Engineering Report" aesthetic.
*   **Align to a Rigid Grid:** While layouts are asymmetrical, elements must be snapped to a strict 8px grid.

### Don't:
*   **Don't use 100% Black:** Always use `on-surface` (#131b2e) for text. Pure black is too harsh for the "Manuscript" vibe.
*   **Don't use Large Radii:** Avoid `xl` or `full` rounded corners for functional UI. Stick to `sm` (0.125rem) or `none` to maintain a professional, sharp-edged look.
*   **Don't Over-Animate:** Transitions should be "Snappy" (200ms ease-out). Avoid "bouncy" or playful motions; the system should feel precise and mechanical.