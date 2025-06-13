# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React card game application built with Vite and styled with Tailwind CSS v4. The application features a single-page card game with drag-and-drop functionality.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **Routing**: React Router v6 (minimal setup)
- **Language**: JavaScript (JSX)

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
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
├── App.jsx             # Main app component with route to card game
├── main.jsx            # Entry point with BrowserRouter
└── index.css           # Tailwind CSS imports
```

## Card Game Features

- **Deck**: 40 numbered cards (1-40), shuffled using Fisher-Yates algorithm
- **Game Board**: 2x6 grid layout with 11 playable cells
  - Top-right cell (index 5): Accepts multiple cards, displays top card, no dragging out
  - Other cells: Single card only, cards can be moved between cells
  - Bottom-right position: Clickable deck for drawing cards
- **Hand**: Cards drawn from deck, can be dragged to board
- **Drag & Drop**: HTML5 drag-and-drop API for card movement
  - Hand to board: Place cards on empty cells or stack in top-right
  - Board to board: Move cards between single-card cells
  - Board to top-right: Stack cards (no removal allowed)

## Architecture

- **Routing**: Minimal React Router v6 setup with card game as index route
- **Layout**: Simple wrapper component with `<Outlet/>` for child routes
- **Entry Point**: `main.jsx` wraps app with `BrowserRouter`
- **Styling**: Tailwind CSS v4 utilities for responsive grid layout and card styling
- **State Management**: React hooks for deck, hand, board, and drag state

## Game Logic

- **Board State**: Array of 11 elements, index 5 is array for multiple cards, others are single cards or null
- **Drag State**: Tracks dragged card, source index, and source location (hand/board)
- **Drop Logic**: Handles different drop targets and source combinations
- **Reset Function**: Reshuffles deck and clears hand/board

## Git Commit Guidelines

Claude Code should proactively commit changes at appropriate milestones:

- After completing a feature or significant functionality
- When fixing bugs or making important changes
- After adding new pages, components, or major refactoring
- When the user requests a commit

Commit messages should follow conventional commit format (feat:, fix:, docs:, style:, refactor:, test:, chore:) and be descriptive of the changes made.