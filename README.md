# 🚀 GrowAthlete - Sports Talent Platform

GrowAthlete is a high-fidelity, premium sports talent platform designed to empower and showcase young athletic talent across India. This web application is a pixel-perfect, fully responsive multi-page dashboard built using **React**, **Vite**, and **Tailwind CSS**. It incorporates rich styling, interactive SVG map elements, real-time reactive states, and fluid user experience transitions.

---

## 🎨 Design & Aesthetic System
The project is built around a modern, premium dark-accented aesthetic tailored for athletic energy and professional scouting:
*   **Typography**: Styled using Google Font **Inter** for crisp, highly readable data grids and interfaces.
*   **Color Palette**:
    *   `primary` (`#1a73e8`): Standard GrowAthlete blue for primary actions, badges, and focus borders.
    *   `grow-navy` (`#1a365d`): High-contrast branding color for headers and titles.
    *   `grow-orange` (`#ea580c`): Dynamic accent orange for highlight states, taglines, and brand marks.
    *   `grow-bg` (`#f8fafc`): Slate-tinted clean background layout.
    *   `grow-border` (`#e2e8f0`): Subtle borders for clean card interfaces.
*   **Micro-interactions**: Subtle hover scales, smooth transitions (`transition-all duration-300`), glassmorphism sidebars, and clean form validation states.

---

## 🛠️ Core Technology Stack
*   **Frontend Library**: React 18.3 (Functional components with Hooks)
*   **Build Tool**: Vite 5.3 (Ultra-fast Hot Module Replacement)
*   **Styling Engine**: Tailwind CSS 3.4 (Utility-first CSS framework with custom theme configuration)
*   **Icons**: Lucide React (Streamlined SVG icon package)
*   **Fonts**: Inter (Embedded via `index.html`)

---

## 📂 Project Architecture (Monorepo)
```text
GrowAthlete/
├── backend/                # Server-side logic and APIs (future integration)
├── frontend/               # Full React application workspace
│   ├── public/             # Static assets (images, logos)
│   ├── src/                # React source code
│   │   ├── components/     # Shared layouts (Header, Footer, Toast)
│   │   ├── pages/          # Module-specific pages (Feed, News, Profile, etc.)
│   │   ├── App.jsx         # State controller & page router
│   │   └── main.jsx        # React root mount point
│   ├── index.html          # HTML core shell & Google font links
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind theme config
│   └── vite.config.js      # Vite build config
├── package.json            # Root wrapper for monorepo proxy commands
└── README.md
```

---

## 💡 Key Page Modules & Interactive Features

### 1. 🚪 Landing & Auth Gate (`Landing.jsx`)
*   Welcome hero section with high-contrast sport imagery, statistics counters, and brand messaging.
*   **Social Authentication Card**: Seamless mock authentication via Google, Microsoft, or Email/Password credentials.
*   Interactive input validation states with clean visual feedback.
*   Live top navigation links for "About", "Articles", and "Blogs".

### 2. 💬 Social Activity Feed (`Feed.jsx`)
*   **Status Composer**: Real-time posting interface allowing athletes to post new status updates, inserting them instantly at the top of the feed with reactively updated timestamps.
*   **Athletic Statistics Sidebar**: Displays quick profile summaries, following/follower counters, and verification badges.
*   **Interactive Chat Rooms**: Filterable list of live messaging channels (e.g., *Basketball Trials*, *North-Zone Track*) with filter queries, verified room toggles, and direct join links.
*   **Feed Engagement**: Interactive bookmarking toggles, active like counters (reactively incrementing/decrementing), and share drawer triggers.

### 3. 📰 Latest News Stream (`News.jsx`)
*   Categorized feed focusing on Indian domestic sports, grassroots trials, and national school games.
*   **Dynamic Filters**: Filter news listings on-the-fly by specific Sports (e.g., Basketball, Athletics, Cricket) and Regions (e.g., North, South, National).
*   **Article Preview Modal**: Clicking "Read More" opens an interactive, premium overlay showing full articles, high-resolution imagery, and author information.
*   Bookmark retention across news articles.

### 4. 🏆 Tournaments & Interactive Map (`Tournaments.jsx`)
*   Comprehensive search, sorting, and category filters (e.g., Under-19, Open Category).
*   **Interactive SVG India Map**: Custom-designed dark map visualizing tournament density. Highlighted city pins (e.g., Delhi, Mumbai, Bengaluru) react to click events, immediately filtering the tournament listings below to the chosen location.
*   **Tournament Registration Flow**: Clicking "Register Now" opens a step-by-step registration dialog with automated fields, validation rules, and a success confirmation screen.

### 5. 👤 Athlete Profile & Editor (`Profile.jsx`)
*   Detailed showcase of the athlete's bio, current statistics, achievements log, and career stats.
*   **Inline Details Editor**: Clicking the pencil icon on the "Athletic Details" panel turns all static parameters into active inputs. Saving writes updates back to the global state immediately.
*   Interactive timeline of achievements and career records, fully reactive with 'Like', 'Comment', and 'Repost' actions.

### 6. 🔖 Saved Posts & Global Features
*   **Saved Library**: A dedicated space to review all bookmarked posts, news articles, and tournament links.
*   **Persistent State**: Custom `useLocalStorage` hooks ensure that all interactions, user sessions, posts, and bookmarks survive browser reloads.
*   **Toast Notification System**: Custom, non-intrusive bottom-screen alerts to provide immediate feedback on user interactions (e.g., successful tournament registration, liking a post, copying share links).

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 🔧 Installation Steps
1.  **Clone or navigate** to the project directory:
    ```bash
    cd "GrowAthlete"
    ```
2.  **Install dependencies**:
    We have a root wrapper that automatically installs the frontend dependencies.
    ```bash
    npm run install-all
    # or navigate to cd frontend && npm install
    ```
3.  **Start the local development server**:
    You can run this directly from the root folder. The root `package.json` will automatically forward the command to the `frontend/` workspace.
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to the displayed URL (usually `http://localhost:5173`).

---

## ⚡ Build & Deployment Scripts
The project provides standard Vite commands:
*   `npm run dev`: Runs the application in development mode with HMR.
*   `npm run build`: Bundles the application into highly optimized static assets in the `/dist` directory for production deployment.
*   `npm run preview`: Locally previews the production build.
