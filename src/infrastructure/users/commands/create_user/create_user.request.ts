import { Type, type Static } from "@sinclair/typebox";

export const CreateUserRequest = Type.Object({
  name: Type.String(),
  password: Type.String()
});

export type CreateUserRequest = Static<typeof CreateUserRequest>

