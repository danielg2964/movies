import type { MovieDto } from "#infrastructure/movies/dtos/movie.dto.ts";

export class WatchedDto {
  constructor(uuid: string, user_uuid: string, movie_uuid: string, movie: MovieDto) {
    this.uuid = uuid;
    this.user_uuid = user_uuid;
    this.movie_uuid = movie_uuid;
    this.movie = movie;
  }

  readonly uuid: string;
  readonly user_uuid: string;
  readonly movie_uuid: string;
  readonly movie: MovieDto;
}
