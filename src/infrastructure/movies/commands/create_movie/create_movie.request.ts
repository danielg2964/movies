import { Type, type Static } from "@sinclair/typebox";

export const CreateMovieRequest = Type.Object({
  name: Type.String({ minLength: 1 }),
  category_uuid: Type.String({ format: "uuid" }),
  release: Type.String({ format: "date" })
});

export type CreateMovieRequest = Static<typeof CreateMovieRequest>
