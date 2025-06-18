import type { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { Pagination } from "#application/shared/pagination.ts";
import type { Repository } from "#application/shared/repository.ts";
import type { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import type { Maybe } from "#types/maybe.ts";
import type { MovieFilter } from "../movie.filter.ts";

export interface MovieRepository extends Repository<MovieEntity> {
  findByName(name: string): Promise<Maybe<MovieEntity>>;

  findManyByCategoryUuid(uuid: string): Promise<MovieEntity[]>;

  findManyByCategoryName(name: string): Promise<MovieEntity[]>;

  findManyByFilter(movie_filter: MovieFilter): Promise<MovieEntity[]>;

  findManyByFilterPaginated(movie_filter: MovieFilter, pagination_options: PaginationOptions): Promise<Pagination<MovieEntity>>;

  findManyNewMoviesPaginated(pagination_options: PaginationOptions): Promise<Pagination<MovieEntity>>;
  
  findByDate(date: Date): Promise<Maybe<MovieEntity>>;
}
