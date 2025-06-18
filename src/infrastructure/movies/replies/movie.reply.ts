import type { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { Reply } from "../../shared/reply.ts";
import { CategoryDto } from "../dtos/category.dto.ts";
import { MovieDto } from "../dtos/movie.dto.ts";

export class MovieReply extends Reply {
  constructor(movie: MovieEntity, message: string, code: string, status_code: number) {
    super(message, code, status_code);

    this.movie = new MovieDto(
      movie.uuid,
      movie.name,
      movie.category_uuid,
      new CategoryDto(
        movie.category.uuid,
        movie.category.name
      ),
      movie.release
    );
  }

  readonly movie: MovieDto;
}
