import { PaginationOptions } from "#application/shared/pagination.options.ts";
import { Pagination } from "#application/shared/pagination.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import { UserEntity } from "#domain/users/entities/user.entity.ts";
import { Maybe } from "#types/maybe.ts";
import { count, eq } from "drizzle-orm";
import { watched } from "../schemas/watched.table.ts";
import { categories, movies, users } from "#infrastructure/db/schema.ts";
import { db } from "#infrastructure/db/db.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { WatchedEntity } from "#domain/users/entities/watched.entity.ts";

export class PostgresUserRepository implements UserRepository {
  async findByName(name: string): Promise<Maybe<UserEntity>> {
    const user_result = await db
      .select()
      .from(users)
      .where(eq(users.name, name))
      .limit(1);

    const user_first = user_result[0] ?? null;

    if (user_first === null) {
      return Maybe.nothing()
    }

    const watched_result = await db
      .select()
      .from(watched)
      .where(eq(watched.user_uuid, user_first.uuid))

    const watched_listed: WatchedEntity[] = [];

    for(const watched_actual of watched_result) {
      const movie_result = await db
        .select()
        .from(movies)
        .where(eq(movies.uuid, watched_actual.movie_uuid))
        .limit(1);

      const movie_first = movie_result[0] ?? null;

      if (movie_first === null) {
        continue;
      }

      const category_result = await db
        .select()
        .from(categories)
        .where(eq(categories.uuid, movie_first.category_uuid));

      const category_first = category_result[0] ?? null;

      if (category_first === null) {
        continue;
      }

      const category = new CategoryEntity(
        category_first.uuid,
        category_first.name
      );

      const movie = new MovieEntity(
        movie_first.uuid,
        movie_first.name,
        movie_first.category_uuid,
        category,
        movie_first.release
      );

      const watched = new WatchedEntity(
        watched_actual.uuid,
        watched_actual.user_uuid,
        watched_actual.movie_uuid,
        movie
      );

      watched_listed.push(watched);
    }

    return Maybe.some(new UserEntity(
      user_first.uuid,
      user_first.name,
      user_first.password,
      watched_listed
    ));
  }

  async findManyPaginated(pagination_options: PaginationOptions): Promise<Pagination<UserEntity>> {
    const total_count_result = await db.select({ count: count() }).from(users);

    const total_count_first = total_count_result[0] ?? null;
    const result = await db
      .select({
        uuid: users.uuid,
        name: users.name,
        password: users.password,
      })
      .from(users)
      .limit(pagination_options.limit)
      .offset((pagination_options.page - 1) * pagination_options.limit);

    const users_listed: UserEntity[] = [];

    let total_count: number  = total_count_first?.count ?? 0;

    for(const user of result) {
      if(total_count === null) {
        total_count = 0;
      }

      const watched_result = await db
        .select()
        .from(watched)
        .where(eq(watched.user_uuid, user.uuid))

      const watched_listed: WatchedEntity[] = [];

      for(const watched_actual of watched_result) {
        const movie_result = await db
          .select()
          .from(movies)
          .where(eq(movies.uuid, watched_actual.movie_uuid))
          .limit(1);

        const movie_first = movie_result[0] ?? null;

        if (movie_first === null) {
          continue;
        }

        const category_result = await db
          .select()
          .from(categories)
          .where(eq(categories.uuid, movie_first.category_uuid));

        const category_first = category_result[0] ?? null;

        if (category_first === null) {
          continue;
        }

        const category = new CategoryEntity(
          category_first.uuid,
          category_first.name
        );

        const movie = new MovieEntity(
          movie_first.uuid,
          movie_first.name,
          movie_first.category_uuid,
          category,
          movie_first.release
        );

        const watched = new WatchedEntity(
          watched_actual.uuid,
          watched_actual.user_uuid,
          watched_actual.movie_uuid,
          movie
        );

        watched_listed.push(watched);
      }

      users_listed.push(new UserEntity(
        user.uuid,
        user.name,
        user.password,
        watched_listed
      ));
    }

    return new Pagination(
      total_count ?? 0,
      pagination_options.limit,
      pagination_options.page,
      users_listed
    );
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    await db.insert(users)
      .values({ 
        uuid: entity.uuid,
        name: entity.name,
        password: entity.password,
      });

    return entity;
  }

  async findByUuid(uuid: string): Promise<Maybe<UserEntity>> {
    const user_result = await db
      .select()
      .from(users)
      .where(eq(users.uuid, uuid));

    const user_first = user_result[0] ?? null;
    if(user_first === null) {
      return Maybe.nothing();
    }

    const watched_result = await db
      .select()
      .from(watched)
      .where(eq(watched.user_uuid, user_first.uuid));

    const watched_listed: WatchedEntity[] = [];

    for(const watched_actual of watched_result) {
      const movie_result = await db
        .select()
        .from(movies)
        .where(eq(movies.uuid, watched_actual.movie_uuid))
        .limit(1);

      const movie_first = movie_result[0] ?? null;

      if (movie_first === null) {
        continue;
      }

      const category_result = await db
        .select()
        .from(categories)
        .where(eq(categories.uuid, movie_first.category_uuid));

      const category_first = category_result[0] ?? null;

      if (category_first === null) {
        continue;
      }

      const category = new CategoryEntity(
        category_first.uuid,
        category_first.name
      );

      const movie = new MovieEntity(
        movie_first.uuid,
        movie_first.name,
        movie_first.category_uuid,
        category,
        movie_first.release
      );

      const watched = new WatchedEntity(
        watched_actual.uuid,
        watched_actual.user_uuid,
        watched_actual.movie_uuid,
        movie
      );

      watched_listed.push(watched);
    }

    return Maybe.some(new UserEntity(
      user_first.uuid,
      user_first.name,
      user_first.password,
      watched_listed
    ));
  }

  async deleteByUuid(uuid: string): Promise<Maybe<UserEntity>> {
    const user_finded = await this.findByUuid(uuid);
    
    if (!user_finded.has_value) {
      return Maybe.nothing();
    }
    
    await db
      .delete(users)
      .where(eq(users.uuid, uuid))

    return user_finded;
  }
}
