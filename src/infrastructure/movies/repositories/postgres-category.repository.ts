import { eq } from "drizzle-orm";
import { db } from "#infrastructure/db/db.ts"
import type { CategoryRepository } from "#application/movies/repositories/category.repository.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { Maybe } from "#types/maybe.ts";
import { categories } from "#infrastructure/db/schema.ts";


export class PostgresCategoryRepository implements CategoryRepository {
  async findByName(name: string): Promise<Maybe<CategoryEntity>> {
    const result = await db.select().from(categories)
      .where(eq(categories.name, name))
      .limit(1)

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing()
    }

    const category = new CategoryEntity(first.uuid, first.name);

    return Maybe.some(category);
  }

  async save(entity: CategoryEntity): Promise<CategoryEntity> {
    await db
      .insert(categories)
      .values({
        uuid: entity.uuid,
        name: entity.name,
      })

    return entity;
  }

  async findByUuid(uuid: string): Promise<Maybe<CategoryEntity>> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.uuid, uuid))
      .limit(1);

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }

    const category = new CategoryEntity(first.uuid, first.name);

    return Maybe.some(category);
  }

  async deleteByUuid(uuid: string): Promise<Maybe<CategoryEntity>> {
    const result = await db.delete(categories)
      .where(eq(categories.uuid, uuid))
      .returning();

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }

    const category = new CategoryEntity(first.uuid, first.name);

    return Maybe.some(category);
  }
}
