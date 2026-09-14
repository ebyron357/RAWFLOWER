import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { createApp } from "./app.js";

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const server: Server = createApp().listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", () => resolve()));
  const { port } = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await run(baseUrl);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("GET /api/health reports ok", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { status: string };
    assert.equal(body.status, "ok");
  });
});

test("GET /api/flowers returns the seeded flower", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/api/flowers`);
    assert.equal(res.status, 200);
    const body = (await res.json()) as Array<{ name: string }>;
    assert.ok(body.length >= 1);
    assert.equal(body[0].name, "Sunflower");
  });
});

test("POST /api/flowers creates a flower and it is listed", async () => {
  await withServer(async (baseUrl) => {
    const created = await fetch(`${baseUrl}/api/flowers`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Tulip", color: "#ff6f91" }),
    });
    assert.equal(created.status, 201);
    const flower = (await created.json()) as { id: number; name: string };
    assert.equal(flower.name, "Tulip");

    const list = await (await fetch(`${baseUrl}/api/flowers`)).json();
    assert.ok((list as Array<{ name: string }>).some((f) => f.name === "Tulip"));
  });
});

test("POST /api/flowers rejects an empty name", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/api/flowers`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "   " }),
    });
    assert.equal(res.status, 400);
  });
});
