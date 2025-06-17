import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { faker } from "@faker-js/faker";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { PaginationOptions } from "#application/shared/pagination.options.ts";
import { MovieFilter } from "#application/movies/movie.filter.ts";
import { Maybe } from "#types/maybe.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import { ListMoviesHandler } from "#application/movies/queries/list_movies/list_movies.handler.ts";
import { Pagination } from "#application/shared/pagination.ts";

describe("ListMovies Test", () => {
  const movies: MovieEntity[] = Array(30).map(_ => {
        const category_uuid = faker.string.uuid();
        return new MovieEntity(
          faker.string.uuid(),
          faker.book.title(),
          category_uuid,
          new CategoryEntity(category_uuid, faker.book.genre()),
          new Date()
        );
  })

  const pagination_options = new PaginationOptions(1, movies.length);
  const movie_filter = new MovieFilter(
    Maybe.some(faker.book.title()),
    Maybe.some(faker.string.uuid()),
    Maybe.some(faker.book.genre()),
    Maybe.some(new Date()),
    Maybe.some("older")
  );

  const movie_repository: MovieRepository = {
    findManyByFilterPaginated(_,__) {}
  } as MovieRepository;

  const handler = new ListMoviesHandler(movie_repository);

  it("should return Pagination with the movies", async () => {
    let pagination: Pagination<MovieEntity>;

    const findManyByFilterPaginatedMock = mock.method(movie_repository, "findManyByFilterPaginated");
    findManyByFilterPaginatedMock.mock.mockImplementationOnce(async (filter, options) => {
      assert.deepEqual(filter, movie_filter);
      assert.deepEqual(options, pagination_options);

      pagination = new Pagination(
        movies.length,
        options.limit,
        options.page,
        movies
      );

      return pagination;
    });

    const result = await handler.handle(movie_filter, pagination_options);
    assert.deepEqual(result, pagination!);

    assert.equal(findManyByFilterPaginatedMock.mock.callCount(), 1);
  })
})

