# Yobante Express — Parcel Tracking UI

A responsive React parcel-tracking experience built with Vite and Tailwind CSS. The screen uses fictional parcel data and has no backend.
# NAME: MAKINDE OLAITAN

## Features
- Three mock parcels with statuses, origin/destination, progress and expected delivery
- Search by tracking number, parcel name, sender or route
- Status filters and a resettable filter panel
- Empty state when search/filter returns no matches
- Parcel detail modal with a mock tracking timeline
- Responsive desktop, tablet and mobile layout
- Accessible labels, keyboard focus indicators and clear status colors

## Requirements
- Node.js 18+ (Node 20+ recommended)
- npm


## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Build and preview

```bash
npm run build
npm run preview
```

## Project structure

```text
parcel-tracker-react/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    └── styles.css
```

## React Native and Flutter adaptation

**React Native:** Keep the parcel data model, filter logic and screen hierarchy. Replace web-specific layout elements with `View`, `Text`, `TextInput`, `Pressable`, and `FlatList`; use a navigation library for parcel details. Style using `StyleSheet` or a compatible utility styling library. Native platform APIs can handle haptics, deep links and push notifications.




## Testing rationale
- **Search:** matches tracking ID, parcel name, sender and origin/destination; case-insensitive; trim whitespace.
- **Filtering:** each status chip produces the right set; filters and search combine; reset restores all three parcels.
- **Empty state:** unmatched text and status combinations show an empty message and a clear action.
- **Parcel details:** the correct parcel opens, close works, modal backdrop closes, and tracking share action gives feedback.
- **Responsive layout:** verify at mobile (320–390 px), tablet (768 px), and desktop (1280 px+); no horizontal overflow.
- **Accessibility:** keyboard navigation and focus visibility; buttons have accessible names; text contrast; don't rely on color alone for statuses.
- **Regression/build:** `npm run build` succeeds; check browser console for errors.

## AI-tool disclosure
AI assistance was used to scaffold and refine the React component structure, mock data, responsive styling, interaction states and README documentation. 
# Claude AI was used to generate the UI , and debug

## Scope
A frontend-only assessment demonstration. Tracking events, parcel data, buttons for adding a parcel, support and notifications are mock/demo interactions; there is no API, live shipment tracking, authentication or persistence.

## Testing (Vitest)

This project includes Vitest and React Testing Library tests for the main parcel-tracking experience.


Install dependencies:

```bash
npm install
```

Run tests in watch mode:

```bash
npm test
```

Run tests once (CI-friendly):

```bash
npm run test:run
```

The test suite checks:
- the three sample parcel cards render;
- status filtering works;
- parcel search and the no-results state work;
- the parcel details modal opens and closes.
# Yobante-Express-Technical-test
