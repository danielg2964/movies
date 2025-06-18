import { createApp } from "#infrastructure/app.ts";

async function main(): Promise<void> {
  const app = await createApp();

  const listening = await app.listen({ port: 3000 });

  console.log(app.printRoutes())
  console.log(listening)
}

main();

