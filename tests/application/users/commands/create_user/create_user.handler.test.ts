import {beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { faker } from "@faker-js/faker";

import { Maybe } from "#types/maybe.ts";

import { CreateUserCommand } from "#application/users/commands/create_user/create_user.command.ts";
import { CreateUserHandler } from "#application/users/commands/create_user/create_user.handler.ts";
import { UserEntity } from "#domain/users/entities/user.entity.ts";
import { UserFailures } from "#application/users/failures/user.failures.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import type { Hasher } from "#application/shared/hasher.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";

describe ("CreateUserHandler Test", () => {
  const command = new CreateUserCommand(faker.internet.displayName(), faker.internet.password()); 

  const repository_mock: UserRepository = {
    async findByName(name) {
      assert.equal(name, command.name);
      return Maybe.nothing();
    },
    save(_) {}
  } as UserRepository;

  const uuid_generator_mock: UuidGenerator = {
    generateUuid() {}
  } as UuidGenerator

  const hasher_mock: Hasher = {
    hash(_) {}
  } as Hasher

  let handler: CreateUserHandler

  beforeEach(() => {
    handler = new CreateUserHandler(repository_mock, uuid_generator_mock, hasher_mock);
  })

  it ("should return NAME_IN_USE Failure", async () => {
    const user_finded = new UserEntity(
      faker.string.uuid(),
      faker.internet.displayName(),
      faker.internet.password(),
      []
    );

    const findByNameMock = mock.method(repository_mock, "findByName");

    findByNameMock.mock.mockImplementationOnce(async name => {
      assert.equal(name, command.name);

      return Maybe.some(user_finded);
    })
      
    const result = await handler.handle(command);
    assert.equal(result.is_right, true);
    
    const right = result.right;
    assert.equal(right, UserFailures.USER_NAME_IN_USE);

    assert.equal(findByNameMock.mock.callCount(), 1);
  })

  it ("should create the user successfully", async () => {
    const generateUuidMock = mock.method(uuid_generator_mock, "generateUuid");

    const uuid_faked = faker.string.uuid()
    generateUuidMock.mock.mockImplementationOnce(() => {
      return uuid_faked;
    })

    const hashMock = mock.method(hasher_mock, "hash");

    const hash_faked = faker.string.hexadecimal({ length: 10 })
    hashMock.mock.mockImplementationOnce(async plain => {
      assert.equal(plain, command.password);

      return hash_faked;
    })

    let user_saved: UserEntity;
    const saveMock = mock.method(repository_mock, "save");
    saveMock.mock.mockImplementationOnce(async user => {
      assert.equal(user.uuid, uuid_faked);
      assert.equal(user.name, command.name);
      assert.equal(user.password, hash_faked);
      assert.equal(user.watched.length, 0);

      user_saved = user;

      return user;
    })

    const result = await handler.handle(command);
    assert.equal(result.is_left, true);

    const user = result.left;
    assert.equal(user, user_saved!);
  })
})


