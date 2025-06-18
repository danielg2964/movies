import { Pagination } from "#application/shared/pagination.ts";
import type { MovieEntity } from "#domain/movies/entities/movie.entity.ts";
import { CategoryDto } from "#infrastructure/movies/dtos/category.dto.ts";
import { MovieDto } from "#infrastructure/movies/dtos/movie.dto.ts";
import { PaginationReply } from "../../../shared/replies/pagination.reply.ts";

export class ListMoviesReply extends PaginationReply<MovieDto> {
  constructor(pagination: Pagination<MovieEntity>) {
    const new_pagination = new Pagination<MovieDto>(
      pagination.total_count,
      pagination.limit,
      pagination.actual_page,
      pagination.data.map(m => new MovieDto(
        m.uuid,
        m.name,
        m.category_uuid,
        new CategoryDto(m.category.uuid, m.category.name),
        m.release
      ))
    );

    super(new_pagination, "Ok", "OK", 200);
  }
}
