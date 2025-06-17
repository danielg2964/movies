import { beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { faker } from "@faker-js/faker";

import { CreateMovieCommand } from "#application/movies/commands/create_movie/create_movie.command.ts";
import { CreateMovieHandler } from "#application/movies/commands/create_movie/create_movie.handler.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { CategoryRepository } from "#application/movies/repositories/category.repository.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { Maybe } from "#types/maybe.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { MovieFailures } from "#application/movies/failures/movie.failures.ts";
import { CategoryFailures } from "#application/movies/failures/category.failures.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";

describe("CreateMovieHandler Test", () => {
  const category_uuid = faker.string.uuid();

  const command = new CreateMovieCommand(faker.book.title(), category_uuid, new Date());

  const category = new CategoryEntity(category_uuid, faker.book.genre());

  const movie_repository_mock: MovieRepository = {
    async findByName(name) {
      assert.equal(name, command.name);

      return Maybe.nothing();
    },
    save(_) {
    }
  } as MovieRepository;


  const category_repository_mock: CategoryRepository = {
    async findByUuid(uuid) {
      assert.equal(uuid, command.category_uuid);

      return Maybe.some(category);
    }
  } as CategoryRepository;

  const uuid_generator_mock: UuidGenerator = {
    generateUuid() {}
  } as UuidGenerator;

  let handler: CreateMovieHandler;

  beforeEach(() => {
   handler = new CreateMovieHandler(movie_repository_mock, category_repository_mock, uuid_generator_mock); 
  })

  it("should return MOVIE_NAME_IN_USE Failure", async () => {
    const findByNameMock = mock.method(movie_repository_mock, "findByName");

    const movie_finded = new MovieEntity(
      faker.string.uuid(),
      faker.book.title(),
      faker.string.uuid(),
      category,
      new Date()
    );

    findByNameMock.mock.mockImplementationOnce(async name => {
      assert.equal(name, command.name);

      return  Maybe.some(movie_finded);
    })

    const result = await handler.handle(command);
    assert.equal(result.is_right, true);

    const right = result.right;
    assert.equal(right, MovieFailures.MOVIE_NAME_IN_USE)

    assert.equal(findByNameMock.mock.callCount(), 1)
  })

  it("should return CATEGORY_NOT_FOUND Failure", async () => {
    const findByUuidMock = mock.method(category_repository_mock, "findByUuid");
    findByUuidMock.mock.mockImplementationOnce(async uuid => {
      assert.equal(uuid, command.category_uuid);

      return Maybe.nothing()
    })

    const result = await handler.handle(command);
    assert.equal(result.is_right, true);

    const right = result.right;
    assert.equal(right, CategoryFailures.CATEGORY_NOT_FOUND);

    assert.equal(findByUuidMock.mock.callCount(), 1);
  })

  it("should successfully create the movie", async () => {
    const uuid_faked = faker.string.uuid();    
    const generateUuidMock = mock.method(uuid_generator_mock, "generateUuid"); 
    generateUuidMock.mock.mockImplementationOnce(() => {
      return uuid_faked;
    })

    let movie_created: MovieEntity;
    const saveMock = mock.method(movie_repository_mock, "save");
    saveMock.mock.mockImplementationOnce(async movie => {
      assert.equal(movie.uuid, uuid_faked);
      assert.equal(movie.name, command.name);
      assert.equal(movie.category_uuid, category_uuid);
      assert.equal(movie.category.equals(category), true);
      assert.equal(movie.release, command.release);
      assert.equal(movie.is_new, true);

      movie_created = movie;

      return movie;
    })

    const result = await handler.handle(command);
    assert.equal(result.is_left, true);

    assert.equal(generateUuidMock.mock.callCount(), 1);
    assert.equal(saveMock.mock.callCount(), 1);

    const left = result.left;
    assert.deepEqual(left, movie_created!);
  });
})

