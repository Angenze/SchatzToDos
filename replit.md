# Ocean Quest - Gamified ToDo App

## Overview

Ocean Quest is a gamified todo application that combines daily task management with treasure hunting mechanics. Users complete their daily todos to unlock treasure chests containing collectible ocean creatures and items. The app features a mobile-first design with PWA capabilities, ocean-themed UI, and collection album functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with page-based navigation
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom ocean-themed color variables and responsive design
- **State Management**: Local React state with localStorage persistence for game data
- **Data Fetching**: TanStack React Query for server communication (currently unused but configured)

### Mobile-First Design
- **Progressive Web App**: Service worker implementation with caching strategies
- **Responsive Layout**: Mobile-optimized navigation with bottom tab bar
- **Touch-Friendly**: Large touch targets and gesture-friendly interactions

### Game Mechanics
- **Todo Management**: CRUD operations for daily tasks with completion tracking
- **Treasure System**: Daily treasure chest unlocking upon task completion
- **Collection Album**: 28 unique collectible items with rarity-based drop rates (common/rare/epic)
- **Daily Reset**: Automatic midnight reset of todos and treasure availability
- **Progress Tracking**: Visual progress indicators and completion feedback

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions
- **API Structure**: RESTful endpoints with /api prefix (currently minimal implementation)

### Data Layer
- **Local Storage**: Game state persistence using browser localStorage
- **Database Schema**: User authentication schema with Drizzle and Zod validation
- **State Management**: Centralized game state with save/load utilities

### Development Tools
- **Build System**: Vite with hot module replacement and development server
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Code Quality**: ESLint integration and consistent file structure
- **Development Experience**: Replit-specific tooling and error overlays

## External Dependencies

### UI and Styling
- **Radix UI**: Complete component primitive library for accessible UI components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling

### Development and Build
- **Vite**: Frontend build tool with React plugin and development server
- **TypeScript**: Type safety and development experience
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Database and Backend
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database provider
- **Zod**: Schema validation library for runtime type checking

### State Management and Data
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation and formatting utilities

### PWA and Mobile
- **Service Worker**: Custom implementation for offline caching
- **Web App Manifest**: PWA configuration for mobile installation
- **Wouter**: Lightweight routing library optimized for small bundles