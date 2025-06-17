import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { faker } from "@faker-js/faker";

import { ListNewMoviesHandler } from "#application/movies/queries/list_new_movies/list_new_movies.handler.ts";
import { PaginationOptions } from "#application/shared/pagination.options.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import { Pagination } from "#application/shared/pagination.ts";

describe("ListNewMoviesHandler Test", () => {
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

  const movie_repository: MovieRepository = {
    findManyNewMovies(_) {}
  } as MovieRepository;

  const handler = new ListNewMoviesHandler(movie_repository);

  it("should return Pagination with new movies", async () => {
    let pagination: Pagination<MovieEntity>;

    const findManyNewMoviesMock = mock.method(movie_repository, "findManyNewMovies");
    findManyNewMoviesMock.mock.mockImplementationOnce(async options => {
      assert.deepEqual(options, pagination_options);

      pagination = new Pagination(
        movies.length,
        options.limit,
        options.page,
        movies
      );

      return pagination;
    });

    const result = await handler.handle(pagination_options);

    assert.deepEqual(result, pagination!);
    assert.equal(findManyNewMoviesMock.mock.callCount(), 1);
  });
});

