import { Entity } from "#domain/shared/entity.ts";
import type { Either } from "#types/either.ts";
import type { Failure } from "#types/failure.ts";

export interface Repository<T extends Entity> {
  save(entity: T): Promise<T>;

  findByUuid(uuid: string): Promise<Either<T, Failure>>;

  deleteByUuid(uuid: string): Promise<Either<T, Failure>>;
}
