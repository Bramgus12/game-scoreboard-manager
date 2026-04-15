# Game Scoreboard Manager

Game Scoreboard Manager = open source web app for tracking card game scores.

Live app: `https://www.game-scoreboard-manager.com`

## What project is

- Multi-language (English + Dutch) scoreboard manager for game nights.
- Focus: fast score input, round history, running totals.
- Current supported games:
    - Klaverjas / Klaverjassen
    - Boerenbridge / Oh Hell
    - Mahjong (NTS style)
- Built with Next.js 16, React 19, TypeScript, Prisma, Clerk auth, TanStack Query, Tailwind CSS.

## Features

- Create and manage multiple scoreboards per user.
- Track round-by-round data with validation rules per game.
- View totals and game stats.
- Read in-app game guides.
- Localized UI (`en`, `nl`).

## Game rules in repo

- Klaverjas rules: `docs/klaverjas.md`
- Boerenbridge rules: `docs/boerenbridge.md`
- Mahjong rules: `docs/mahjong.md`

## Run locally

Prerequisites:

- Bun
- PostgreSQL database

Steps:

1. Install dependencies:

```bash
bun install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with real values (database, Clerk, PostHog, app URL).

4. Run database migrations:

```bash
bunx prisma migrate dev
```

5. Start dev server:

```bash
bun dev
```

Open `http://localhost:3000`.

## Scripts

- `bun dev` - start local dev server (Turbopack)
- `bun build` - production build
- `bun start` - run production server
- `bun lint` - run ESLint
- `bun test` - run tests
- `bun test:watch` - run tests in watch mode
- `bun test:coverage` - run tests with coverage

## Open source

Issues and pull requests welcome.

## License

GNU GPLv3 or later (`GPL-3.0-or-later`). See `LICENSE`.
