import type { UserEntity } from "#domain/users/entities/user.entity.ts";
import { UserReply } from "../../replies/user.reply.ts";

export class CreateUserReply extends UserReply {
  constructor(user: UserEntity) {
    super(user, "User created", "USER_CREATED", 201);
  }
}
