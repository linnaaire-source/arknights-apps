# Arknights Fan Site

![Arknights Fan Site](https://raw.githubusercontent.com/Aceship/Arknight-Images/main/ui/mission/achivement_bg.png)

> A fan-made React web application inspired by the official Arknights website. Built as an academic project using Vite, React Router, and Firebase.

[![Firebase Hosting](https://img.shields.io/badge/Live-Firebase%20Hosting-orange?logo=firebase)](https://arknights-8d51f.web.app)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev)

---

## 🔗 Live Demo

**[https://arknights-8d51f.web.app](https://arknights-8d51f.web.app)**

---

## 📄 Description

This project is a multi-page fan site for the mobile strategy RPG **Arknights**, developed by Hypergryph and published globally by Yostar. It replicates the dark tactical aesthetic of the official site and includes the following pages:

- **Home page** — animated Silk canvas background, auto-rotating hero banner with state management, featured Operators preview, latest news section, and a download call-to-action. Accessible at both `/` and `/home`.
- **Operators page** — full operator roster with live filtering by class, rarity, and search query. Data is read from a local JSON array with stats fetched from the public HellaAPI.
- **Manage page** — full CRUD interface for the operators roster. Supports searching, filtering by class, adding new operators, editing existing ones, and deleting with confirmation. Data is persisted in `localStorage`.
- **News page** — news articles with category filtering (Event, Story, Recruitment, etc.).
- **RSS page** — curated RSS feed reader that parses `/rss.xml` and displays items with category badges, dates, and links pointing back to the app's news page.
- **Contact page** — Rhodes Island HQ location displayed via an OpenStreetMap iframe, address information, and a validated contact form with controlled state.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/linnaaire-source/arknights-apps.git

# Navigate to the project folder
cd arknights-apps/arknights-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

---

## 🧩 Third-Party Components

| Component | Description | Link |
|---|---|---|
| React Bits — Silk | Animated canvas background using layered sine waves | https://www.react-bits.dev/backgrounds/silk |
| Leaflet / OpenStreetMap | Embedded interactive map on the contact page via iframe | https://leafletjs.com |
| Font Awesome 6 | Icon library for social media icons and UI elements | https://fontawesome.com |
| Firebase Hosting | Static hosting and deployment platform | https://firebase.google.com/docs/hosting |
| HellaAPI (awedtan.ca) | Public Arknights data API for operator stats (ATK, DEF, HP) | https://awedtan.ca/docs |
| Aceship Arknight-Images | Public GitHub CDN for operator portrait and avatar images | https://github.com/Aceship/Arknight-Images |
| Google Fonts — Rajdhani & Share Tech Mono | Display and monospace typefaces | https://fonts.google.com |
| React Router DOM | Client-side routing for the SPA | https://reactrouter.com |

---

## 📚 Tutorials & References

| Resource | Link |
|---|---|
| React Router v6 — official docs | https://reactrouter.com/en/main |
| Firebase Hosting — getting started | https://firebase.google.com/docs/hosting/quickstart |
| Vite — project setup guide | https://vitejs.dev/guide |
| Aceship Arknight-Images — asset repository | https://github.com/Aceship/Arknight-Images |
| Best README Template (inspiration) | https://github.com/othneildrew/Best-README-Template |
| Arknights official site (design reference) | https://www.arknights.global |
| Figma design reference | https://www.figma.com/community/file/1118944298386730261 |

---

## 🗂️ Project Structure

```
arknights-app/
└── src/
    ├── components/
    │   ├── footer/
    │   ├── header/
    │   ├── hero-section/
    │   ├── news-card/
    │   ├── operator-card/
    │   ├── operators-grid/
    │   └── silk-background/
    ├── hooks/
    │   └── useOperators.js
    ├── pages/
    │   ├── contact/
    │   ├── home/
    │   ├── manage/
    │   ├── news/
    │   ├── operators/
    │   └── rss/
    └── App.jsx
```

---

## 📡 RSS Feed

The app includes a custom RSS feed available at:

**[https://arknights-8d51f.web.app/rss.xml](https://arknights-8d51f.web.app/rss.xml)**

Each RSS item links back to the corresponding news page inside the app. The `/rss` page reads and renders the feed using the browser's native `DOMParser`.

> **Screenshot of RSS feed reader:**
>
> *(Add a screenshot here showing the RSS page with items rendered — use `![RSS Screenshot](./screenshots/rss.png)` after adding the image to the repo)*

---

## ✅ Naming Conventions

This project follows these conventions as required:

- **Folders:** `kebab-case` (e.g. `operators-grid`, `hero-section`)
- **Component files:** `PascalCase` (e.g. `OperatorCard.jsx`, `OperatorCard.css`)
- **CSS classes:** `kebab-case` (e.g. `op-card`, `manage-btn-add`)
- **JS variables:** `camelCase` (e.g. `classFilter`, `editingId`)
- **Boolean variables:** `is` / `has` prefix (e.g. `isFormOpen`, `isLoading`, `hasError`)
- **Hook files:** `camelCase` (e.g. `useOperators.js`)
- **Routes:** `kebab-case` (e.g. `/manage`, `/rss`)

---

## 🌿 Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/first-delivery` | First delivery snapshot |
| `feature/second-delivery` | Second delivery snapshot |
| `feature/third-delivery` | Third delivery snapshot |

---

## 📝 License

This is a fan-made academic project. Arknights and all related assets belong to **Hypergryph / Yostar**. Not affiliated with or endorsed by the original creators.
