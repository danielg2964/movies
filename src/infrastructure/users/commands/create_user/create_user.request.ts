import { S } from "fluent-json-schema";

export const CreateUserRequest = S.object()
  .prop('name', S.string()).required()
  .prop('password', S.string()).required();

export type CreateUserRequest = {
  name: string,
  password: string
}
