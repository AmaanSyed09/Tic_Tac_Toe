# Tic-Tac-Toe (React + Vite)

## Description

This project is a modern, browser-based Tic-Tac-Toe game built with React and Vite.
It focuses on clean component structure, state-driven UI updates, and derived game logic.

Two users can play locally on the same screen as `X` and `O`, edit player names, track every move, and instantly see game outcomes (win or draw). The app is lightweight, fast to run in development, and easy to extend.

## Features

- Two-player turn-based gameplay on a 3x3 grid.
- Real-time active player switching between `X` and `O`.
- Editable player names with in-place `Edit`/`Save` controls.
- Active player row highlighting for better turn visibility.
- Move history (log) showing the selected row and column for every turn.
- Move log labels turns with player names (not just symbols).
- Automatic winner detection using all 8 valid Tic-Tac-Toe combinations.
- Automatic draw detection when all 9 cells are filled with no winner.
- Cell locking: already selected squares are disabled to prevent overwriting moves.
- Game over panel that displays either:
- Winner message (`<player name> Won!`)
- Draw message (`It's a draw!`)
- `Rematch!` button to reset game turns and start a fresh round.
- Predictable state flow using derived helper functions for:
- current active player
- current board representation
- winner evaluation

## Tech Stack

- React `19` for component-based UI and state management (`useState`).
- React DOM `19` for rendering the app into the browser.
- Vite `4` for fast local development and production builds.
- JavaScript (ES Modules) for application logic.
- CSS for styling and layout.
- ESLint for linting and code quality checks.

### Main Dependencies

- `react`
- `react-dom`

### Dev Dependencies

- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `@types/react`
- `@types/react-dom`

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Creates an optimized production build.
- `npm run preview`: Serves the production build locally for preview.
- `npm run lint`: Runs ESLint on `.js` and `.jsx` files.

## Project Structure

```text
tic-tac-toe-project/
├── public/
│   ├── bg-pattern-dark.png
│   ├── bg-pattern.png
│   └── game-logo.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── GameBoard.jsx
│   │   ├── GameOver.jsx
│   │   ├── Log.jsx
│   │   └── Player.jsx
│   ├── app_clean.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── index.jsx
│   └── winning-combination.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## How It Works

- The app stores turns in `gameTurns` state.
- The game board is derived from turns instead of being stored as separate mutable state.
- The active player is derived from the latest turn.
- Winner detection loops through `WINNING_COMBINATIONS` and compares board symbols.
- A draw is declared when 9 turns are reached and no winner exists.
- On rematch, turns are reset to an empty array, which restores the initial game state.

## Learning Reference

This project was built while following the React course lesson below:

- [React - The Complete Guide 2025 (incl. Next.js, Redux) - Udemy](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/39835918#content)

## License

This project is intended for learning and practice.
