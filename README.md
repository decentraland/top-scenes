# Top Scenes

Landing page that showcases Decentraland's top-ranked scenes, including previous winners and a live monthly leaderboard.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

### Main Sections

#### Previous Winners

Displays the top 20 scenes from previous months with a month selector dropdown.

#### Live Leaderboard

Shows the current month's scene rankings in a table format with:

- Rank position
- Scene info (name, thumbnail, creator)
- Location
- Position change indicator (↑/↓) compared to the previous day
- Jump In button to the scene

The leaderboard displays a **countdown** during the first days of each month (days 1-3) until rankings are available on day 4.

## External Services

### CDN - Scene Rankings

**Base URL:** `https://cdn-data.decentraland.org/public`

| Endpoint                                     | Description                    |
| -------------------------------------------- | ------------------------------ |
| `/current/scene-ranking-current-month.json`  | Current month's scene rankings |
| `/current/scene-ranking-previous-month.json` | Historical rankings by month   |

### Profiles API

**Base URL:** `https://peer.decentraland.org/lambdas`

| Endpoint    | Method | Description                                 |
| ----------- | ------ | ------------------------------------------- |
| `/profiles` | POST   | Fetches creator avatars by wallet addresses |

### Places API

**Base URL:** `https://places.decentraland.org/api`

| Endpoint                     | Description                       |
| ---------------------------- | --------------------------------- |
| `/places?positions=X,Y`      | Fetches place info by coordinates |
| `/worlds?names=name.dcl.eth` | Fetches world info by ENS names   |

## Analytics Events

Events are tracked via Segment using `@dcl/hooks`.

| Event                                   | Description                                 | Properties                                                                      |
| --------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| `Page View`                             | User visits the landing page                | `pathname`                                                                      |
| `Jump In to Previous Winners Scene`     | Click "Jump In" on a Previous Winners scene | `sceneName`, `sceneLocation`, `has_launcher`, `mobile`, `os`, `cpuArchitecture` |
| `Jump In to Leaderboard Scene`          | Click "Jump In" on a Live Leaderboard scene | `sceneName`, `sceneLocation`, `has_launcher`, `mobile`, `os`, `cpuArchitecture` |
| `Visit Jump In Page - Previous Winners` | Tap scene card on mobile (Previous Winners) | `sceneName`, `sceneLocation`                                                    |
| `Visit Jump In Page - Leaderboard`      | Tap scene row on mobile (Leaderboard)       | `sceneName`, `sceneLocation`                                                    |
| `Previous Winners Month Changed`        | Change month selector                       | `period`                                                                        |
| `Click View Leaderboard CTA`            | Click "View Leaderboard" button in banner   | -                                                                               |
| `Click Client Download`                 | Click download in Jump In modal             | `sceneName`, `sceneLocation`, `has_launcher`, `mobile`, `os`, `cpuArchitecture` |

## Routes

| Route                      | Description                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                        | Home - Shows Previous Winners and Live Leaderboard                                                                                                        |
| `/leaderboard`             | Scrolls to Live Leaderboard section                                                                                                                       |
| `/previous-winners`        | Scrolls to Previous Winners section                                                                                                                       |
| `/previous-winners/:month` | Shows specific month (format: `MMYY`, e.g., `1024` for October 2024). If the month is invalid or unavailable, defaults to the most recent available month |
