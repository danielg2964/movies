import type { FastifyReply, FastifyRequest } from "fastify";
import type { WatchMovieRequest } from "./watch_movie.request.ts";
import type { WatchMovieHandler } from "#application/users/commands/watch_movie/watch_movie.handler.ts";
import { WatchMovieCommand } from "#application/users/commands/watch_movie/watch_movie.command.ts";
import { FailureReply } from "#infrastructure/shared/replies/failure.reply.ts";
import { Reply } from "#infrastructure/shared/reply.ts";

export class WatchMovieController {
  constructor(watch_movie_handler: WatchMovieHandler) {
    this.#watch_movie_handler = watch_movie_handler;
  }

  readonly #watch_movie_handler: WatchMovieHandler;

  readonly handle = async (req: FastifyRequest<{Body:WatchMovieRequest}>, rep: FastifyReply) => {
    const command = new WatchMovieCommand(req.body.user_uuid, req.body.movie_uuid);

    const result = await this.#watch_movie_handler.handle(command);

    if (result.is_right) {
      const reply = new FailureReply(result.right);

      rep.code(reply.status_code).send(reply);
    } else {
      const left = result.left;
      const reply = new Reply(left.message, left.code, 200);

      rep.code(reply.status_code).send(reply);
    }
  }
}
