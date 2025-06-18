import type { Hasher } from "#application/shared/hasher.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import { CreateUserHandler } from "#application/users/commands/create_user/create_user.handler.ts";
import type { UserRepository } from "#application/users/repositories/user.repository.ts";
import type { FastifyInstance } from "fastify";
import { CreateUserController } from "./commands/create_user/create_user.controller.ts";
import { CreateUserRequest } from "./commands/create_user/create_user.request.ts";
import { ListUsersHandler } from "#application/users/queries/list_users/list_users.handler.ts";
import { ListUsersController } from "./queries/list_users/list_users.controller.ts";
import { PaginationQuery } from "#infrastructure/shared/queries/pagination.query.ts";
import { WatchMovieHandler } from "#application/users/commands/watch_movie/watch_movie.handler.ts";
import type { WatchedRepository } from "#application/users/repositories/watched.repository.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import { WatchMovieController } from "./commands/watch_movie/watch_movie.controller.ts";
import { WatchMovieRequest } from "./commands/watch_movie/watch_movie.request.ts";

export class UsersRoutes {
  constructor(
    user_repository: UserRepository,
    watched_repository: WatchedRepository,
    movie_repository: MovieRepository,
    uuid_generator: UuidGenerator,
    hasher: Hasher
  ){
    this.#user_repository = user_repository;
    this.#watched_repository = watched_repository;
    this.#movie_repository = movie_repository;
    this.#uuid_generator = uuid_generator;
    this.#hasher = hasher;
  }

  readonly #user_repository: UserRepository;
  readonly #watched_repository: WatchedRepository;
  readonly #movie_repository: MovieRepository;
  readonly #uuid_generator: UuidGenerator;
  readonly #hasher: Hasher

  readonly registerRoutes = async (app: FastifyInstance) => {
    // create-user
    const create_user_handler = new CreateUserHandler(this.#user_repository, this.#uuid_generator, this.#hasher);
    const create_user_controller = new CreateUserController(create_user_handler);

    app.route({
      method: "POST",
      url: "/create-user",
      schema: {
        body: CreateUserRequest,
      },
      handler: create_user_controller.handle
    });

    // watch-movie
    const watch_movie_handler = new WatchMovieHandler(
      this.#user_repository,
      this.#movie_repository,
      this.#uuid_generator,
      this.#watched_repository
    );
    const watch_movie_controller = new WatchMovieController(watch_movie_handler);
    app.route({
      method: "POST",
      url: "/watch-movie",
      schema: {
        body: WatchMovieRequest
      },
      handler: watch_movie_controller.handle
    })


    // list-users
    const list_users_handler = new ListUsersHandler(this.#user_repository);
    const list_users_controller = new ListUsersController(list_users_handler);
    app.route({
      method: "GET",
      url: "/list-users",
      schema: {
        querystring: PaginationQuery,
      },
      handler: list_users_controller.handle
    });
  }
}
