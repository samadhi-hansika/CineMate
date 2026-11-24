# 🎬 CineMate — Next-Gen Movie & TV Streaming Platform

**CineMate** is a feature-rich, high-performance streaming web application inspired by Netflix, crafted with modern dark-mode aesthetics, responsive carousels, instant search, a persistent watchlist, detailed movie information modals, and full video playback.

---

## ✨ Features

- **Cinematic Billboard / Hero Section**:
  - Showcases featured blockbusters (e.g., *Interstellar*, *Dune: Part Two*, *Oppenheimer*).
  - Displays high-resolution backdrops, metadata tags (Match rate, Age certification, Duration, 4K Ultra HD, Dolby Atmos), and plot synopses.
  - Interactive "Play Now", "More Info", and "Add to My List" buttons.
  - Previous/Next controls to cycle through featured films.

- **Netflix-Style Horizontal Carousels**:
  - **Continue Watching**: Automatically remembers movies you've started watching with progress bars.
  - **Trending Now**: Top trending movies and television series.
  - **Top 10 Today**: Features stylized Netflix giant rank numerals (`1` through `10`).
  - **Genre Rows**: Sci-Fi, High-Octane Action, Thrillers & Horror, Binge-Worthy TV Series, and My List preview.
  - Smooth left/right navigation arrows with hover reveal.

- **Interactive Hover Cards**:
  - Cards scale up smoothly on hover to reveal video backdrops, quick actions (Play, Watchlist toggle, Thumbs Up, More Info), duration, quality badges, and genre chips.

- **Theater Video Player Modal**:
  - Fullscreen theater playback experience with keyboard shortcuts (`Space` to Play/Pause, `F` for Fullscreen, `M` to Mute, `Esc` to Exit, `Left/Right` to Seek).
  - Dual modes:
    - **🎬 Official HD Trailer**: High-definition YouTube trailer embeds.
    - **🍿 Cinema Stream**: HTML5 video playback with custom Netflix-style scrubber progress bar, 10s skip controls, and volume slider.
  - Auto-saves watching progress to local storage.

- **Netflix Movie Details Modal**:
  - Comprehensive details view with backdrop banner, match percentage, release year, age ratings, resolution, cast, director, and storyline.
  - **Episodes Selector**: For TV shows (e.g. *Stranger Things*, *Breaking Bad*, *Arcane*), shows Season 1 episodes with thumbnails, durations, and summaries.
  - **More Like This**: Smart recommendations showing related titles based on shared genres.

- **Instant Search & Multi-Criteria Filtering**:
  - Live as-you-type search bar in the header and in the hero search panel.
  - Filter by Genre, Content Type (Movies / TV Shows), Release Year, and Sorting (Trending, Top Rated, Newest, A-Z).
  - Dynamic results grid with item count and one-click reset.

- **Persistent Watchlist (My List)**:
  - Stored locally in `localStorage` — persists across sessions.
  - Live count badge in the navigation bar.
  - Dedicated `favourites.html` page to manage saved titles.

- **Fully Responsive & Clean Code**:
  - Optimized for desktop, laptops, tablets, and smartphones.
  - Modular vanilla JavaScript (`movies-data.js`, `app.js`) and high-performance CSS (`style.css`).

---

## 📂 Project Structure

```
CineMate/
├── index.html                 # Main streaming homepage
├── movies.html                # Movies catalog
├── tv-shows.html              # TV series catalog
├── favourites.html            # Saved watchlist
├── favourities.html           # Backward-compatible redirect
├── assets/
│   ├── css/
│   │   └── style.css          # Main theme and responsive styles
│   ├── js/
│   │   ├── app.js             # Application logic
│   │   └── movies-data.js     # Movies and TV series dataset
│   └── images/                # Local posters and graphic assets
├── scripts/
│   ├── download-posters.js    # Poster downloader
│   └── download-remaining.js  # Remaining poster downloader
└── README.md                  # Project documentation
```

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Alternatively, serve with any local HTTP server:
   ```bash
   npx serve .
   ```
   or
   ```bash
   python -m http.server 8000
   ```
3. Navigate between **Home**, **Movies**, **TV Shows**, and **My List**.
4. Click **Play** on any title to experience the video player modal.

---

## 👨‍💻 Author & Credits

- **Developer**: Samadhi
- **Platform**: CineMate Global Streaming Entertainment
- **Inspiration**: Netflix
