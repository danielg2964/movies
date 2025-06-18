import { describe, it, mock } from "node:test";
import assert from "node:assert/strict"

import { faker } from "@faker-js/faker"
import { UserEntity } from "#domain/users/entities/user.entity.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import { Pagination } from "#application/shared/pagination.ts";
import { ListUsersHandler } from "#application/users/queries/list_users/list_users.handler.ts";
import { WatchedEntity } from "#domain/users/entities/watched.entity.ts";

describe("ListUsers Test", () => {
  const users: UserEntity[] = new Array(5).map(_ => {
    const user_uuid = faker.string.uuid();

    return new UserEntity(
      user_uuid,
      faker.internet.displayName(),
      faker.string.alphanumeric({ length: 10 }),
      new Array(5).map(_ => {
        const category_uuid = faker.string.uuid();

        const movie = new MovieEntity(
          faker.string.uuid(),
          faker.book.title(),
          category_uuid,
          new CategoryEntity(category_uuid, faker.book.genre()),
          new Date()
        )

        return new WatchedEntity(
          faker.string.uuid(),
          user_uuid,
          movie.uuid,
          movie
        );
       }
      )
    )
  });

  const pagination_options = new PaginationOptions(1, users.length);

  const user_repository_mock: UserRepository = {
    findManyPaginated(_) {}
  } as UserRepository;
  
  const handler = new ListUsersHandler(user_repository_mock);

  it ("Should return users paginated", async () => {
    let pagination: Pagination<UserEntity>

    const findManyPaginatedMock = mock.method(user_repository_mock, "findManyPaginated");
    findManyPaginatedMock.mock.mockImplementation(async options => {
      assert.equal(options.page, pagination_options.page);
      assert.equal(options.limit, pagination_options.limit);

      pagination = new Pagination(
        users.length,
        options.limit,
        options.page,
        users
      );

      return pagination;
    });

    const result = await handler.handle(pagination_options);
    
    assert.deepEqual(result, pagination!);
  });
});

