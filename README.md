# Atyrau detailing studio — sales demo

Personalized adaptation of the existing Apex detailing site. Apex was read and copied selectively; its working directory and Git history were not modified. Next.js App Router, Tailwind, Oswald/Manrope and Framer Motion are retained. No backend or booking system.

## Verified public information — 11 October 2026

Primary sources:
- https://2gis.kz/atyrau/firm/70000001054815561
- https://2gis.kz/atyrau/gallery/firm/70000001054815561
- https://www.instagram.com/atyrau_detailing_studio01/

Live 2GIS: Atyrau detailing studio; проспект Зейноллы Кабдолова, 68а, Атырау; +7 778 681 19 11; WhatsApp destination wa.me/77786811911. Monday–Saturday 10:00–19:00, lunch 13:00–14:00, Sunday closed. Rating 4.9, 102 ratings, 43 reviews. These are a dated snapshot, not live data.

The 2GIS business card's advertised service carousel displayed: шумоизоляция from 280,000 ₸; химчистка from 30,000 ₸; полировка from 80,000 ₸; пошив и перешив салона from 60,000 ₸; бронирование кузова from 200,000 ₸; антихром from 7,000 ₸. No per-car or per-element units were added. The dedicated prices tab returned an error, so these six prices are sourced from the business card, not that tab. Avtovinyl/PPF/sound insulation/antichrome are also explicitly listed in the public Instagram bio; no public vinyl price was verified.

Instagram was accessible in the browser after its initial login overlay. Its public name is ДЕТЕЙЛИНГ ЦЕНТР АТЫРАУ. The profile logo and public service categories were inspected. Account highlights also show polishing, body protection and upholstery. No certifications, brands-as-partners, guarantees, branch counts, business age, review quotes or invented testimonials are presented.

Only the currently confirmed +7 778 number is used; older search indexes mention a second +7 707 number, which was not added.

## Media provenance

- `public/images/business/logo.jpg`: Instagram public profile image, 150×150; used at 44px, never enlarged as a hero.
- `public/images/business/bmw.jpg`: https://i7.photo.2gis.com/images/branch/0/30258560116041694_8ff4.jpg — 1170×658, red branded BMW.
- `public/images/business/vinyl-green.jpg`: https://i3.photo.2gis.com/images/branch/0/30258560080011004_74de.jpg — 828×1472.
- `public/images/business/vinyl-purple.jpg`: https://i4.photo.2gis.com/images/branch/0/30258560080010789_0271.jpg — 828×1472.
- Hero and contact cinematic images retained from Apex are illustrative; the site explicitly labels them as not studio work. Service stock images are also labelled illustrative. Existing stock-gallery sources remain documented in `public/images/detailing/gallery/SOURCES.md` but are not used as a business portfolio.

The public business gallery establishes association with the studio; no unsupported specific treatment, result, owner or vehicle project date is claimed.

## Development

```
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

A patched Next 15 runtime replaces the older Apex Next 14 version. PostCSS/source-map-js overrides address inherited runtime audit findings. No generated backend, auth, database or complex scheduler.

## QA coverage

Desktop 1440×960; mobile 390×844 and 320×844. Hero crops, all six following sections, services, price category full cycle, mobile menu open/close/Escape/anchor navigation, reduced motion, internal anchors, image loading, console/page errors, and destination URLs for WhatsApp, phone, Instagram, map and reviews. Screenshots/report are local in ignored `qa/`.

Links open existing business destinations; no test message or call was sent. A successful link check does not confirm that the business answers, price availability or appointment availability.

Demo is explicitly marked as a demonstration and uses noindex metadata.
