import { createApp } from "#infrastructure/app.ts";

async function main(): Promise<void> {
  const app = await createApp();

  const port = Number(process.env["PORT"] || 4000);

  const host = process.env["HOST"] || "localhost"

  const listening = await app.listen({ port: port, path: host });

  console.log(app.printRoutes())
  console.log(listening)
}

main();

