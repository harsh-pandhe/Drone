# ASCEND — Autonomous Aerial Intelligence

A premium, dark-themed Next.js website for drone-based aerial surveying and digital twin creation. Features scroll-triggered frame animations, interactive canvas simulations, glassmorphic UI, and a custom cursor trail.

## ✨ Features

- **Scroll-Driven Hero** — 40-frame drone animation triggered by scroll position
- **Interactive Hive Interface** — Clickable POI nodes with glassmorphic modal overlays
- **Drone Swarm Simulation** — Isometric canvas with autonomous drones (simplex-noise terrain)
- **Custom Cursor Trail** — Smooth physics-based cyan trail (desktop only)
- **Animated Pre-Loader** — SVG drone with spinning blades
- **Smooth Scrolling** — CSS `scroll-behavior: smooth` + anchor links
- **Fully Responsive** — Optimized layouts for mobile, tablet, and desktop

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion |
| Canvas | Simplex-Noise 3.0 |
| Fonts | Inter, Rajdhani, JetBrains Mono |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts & cursor
│   ├── page.tsx            # Main page assembly
│   └── globals.css         # Design tokens & utilities
├── components/
│   ├── DroneHero.tsx       # Scroll-driven frame animation
│   ├── HiveInterface.tsx   # Interactive drone anatomy
│   ├── POIModal.tsx        # Glassmorphic detail modal
│   ├── FlightLoop.tsx      # 4-step mission pipeline
│   ├── TechBento.tsx       # Technology bento grid
│   ├── TechGrid.tsx        # Capabilities + animated SVG
│   ├── ProcessRow.tsx      # Workflow timeline
│   ├── DroneSwarm.tsx      # Isometric canvas simulation
│   ├── DataOutputStrip.tsx # Marquee format badges
│   ├── ComplianceSafety.tsx# Certification cards
│   ├── CustomCursor.tsx    # Physics-based cursor trail
│   ├── PreLoader.tsx       # Animated loading screen
│   ├── ServiceCard.tsx     # Service grid cards
│   └── Footer.tsx          # 3-column footer
├── data/
│   └── services.ts         # Service data
└── public/
    ├── hive.svg            # Animated drone SVG
    └── frames/             # Hero animation frames
```

## 📄 License

MIT © Harsh Pandhe
