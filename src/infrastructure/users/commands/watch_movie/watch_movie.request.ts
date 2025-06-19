import { Type, type Static } from "@sinclair/typebox";

export const WatchMovieRequest = Type.Object({
  user_uuid: Type.String({ format: "uuid" }),
  movie_uuid: Type.String({ format: "uuid" })
});

export type WatchMovieRequest = Static<typeof WatchMovieRequest>

