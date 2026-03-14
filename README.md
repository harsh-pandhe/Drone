# IIC SIT Lonavala — 3-Day Drone Workshop

The official website for the IIC SIT Lonavala Drone Workshop. A hands-on, 3-day experience in drone assembly, flight training, and aerial surveying. Features scroll-triggered frame animations, interactive drone anatomy, and a real-time flight loop visualization.

## ✨ Features

- **Workshop Modules** — 3 days of structured learning from assembly to flight
- **Interactive Drone Anatomy** — Clickable POI nodes with technical specifications
- **Scroll-Driven Hero** — 40-frame drone animation triggered by scroll position
- **Drone Swarm Simulation** — Interactive isometric canvas with autonomous agents
- **Custom Cursor Trail** — Smooth physics-based cyan trail (desktop only)
- **Fully Responsive** — Optimized for students on mobile, tablet, and desktop
- **Location Integration** — Interactive map of STES Campus, Lonavala

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
