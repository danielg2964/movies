import { Failure } from "#types/failure.ts";

export class MovieFailures {
  static readonly MOVIE_NAME_IN_USE = new Failure("Movie name is in use", "MOVIE_NAME_IN_USE", 400);

  static readonly MOVIE_NOT_FOUND = new Failure("Movie not found", "MOVIE_NOT_FOUND", 404);
}
