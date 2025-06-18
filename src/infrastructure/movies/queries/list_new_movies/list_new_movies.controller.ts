import type { ListNewMoviesHandler } from "#application/movies/queries/list_new_movies/list_new_movies.handler.ts";
import { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { PaginationQuery } from "#infrastructure/shared/queries/pagination.query.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ListNewMoviesReply } from "./list_new_movies.reply.ts";

export class ListNewMoviesController {
  constructor(handler: ListNewMoviesHandler) {
    this.#handler = handler;
  }

  readonly #handler: ListNewMoviesHandler;

  readonly handle = async (req: FastifyRequest<{Querystring:PaginationQuery}>, rep: FastifyReply) => {
    const pagination_options = new PaginationOptions(
      req.query.page,
      req.query.limit
    ); 

    const result = await this.#handler.handle(pagination_options);

    const reply = new ListNewMoviesReply(result);

    rep.code(reply.status_code).send(reply);
  }
}
