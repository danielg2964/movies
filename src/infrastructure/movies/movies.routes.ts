import { CreateMovieHandler } from "#application/movies/commands/create_movie/create_movie.handler.ts";
import type { CategoryRepository } from "#application/movies/repositories/category.repository.ts";
import type { MovieRepository } from "#application/movies/repositories/movie.repository.ts";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import type { FastifyInstance } from "fastify";
import { CreateMovieController } from "./commands/create_movie/create_movie.controller.ts";
import { CreateMovieRequest } from "./commands/create_movie/create_movie.request.ts";
import { ListMoviesHandler } from "#application/movies/queries/list_movies/list_movies.handler.ts";
import { ListMoviesController } from "./queries/list_movies/list_movies.controller.ts";
import { ListMoviesQuery } from "./queries/list_movies/list_movies.query.ts";
import { ListNewMoviesController } from "./queries/list_new_movies/list_new_movies.controller.ts";
import { ListNewMoviesHandler } from "#application/movies/queries/list_new_movies/list_new_movies.handler.ts";
import { PaginationQuery } from "#infrastructure/shared/queries/pagination.query.ts";

export class MoviesRoutes {
  constructor(
    movie_repository: MovieRepository,
    category_repository: CategoryRepository,
    uuid_generator: UuidGenerator

  ) {
    this.#movie_repository = movie_repository;
    this.#category_repository = category_repository;
    this.#uuid_generator = uuid_generator;
  }

  readonly #movie_repository: MovieRepository;
  readonly #category_repository: CategoryRepository;
  readonly #uuid_generator: UuidGenerator;

  readonly registerRoutes = async (app: FastifyInstance) => {
    // create-movie
    const create_movie_handler = new CreateMovieHandler(
      this.#movie_repository,
      this.#category_repository,
      this.#uuid_generator
    );

    const create_movie_controller = new CreateMovieController(
      create_movie_handler
    );

    app.route({
      method: "POST",
      url: "/create-movie",
      schema: {
        body: CreateMovieRequest
      },
      handler: create_movie_controller.handle
    })

    // list-movies
    const list_movies_handler = new ListMoviesHandler(this.#movie_repository);

    const list_movies_controller = new ListMoviesController(list_movies_handler);

    app.route({
      method: "GET",
      url: "/list-movies",
      schema: {
        querystring: ListMoviesQuery
      },
      handler: list_movies_controller.handle
    })

    // list-new-movies
    const list_new_movies_handler = new ListNewMoviesHandler(this.#movie_repository);

    const list_new_movies_controller = new ListNewMoviesController(list_new_movies_handler);

    app.route({
      method: "GET",
      url: "/list-new-movies",
      schema: {
        querystring: PaginationQuery
      },
      handler: list_new_movies_controller.handle
    })
  };
}
