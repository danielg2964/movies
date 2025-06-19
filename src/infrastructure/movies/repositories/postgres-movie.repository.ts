import { eq, and, asc, desc, ilike, count, gt } from "drizzle-orm";
import { db } from "#infrastructure/db/db.ts"
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { MovieFilter } from "#application/movies/movie.filter.ts";
import type { PaginationOptions } from "#application/shared/pagination.options.ts";
import { Pagination } from "#application/shared/pagination.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { Maybe } from "#types/maybe.ts";
import { movies } from "../schemas/movie.schema.ts";
import { categories } from "../schemas/category.schema.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { MoviesConstants } from "#domain/movies/constants/movies.constants.ts";

export class PostgresMovieRepository implements MovieRepository {
  async findByName(name: string): Promise<Maybe<MovieEntity>> {
    const result = await db
      .select()
      .from(movies)
      .where(eq(movies.name, name))
      .innerJoin(categories, eq(movies.category_uuid, categories.uuid))
      .limit(1)

    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }
    
    const movie = new MovieEntity(
      first.movies.uuid,
      first.movies.name,
      first.movies.category_uuid,
      new CategoryEntity(first.categories.uuid, first.categories.name),
      new Date(first.movies.release)
    );

    return Maybe.some(movie);
  }

  async findManyByCategoryUuid(uuid: string): Promise<MovieEntity[]> {
    const result = await db
      .select()
      .from(movies)
      .innerJoin(categories, eq(categories.uuid, uuid));

    const mapped = result.map(x => {
      return new MovieEntity(
        x.movies.uuid,
        x.movies.name,
        x.movies.category_uuid,
        new CategoryEntity(x.categories.uuid, x.categories.name),
        new Date(x.movies.release)
      );
    })

    return mapped;
  }

  async findManyByCategoryName(name: string): Promise<MovieEntity[]> {
    const result = await db
      .select()
      .from(movies)
      .innerJoin(categories, eq(categories.uuid, name));

    const mapped = result.map(x => {
      return new MovieEntity(
        x.movies.uuid,
        x.movies.name,
        x.movies.category_uuid,
        new CategoryEntity(x.categories.uuid, x.categories.name),
        new Date(x.movies.release)
      );
    })

    return mapped;
  }

  async findManyByFilter(movie_filter: MovieFilter): Promise<MovieEntity[]> {
    const result = await db.select()
      .from(movies)
      .innerJoin(categories, and(
        movie_filter.category_uuid.has_value
        ? eq(categories.uuid, movie_filter.category_uuid.value)
        : undefined,
        movie_filter.category_name.has_value
        ? ilike(categories.name, movie_filter.category_name.value)
        : undefined
      ))
      .where(and(
        movie_filter.name.has_value
        ? ilike(movies.name, movie_filter.name.value)
        : undefined,
        movie_filter.release.has_value
        ? eq(movies.release, movie_filter.release.value)
        : undefined
      ))
      .orderBy(
        movie_filter.order_by.has_value
        && movie_filter.order_by.value === MoviesConstants.ORDER_ASC
        ? asc(movies.release)
        : desc(movies.release)
      );

    const mapped = result.map(x => {
      return new MovieEntity(
        x.movies.uuid,
        x.movies.name,
        x.movies.category_uuid,
        new CategoryEntity(x.categories.uuid, x.categories.name),
        new Date(x.movies.release)
      );
     });

    return mapped;
  }

  async findManyByFilterPaginated(movie_filter: MovieFilter, pagination_options: PaginationOptions): Promise<Pagination<MovieEntity>> {
    const query = and(
      movie_filter.name.has_value
      ? ilike(movies.name, movie_filter.name.value)
      : undefined,
      movie_filter.release.has_value
      ? eq(movies.release, movie_filter.release.value)
      : undefined
    );

    const total_count_result = await db
      .select({ count: count() })
      .from(movies)
      .where(query);

    const total_count_first = total_count_result[0] ?? null;

    
    const result = await db
      .select({
        uuid: movies.uuid,
        name: movies.name,
        category_uuid: movies.category_uuid,
        release: movies.release
      })
      .from(movies)
      .where(query)
      .orderBy(
        movie_filter.order_by.has_value
        && movie_filter.order_by.value === MoviesConstants.ORDER_ASC
        ? asc(movies.release)
        : desc(movies.release)
      )
      .limit(pagination_options.limit)
      .offset((pagination_options.page - 1) * pagination_options.limit);

    let total_count = total_count_first?.count ?? 0;

    const movies_listed: MovieEntity[] = [];

    for(const movie of result) {
      const category_result = await db
        .select()
        .from(categories)
        .where(and(
          eq(categories.uuid, movie.category_uuid),
          movie_filter.category_name.has_value
          ? ilike(categories.name, movie_filter.category_name.value)
          : undefined,
          movie_filter.category_uuid.has_value
          ? eq(categories.uuid, movie_filter.category_uuid.value)
          : undefined
        ))
        .limit(1);

      const category_first = category_result[0] ?? null;
      if (category_first === null) {
        if (total_count > 0) {
          total_count = total_count - 1;
        }
        continue;
      }

      const category = new CategoryEntity(
        category_first.uuid,
        category_first.name
      );

      movies_listed.push(new MovieEntity(
        movie.uuid,
        movie.name,
        movie.category_uuid,
        category,
        movie.release
      ))
    }

    return new Pagination(
      total_count,
      pagination_options.limit,
      pagination_options.page,
      movies_listed
    );
  }

  async findManyNewMoviesPaginated(pagination_options: PaginationOptions): Promise<Pagination<MovieEntity>> {
    const three_weeks_ago = new Date();
    three_weeks_ago.setDate(three_weeks_ago.getDate() - 21);

    const total_count_result = await db
      .select({ count: count() })
      .from(movies);

    const total_count_first = total_count_result[0] ?? null;

    const result = await db
      .select({
        uuid: movies.uuid,
        name: movies.name,
        category_uuid: movies.category_uuid,
        release: movies.release
      })
      .from(movies)
      .where(gt(movies.release, three_weeks_ago))
      .limit(pagination_options.limit)
      .offset((pagination_options.page - 1) * pagination_options.limit);

    let total_count = total_count_first?.count ?? 0;

    const movies_listed: MovieEntity[] = [];

    for(const movie of result) {
      const category_result = await db
        .select()
        .from(categories)
        .where(eq(categories.uuid, movie.category_uuid))
        .limit(1);

      const category_first = category_result[0] ?? null;
      if (category_first === null) {
        if (total_count > 0) {
          total_count = total_count - 1;
        }
        continue;
      }

      const category = new CategoryEntity(
        category_first.uuid,
        category_first.name
      );

      movies_listed.push(new MovieEntity(
        movie.uuid,
        movie.name,
        movie.category_uuid,
        category,
        movie.release
      ))
    }

    return new Pagination(
      total_count,
      pagination_options.limit,
      pagination_options.page,
      movies_listed
    );  
  }
  
  async findByDate(date: Date): Promise<Maybe<MovieEntity>> {
    const result = await db.select()
      .from(movies)
      .innerJoin(categories, eq(categories.uuid, movies.category_uuid))
      .where(eq(movies.release, date))
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

    return Maybe.some(movie);
  }

  async save(entity: MovieEntity): Promise<MovieEntity> {
    await db
      .insert(movies)
      .values({
        uuid: entity.uuid,
        name: entity.name,
        category_uuid: entity.category_uuid,
        release: entity.release
      });

    return entity;
  }

  async findByUuid(uuid: string): Promise<Maybe<MovieEntity>> {
    const result = await db.select()
      .from(movies)
      .innerJoin(categories, eq(categories.uuid, movies.category_uuid))
      .where(eq(movies.uuid, uuid))
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

    return Maybe.some(movie);
  }

  async deleteByUuid(uuid: string): Promise<Maybe<MovieEntity>> {
    const result = await db
      .delete(movies)
      .where(eq(movies.uuid, uuid))
      .returning();
 
    const first = result[0] ?? null;

    if (first === null) {
      return Maybe.nothing();
    }
    
    const result_category = await db
      .select()
      .from(categories)
      .where(eq(categories.uuid, first.category_uuid))
      .limit(1);

    const first_category = result_category[0] ?? null;

    if (first_category === null) {
      return Maybe.nothing();
    }

    const movie = new MovieEntity(
      first.uuid,
      first.name,
      first.category_uuid,
      new CategoryEntity(first_category.uuid, first_category.name),
      first.release
    );

    return Maybe.some(movie);
  }
}
