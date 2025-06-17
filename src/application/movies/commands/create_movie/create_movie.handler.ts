import { CategoryFailures } from "#application/movies/failures/category.failures.ts";
import { MovieFailures } from "#application/movies/failures/movie.failures.ts";
import type { CategoryRepository } from "#application/movies/repositories/category.repository.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { Either } from "#types/either.ts";
import { Failure } from "#types/failure.ts";
import type { CreateMovieCommand } from "./create_movie.command.ts";

export class CreateMovieHandler {
  constructor(movie_repository: MovieRepository, category_repository: CategoryRepository, uuid_generator: UuidGenerator) {
    this.#movie_repository = movie_repository;
    this.#category_repository = category_repository;
    this.#uuid_generator = uuid_generator;
  }

  readonly #movie_repository: MovieRepository;
  readonly #category_repository: CategoryRepository;
  readonly #uuid_generator: UuidGenerator;

  async handle(command: CreateMovieCommand): Promise<Either<MovieEntity, Failure>> {
    const maybe_movie_finded = await this.#movie_repository.findByName(command.name);

    if (maybe_movie_finded.has_value) {
      return Either.right(MovieFailures.MOVIE_NAME_IN_USE);
    }

    const maybe_category_finded = await this.#category_repository.findByUuid(command.category_uuid);

    if (!maybe_category_finded.has_value) {
      return Either.right(CategoryFailures.CATEGORY_NOT_FOUND);
    }

    const category_finded = maybe_category_finded.value;

    const movie = new MovieEntity(
      this.#uuid_generator.generateUuid(),
      command.name,
      command.category_uuid,
      category_finded,
      command.release
    );

    const movie_saved = await this.#movie_repository.save(movie);

    return Either.left(movie_saved);
  }
}
