import { Failure } from "#types/failure.ts";

export class UserFailures {
  static readonly NAME_IN_USE = new Failure("Name is in use", "NAME_IN_USE");
}
