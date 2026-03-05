# Tic-Tac-Toe Project

A simple Tic-Tac-Toe game built with React and Vite.

## Features

- Two-player turn-based gameplay (`X` and `O`)
- Editable player names
- Active player highlight
- Move log showing played positions
- Move log shows custom player names (not just X/O) and keeps typed name casing
- Automatic win and draw detection
- Rematch button to restart the game

## Tech Stack

- React 19
- Vite 4
- JavaScript (ES Modules)
- CSS

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

Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Project Structure

```text
tic-tac-toe-project/
├── public/
│   ├── bg-pattern-dark.png
│   ├── bg-pattern.png
│   └── game-logo.png
├── src/
│   ├── components/
│   │   ├── GameBoard.jsx
│   │   ├── GameOver.jsx
│   │   ├── Log.jsx
│   │   └── Player.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── index.jsx
│   └── winning-combination.js
├── index.html
├── package.json
└── vite.config.js
```

## How the Game Works

- The game stores turns in state and derives:
  - active player
  - current board
  - winner (if any)
- Winning logic checks all 8 valid Tic-Tac-Toe combinations.
- A draw is declared when all 9 squares are filled without a winner.

## License

This project is for learning and practice.

## Reference

This project was built by following this course lesson:

- [React - The Complete Guide 2025 (incl. Next.js, Redux) - Udemy](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/39835918#content)
