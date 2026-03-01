# Arknights Fan Site

A fan-made React web application inspired by the official Arknights website (arknights.global). Built as an academic project using Vite, React Router, and Firebase Firestore.

---

## Table of Contents

- [Description](#description)
- [Third-Party Components](#third-party-components)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Firebase Setup](#firebase-setup)
- [Git Branching Strategy](#git-branching-strategy)
- [Naming Conventions](#naming-conventions)
- [Design Reference](#design-reference)
- [Tutorials and References](#tutorials-and-references)

---

## Description

This project is a multi-page fan site for the mobile strategy RPG Arknights, developed by Hypergryph and published globally by Yostar. It replicates the dark tactical aesthetic of the official site and includes the following:

- **Home page** — animated Silk canvas background, auto-rotating hero banner with state management, featured Operators preview, latest news section, and a download call-to-action. Accessible at both `/` and `/home`.
- **Operators page** — full operator roster with live filtering by class, rarity, and search query. Data is read from Firebase Firestore with a local JSON fallback.
- **News and RSS page** — news articles with category filtering and a curated list of RSS feed links relevant to the Arknights community.
- **Contact page** — Rhodes Island HQ location displayed via an OpenStreetMap iframe, address information, and a validated contact form with controlled state.

All pages share the same Header and Footer components and are fully responsive using Flexbox and CSS media queries.

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

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/arknights-app.git

# Navigate into the project
cd arknights-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at:

```
http://localhost:5173
http://localhost:5173/home
```

---

## Project Structure

```
arknights-app/
├── public/
│   └── ark-logo.svg
├── src/
│   ├── assets/
│   │   └── operators-data.js
│   ├── components/
│   │   ├── footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── hero-section/
│   │   │   ├── HeroSection.jsx
│   │   │   └── HeroSection.css
│   │   ├── news-card/
│   │   │   ├── NewsCard.jsx
│   │   │   └── NewsCard.css
│   │   ├── operator-card/
│   │   │   ├── OperatorCard.jsx
│   │   │   └── OperatorCard.css
│   │   ├── operators-grid/
│   │   │   ├── OperatorsGrid.jsx
│   │   │   └── OperatorsGrid.css
│   │   └── silk-background/
│   │       ├── SilkBackground.jsx
│   │       └── SilkBackground.css
│   ├── hooks/
│   │   └── useOperators.js
│   ├── pages/
│   │   ├── contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.css
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── news/
│   │   │   ├── News.jsx
│   │   │   └── News.css
│   │   └── operators/
│   │       ├── Operators.jsx
│   │       └── Operators.css
│   ├── firebase-config.js
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` and `/home` | Home | Hero slideshow, operators preview, news preview, download CTA |
| `/operators` | Operators | Full roster with Firebase search by class, rarity, and name |
| `/news` | News and RSS | Articles with category filter and RSS feed links |
| `/contact` | Contact | HQ map, address details, and contact form |

---

## Firebase Setup

1. Go to the Firebase Console (https://console.firebase.google.com) and create a project.
2. Enable Firestore Database in Native mode.
3. Create a collection called `operators` with documents matching the schema in `src/assets/operators-data.js`.
4. Copy your project configuration and replace the placeholder values in `src/firebase-config.js`.

If Firebase is not configured, the application falls back to the local data in `src/assets/operators-data.js` automatically.

---

## Git Branching Strategy

This project follows the branching model described at https://nvie.com/posts/a-successful-git-branching-model

| Branch | Purpose |
|---|---|
| `main` | Production-ready version, always showable |
| `develop` | Integration branch where features are merged |
| `feature/first-delivery` | Archived snapshot of the first project delivery |
| `feature/second-delivery` | Feature branch for the second delivery |

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Folders | kebab-case | `hero-section/` |
| Component files | PascalCase | `HeroSection.jsx` |
| CSS files | PascalCase | `HeroSection.css` |
| CSS classes and ids | kebab-case | `hero__section-title` |
| JavaScript variables | camelCase | `activeSlide` |
| Boolean variables | is / has prefix | `isLoading`, `hasError` |
| JavaScript utility files | kebab-case | `operators-data.js` |
| Routes | kebab-case | `/news`, `/contact` |

---

## Design Reference

The visual design is based on the official Arknights website and the following Figma community resource:

- Official site: https://arknights.global
- Figma community reference: https://www.figma.com/community/search?resource_type=files&q=arknights

---

## Tutorials and References

- README template: https://github.com/othneildrew/Best-README-Template
- Git branching model: https://nvie.com/posts/a-successful-git-branching-model
- React Router documentation: https://reactrouter.com/en/main
- Firebase Firestore documentation: https://firebase.google.com/docs/firestore/query-data/get-data
- React Bits Silk component: https://www.react-bits.dev/backgrounds/silk
- Leaflet.js documentation: https://leafletjs.com
- Web image optimization guide: https://www.shopify.com/es/blog/imagenes-para-web-tamano
- Clean code principles: https://www.hostgator.mx/blog/clean-code-codigo-limpio
- UX evaluation guide: https://woko.agency/blog/monitorizar-evaluar-experiencia-usuario

---

This is a fan project created for educational purposes. Arknights, all characters, logos, and assets are the property of Hypergryph and Yostar.
