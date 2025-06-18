import type { Failure } from "#types/failure.ts";
import { Reply } from "../reply.ts";

export class FailureReply extends Reply {
  constructor(failure: Failure) {
    super(failure.message, failure.code, failure.status_code);
  }
}
