import type { Maybe } from "#types/maybe.ts";

import type { Repository } from "#application/shared/repository.ts";

import type { WatchedEntity } from "#domain/users/entities/watched.entity.ts";

export interface WatchedRepository extends Repository<WatchedEntity> {
  findByUserUuid(uuid: string): Promise<Maybe<WatchedEntity>>;

  findByMovieUuid(uuid: string): Promise<Maybe<WatchedEntity>>;
}
