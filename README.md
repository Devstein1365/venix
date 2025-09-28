# Turnaj Fantasy Football — Frontend Prototype

A responsive, single-page-style frontend prototype for a fantasy football platform. It showcases auth flows (localStorage), a polished dashboard, and a mobile-first navigation experience suitable for internship/assignment reviews and quick demos.

## Overview

This project is a static frontend (HTML/CSS/JS) that mimics core user journeys:

- Sign up / Sign in / Forgot password
- Auth state persisted in `localStorage`
- Dashboard with stats, upcoming matches, lightweight prediction interactions, notifications, and a leaderboard
- Fully responsive layout with a hamburger mobile nav

It’s intentionally backend-agnostic so you can plug in APIs later.

## Tech Stack

- HTML5, CSS3 (custom styles + `responsive.css`)
- Vanilla JavaScript (`script.js` for all non-auth logic, `auth/auth.js` for auth)
- Font Awesome (icons)
- LocalStorage (client-side data persistence for auth + demo state)

## Key Features

- Responsive navbar with hamburger menu and slide-out mobile panel
- LocalStorage-based authentication (register, login, password reset)
- Role-agnostic dashboard with:
  - Stats summary cards
  - Upcoming matches with client-side countdown timers
  - Predictions list (demo interactions)
  - Leaderboard snapshot
  - Notifications feed
- Newsletter capture (stored locally for demo) with toast feedback
- Light/dark theme toggle (demo) persisted in localStorage
- Clean, modern UI with accessible color contrast and focusable controls

## Project Structure

```
venix/
├─ index.html           # Landing page
├─ login.html           # Login form (auth.js)
├─ register.html        # Registration form (auth.js)
├─ forgot.html          # Password reset form (auth.js)
├─ dashboard.html       # Post-login dashboard UI
├─ auth/
│  └─ auth.js          # LocalStorage auth flows
├─ css/
│  ├─ style.css        # Base styles and components
│  └─ responsive.css   # Media queries + mobile nav styles
├─ js/
│  └─ script.js        # Non-auth logic (nav, countdowns, toasts, etc.)
└─ images/              # Logos, backgrounds, sample team images
```

## Getting Started

No build step needed.

- Option A — open directly: open `index.html` in your browser.
- Option B — serve locally: use VS Code “Live Server” or any static server.

The UI should work out of the box. Auth state is simulated via `localStorage`.

## Auth & Data Model

All auth logic lives in `auth/auth.js`. Data is stored in `localStorage`:

- `users`: Array of user objects `{ email, firstName, lastName, username, password }`
- `currentUser`: The logged-in user object (subset of `users`)

Flows:

- Register writes to `users`
- Login finds a matching user and sets `currentUser`
- Forgot password updates the matching `users` entry
- Logout clears `currentUser`

## UI Conventions & Behaviors

- Logo link behavior:
  - Public pages (index/login/register/forgot): logo links to `index.html`
  - Dashboard (signed-in): logo links to/stays on `dashboard.html`
- Mobile nav: opened with the hamburger, disables body scroll, and can be closed by tapping the overlay.
- Countdown timers: hydrated via `data-countdown` attributes on elements in `dashboard.html`.
- All non-auth JavaScript belongs in `js/script.js`; auth-only logic remains in `auth/auth.js`.

## Extending the App

Hook points and ideas:

- Replace LocalStorage with real API calls (Auth, Matches, Leaderboard). Consider an `api.js` wrapper.
- Predictions: swap the alert-based placeholder with a modal form; persist predictions server-side.
- Notifications: fetch from backend; add read/unread state and a dropdown panel from the bell icon.
- Theme: formalize theme tokens (CSS variables) and persist the user’s choice.
- Routing: add a lightweight router or use a framework if this grows (React/Vue/Svelte/Next.js).

## Accessibility & Responsiveness

- Color contrast and focus states are considered in styles.
- Responsive breakpoints are centralized in `css/responsive.css`.
- Mobile nav uses large touch targets and slide-in panel.

## Asset Hygiene

Images in `images/` are primarily for UI and samples. Commonly used assets include:

- Branding & UI: `logo.png`, `bg-1.jpg`, `wallpaper.png`, `feat1-4.png`
- Dashboard demo: `messi.avif`, `arsenal.jpg`, `chealsea.jpg`, `man-u.jpg`

Note: If you’re optimizing size, audit for unused files and remove them to keep the repo lean.

## Known Limitations

- No real backend integration; all data is ephemeral and browser-specific
- Form validation is minimal; add robust validation for production
- Predictions and notifications are demo-only

## Contributing

- Keep non-auth JS in `js/script.js`
- Keep auth-only changes in `auth/auth.js`
- Prefer semantic HTML and accessible roles/labels
- Keep responsive rules in `css/responsive.css`

## License

No license specified. Add one if you intend to open-source or redistribute.

## Credits

- Design and implementation by Venix collaboration team
- Icons by Font Awesome
