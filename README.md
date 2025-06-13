# Card Game - React + Vite + Tailwind CSS

A React-based card game application featuring drag-and-drop functionality and a 2x6 game board layout.

## Features

- **40-Card Deck**: Numbered cards from 1-40, shuffled using Fisher-Yates algorithm
- **Interactive Game Board**: 2x6 grid with 11 playable cells and integrated deck
- **Drag & Drop**: HTML5 drag-and-drop API for intuitive card movement
- **Special Cell**: Top-right cell accepts multiple cards (stack), others hold single cards
- **Responsive Design**: Built with Tailwind CSS v4 for modern styling

## Game Rules

- Click the deck (bottom-right) to draw cards to your hand
- Drag cards from hand to place on empty board cells
- Move cards between single-card cells on the board
- Top-right cell accepts multiple cards in a stack (shows top card number)
- Cards cannot be removed from the top-right stack cell

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework with Vite plugin
- **React Router v6** - Client-side routing (minimal setup)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd claude-code-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/
│   └── Layout.jsx      # Minimal layout wrapper
├── pages/
│   └── CardGame.jsx    # Main card game component
├── App.jsx             # App routing configuration
├── main.jsx            # Application entry point
└── index.css           # Tailwind CSS imports
```

## Game Implementation

### State Management
- `deck`: Array of shuffled cards (1-40)
- `hand`: Player's drawn cards
- `board`: 11-cell array (index 5 is array for multiple cards)
- `draggedCard`, `draggedFromIndex`, `draggedFromLocation`: Drag state

### Key Components
- **CardGame.jsx**: Main game logic and UI
- **Layout.jsx**: Simple wrapper component

### Drag & Drop Logic
- Hand to board: Place on empty cells or stack in top-right
- Board to board: Move between single-card cells
- Top-right stacking: Accepts multiple cards, prevents removal

## Development

This project uses Vite for fast development and building. The development server includes:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- ESLint integration for code quality

## License

This project is private and not licensed for public use.