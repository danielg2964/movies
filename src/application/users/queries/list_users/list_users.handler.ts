import type { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { Pagination } from "#application/shared/pagination.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import type { UserEntity } from "#domain/users/entities/user.entity.ts";

export class ListUsersHandler {
  constructor(user_repository: UserRepository) {
    this.#user_repository = user_repository;
  }

  readonly #user_repository: UserRepository;

  async handle(options: PaginationOptions): Promise<Pagination<UserEntity>> {
    return await this.#user_repository.findManyPaginated(options);
  }
}
