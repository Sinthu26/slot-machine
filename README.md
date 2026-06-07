# Slot Machine

A browser-based slot machine game built with React and Vite. Originally developed as a Node.js terminal game, this project was rebuilt as a full web application to explore core JavaScript and React concepts including state management, component architecture, input validation, and conditional rendering.

## Demo

## Features

- Deposit funds and manage a running balance
- Choose 1–3 lines to bet on per spin
- Dynamic win calculations based on symbol rarity and value
- Input validation at every stage (no negatives, no decimals where not allowed)
- Quit at any point during the game
- Clean, responsive UI built with React components

## Symbol Odds & Payouts

| Symbol | Frequency | Multiplier |
|--------|-----------|------------|
| CHERRY | 10 / 30   | 2x         |
| GRAPE  | 8 / 30    | 4x         |
| ORANGE | 6 / 30    | 6x         |
| MELON  | 4 / 30    | 7x         |
| LEMON  | 2 / 30    | 10x        |


## Tech Stack

- [React] — component-based UI
- [Vite] — fast development build tool
- JavaScript

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sinthu26/slot-machine.git
cd slot-machine

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173] in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages).

## Project Structure

```
slot-machine/
├── public/
├── src/
│   ├── components/
│   │   ├── DepositScreen.jsx    # Initial deposit input
│   │   ├── BettingScreen.jsx    # Line and bet selection
│   │   ├── ReelsDisplay.jsx     # 3x3 symbol grid
│   │   └── ResultScreen.jsx     # Win/loss result and play again
│   ├── App.jsx                  # Root component, owns all game state
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Game Logic

The core game logic is ported from a Node.js terminal version:

- **Spinning** — each reel draws symbols without replacement from a weighted pool
- **Winning** — a line wins when all 3 symbols in a row match
- **Payout** — `bet × symbol multiplier` per winning line
- **Balance** — the bet is deducted before the spin; winnings are added after

## Learning Goals

This project was built to practice:

- JavaScript fundamentals (objects, arrays, loops, functions)
- React state management with `useState`
- Component architecture and props
- Conditional rendering based on game stage
- Input validation in a browser context
- Separating concerns across focused components

## Roadmap

- [ ] React Native mobile version
- [ ] Spin animations
- [ ] Sound effects
- [ ] High score / session history
- [ ] Adjustable symbol counts for custom difficulty