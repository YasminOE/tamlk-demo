# Tamlk Design System

Brand-aligned design tokens for the Tamlk demo dashboard, derived from [tamlk.net](https://tamlk.net) and the signup/onboarding Figma screens.

## Brand Essence

- **Tone:** Trustworthy, Sharia-compliant, modern Saudi fintech
- **Palette:** Teal primary with warm sand/beige accents — not corporate navy
- **Shape:** Generous border radii (`rounded-xl`, `rounded-2xl`), soft shadows
- **Layout:** Clean whitespace, bilingual labels (Arabic / English)

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `teal` | `#0D7C7C` | Primary actions, active nav, key metrics |
| `teal-mid` | `#0F9A9A` | Section headings, links, chart accents |
| `teal-dark` | `#0A6464` | Table headers, demo bar, deep accents |
| `teal-light` | `#E6F4F4` | Icon backgrounds, subtle highlights |
| `sand` | `#E8DCC4` | Secondary surfaces, step indicators |
| `cream` | `#FAF7F2` | Page background |
| `surface` | `#FFFFFF` | Cards, modals |
| `border` | `#E5E0D8` | Dividers, input borders |
| `text` | `#1A1A1A` | Primary text |
| `muted` | `#78716C` | Secondary text |
| `success` | `#16A34A` | Positive states |
| `warning` | `#D97706` | Reminders |
| `alert` | `#C0504D` | Errors, delinquent |

## Typography

- **Display / UI:** Plus Jakarta Sans — clean, professional, matches signup screens
- **Weights:** 400 body, 500 labels, 600 headings, 700 hero values

## Components

- **Stat cards:** White surface, warm border, teal left accent bar, teal-light icon pill
- **Sidebar:** Cream-tinted background, teal active state with soft shadow
- **Header:** Teal gradient (`teal` → `teal-dark`), Tamlk logo mark (overlapping circles)
- **Tables:** `teal-dark` header row, cream hover on body rows
- **Charts:** Teal fill with 15% opacity, dashed projected lines in `teal-mid`

## Signup Screen Parity

The onboarding flow uses:
- Split layout with teal-to-sand gradient panel
- Step pills with numbered teal circles
- Rounded inputs with warm grey borders
- Primary CTA: solid teal button, white label

Dashboard should feel like the natural next step after signup — same colors, same radii, same warmth.
