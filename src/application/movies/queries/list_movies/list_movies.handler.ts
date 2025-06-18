import type { MovieFilter } from "#application/movies/movie.filter.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { Pagination } from "#application/shared/pagination.ts";
import type { MovieEntity } from "#domain/movies/entities/movie.entity.ts";

export class ListMoviesHandler {
  constructor(movie_repository: MovieRepository) {
    this.#movie_repository = movie_repository;
  }

  readonly #movie_repository: MovieRepository;

  async handle(filter: MovieFilter, options: PaginationOptions): Promise<Pagination<MovieEntity>> {
    return await this.#movie_repository.findManyByFilterPaginated(filter, options);
  }
}
