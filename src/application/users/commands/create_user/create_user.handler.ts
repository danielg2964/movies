import type { Hasher } from "#application/shared/hasher.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import { UserFailures } from "#application/users/failures/user.failures.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import { UserEntity } from "#domain/users/entities/user.entity.ts";
import { Either } from "#types/either.ts";
import { Failure } from "#types/failure.ts";
import type { CreateUserCommand } from "./create_user.command.ts";

export class CreateUserHandler {
  constructor(repository: UserRepository, uuid_generator: UuidGenerator, hasher: Hasher) {
    this.#repository = repository;
    this.#uuid_generator = uuid_generator;
    this.#hasher = hasher;
  }

  readonly #repository: UserRepository;
  readonly #uuid_generator: UuidGenerator;
  readonly #hasher: Hasher;

  async handle(command: CreateUserCommand): Promise<Either<UserEntity, Failure>> {
    const maybe_user_finded = await this.#repository.findByName(command.name);

    if (maybe_user_finded.has_value) {
      return Either.right(UserFailures.USER_NAME_IN_USE);
    }

    const uuid: string = this.#uuid_generator.generateUuid();
    const hash: string = await this.#hasher.hash(command.password);

    const user = new UserEntity(uuid, command.name, hash, []);
    const user_saved = await this.#repository.save(user);

    return Either.left(user_saved);
  }
}
