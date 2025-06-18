import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequest } from "./create_user.request.ts";
import type { CreateUserHandler } from "#application/users/commands/create_user/create_user.handler.ts";
import { CreateUserCommand } from "#application/users/commands/create_user/create_user.command.ts";
import { FailureReply } from "#infrastructure/shared/replies/failure.reply.ts";
import { CreateUserReply } from "./create_user.reply.ts";

export class CreateUserController {
  constructor(handler: CreateUserHandler) {
    this.#handler = handler;
  }

  readonly #handler: CreateUserHandler;

  readonly handle = async (req: FastifyRequest<{Body: CreateUserRequest}>, rep: FastifyReply) => {
    const command = new CreateUserCommand(req.body.name, req.body.password);

    const result = await this.#handler.handle(command);

    if(result.is_right) {
      rep.send(new FailureReply(result.right));
    } else {
      rep.send(new CreateUserReply(result.left));
    }
  }
}
