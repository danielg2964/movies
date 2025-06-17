import { Entity } from "#domain/shared/entity.ts";
import { Uuid } from "#domain/shared/uuid.ts";

import { Either } from "#types/either.ts";
import { Success } from "#types/success.ts";
import { Failure } from "#types/failure.ts";

export class WatchedEntity extends Entity {
  constructor(uuid: string, user_uuid: string, movie_uuid: string) {
    super(uuid);

    this.#user_uuid = new Uuid(user_uuid);
    this.#movie_uuid = new Uuid(movie_uuid);
  }

  #user_uuid: Uuid;
  get user_uuid(): string {
    return this.#user_uuid.value;
  }
  setUserUuuid(user_uuid: string): Either<Success, Failure> {
    this.#user_uuid = new Uuid(user_uuid);

    return Either.left(Success.empty);
  }

  #movie_uuid: Uuid;
  get movie_uuid(): string {
    return this.#movie_uuid.value;
  }
  setMovieUuid(movie_uuid: string): Either<Success, Failure> {
    this.#movie_uuid = new Uuid(movie_uuid);

    return Either.left(Success.empty);
  }
}
