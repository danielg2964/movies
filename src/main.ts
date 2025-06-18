import { createApp } from "#infrastructure/app.ts";

async function main(): Promise<void> {
  const app = await createApp();

  const port = Number(process.env["PORT"]! || 4000);

  const listening = await app.listen({ port: port, path: "0.0.0.0" });

  console.log(app.printRoutes())
  console.log(listening)
}

main();

