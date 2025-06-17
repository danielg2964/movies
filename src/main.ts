import { Entity } from "#domain/shared/entity.ts"

async function main(): Promise<void> {
  const entity = new Entity('holaaa!');

  console.log(entity);
}

main();

