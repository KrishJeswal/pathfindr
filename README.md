# Pathfindr

Interactive, floor-wise **indoor navigation** for the Electronics & Telecommunication
(ETE) block at RV College of Engineering. Pick an origin and destination — by clicking
rooms on the SVG floor plan or via the dropdowns — and Pathfindr traces the shortest
route with an A\* search, animating the path and switching floors through the lift.

Part of a wider *Smart Indoor Navigation & Faculty Monitoring System* (Design Thinking
Lab). A static `dashboard/` hub links Pathfindr with a companion **Faculty Spatial
Tracker** (`tracker.html`) that shows real-time faculty availability via Firebase.

## Features

- **A\* pathfinding** over a hand-built graph of rooms and corridors, with Euclidean
  edge weights and a transit penalty so routes prefer same-floor travel.
- **Multi-floor routing** through the lift, with automatic floor switching to follow the
  active path.
- **Interactive SVG floor plans** for the Ground, 1st, 2nd, and 3rd floors — click to set
  origin/target, hover to highlight.
- **Animated route + location beacons** rendered as an SVG polyline with a flowing
  "energy" effect.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) for the navigation-graph unit tests
- [Firebase Hosting](https://firebase.google.com/docs/hosting) for deployment

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm test         # run the navigation graph tests
npm run lint     # lint the source
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  App.jsx            UI shell — sidebar controls, floor switcher, SVG workspace
  FloorPlans.jsx     SVG geometry for each floor (rooms, corridors, stairs, lift)
  navigation.js      Graph model: NODES, CONNECTIONS, A* engine, room options
  navigation.test.js Unit tests for the graph and pathfinding
  main.jsx           React entry point
public/              Static assets served as-is (favicon)
dashboard/           Static hub page linking Pathfindr + the Faculty Tracker
tracker.html         Standalone real-time Faculty Spatial Tracker (Firebase)
```

### The navigation model

`navigation.js` defines every room and corridor as a `NODE` with `{ x, y, floor }`
coordinates, and `CONNECTIONS` as the edges between them. Edge weights are the Euclidean
distance between nodes; cross-floor (lift) edges add a large penalty so the search only
changes floors when it must. `findShortestPathAStar` runs A\* with a distance +
floor-difference heuristic and returns the ordered list of node IDs to traverse.

## Deployment

The app builds to `dist/` and is served via Firebase Hosting. The `dashboard/` hub is
deployed as the landing page that links out to Pathfindr and the Faculty Spatial Tracker.

```bash
npm run build
firebase deploy
```

## Team

Dept. of Electronics & Telecommunication Engineering, RV College of Engineering, Bengaluru

Aryan Dhaked · Krish Jeswal · Neha G · Yashaswi Neelagunda — Mentor: Dr. Sandhya H B
