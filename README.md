# Hi, I'm Alireza! 👋

## 🚀 About Me

I'm a full stack developer who builds modern, type-safe web applications — from interactive React front ends to the APIs and data behind them.

# About the Project: WorldWise 🌍

**WorldWise** is a travel-tracking single-page application that lets users log the cities and countries they've visited on an interactive world map. Click anywhere on the map to add a trip, and WorldWise records the location, date, and your personal notes — building a visual diary of everywhere you've been.

The project was built to explore **scalable state management in React without external libraries**. Instead of reaching for Redux, it relies on the **Context API** combined with the **`useReducer`** hook to create custom, self-contained stores for authentication and city data. This keeps global state predictable and centralized while staying entirely within React's own toolset.

### Key Features

- **Protected routes** — Unauthenticated users are automatically redirected to the login page. Even pasting a deep-link URL won't bypass the auth guard; it routes back to the public landing page.
- **Interactive map (Leaflet)** — Browse a fully interactive map of the world. Click any point to drop a marker and start logging a new trip.
- **Smart form pre-fill** — When you select a location, the city name and date are auto-populated from the map coordinates and the current date, so you only need to add a note (or tweak the details) before saving.
- **Cities & Countries views** — Toggle between a list of every city you've visited and an aggregated view of the countries those cities belong to.
- **City details** — Select any saved city to view its full details, then navigate back to the list.
- **Add / delete trips** — Adding a city instantly navigates to the list and highlights the new entry. Cities can also be removed.
- **Geolocation** — A "Get current position" button recenters the map on the user's real-world location.
- **Visited markers** — Zoom out to see pins for every city you've logged across the globe.
- **Dynamic page titles** — The browser tab title updates as you move between sections.
- **User panel** — The app layout shows the logged-in user's name, avatar, and a logout control.

### Architecture Highlights

- **Custom Context providers** with `useReducer` for authentication (`AuthContext`) and city data (`CitiesContext`).
- **Reusable custom hooks**: `useAuth`, `useCities`, `useFetch`, `useGeolocation`, `usePageTitle`, and `useUrlPosition`.
- **Reusable utility functions** shared across the app.
- Built with **Vite** for fast development and optimized production builds.

## Tech Stack

**Client:** React, TypeScript, CSS

**State Management:** Context API + `useReducer` (custom stores)

**Maps:** Leaflet

**Build Tool:** Vite

**Database:** Internal JSON file (fake API for demo purposes)

## 🛠 Skills

React, TypeScript, JavaScript, HTML, CSS, Vite, Leaflet, Context API, Node.js

## 🔑 Demo Login

The login page comes with a **pre-filled demo account** — just click **Login** to enter the app. No need to type any credentials. After logging in you'll be taken to `/app/cities`.

## Installation

Install and run WorldWise locally:

```bash
  git clone git@github.com:Alireza-Mak/WorldWise.git
```

```bash
  cd worldwise
```

```bash
  npm install
```

```bash
  npm run start
```

## Support

For support, email Info@alirezamak.com.

## Authors

- [@Alireza-Mak](https://www.github.com/Alireza-Mak)

![Logo](https://alirezamak.com/wp-content/uploads/fav-icon-final-e1685159385524.png)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://alirezamak.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alireza-mak/)
[![email](https://img.shields.io/badge/email-1DA1F2?style=for-the-badge&logo=mail.Ru&logoColor=white)](mailto:info@alirezamak.com)

## Screenshots

![App Screenshot](https://alirezamak.com/wp-content/uploads/worldwise-1.png)
![App Screenshot](https://alirezamak.com/wp-content/uploads/worldwise-2.png)
![App Screenshot](https://alirezamak.com/wp-content/uploads/worldwise-3.png)
![App Screenshot](https://alirezamak.com/wp-content/uploads/worldwise-4.png)
![App Screenshot](https://alirezamak.com/wp-content/uploads/worldwise-5.png)
![App Screenshot](https://alirezamak.com/wp-content/uploads/worldwise-6.png)

## Related

Here is related projects:

[Drag and Drop - intermediate](https://github.com/Alireza-Mak/reusable-components)
[React Typescript Interface](https://github.com/Alireza-Mak/react-interface)
