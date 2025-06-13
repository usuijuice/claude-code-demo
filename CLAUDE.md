# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with Vite and React Router for client-side routing.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
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
```

## Project Structure

```
src/
├── components/
│   └── Layout.jsx      # Main layout with navigation
├── pages/
│   ├── Home.jsx       # Home page component
│   ├── About.jsx      # About page component
│   ├── Contact.jsx    # Contact page component
│   └── CardGame.jsx   # Card game with deck functionality
├── styles/
│   └── CardGame.css   # Card game specific styles
├── App.jsx            # Main app component with routes
├── App.css            # App-specific styles
├── main.jsx           # Entry point with BrowserRouter
└── index.css          # Global styles
```

## Architecture

- **Routing**: The app uses React Router v6 with nested routes. The main routes are defined in `App.jsx` with a shared `Layout` component.
- **Navigation**: Navigation is handled through the `Layout` component which renders a nav bar and an `<Outlet/>` for child routes.
- **Entry Point**: `main.jsx` wraps the app with `BrowserRouter` to enable routing throughout the application.

## Git Commit Guidelines

Claude Code should proactively commit changes at appropriate milestones:

- After completing a feature or significant functionality
- When fixing bugs or making important changes
- After adding new pages, components, or major refactoring
- When the user requests a commit

Commit messages should follow conventional commit format (feat:, fix:, docs:, style:, refactor:, test:, chore:) and be descriptive of the changes made.