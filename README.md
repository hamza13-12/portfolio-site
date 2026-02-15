# Hamza Ahmad — Portfolio

An interactive treasure-map-style portfolio showcasing my career journey as an AI Engineer, from education through startups to technical leadership.

## Preview

A draggable antique cartographic illustration where each landmark represents a career milestone. Hover landmarks for details, drag to explore the map.

## Tech Stack

- **React 19** + **Vite 7** — fast dev & build
- **Tailwind CSS** — utility-first styling with custom parchment/ink palette
- **Framer Motion** — landmark entrance animations, tooltips
- **React Spring** + **use-gesture** — smooth spring-physics drag panning

## Features

- Hand-drawn SVG terrain: ocean with ship & sea serpent, 50+ trees in forest clusters, 10-peak mountain range with snow caps, 8-point compass rose
- Ornate double-line border with tick marks (latitude/longitude style)
- Animated career path with gradient coloring (education blue > career brown > current red)
- 8 interactive landmarks with hand-drawn icons (book, compass, telescope, rocket, flag)
- Position-aware tooltips with map-note styling
- "X marks the spot" with golden shimmer animation
- Decorative cartouche, rolling hills, anchors, mystery islands
- GPU-optimized — no blur filters, blend modes, or expensive compositing during drag

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    TreasureMap.jsx    — main orchestrator, landmarks data, UI overlays
    MapViewport.jsx    — spring-physics drag panning
    MapTerrain.jsx     — SVG terrain (border, ocean, forests, mountains, compass)
    MapPath.jsx        — animated career path, milestone dots, X marks the spot
    Landmark.jsx       — interactive markers with icons, labels, tooltips
  index.css            — fonts, keyframes, global styles
```
