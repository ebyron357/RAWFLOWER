# RAWFLOWER

A minimal Node.js + TypeScript (Express) web app used as the starting point for
this repository. It serves a small interactive frontend backed by a JSON API.

## Requirements

- Node.js >= 20 (the repo is developed against Node 22)
- [pnpm](https://pnpm.io) (pinned via `packageManager` in `package.json`)

## Getting started

```bash
pnpm install        # install dependencies
pnpm dev            # start the dev server (tsx watch) on http://0.0.0.0:3000
```

Then open http://localhost:3000 to use the app, or hit the API directly:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/flowers
curl -X POST http://localhost:3000/api/flowers \
  -H 'content-type: application/json' \
  -d '{"name":"Rose","color":"#c1121f"}'
```

## Scripts

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Run the dev server with live reload (`tsx`).  |
| `pnpm build`     | Compile TypeScript to `dist/`.                |
| `pnpm start`     | Run the compiled server from `dist/`.         |
| `pnpm test`      | Run the `node:test` suite.                    |
| `pnpm lint`      | Lint with ESLint.                             |
| `pnpm typecheck` | Type-check without emitting.                  |

## API

| Method | Path            | Description                             |
| ------ | --------------- | --------------------------------------- |
| GET    | `/api/health`   | Health check (`{ status, uptime }`).    |
| GET    | `/api/flowers`  | List flowers.                           |
| POST   | `/api/flowers`  | Create a flower (`{ name, color? }`).   |

> State is stored in-memory and resets on restart, which suits the ephemeral
> Cloud Agent filesystem.

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment:
`pnpm install` refreshes dependencies and the `dev-server` terminal runs
`pnpm dev` on port 3000.
