import { S } from "fluent-json-schema"

export type CreateMovieRequest = {
  name: string,
  category_uuid: string,
  release: string 
}

export const CreateMovieRequest = S.object()
  .prop("name", S.string())
  .prop("category_uuid", S.string())
  .prop("release", S.string().format("date"))
