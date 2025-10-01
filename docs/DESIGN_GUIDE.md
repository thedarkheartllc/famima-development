# Famima Design Guide

## Philosophy

**Garden-like. Peaceful. Welcoming.**

Design that feels like a calm walk in a garden—soft, safe, and naturally pleasant.

---

## Colors

**Reference**: All colors are defined in `src/app/styles/colors.ts` for consistency across the app.

### Primary

- **White** `#FFFFFF` - Background
- **Gray 900** `#111827` - Text, CTAs
- **Gray 700** `#374151` - Secondary text
- **Gray 600** `#4B5563` - Body text
- **Gray 500** `#6B7280` - Muted text

### Nature Palette (Earthy Accents)

- **Sky** - Soft blue, navigation buttons
- **Grass** - Fresh green, success states
- **Sand** - Warm amber, earth tones
- **Rose** - Gentle pink, soft highlights
- **Lavender** - Soft purple, calm accents
- **Ocean** - Teal tones, water elements
- **Water** - Clear blue, info states
- **Lime** - Fresh green, energy
- **Sunset** - Orange warmth, highlights
- **Cloud** - Soft gray, subtle backgrounds

### Gradients

```css
bg-gradient-to-b from-white to-green-50/30          /* Page backgrounds */
bg-gradient-to-br from-green-100 to-green-50        /* Placeholders */
bg-white/80 backdrop-blur-md                        /* Header */
```

---

## Typography

- **Font**: System default
- **Weight**: Primarily `font-light` (300)
- **Scale**: `text-5xl md:text-7xl` (hero) → `text-4xl md:text-5xl` (sections) → `text-lg` (body)
- **Line Height**: `leading-relaxed` for comfortable reading

---

## Spacing

- **Containers**: `max-w-6xl` (standard), `max-w-4xl` (narrow), `max-w-7xl` (wide)
- **Sections**: `py-20 px-6`
- **Vertical**: `space-y-6` (standard), `space-y-12` (generous), `space-y-16` (sections)
- **Grid gaps**: `gap-6` or `gap-12`

---

## Components

### Buttons

```jsx
// Primary CTA
className='px-12 py-4 bg-gray-900 text-white rounded-full
           font-light text-lg hover:bg-gray-800
           transition-all hover:scale-105 shadow-lg'

// Secondary Link
className='px-6 py-2 text-gray-700 hover:text-gray-900
           font-light transition-colors'
```

### Cards

```jsx
// Feature cards
className = "bg-green-50/50 rounded-2xl p-8";

// Content cards
className = "bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm";
```

### Logo/Icons

```jsx
<div
  className='w-10 h-10 bg-gradient-to-br from-green-100 
                to-green-200 rounded-full flex items-center justify-center'
>
  <span className='text-gray-700 font-light text-lg'>F</span>
</div>
```

---

## Layout Patterns

### Responsive Grids

```jsx
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6    /* Features */
grid grid-cols-1 lg:grid-cols-2 gap-12 items-center     /* Two-column */
```

### Breakpoints

- Mobile first (default)
- `md`: 768px - 2 columns
- `lg`: 1024px - 3-4 columns

---

## Effects

### Interactions

- **Buttons**: Scale 1.05 + darker shade
- **Links**: Color change only
- **Transitions**: `transition-all` or `transition-colors`

### Shadows & Borders

- **Cards**: `shadow-sm`
- **CTAs**: `shadow-lg`
- **Images**: `shadow-xl`
- **Borders**: `border-gray-100` (use sparingly)

---

## Icons

Use simple emojis: 🛡️ (safe) 🔒 (private) ✨ (simple) 🕊️ (peace) ✓ (yes) ✕ (no)

---

## Do's and Don'ts

### ✓ Do

- Use generous whitespace
- Keep interactions subtle
- Maintain soft, rounded corners
- Use light font weights
- Add gentle gradients

### ✕ Don't

- Use harsh black or bright colors
- Create aggressive animations
- Add unnecessary borders
- Use heavy fonts
- Create sharp corners on interactive elements

---

## Accessibility

- Maintain WCAG AA contrast standards
- Minimum touch target: 44x44px
- Clear hover states
- Semantic HTML

---

_A digital space that feels like a peaceful walk in a garden._
