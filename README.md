# Smriti & Rishi - Wedding Invitation Web App

A responsive, single-page React application for a digital wedding invitation. Features include an interactive RSVP form, timeline of events, photo gallery with lightbox, guestbook, and a background music player.

## Features

-   **Mobile-First Design**: Fully responsive layout optimized for all devices.
-   **RSVP System**: Interactive form with local storage persistence and success animation.
-   **Events Timeline**: Visual schedule of the wedding festivities.
-   **Gallery**: Masonry-style photo grid with full-screen lightbox.
-   **Guestbook**: "Wishes" section where guests can leave messages (persisted locally).
-   **Music Player**: Background audio with autoplay handling, play/pause/mute controls, and playlist support.
-   **Gift Registry**: A dedicated section for gift preferences (can be disabled or emptied).

## Project Structure

```text
src/
├── components/     # Reusable UI components (Navbar, Footer, Section, etc.)
├── pages/          # Page components (Home, Events, RSVP, Gallery, Wishes)
├── styles/         # Global styles (handled via Tailwind)
├── App.tsx         # Main application logic (Routing, Music Player)
├── constants.ts    # Central config for text, dates, venue, and images
└── types.ts        # TypeScript interfaces
```

## Setup & Installation

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm start
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Customization Guide

### 1. Wedding Details (Names, Dates, Venue)
Edit `src/constants.ts` to update the couple's details, event dates, and venue information.

```typescript
export const COUPLE = {
  bride: "Smriti Goswami",
  groom: "Rishi Raj Kashyap",
  // ...
};
```

### 2. Images
The app uses a centralized image configuration.
1.  Create a folder `public/assets/images/`.
2.  Place your images there (e.g., `hero-bg.jpg`, `gallery-1.jpg`).
3.  Update `src/constants.ts` to point to these local files:

```typescript
export const IMAGES = {
  hero: '/assets/images/hero-bg.jpg',
  couple: '/assets/images/couple.jpg',
  gallery: [
    '/assets/images/gallery-1.jpg',
    '/assets/images/gallery-2.jpg',
    // ...
  ]
};
```

### 3. Background Music
The app currently uses remote placeholder URLs for demonstration. To use your own music:
1.  Create a folder `public/assets/music/`.
2.  Add your MP3 files (e.g., `track-1.mp3`).
3.  Open `src/App.tsx` and update the `PLAYLIST` constant:

```typescript
const PLAYLIST = [
  '/assets/music/track-1.mp3',
  '/assets/music/track-2.mp3',
  // Remove the remote https://... URLs
];
```

### 4. Color Theme
The color palette is defined in `index.html` within the Tailwind configuration script. You can adjust the hex codes to match your wedding theme.

```javascript
colors: {
  primary: '#355E3B', // Leaf Green
  secondary: '#6C7C59', // Reseda Green
  accent: '#9ABF88', // Pastel Green
  cream: '#F2F7F4', // Background
  // ...
}
```

## Data Persistence
This app uses `localStorage` to simulate a backend for:
-   **RSVP**: Saves the user's submission to prevent double submission on the same device.
-   **Wishes**: Stores guestbook messages locally.
-   **Music Settings**: Remembers mute/unmute preference.

*Note: In a real-world scenario, you would replace the `localStorage` logic in `RSVP.tsx` and `Wishes.tsx` with API calls to a backend service (e.g., Firebase, Supabase, or a custom Node.js server).*

## Deployment
This project is a static React site. It can be deployed to:
-   GitHub Pages
-   Vercel
-   Netlify
-   Firebase Hosting

Ensure your build command is set to `npm run build` and the publish directory is `build` (or `dist`).
