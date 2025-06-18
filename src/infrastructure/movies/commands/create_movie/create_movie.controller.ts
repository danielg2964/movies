import type { CreateMovieHandler } from "#application/movies/commands/create_movie/create_movie.handler.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateMovieRequest } from "./create_movie.request.ts";
import { CreateMovieCommand } from "#application/movies/commands/create_movie/create_movie.command.ts";
import { FailureReply } from "#infrastructure/shared/replies/failure.reply.ts";
import { MovieReply } from "#infrastructure/movies/replies/movie.reply.ts";

export class CreateMovieController {
  constructor(handler: CreateMovieHandler) {
    this.#handler = handler;
  }

  readonly #handler: CreateMovieHandler;

  readonly handle = async (req: FastifyRequest<{Body:CreateMovieRequest}>, rep: FastifyReply) => {
    const command = new CreateMovieCommand(
      req.body.name,
      req.body.category_uuid,
      new Date(req.body.release)
    );

    const result = await this.#handler.handle(command);

    if (result.is_right) {
      const reply = new FailureReply(result.right);
      rep.code(reply.status_code).send(reply);
    } else {
      const reply = new MovieReply(
        result.left,
        "Ok",
        "OK",
        201
      );
      rep.code(reply.status_code).send(reply);
    }

  }
}
