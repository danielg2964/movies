import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { Pagination } from "#application/shared/pagination.ts";
import type { MovieEntity } from "#domain/movies/entities/movie.entity.ts";

export class ListNewMoviesHandler {
  constructor(movie_repository: MovieRepository) {
    this.#movie_repository = movie_repository;
  }

  readonly #movie_repository: MovieRepository;
  
  handle(pagination_options: PaginationOptions): Promise<Pagination<MovieEntity>> {
    return this.#movie_repository.findManyNewMoviesPaginated(pagination_options);
  }
}
