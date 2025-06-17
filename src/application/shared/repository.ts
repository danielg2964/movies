import type { Entity } from "#domain/shared/entity.ts";
import type { Maybe } from "#types/maybe.ts";

export interface Repository<T extends Entity> {
  save(entity: T): Promise<T>;

  findByUuid(uuid: string): Promise<Maybe<T>>;

  deleteByUuid(uuid: string): Promise<Maybe<T>>;
}
