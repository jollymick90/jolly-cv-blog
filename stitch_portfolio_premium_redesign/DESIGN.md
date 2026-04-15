# Design System Specification: The Technical Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Blueprint"**

This design system is engineered for high-performance technical environments where information density is a requirement, not a drawback. Unlike "consumer" dark modes that rely on heavy shadows and vibrant pops of color, this system adopts a **Structural Precision** aesthetic. It draws inspiration from high-end IDEs, CAD software, and aerospace consoles.

The goal is to create an interface that feels like a precision instrument. We achieve this through "The Digital Blueprint" philosophy: intentional asymmetry, high-contrast typographic scales, and a departure from traditional "boxed" layouts in favor of an architectural, layered grid. We are moving away from the "template" look by treating the UI as a single, cohesive schematic where every pixel serves a functional purpose.

---

## 2. Colors & Surface Logic

### The Deep Sea Palette
The foundation is built on `#0b1326` (Surface/Background), providing a deeper, more atmospheric base than standard charcoals.

*   **Primary (Architectural Focus):** `primary` (#bec6e0) and `primary_container` (#0f172a). Used for structural elements and core actions.
*   **Secondary (Structural Support):** `secondary` (#b9c7e0) used for utility-based interactions.
*   **Tertiary (Cyber Lime Highlights):** `tertiary` (#b3d17a). This is our "High-Tech" signal. Use it sparingly for success states, active code snippets, or critical data points.

### The "No-Line" Rule
To maintain a high-end feel, **1px solid borders are prohibited for sectioning.** 
Standard interfaces rely on lines to separate content; this system relies on **Tonal Shifts**. 
- To separate a sidebar from a main view, use `surface_container_low` against `surface`.
- To define a code block, use `surface_container_highest` against `surface_container`.
Boundary definition must be felt through color depth, not drawn with lines.

### Glass & Gradient Logic
While the system is "flat" in its engineering roots, we use **Linear Refraction** to add soul. 
- **CTAs:** Use a subtle gradient from `primary` to `primary_container`.
- **Floating Panels:** Apply a `backdrop-blur` (12px-20px) to `surface_container` with 80% opacity. This prevents the UI from feeling "heavy" despite the dark theme.

---

## 3. Typography

The typographic system is a dialogue between **Technical Data** and **Architectural Authority**.

| Level | Token | Font Family | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | High-impact, modern, bold. |
| **Headline** | `headline-md`| Plus Jakarta Sans | 1.75rem | Clear, authoritative sectioning. |
| **Title** | `title-md` | Inter | 1.125rem | Semi-bold, highly legible. |
| **Body** | `body-md` | Inter | 0.875rem | Optimized for dense documentation. |
| **Label** | `label-sm` | Inter | 0.6875rem | All-caps, tracked out for metadata. |

**Editorial Note:** Use `Plus Jakarta Sans` for headers to provide a "branded" feel. Switch to `Inter` for all functional data, inputs, and code-adjacent content to maintain a high-efficiency reading rhythm.

---

## 4. Elevation & Depth: Tonal Layering

We reject the "Material" drop shadow. In this system, depth is a product of **Luminance Stacking**.

*   **The Layering Principle:** 
    *   **Level 0 (Base):** `surface` (#0b1326) - The canvas.
    *   **Level 1 (Sub-sections):** `surface_container_low` (#131b2e) - For sidebar or footer regions.
    *   **Level 2 (Cards/Modules):** `surface_container` (#171f33) - The primary content container.
    *   **Level 3 (Popovers/Modals):** `surface_bright` (#31394d) - To simulate light hitting the highest surface.

*   **The Ghost Border:** If a visual anchor is required for accessibility, use a "Ghost Border": `outline_variant` (#45464d) at **15% opacity**. It should be barely perceptible, serving as a suggestion of a boundary rather than a hard stop.

*   **Ambient Shadows:** For modals only, use a shadow with a 40px blur, 0px offset, and 6% opacity, tinted with `primary` (#bec6e0) to mimic the glow of a high-end monitor.

---

## 5. Components

### Buttons & Inputs
*   **Primary Button:** `primary` background with `on_primary` text. Radius: `md` (0.375rem). No shadow.
*   **Tertiary Action:** No background. `tertiary` (#b3d17a) text with a `label-md` weight. Used for "Run," "Deploy," or "Execute."
*   **Input Fields:** Use `surface_container_lowest` for the field background. The active state is a 1px "Ghost Border" using the `tertiary` color to provide that "Cyber Lime" high-tech highlight.

### Data Displays (High Density)
*   **Lists:** Forbid divider lines. Use `surface_container_low` on hover states and 16px of vertical padding (`spacing-4`) to create breathing room between data rows.
*   **Chips:** Use `secondary_container` with `on_secondary_container` text. Keep corners sharp (`sm`: 0.125rem) to reinforce the "Blueprint" aesthetic.

### Navigation (The Sidebar)
*   The sidebar should be `surface_container_low`. Active items should not use a background pill; instead, use a vertical 2px "indicator" of `tertiary` (#b3d17a) on the far left of the item.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace high information density. Technical users prefer seeing more data over excessive "white space."
*   **Do** use `tertiary` (Cyber Lime) only for functional status (Active, Online, Success, New).
*   **Do** use intentional asymmetry. For example, a wide main content area with a very narrow, data-dense right-hand utility rail.

### Don’t:
*   **Don't** use standard #000000 shadows. They muddy the `Deep Sea` navy.
*   **Don't** use rounded corners larger than `xl` (0.75rem). Stay within `sm` to `md` for a precision-engineered look.
*   **Don't** use dividers. If you feel the need to add a line, ask if a 4px shift in background color can achieve the same goal.
*   **Don't** use icons without labels in primary navigation. This is a system for clarity, not mystery.

---

**Director's Closing Note:** 
This system is a tool for experts. It should feel as quiet and powerful as a server room. Every element should feel "bolted down" and intentional. When in doubt, lean into the navy tones and let the typography do the heavy lifting.