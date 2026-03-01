# Arknights Fan Site

A fan-made React web application inspired by the official Arknights website (arknights.global). Built as an academic project using Vite, React Router, and Firebase Firestore.

## Description

This project is a multi-page fan site for the mobile strategy RPG Arknights, developed by Hypergryph and published globally by Yostar. It replicates the dark tactical aesthetic of the official site and includes the following:

- **Home page** — animated Silk canvas background, auto-rotating hero banner with state management, featured Operators preview, latest news section, and a download call-to-action. Accessible at both `/` and `/home`.
- **Operators page** — full operator roster with live filtering by class, rarity, and search query. Data is read from Firebase Firestore with a local JSON fallback.
- **News and RSS page** — news articles with category filtering and a curated list of RSS feed links relevant to the Arknights community.
- **Contact page** — Rhodes Island HQ location displayed via an OpenStreetMap iframe, address information, and a validated contact form with controlled state.


---

## Third-Party Components

| Component | Description | Link |
|---|---|---|
| React Bits — Silk | Animated canvas background using layered sine waves, used in the hero section and page headers | https://www.react-bits.dev/backgrounds/silk |
| Leaflet / OpenStreetMap | Embedded interactive map on the contact page via iframe | https://leafletjs.com |
| Font Awesome 6 | Icon library used for social media icons, UI elements, and navigation | https://fontawesome.com |
| Firebase Firestore | Cloud NoSQL database for operator data with real-time querying and category filtering | https://firebase.google.com/docs/firestore |
| Aceship Arknight-Images | Public GitHub CDN used for operator portrait images | https://github.com/Aceship/Arknight-Images |
| Google Fonts — Orbitron and Rajdhani | Display and body typefaces | https://fonts.google.com |

