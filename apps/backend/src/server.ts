import { app } from "@src/app.js";
import { config } from "./config.js";

const server = app.listen(config.port, () => {
  console.log(`[${config.env}] listening on http://localhost:${config.port}`);
});

function shutdown(signal: string): void {
  console.log(`${signal} received, closing server...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
