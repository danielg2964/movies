import { eq } from "drizzle-orm";

import type { WatchedRepository } from "#application/users/repositories/watched.repository.ts";
import { WatchedEntity } from "#domain/users/entities/watched.entity.ts";
import { db } from "#infrastructure/db/db.ts";
import { categories, movies, watched } from "#infrastructure/db/schema.ts";
import { Maybe } from "#types/maybe.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";

export class PostgresWatchedRepository implements WatchedRepository {
  async findByUserUuid(uuid: string): Promise<Maybe<WatchedEntity>> {
    const result = await db
      .select()
      .from(watched)
      .innerJoin(movies, eq(movies.uuid, watched.movie_uuid))
      .innerJoin(categories, eq(movies.category_uuid, categories.uuid))
      .where(eq(watched.user_uuid, uuid))
      .limit(1);

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }

    const movie = new MovieEntity(
      first.movies.uuid,
      first.movies.name,
      first.movies.category_uuid,
      new CategoryEntity(first.categories.uuid, first.categories.name),
      first.movies.release
    );

    return Maybe.some(new WatchedEntity(
      first.watched.uuid,
      first.watched.user_uuid,
      first.watched.movie_uuid,
      movie
    ));
  }

  async findByMovieUuid(uuid: string): Promise<Maybe<WatchedEntity>> {
    const result = await db
      .select()
      .from(watched)
      .innerJoin(movies, eq(movies.uuid, watched.movie_uuid))
      .innerJoin(categories, eq(movies.category_uuid, categories.uuid))
      .where(eq(watched.movie_uuid, uuid))
      .limit(1);

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }

    const movie = new MovieEntity(
      first.movies.uuid,
      first.movies.name,
      first.movies.category_uuid,
      new CategoryEntity(first.categories.uuid, first.categories.name),
      first.movies.release
    );

    return Maybe.some(new WatchedEntity(
      first.watched.uuid,
      first.watched.user_uuid,
      first.watched.movie_uuid,
      movie
    ));
  }

  async save(entity: WatchedEntity): Promise<WatchedEntity> {
    await db
      .insert(watched)
      .values({
        uuid: entity.uuid,
        user_uuid: entity.user_uuid,
        movie_uuid: entity.movie_uuid
      });

    return entity;
  }

  async findByUuid(uuid: string): Promise<Maybe<WatchedEntity>> {
    const result = await db
      .select()
      .from(watched)
      .innerJoin(movies, eq(movies.uuid, watched.movie_uuid))
      .innerJoin(categories, eq(movies.category_uuid, categories.uuid))
      .where(eq(watched.uuid, uuid))
      .limit(1);

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }

    const movie = new MovieEntity(
      first.movies.uuid,
      first.movies.name,
      first.movies.category_uuid,
      new CategoryEntity(first.categories.uuid, first.categories.name),
      first.movies.release
    );

    return Maybe.some(new WatchedEntity(
      first.watched.uuid,
      first.watched.user_uuid,
      first.watched.movie_uuid,
      movie
    ));
  }

  async deleteByUuid(uuid: string): Promise<Maybe<WatchedEntity>> {
    const maybe_watched = await this.findByUuid(uuid);

    if (!maybe_watched.has_value) {
      return Maybe.nothing();
    }

    await db.delete(watched)
      .where(eq(watched.uuid, uuid))

    return Maybe.some(maybe_watched.value);
  }
}
