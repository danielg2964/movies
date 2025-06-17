import { Entity } from "#domain/shared/entity.ts" ;
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";

import { UserName } from "../user.name.ts";
import { UserPassword } from "../user.password.ts";
import { Failure } from "#types/failure.ts";
import { Maybe } from "#types/maybe.ts";

export class UserEntity extends Entity {
  constructor(
    uuid: string,
    name: string,
    password: string,
    movies_watched: MovieEntity[]
  ) {
    super(uuid);

    this.#name = new UserName(name);
    this.#password = new UserPassword(password);
    this.#movies_watched = movies_watched;
  }

  #name: UserName;
  get name(): string {
    return this.#name.value;
  }
  setName(name: string): Maybe<Failure> {
    this.#name = new UserName(name);

    return Maybe.nothing();
  }


  #password: UserPassword;
  get password(): string {
    return this.#password.value;
  }
  setPassword(password: string): Maybe<Failure> {
    this.#password = new UserPassword(password);

    return Maybe.nothing()
  }

  #movies_watched: MovieEntity[];
  get movies_watched(): MovieEntity[] {
    return this.#movies_watched;
  }
  setMoviesWatched(movies_watched: MovieEntity[]): Maybe<Failure> {
    this.#movies_watched = movies_watched;

    return Maybe.nothing();
  }
}
