import { beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { faker } from "@faker-js/faker";
import { WatchMovieCommand } from "#application/users/commands/watch_movie/watch_movie.command.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { WatchedRepository } from "#application/users/repositories/watched.repository.ts";

import { WatchMovieHandler } from "#application/users/commands/watch_movie/watch_movie.handler.ts";
import { Maybe } from "#types/maybe.ts";
import { UserFailures } from "#application/users/failures/user.failures.ts";
import { UserEntity } from "#domain/users/entities/user.entity.ts";
import { MovieFailures } from "#application/movies/failures/movie.failures.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import type { WatchedEntity } from "#domain/users/entities/watched.entity.ts";
import { UserSuccesses } from "#application/users/successes/user.successes.ts";

describe("WatchMovieHandler Test", () => {
  const user_uuid = faker.string.uuid();

  const movie_uuid = faker.string.uuid();

  const command = new WatchMovieCommand(user_uuid, movie_uuid);

  const user = new UserEntity(
    user_uuid,
    faker.internet.displayName(),
    faker.string.alphanumeric({ length: 10 }),
    []
  );

  const movie = new MovieEntity(
    movie_uuid,
    faker.book.title(),
    faker.string.uuid(),
    new CategoryEntity(faker.string.uuid(), faker.book.genre()),
    new Date()
  );
  
  const user_repository_mock: UserRepository = {
    async findByUuid(uuid) {
      assert.equal(uuid, user_uuid);

      return Maybe.some(user);
    }
  } as UserRepository;

  const movie_repository_mock: MovieRepository = {
    async findByUuid(uuid) {
      assert.equal(uuid, movie_uuid);

      return Maybe.some(movie);
    }
  } as MovieRepository;

  const uuid_generator_mock: UuidGenerator = {
    generateUuid() {}
  } as UuidGenerator;

  const watched_repository_mock: WatchedRepository = {
    save(_) {}
  } as WatchedRepository;

  let handler: WatchMovieHandler;

  beforeEach(() => {
    handler = new WatchMovieHandler(user_repository_mock, movie_repository_mock, uuid_generator_mock, watched_repository_mock);
  });

  it("sould return USER_NOT_FOUND Failure", async () => {
    const findByUuidMock = mock.method(user_repository_mock, "findByUuid");
    findByUuidMock.mock.mockImplementationOnce(async uuid => {
      assert.equal(uuid, user_uuid);

      return Maybe.nothing();
    });

    const result = await handler.handle(command);
    assert.equal(result.is_right, true); 

    const right = result.right;
    assert.equal(right, UserFailures.USER_NOT_FOUND);

    assert.equal(findByUuidMock.mock.callCount(), 1);
  });

  it("sould return MOVIE_NOT_FOUND Failure", async () => {
    const findByUuidMock = mock.method(movie_repository_mock, "findByUuid");
    findByUuidMock.mock.mockImplementationOnce(async uuid => {
      assert.equal(uuid, movie_uuid);

      return Maybe.nothing();
    });

    const result = await handler.handle(command);
    assert.equal(result.is_right, true);

    const right = result.right;
    assert.equal(right, MovieFailures.MOVIE_NOT_FOUND)

    assert.equal(findByUuidMock.mock.callCount(), 1);
  });

  it("should return USER_ALREADY_WATCH_THIS_MOVIE", async () => {
    const user_test = new UserEntity(
      user.uuid,
      user.name,
      user.password,
      [movie]
    );

    const findByUuidMock = mock.method(user_repository_mock, "findByUuid");
    findByUuidMock.mock.mockImplementationOnce(async uuid => {
      assert.equal(uuid, user_test.uuid);

      return Maybe.some(user_test);
    });

    const result = await handler.handle(command);
    assert.equal(result.is_right, true);

    const right = result.right;
    assert.equal(right, UserFailures.USER_ALREADY_WATCH_THIS_MOVIE)

    assert.equal(findByUuidMock.mock.callCount(), 1);
  });

  it("should return USER_JUST_WATCH_A_MOVIE Success after creating and saving the WatchedEntity", async () => {
    const uuid_faked = faker.string.uuid();
    const generateUuidMock = mock.method(uuid_generator_mock, "generateUuid");
    generateUuidMock.mock.mockImplementationOnce(() => uuid_faked);

    let watched_saved: WatchedEntity;
    const saveMock = mock.method(watched_repository_mock, "save");
    saveMock.mock.mockImplementationOnce(async watched => {
      assert.equal(watched.user_uuid, user_uuid);
      assert.equal(watched.movie_uuid, movie_uuid);

      watched_saved = watched;

      return watched;
    });

    const result = await handler.handle(command);
    assert.equal(result.is_left, true);

    const left = result.left;
    assert.equal(left, UserSuccesses.USER_JUST_WATCH_A_MOVIE);

    assert.deepEqual(saveMock.mock.callCount(), 1);
    assert.ok(watched_saved!);
  });
})

