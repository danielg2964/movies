import { Entity } from "#domain/shared/entity.ts" ;

import { UserName } from "../user.name.ts";
import { UserPassword } from "../user.password.ts";
import { Failure } from "#types/failure.ts";
import { Maybe } from "#types/maybe.ts";
import type { WatchedEntity } from "./watched.entity.ts";

export class UserEntity extends Entity {
  constructor(
    uuid: string,
    name: string,
    password: string,
    watched: WatchedEntity[]
  ) {
    super(uuid);

    this.#name = new UserName(name);
    this.#password = new UserPassword(password);
    this.#watched = watched;
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

  #watched: WatchedEntity[];
  get watched(): WatchedEntity[] {
    return this.#watched;
  }
  setMoviesWatched(movies_watched: WatchedEntity[]): Maybe<Failure> {
    this.#watched = movies_watched;

    return Maybe.nothing();
  }
}
