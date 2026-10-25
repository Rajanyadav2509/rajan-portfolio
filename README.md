# Rajan Yadav Portfolio (Node + Express)

## Run
1. `npm install`
2. `cp .env.example .env` and set **ADMIN_PASSWORD** (and SITE_URL for your domain)
3. `npm start` then open http://localhost:3000

- Portfolio: `/`  |  Hidden admin panel: `/admin` (not linked anywhere, noindex, blocked in robots.txt)
- Contact form posts to `/api/contact`; messages are saved in `data/messages.json`.
- Premium admin dashboard at `/admin` (see below).

## Deploy
Use any Node host (Render, Railway, VPS). Use a persistent disk for `data/`. Serve over HTTPS.

## Edit
- Text/SEO tags: `public/index.html`; carousel/YouTube data: `public/js/app.js`.
- Add your LinkedIn profile URL as a link in the contact section (not in the source files, so I left it out).

## Features added
- Glowing WhatsApp chat button (bottom right) + WhatsApp link in Contact (number: 7905040238, edit in `public/index.html`)
- Circular logo in the menu, footer, favicon and social preview image (`public/images/logo-*.png`, `og-logo.jpg`)
- Scroll animations: word-by-word headline, staggered reveals, image wipes, drawing timeline, count-up numbers, cursor spotlight on cards, magnetic buttons, floating hero particles, back-to-top button
- Client strip that always scrolls right to left (also when "reduce motion" is on)
- Clickable YouTube pack chips that jump to the matching channel card
- Richer client cards with floating metric badges, service chips and jump buttons
- CSS/JS URLs are versioned automatically on each server start, so browsers never show stale files

## Admin dashboard (`/admin`)
- **Dashboard:** message KPIs, page views, visitors, WhatsApp clicks and resume downloads, traffic chart (7/30/90 days), leads by service, lead pipeline, top sources, device split, recent messages
- **Messages:** search, filters (unread, starred, status), service filter, star, bulk select/delete, status pipeline (New, In progress, Replied, Closed), private notes (autosave), reply by email or WhatsApp, copy email
- **Settings:** availability badge and announcement bar for your public site (live instantly), CSV export and full JSON backup
- Dark mode, mobile friendly, auto-refresh with a "new message" toast, unread count in the browser tab title
- Visitor tracking is privacy friendly: only counts, no IP addresses or personal data are stored (`data/analytics.json`). Optional `TZ_NAME` in `.env` sets the timezone for daily stats (default Asia/Kolkata).
