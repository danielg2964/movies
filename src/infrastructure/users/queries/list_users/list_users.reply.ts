import { Pagination } from "#application/shared/pagination.ts";
import type { UserEntity } from "#domain/users/entities/user.entity.ts";
import { CategoryDto } from "#infrastructure/movies/dtos/category.dto.ts";
import { MovieDto } from "#infrastructure/movies/dtos/movie.dto.ts";
import { PaginationReply } from "#infrastructure/shared/replies/pagination.reply.ts";
import { UserDto } from "#infrastructure/users/dtos/user.dto.ts";
import { WatchedDto } from "#infrastructure/users/dtos/watched.dto.ts";

export class ListUsersReply extends PaginationReply<UserDto> {
  constructor(pagination: Pagination<UserEntity>) {
    const new_pagination = new Pagination<UserDto>(
      pagination.total_count,
      pagination.limit,
      pagination.actual_page,
      pagination.data.map(u => new UserDto(
        u.uuid,
        u.name,
        u.watched.map(w => new WatchedDto(
          w.uuid,
          w.user_uuid,
          w.movie_uuid,
          new MovieDto(
            w.movie.uuid,
            w.movie.name,
            w.movie.category_uuid,
            new CategoryDto(
              w.movie.category.uuid,
              w.movie.category.name
            ),
            w.movie.release
          ))
        )
      ))
    );

    super(new_pagination, "Ok", "OK", 200);
  }
}
