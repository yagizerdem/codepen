import "@/config.js"; // load env

import { app } from "@/app.js";

function shutdown(signal: string): void {
  console.log(`${signal} received, closing server...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const NODE_ENV = process.env.NODE_ENV ?? "development";

const server = app.listen(PORT, () => {
  console.log(`[${NODE_ENV}] listening on http://localhost:${PORT}`);
});
