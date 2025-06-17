import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import type { WatchedRepository } from "#application/users/repositories/watched.repository.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import { Either } from "#types/either.ts";
import { Failure } from "#types/failure.ts";
import type { Success } from "#types/success.ts";

import { WatchMovieCommand } from "./watch_movie.command.ts";
import { UserFailures } from "#application/users/failures/user.failures.ts";
import { MovieFailures } from "#application/movies/failures/movie.failures.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import { WatchedEntity } from "#domain/users/entities/watched.entity.ts";
import { UserSuccesses } from "#application/users/successes/user.successes.ts";

export class WatchMovieHandler {
  constructor(
    user_repository: UserRepository,
    movie_repository: MovieRepository,
    uuid_generator: UuidGenerator,
    watched_repository: WatchedRepository
  ) {
    this.#user_repository = user_repository;
    this.#movie_repository = movie_repository;
    this.#uuid_generator = uuid_generator;
    this.#watched_repository = watched_repository;
  }

  readonly #user_repository: UserRepository;
  readonly #movie_repository: MovieRepository;
  readonly #uuid_generator: UuidGenerator;
  readonly #watched_repository: WatchedRepository;

  async handle(command: WatchMovieCommand): Promise<Either<Success, Failure>> {
    const maybe_user_finded = await this.#user_repository.findByUuid(command.user_uuid);

    if (!maybe_user_finded.has_value) {
      return Either.right(UserFailures.USER_NOT_FOUND);
    }
    
    const user_finded = maybe_user_finded.value;

    const maybe_movie_finded = await this.#movie_repository.findByUuid(command.movie_uuid);

    if (!maybe_movie_finded.has_value) {
      return Either.right(MovieFailures.MOVIE_NOT_FOUND);
    }

    const movie_finded = maybe_movie_finded.value;

    if (user_finded.movies_watched.some(m => m.equals(movie_finded))) {
      return Either.right(UserFailures.USER_ALREADY_WATCH_THIS_MOVIE);
    }
    
    const watched = new WatchedEntity(
      this.#uuid_generator.generateUuid(),
      user_finded.uuid,
      movie_finded.uuid
    );

    await this.#watched_repository.save(watched);

    return Either.left(UserSuccesses.USER_JUST_WATCH_A_MOVIE);
  }
}
