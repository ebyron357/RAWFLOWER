import express, { type Express, type Request, type Response } from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export interface Flower {
  id: number;
  name: string;
  color: string;
  createdAt: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

/**
 * Builds the RAWFLOWER Express application.
 *
 * State is kept in-memory on purpose: the Cloud Agent filesystem is ephemeral,
 * so this demo avoids any durable storage while still exercising a real
 * request/response round-trip end to end.
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(express.static(publicDir));

  const flowers: Flower[] = [
    { id: 1, name: "Sunflower", color: "#f4c430", createdAt: new Date().toISOString() },
  ];
  let nextId = 2;

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/api/flowers", (_req: Request, res: Response) => {
    res.json(flowers);
  });

  app.post("/api/flowers", (req: Request, res: Response) => {
    const { name, color } = req.body as { name?: unknown; color?: unknown };
    if (typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ error: "`name` is required and must be a non-empty string." });
      return;
    }
    const flower: Flower = {
      id: nextId++,
      name: name.trim(),
      color: typeof color === "string" && color.trim().length > 0 ? color.trim() : "#e75480",
      createdAt: new Date().toISOString(),
    };
    flowers.push(flower);
    res.status(201).json(flower);
  });

  return app;
}
