import { Entity } from "#domain/shared/entity.ts";
import { Uuid } from "#domain/shared/uuid.ts";

import { Failure } from "#types/failure.ts";
import type { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { Maybe } from "#types/maybe.ts";

export class WatchedEntity extends Entity {
  constructor(uuid: string, user_uuid: string, movie_uuid: string, movie: MovieEntity) {
    super(uuid);

    this.#user_uuid = new Uuid(user_uuid);
    this.#movie_uuid = new Uuid(movie_uuid);
    this.#movie = movie;
  }

  #user_uuid: Uuid;
  get user_uuid(): string {
    return this.#user_uuid.value;
  }
  setUserUuuid(user_uuid: string): Maybe<Failure> {
    this.#user_uuid = new Uuid(user_uuid);

    return Maybe.nothing();
  }

  #movie_uuid: Uuid;
  get movie_uuid(): string {
    return this.#movie_uuid.value;
  }
  setMovieUuid(movie_uuid: string): Maybe<Failure> {
    this.#movie_uuid = new Uuid(movie_uuid);

    return Maybe.nothing();
  }

  #movie: MovieEntity;
  get movie(): MovieEntity {
    return this.#movie;
  }
  setMovie(movie: MovieEntity): Maybe<Failure> {
    this.#movie = movie;

    return Maybe.nothing();
  }
}
