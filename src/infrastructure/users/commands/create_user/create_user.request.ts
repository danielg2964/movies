import { Type, type Static } from "@sinclair/typebox";

export const CreateUserRequest = Type.Object({
  name: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 })
});

export type CreateUserRequest = Static<typeof CreateUserRequest>

