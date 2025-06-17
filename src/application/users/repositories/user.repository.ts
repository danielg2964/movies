import type { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { Pagination } from "#application/shared/pagination.ts";
import type { Repository } from "#application/shared/repository.ts";
import type { UserEntity } from "#domain/users/entities/user.entity.ts";
import type { Maybe } from "#types/maybe.ts";

export interface UserRepository extends Repository<UserEntity> {
  findByName(name: string): Promise<Maybe<UserEntity>>;

  findManyPaginated(pagination_options: PaginationOptions): Promise<Pagination<UserEntity>>;
}

