import type { FastifyReply, FastifyRequest } from "fastify";
import type { ListMoviesQuery } from "./list_movies.query.ts";
import { MovieFilter } from "#application/movies/movie.filter.ts";
import { Maybe } from "#types/maybe.ts";
import { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { ListMoviesHandler } from "#application/movies/queries/list_movies/list_movies.handler.ts";
import { ListMoviesReply } from "./list_movies.reply.ts";

export class ListMoviesController {
  constructor(handler: ListMoviesHandler) {
    this.#handler = handler;
  }

  readonly #handler: ListMoviesHandler;

  readonly handle = async (req: FastifyRequest<{Querystring:ListMoviesQuery}>, rep: FastifyReply) => {
    const query = req.query;

    const filter = new MovieFilter(
      query.name === null || query.name === undefined
      ? Maybe.nothing()
      : Maybe.some(query.name),
      query.category_uuid === null || query.category_uuid === undefined 
      ? Maybe.nothing()
      : Maybe.some(query.category_uuid),
      query.category_name === null || query.category_name === undefined 
      ? Maybe.nothing()
      : Maybe.some(query.category_name),
      query.release === null || query.release === undefined 
      ? Maybe.nothing()
      : Maybe.some(new Date(query.release)),
      query.order === null || query.order === undefined 
      ? Maybe.nothing()
      : Maybe.some(query.order)
    );

    const pagination_options = new PaginationOptions(
      query.page,
      query.limit
    );

    const result = await this.#handler.handle(filter, pagination_options);

    const reply = new ListMoviesReply(result);

    rep.code(reply.status_code).send(reply);
  }
}
