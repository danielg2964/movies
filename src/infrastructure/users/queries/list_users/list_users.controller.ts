import { PaginationOptions } from "#application/shared/pagination.options.ts";
import type { ListUsersHandler } from "#application/users/queries/list_users/list_users.handler.ts";
import type { PaginationQuery } from "#infrastructure/shared/queries/pagination.query.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersReply } from "./list_users.reply.ts";

export class ListUsersController {
  constructor(list_users_handler: ListUsersHandler) {
    this.#list_users_handler = list_users_handler;
  }

  readonly #list_users_handler: ListUsersHandler;

  readonly handle = async (req: FastifyRequest<{Querystring: PaginationQuery}>, rep: FastifyReply) => {
    const pagination_options = new PaginationOptions(req.query.page, req.query.limit);

    const result = await this.#list_users_handler.handle(pagination_options);

    const reply = new ListUsersReply(result);

    rep.code(reply.status_code).send(reply);
  }
}
