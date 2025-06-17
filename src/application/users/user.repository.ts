import { Repository } from "#application/shared/repository.ts";
import type { UserEntity } from "#domain/users/entities/user.entity.ts";
import type { Maybe } from "#types/maybe.ts";

export interface UserRepository extends Repository<UserEntity> {
  findByName(name: string): Promise<Maybe<UserEntity>>;
}

export abstract class UserRepository extends Repository<UserEntity> {
  findByName(_: string): Promise<Maybe<UserEntity>> {
    throw new Error()
  }
}
