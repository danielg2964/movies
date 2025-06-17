export class WatchMovieCommand {
  constructor(user_uuid: string, movie_uuid: string) {
    this.#user_uuid = user_uuid;
    this.#movie_uuid = movie_uuid;
  }

  readonly #user_uuid: string;
  get user_uuid(): string {
    return this.#user_uuid;
  }

  readonly #movie_uuid: string;
  get movie_uuid(): string {
    return this.#movie_uuid;
  }
}
