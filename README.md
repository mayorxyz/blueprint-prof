# Babalola Mayor Timileyin — Portfolio

A personal portfolio site built with the "Blueprint Dark" design system — a precision engineering drawing aesthetic.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- @fontsource (Space Grotesk + JetBrains Mono)
- EmailJS (optional)

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Deploy — no special config needed

## Environment Variables (Optional)

For the contact form to send via EmailJS, create a `.env` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

If these are not set, the form falls back to opening a `mailto:` link.

## Where to Edit Content

All text, projects, and data live in `src/content.ts`. Edit that file to update:
- Personal info and links
- Project descriptions and links
- Stack/skills
- Process steps
- Contact information

## Assets

- `public/resume.pdf` — Drop your actual resume PDF here
- `public/og-image.png` — Open Graph image (1200×630 recommended)
- `public/favicon.svg` — Amber square with "M"

## Design System

The "Blueprint Dark" theme uses:
- Deep navy background (`#0A1220`)
- Amber accent (`#FFB020`) used sparingly (~5%)
- Blueprint grid background (CSS only, no images)
- Sharp corners everywhere
- Corner crosshair ticks on cards
- Engineering drawing title blocks
- Mono labels for metadata

Light mode ("Blueprint Paper") is available via the toggle in the header.
