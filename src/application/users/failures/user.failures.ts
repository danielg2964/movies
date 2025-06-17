import { Failure } from "#types/failure.ts";

export class UserFailures {
  static readonly USER_NAME_IN_USE = new Failure("Name is in use", "NAME_IN_USE");
  
  static readonly USER_NOT_FOUND = new Failure("User not found", "USER_NOT_FOUND");

  static readonly USER_ALREADY_WATCH_THIS_MOVIE = new Failure("User already watch this movie", "USER_ALREADY_WATCH_THIS_MOVIE");
}
