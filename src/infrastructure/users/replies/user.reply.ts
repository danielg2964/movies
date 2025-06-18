import type { UserEntity } from "#domain/users/entities/user.entity.ts";
import { CategoryDto } from "#infrastructure/movies/dtos/category.dto.ts";
import { MovieDto } from "#infrastructure/movies/dtos/movie.dto.ts";
import { Reply } from "#infrastructure/shared/reply.ts";
import { UserDto } from "../dtos/user.dto.ts";
import { WatchedDto } from "../dtos/watched.dto.ts";

export class UserReply extends Reply {
  constructor(user: UserEntity, message: string, code: string, status_code: number) {
    super(message, code, status_code);

    this.user = new UserDto(
      user.uuid,
      user.name,
      user.watched.map(w => new WatchedDto(
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
        )
      ))
    );
  }
  
  readonly user: UserDto;
}
